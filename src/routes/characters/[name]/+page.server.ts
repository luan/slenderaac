import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const player = await prisma.players.findUnique({
		where: {
			name: params.name,
		},
	});

	if (!player) {
		return {
			status: 404,
			error: `A player with the name "${params.name}" does not exist.`,
		};
	}

	return {
		character: {
			name: player.name,
			level: player.level,
		},
	};
}) satisfies PageServerLoad;
