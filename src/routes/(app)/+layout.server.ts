import { PlayerGroup, vocationString } from '$lib/players';
import { prisma } from '$lib/server/prisma';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const highscores = await prisma.players.findMany({
		where: {
			group_id: {
				lt: PlayerGroup.Gamemaster,
			},
		},
		orderBy: {
			experience: 'desc',
		},
		take: 10,
	});

	return {
		highscores: highscores.map((player) => ({
			name: player.name,
			level: player.level,
			vocation: vocationString(player.vocation),
		})),
		isLoggedIn: Boolean(locals.email),
	};
}) satisfies LayoutServerLoad;
