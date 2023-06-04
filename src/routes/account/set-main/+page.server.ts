import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';

import type { Actions, PageServerLoad } from './$types';

export const load = (() => {
	throw redirect(302, '/account');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.accountId) {
			throw redirect(302, '/login');
		}
		const data = await request.formData();
		const characterName = data.get('name');
		invariant(characterName, 'Missing required fields');
		invariant(typeof characterName === 'string', 'Name must be a string');

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

		await prisma.$transaction([
			prisma.players.updateMany({
				where: { account_id: locals.accountId, id: { not: existingPlayer.id } },
				data: { is_main: false },
			}),
			prisma.players.update({
				where: { id: existingPlayer.id },
				data: { is_main: true },
			}),
		]);
	},
} satisfies Actions;
