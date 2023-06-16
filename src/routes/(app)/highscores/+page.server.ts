import { PlayerGroup, type PlayerWithRank, vocationIds } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { isSkill, skillToColumn } from '$lib/server/skills';

import type { PageServerLoad } from './$types';

const PER_PAGE = 50;
const MAX_PER_PAGE = 200;

export const load = (async ({ url }) => {
	const skillParam = url.searchParams.get('skill') ?? 'experience';
	const skill = isSkill(skillParam) ? skillParam : 'experience';
	const vocation = url.searchParams.get('vocation') ?? 'all';

	let take = Number(url.searchParams.get('limit')) || PER_PAGE;
	if (take > MAX_PER_PAGE) {
		take = MAX_PER_PAGE;
	}
	const page = Number(url.searchParams.get('page')) || 1;
	const skip = page * take - take;
	const skillColumn = skillToColumn(skill);

	const characters = await prisma.players.findMany({
		where: {
			group_id: {
				lt: PlayerGroup.Gamemaster,
			},
			vocation:
				vocation === 'all'
					? undefined
					: {
							in: vocationIds(vocation),
					  },
		},
		select: PlayerSelectForList,
		orderBy: { [skillColumn]: 'desc' },
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
				skill: characters[index][skillColumn].toString(),
			}),
		),
		limit: take,
		offset: page - 1,
		skill,
		count,
		vocation,
	};
}) satisfies PageServerLoad;
