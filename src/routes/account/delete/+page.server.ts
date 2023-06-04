import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { hashPassword } from '$lib/server/utils';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ url }) => {
	const name = url.searchParams.get('name');
	if (!name) {
		throw redirect(302, '/account');
	}
	return {
		name,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ url, locals, request }) => {
		if (!locals.accountId) {
			throw redirect(302, '/login');
		}
		const data = await request.formData();
		const password = data.get('password');
		const characterName = url.searchParams.get('name');
		invariant(characterName, 'Missing required fields');
		const undelete = url.searchParams.get('cancel');
		if (undelete === 'true') {
			await prisma.players.updateMany({
				where: { name: characterName, account_id: locals.accountId },
				data: { deletion: 0 },
			});
			throw redirect(302, '/account');
		}

		invariant(password, 'Missing required fields');
		invariant(typeof characterName === 'string', 'Name must be a string');
		invariant(typeof password === 'string', 'Password must be a string');

		const account = await prisma.accounts.findFirst({
			where: { id: locals.accountId, password: hashPassword(password) },
		});

		if (!account) {
			return fail(400, {
				errors: {
					password: ['Invalid password'],
				} as Record<string, string[]>,
			});
		}

		const existingPlayer = await prisma.players.findFirst({
			where: { name: characterName, account_id: locals.accountId },
		});
		if (!existingPlayer) {
			return fail(400, {
				errors: {
					characterName: ['Character does not exist'],
				} as Record<string, string[]>,
			});
		}

		// calculnate deletion date (30 days from now)
		const deletionDate = new Date();
		deletionDate.setDate(deletionDate.getDate() + 30);
		// onvert to timestamp (seconds)
		const deletionTimestamp = Math.floor(deletionDate.getTime() / 1000);

		await prisma.$transaction([
			prisma.players.update({
				where: { id: existingPlayer.id },
				data: { deletion: deletionTimestamp },
			}),
		]);

		throw redirect(302, '/account');
	},
} satisfies Actions;
