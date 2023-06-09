import { PlayerGroup } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
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

	return {
		highscores: highscores.map(dbToPlayer),
		boostedBoss,
		boostedCreature,
		isLoggedIn: Boolean(locals.session),
		staticPages,
		flash: locals.flash,
	};
}) satisfies LayoutServerLoad;
