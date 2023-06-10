import { check as checkPort } from 'tcp-port-used';

import { PlayerGroup } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import { SERVER_ADDRESS, SERVER_PORT } from '$env/static/private';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
	depends('app:layout');

	const highscores = await prisma.players.findMany({
		where: {
			group_id: {
				lt: PlayerGroup.Gamemaster,
			},
		},
		select: PlayerSelectForList,
		orderBy: {
			experience: 'desc',
		},
		take: 10,
	});

	const boostedBoss = await prisma.boostedBoss.findFirst();
	const boostedCreature = await prisma.boostedCreature.findFirst();
	const staticPages = await prisma.staticPage.findMany({
		orderBy: { order: 'asc' },
	});

	const serverOnline = await checkPort(Number(SERVER_PORT), SERVER_ADDRESS);
	const onlinePlayerCount = await prisma.playerOnline.count({
		where: { player: { group_id: { lt: PlayerGroup.Gamemaster } } },
	});

	return {
		highscores: highscores.map(dbToPlayer),
		boostedBoss,
		boostedCreature,
		isLoggedIn: Boolean(locals.session),
		staticPages,
		flash: locals.flash,
		serverOnline,
		onlinePlayerCount,
	};
}) satisfies LayoutServerLoad;
