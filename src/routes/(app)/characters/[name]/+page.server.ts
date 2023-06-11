import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const player = await prisma.players.findFirst({
		where: {
			name: params.name,
			deletion: 0,
		},
		select: {
			...PlayerSelectForList,
			town_id: true,
			lastlogin: true,
			account_id: true,
			settings: true,
		},
	});
	const town = await prisma.towns.findUniqueOrThrow({
		where: { id: player?.town_id },
		select: { name: true },
	});
	if (!player) {
		return {
			status: 404,
			error: `A player with the name "${params.name}" does not exist.`,
		};
	}

	const accountCharacters = (
		await prisma.players.findMany({
			where: {
				account_id: player.account_id,
				deletion: 0,
				settings: { hidden: false },
			},
			select: { ...PlayerSelectForList },
		})
	).map(dbToPlayer);

	return {
		character: dbToPlayer({ ...player, town: town }),
		accountCharacters,
	};
}) satisfies PageServerLoad;
