import { type Actions, fail } from '@sveltejs/kit';

import {
	ensureGuildWithInvitation,
	guildLowestRankId,
} from '$lib/server/guilds';
import { PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

const commit = (accept: boolean) =>
	(async ({ locals, request, params }) => {
		const guild = await ensureGuildWithInvitation({
			locals,
			params,
		});

		const data = await request.formData();
		const playerName = data.get('name');
		if (typeof playerName !== 'string') {
			return fail(400, { errors: { global: [$_('characters-invalid-name')] } });
		}

		const player = await prisma.players.findFirst({
			where: { name: playerName, deletion: 0 },
			select: PlayerSelectForList,
		});

		if (!player) {
			return fail(404, {
				errors: {
					global: [
						$_('characters-not-found', { values: { name: playerName } }),
					],
				},
			});
		}

		if (player.guild_membership) {
			return fail(400, {
				errors: {
					global: [
						$_('guilds-already-member', { values: { name: playerName } }),
					],
				},
			});
		}

		await prisma.$transaction([
			prisma.guildInvites.deleteMany({
				where: {
					guild_id: guild.id,
					player_id: player.id,
				},
			}),
			...(accept
				? [
						prisma.guildMembership.create({
							data: {
								guild_id: guild.id,
								player_id: player.id,
								rank_id: await guildLowestRankId(guild.id),
							},
						}),
				  ]
				: []),
		]);

		return {};
	}) satisfies Actions[number];

export const actions = {
	accept: commit(true),
	reject: commit(false),
} satisfies Actions;
