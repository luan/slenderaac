import { redirect } from '@sveltejs/kit';

import {
	isPlayerPronoun,
	isPlayerSex,
	isPlayerVocation,
	PlayerPronoun,
	PlayerSex,
	PlayerVocation,
} from '$lib/players';
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
			select: {
				name: true,
				pronoun: true,
				sex: true,
				vocation: true,
				level: true,
			},
		})
	).map((player) => ({
		...player,
		vocation: isPlayerVocation(player.vocation)
			? player.vocation
			: PlayerVocation.None,
		pronoun: isPlayerPronoun(player.pronoun)
			? player.pronoun
			: PlayerPronoun.Unset,
		sex: isPlayerSex(player.sex) ? player.sex : PlayerSex.Female,
	}));

	return {
		characters,
	};
}) satisfies LayoutServerLoad;
