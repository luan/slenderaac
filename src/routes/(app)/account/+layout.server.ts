import { redirect } from '@sveltejs/kit';

import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.accountId) {
		throw redirect(302, '/login');
	}

	const characters = (
		await prisma.players.findMany({
			where: {
				account_id: locals.accountId,
			},
			select: PlayerSelectForList,
		})
	).map(dbToPlayer);
	return {
		title: 'Account Management',
		characters,
	};
}) satisfies LayoutServerLoad;
