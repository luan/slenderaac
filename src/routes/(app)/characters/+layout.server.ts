import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
	const title = 'Characters';
	const search = url.searchParams.get('search');
	if (!search || search.length < 1) {
		return { title };
	}

	const characters = (
		await prisma.players.findMany({
			where: {
				name: {
					contains: search,
					not: {
						contains: '~~',
					},
				},
				deletion: 0,
			},
			select: PlayerSelectForList,
		})
	).map(dbToPlayer);

	return {
		title,
		results: characters,
	};
}) satisfies LayoutServerLoad;
