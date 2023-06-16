import { type Actions, fail } from '@sveltejs/kit';

import { ensureGuildWithPermission } from '$lib/server/guilds';
import { PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

export const actions = {
	invite: async ({ locals, request, params }) => {
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 2,
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

		await prisma.guildInvites.create({
			data: {
				date: Math.trunc(Date.now() / 1000),
				guild_id: guild.id,
				player_id: player.id,
			},
		});

		return {};
	},
	uninvite: async ({ locals, request, params }) => {
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 2,
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

		await prisma.guildInvites.deleteMany({
			where: {
				guild_id: guild.id,
				player_id: player.id,
			},
		});

		return {};
	},
} satisfies Actions;
