import {
	dbToPlayer,
	dbToSkills,
	PlayerSelectForList,
} from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

import type { PageServerLoad } from './$types';

const MAX_CHARACTERS_PER_PAGE = 100;

export const load = (async ({ params }) => {
	const player = await prisma.players.findFirst({
		where: {
			name: params.name,
			deletion: 0,
		},
		select: {
			...PlayerSelectForList,
			balance: true,
			town_id: true,
			lastlogin: true,
			account_id: true,
			settings: true,
			deaths: true,
		},
		take: MAX_CHARACTERS_PER_PAGE,
	});
	if (!player) {
		return {
			status: 404,
			error: $_('characters-not-found', { values: { name: params.name } }),
		};
	}
	const town = await prisma.towns.findUniqueOrThrow({
		where: { id: player?.town_id },
		select: { name: true },
	});

	const accountCharacters = player.settings?.hidden
		? []
		: (
				await prisma.players.findMany({
					where: {
						account_id: player.account_id,
						deletion: 0,
						OR: [{ settings: { hidden: false } }, { settings: null }],
					},
					select: { ...PlayerSelectForList },
				})
		  ).map(dbToPlayer);

	const showSkills = player.settings?.show_skills ?? true;
	const showInventory = player.settings?.show_inventory ?? true;

	return {
		character: dbToPlayer({ ...player, town: town }),
		deaths: player.deaths,
		balance: showInventory ? player.balance : null,
		skills: showSkills ? dbToSkills(player) : null,
		accountCharacters,
	};
}) satisfies PageServerLoad;
