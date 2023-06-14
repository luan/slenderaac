import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import {
	characterNameValidator,
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';
import { $_ } from '$lib/utils';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ locals }) => {
	requireLogin(locals);
	return {
		title: 'New Guild',
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { request, locals } = event;
		requireLogin(locals);
		invariant(locals.session, 'Session must be present');

		const data = await request.formData();
		const name = data.get('name');
		const leader = data.get('leader');

		const errors = await validate(
			{
				name: [presenceValidator, characterNameValidator],
				leader: [presenceValidator, stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors });
		}

		invariant(name && leader, 'Missing required fields');
		invariant(typeof name === 'string', 'Name must be a string');
		invariant(typeof leader === 'string', 'Leader must be a string');
		const leaderId = Number(leader);
		invariant(!Number.isNaN(leaderId), 'Leader must be a number');

		if ((await prisma.guilds.count({ where: { name } })) > 0) {
			return fail(400, {
				invalid: true,
				errors: {
					name: [$_('guilds.taken')],
				} as Record<string, string[]>,
			});
		}

		const character = await prisma.players.findFirstOrThrow({
			where: {
				id: leaderId,
				account_id: locals.session.accountId,
				owned_guild: null,
				guild_membership: null,
			},
		});
		if (!character) {
			return fail(400, {
				invalid: true,
				errors: {
					leader: [$_('guilds.invalid-leader')],
				} as Record<string, string[]>,
			});
		}

		const [guild] = await prisma.$transaction([
			prisma.guilds.create({
				data: {
					name,
					owner: { connect: { id: character.id } },
					guild_membership: {
						create: {
							player: { connect: { id: character.id } },
							rank: {
								create: {
									name: $_('guilds.rank-leader'),
									level: 3,
									guilds: { connect: { name } },
								},
							},
						},
					},
					guild_ranks: {
						createMany: {
							data: [
								{ name: $_('guilds.rank-officer'), level: 2 },
								{ name: $_('guilds.rank-member'), level: 1 },
							],
						},
					},

					// I don't know what this is, but it's required
					creationdata: 0,
				},
			}),
			prisma.guildInvites.deleteMany({
				where: { player_id: character.id },
			}),
		]);

		throw redirect(
			`/guilds/${guild.name}`,
			{
				message: `Guild ${name} created!`,
				type: 'success',
			},
			event,
		);
	},
} satisfies Actions;
