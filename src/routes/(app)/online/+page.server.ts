import { PlayerGroup, type PlayerWithRank } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './[skill]/$types';

export const load = (async () => {
	const characters = (
		await prisma.playerOnline.findMany({
			select: {
				player: {
					select: PlayerSelectForList,
				},
			},
			where: { player: { group_id: { lt: PlayerGroup.Gamemaster } } },
			orderBy: { player: { name: 'asc' } },
		})
	).map(({ player }) => player);

	return {
		title: "Who's online?",
		characters: characters.map(dbToPlayer).map(
			(player, index): PlayerWithRank => ({
				...player,
				rank: index + 1,
			}),
		),
	};
}) satisfies PageServerLoad;
