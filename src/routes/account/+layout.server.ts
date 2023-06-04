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
				is_main: true,
				looktype: true,
				lookaddons: true,
				lookhead: true,
				lookbody: true,
				looklegs: true,
				lookfeet: true,
				player_storage: {
					select: {
						value: true,
					},
					where: {
						key: 10000000 + 2001 + 10,
					},
				},
				online: {
					select: { player_id: true },
				},
			},
		})
	).map((player) => ({
		...player,
		online: player.online.length > 0,
		vocation: isPlayerVocation(player.vocation)
			? player.vocation
			: PlayerVocation.None,
		pronoun: isPlayerPronoun(player.pronoun)
			? player.pronoun
			: PlayerPronoun.Unset,
		sex: isPlayerSex(player.sex) ? player.sex : PlayerSex.Female,
	}));

	return {
		title: 'Account Management',
		characters,
	};
}) satisfies LayoutServerLoad;
