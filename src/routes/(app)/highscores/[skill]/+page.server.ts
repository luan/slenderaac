import { PlayerGroup, type PlayerWithRank } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

const PER_PAGE = 50;
const MAX_PER_PAGE = 200;

export const load = (async ({ params, url }) => {
	let take = Number(url.searchParams.get('limit')) || PER_PAGE;
	if (take > MAX_PER_PAGE) {
		take = MAX_PER_PAGE;
	}
	const page = Number(url.searchParams.get('page')) || 1;
	const skip = page * take - take;
	console.log('load', { params, url, take, page, skip });
	const characters = await prisma.players.findMany({
		where: {
			group_id: {
				lt: PlayerGroup.Gamemaster,
			},
		},
		select: PlayerSelectForList,
		orderBy: {
			experience: 'desc',
		},
		take,
		skip,
	});
	const count = await prisma.players.count({
		where: {
			group_id: {
				lt: PlayerGroup.Gamemaster,
			},
		},
	});

	return {
		title: 'Highscores',
		characters: characters.map(dbToPlayer).map(
			(player, index): PlayerWithRank => ({
				...player,
				rank: skip + index + 1,
			}),
		),
		limit: take,
		offset: page - 1,
		skill: params.skill,
		count,
	};
}) satisfies PageServerLoad;
