import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const guild = await prisma.guilds.findFirst({
		where: { name: params.name },
		select: {
			name: true,
			image_url: true,
			description: true,
			guild_ranks: {
				select: {
					name: true,
					level: true,
					guild_membership: {
						select: { player: { select: PlayerSelectForList } },
					},
				},
				orderBy: { level: 'desc' },
			},
		},
	});
	if (!guild) {
		return {
			status: 404,
			error: $_('guilds.not-found', { values: { name: params.name } }),
		};
	}

	return {
		guild: {
			name: guild.name,
			image_url: guild.image_url,
			description: guild.description,
			ranks: guild.guild_ranks.map((rank) => ({
				name: rank.name,
				level: rank.level,
				members: rank.guild_membership.map((membership) =>
					dbToPlayer(membership.player),
				),
			})),
		},
	};
}) satisfies PageServerLoad;
