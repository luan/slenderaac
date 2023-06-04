import { PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const player = await prisma.players.findUnique({
		where: {
			name: params.name,
		},
		select: {
			...PlayerSelectForList,
			town: { select: { name: true } },
			lastlogin: true,
		},
	});

	if (!player) {
		return {
			status: 404,
			error: `A player with the name "${params.name}" does not exist.`,
		};
	}

	return {
		character: player,
	};
}) satisfies PageServerLoad;
