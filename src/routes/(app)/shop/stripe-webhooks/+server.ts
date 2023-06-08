/// <reference types="stripe-event-types" />

import type Stripe from 'stripe';
import { CoinOrderStatus } from '@prisma/client';
import { error } from 'console';
import invariant from 'tiny-invariant';

import { CoinTransactionType } from '$lib/coinTransactions';
import { prisma } from '$lib/server/prisma';
import { stripe } from '$lib/server/stripe';

import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	invariant(stripe, 'Stripe not enabled');
	const signatureHeader = request.headers.get('stripe-signature');
	if (!signatureHeader) {
		throw error(400, { message: 'Missing signature header' });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signatureHeader,
		STRIPE_WEBHOOK_SECRET,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case 'payment_intent.processing':
			await prisma.coinOrders.update({
				where: { payment_token: event.data.object.id },
				data: { status: CoinOrderStatus.PENDING },
			});
			break;
		case 'payment_intent.canceled':
			await prisma.coinOrders.update({
				where: { payment_token: event.data.object.id },
				data: { status: CoinOrderStatus.CANCELED },
			});
			break;
		case 'payment_intent.payment_failed':
			await prisma.coinOrders.update({
				where: { payment_token: event.data.object.id },
				data: { status: CoinOrderStatus.FAILED_ATTEMPT },
			});
			break;
		case 'payment_intent.succeeded':
			await handlePaymentSuccess(event);
			break;
	}

	return new Response();
};

async function handlePaymentSuccess(
	event: Stripe.DiscriminatedEvent.PaymentIntentEvent,
) {
	const order = await prisma.coinOrders.findUniqueOrThrow({
		where: { payment_token: event.data.object.id },
	});

	await prisma.$transaction([
		prisma.coinOrders.update({
			where: { id: order.id },
			data: {
				status: CoinOrderStatus.COMPLETED,
			},
		}),
		prisma.coinsTransactions.create({
			data: {
				account: { connect: { id: order.account_id } },
				description: `Purchase of ${order.amount} coins`,
				amount: order.amount,
				type: CoinTransactionType.CoinAdd,
			},
		}),
		prisma.accounts.update({
			where: { id: order.account_id },
			data: { coins_transferable: { increment: order.amount } },
		}),
	]);
}
