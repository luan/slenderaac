import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const guild = await prisma.guilds.findFirst({
		where: { name: params.name },
		select: {
			name: true,
			image_url: true,
			description: true,
			created_at: true,
			balance: true,
			owner: { select: { account_id: true, ...PlayerSelectForList } },
			guild_invites: {
				select: {
					player: { select: { account_id: true, ...PlayerSelectForList } },
				},
			},
			guild_ranks: {
				select: {
					id: true,
					name: true,
					level: true,
					order: true,
					guild_membership: {
						select: {
							player: { select: { account_id: true, ...PlayerSelectForList } },
						},
					},
				},
				orderBy: [{ level: 'desc' }, { order: 'asc' }],
			},
		},
	});
	if (!guild) {
		return {
			status: 404,
			error: $_('guilds.not-found', { values: { name: params.name } }),
			rankLevelInGuild: -1,
		};
	}

	const accountId = locals.session?.accountId;

	const rankLevelInGuild = !accountId
		? -1
		: guild.owner.account_id === accountId
		? 4
		: guild.guild_ranks.find((rank) =>
				rank.guild_membership.some(
					(membership) => membership.player.account_id === accountId,
				),
		  )?.level ?? -1;

	const amInvited =
		Boolean(accountId) &&
		guild.guild_invites.some(
			(invite) => invite.player.account_id === accountId,
		);

	return {
		rankLevelInGuild,
		amInvited,
		guild: {
			name: guild.name,
			image_url: guild.image_url,
			description: guild.description,
			balance: guild.balance,
			createdAt: guild.created_at,
			owner: dbToPlayer(guild.owner),
			invited: guild.guild_invites.map((invite) => dbToPlayer(invite.player)),
			ranks: guild.guild_ranks.map((rank) => ({
				id: rank.id,
				name: rank.name,
				level: rank.level,
				order: rank.order,
				members: rank.guild_membership.map((membership) =>
					dbToPlayer(membership.player),
				),
			})),
		},
	};
}) satisfies LayoutServerLoad;
