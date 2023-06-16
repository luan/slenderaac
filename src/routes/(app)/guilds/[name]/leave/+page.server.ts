import { type Actions, fail } from '@sveltejs/kit';

import { ensureGuildWithMembership } from '$lib/server/guilds';
import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

export const actions = {
	default: async ({ locals, request, params }) => {
		const data = await request.formData();
		const playerName = data.get('name');
		if (typeof playerName !== 'string') {
			return fail(400, { errors: { global: [$_('characters-invalid-name')] } });
		}

		const guild = await ensureGuildWithMembership({
			locals,
			params,
			characterName: playerName,
		});

		await prisma.guildMembership.deleteMany({
			where: {
				guild_id: guild.id,
				player: { name: playerName },
			},
		});

		return {};
	},
} satisfies Actions;
