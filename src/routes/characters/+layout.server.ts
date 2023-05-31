import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
	const search = url.searchParams.get('search');
	if (!search || search.length < 3) {
		return {};
	}

	const players = await prisma.players.findMany({
		where: {
			name: {
				contains: search,
			},
		},
	});

	return {
		results: players.map((player) => ({
			name: player.name,
			level: player.level,
		})),
	};
}) satisfies LayoutServerLoad;
