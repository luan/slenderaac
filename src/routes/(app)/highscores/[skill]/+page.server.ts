import { PlayerGroup } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async () => {
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

	return {
		title: 'Highscores',
		characters: highscores.map(dbToPlayer),
	};
}) satisfies PageServerLoad;
