import { type Actions, fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import invariant from 'tiny-invariant';

import { ensureGuildWithPermission } from '$lib/server/guilds';
import { prisma } from '$lib/server/prisma';
import { comparePassword } from '$lib/server/utils';
import { $_ } from '$lib/utils';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	await ensureGuildWithPermission({
		locals,
		params,
		minRank: 4,
	});

	return { disbanding: true };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { locals, request, params } = event;
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 4,
		});

		const data = await request.formData();
		const password = data.get('password');
		invariant(password, 'Missing required fields');
		invariant(typeof password === 'string', 'Password must be a string');

		const account = await prisma.accounts.findFirst({
			where: {
				id: locals.session?.accountId,
			},
		});
		if (!account || !comparePassword(password, account.password)) {
			return fail(400, {
				errors: {
					password: ['Invalid password'],
				} as Record<string, string[]>,
			});
		}

		await prisma.guilds.delete({ where: { id: guild.id } });

		throw redirect(
			'/guilds',
			{
				type: 'success',
				message: $_('guilds.disband-success', { values: { name: guild.name } }),
			},
			event,
		);
	},
} satisfies Actions;
