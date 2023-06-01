import { prisma } from '$lib/server/prisma';
import { isVocationId, vocationMap } from '$lib/vocations';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const highscores = await prisma.players.findMany({
		orderBy: {
			experience: 'desc',
		},
		take: 10,
	});

	return {
		highscores: highscores.map((player) => ({
			name: player.name,
			level: player.level,
			vocation: isVocationId(player.vocation)
				? vocationMap[player.vocation]
				: vocationMap[0],
		})),
		isLoggedIn: Boolean(locals.email),
	};
}) satisfies LayoutServerLoad;
