import invariant from 'tiny-invariant';

import { PlayerGroup } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { isOrder, isSort } from '$lib/sorting';

import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const sort = url.searchParams.get('sort') ?? 'name';
	const order = url.searchParams.get('order') ?? 'asc';
	invariant(isSort(sort), 'Invalid sort');
	invariant(isOrder(order), 'Invalid order');

	const characters = (
		await prisma.playerOnline.findMany({
			select: {
				player: {
					select: PlayerSelectForList,
				},
			},
			where: { player: { group_id: { lt: PlayerGroup.Gamemaster } } },
			orderBy: { player: { [sort]: order } },
		})
	).map(({ player }) => player);

	return {
		title: "Who's online?",
		characters: characters.map(dbToPlayer),
		sort,
		order,
	};
}) satisfies PageServerLoad;
