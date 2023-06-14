import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { comparePassword } from '$lib/server/utils';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ params }) => {
	const name = params.name;
	if (!name) {
		throw redirect(302, '/account');
	}
	return {
		name,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { request, locals, params, url } = event;
		requireLogin(locals);

		const data = await request.formData();
		const password = data.get('password');
		const characterName = params.name;
		invariant(characterName, 'Missing required fields');

		const undelete = url.searchParams.get('cancel');
		if (undelete === 'true') {
			await prisma.players.updateMany({
				where: { name: characterName, account_id: locals.session?.accountId },
				data: { deletion: 0 },
			});
			throw redirect(
				'/account',
				{
					type: 'success',
					message: 'Character deletion cancelled',
				},
				event,
			);
		}

		invariant(password, 'Missing required fields');
		invariant(typeof password === 'string', 'Password must be a string');

		const account = await prisma.accounts.findFirst({
			where: {
				id: locals.session?.accountId,
			},
		});
		if (!account || !comparePassword(password, account.password)) {
			return fail(400, {
				errors: {
					password: ['Invalid password'],
				} as Record<string, string[]>,
			});
		}

		const existingPlayer = await prisma.players.findFirst({
			where: { name: characterName, account_id: locals.session?.accountId },
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
		const ops = [
			prisma.players.update({
				where: { id: existingPlayer.id },
				data: { deletion: deletionTimestamp, is_main: false },
			}),
		];

		if (existingPlayer.is_main) {
			const otherCharacter = await prisma.players.findFirst({
				where: {
					account_id: locals.session?.accountId,
					is_main: false,
					deletion: 0,
				},
			});
			if (otherCharacter) {
				ops.push(
					prisma.players.update({
						where: { id: otherCharacter.id },
						data: { is_main: true },
					}),
				);
			}
		}

		await prisma.$transaction(ops);

		throw redirect(
			'/account',
			{
				type: 'success',
				message: `Character ${characterName} scheduled for deletion`,
			},
			event,
		);
	},
} satisfies Actions;
