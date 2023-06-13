import { fail } from '@sveltejs/kit';
import { _, unwrapFunctionStore } from 'svelte-i18n';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { check2faToken, comparePassword } from '$lib/server/utils';
import {
	numberValidator,
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

const $_ = unwrapFunctionStore(_);

import { chunkString } from '$lib/utils';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	invariant(locals.session?.email, 'Missing email in session');
	const accountId = locals.session?.accountId;
	invariant(accountId, 'accountId must be set');
	const account = await prisma.accounts.findUniqueOrThrow({
		where: { id: accountId },
	});

	return { enabled: Boolean(account.token_secret) };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { request, locals } = event;
		requireLogin(locals);
		const accountId = locals.session?.accountId;
		invariant(accountId, 'accountId must be set');

		const data = await request.formData();
		const password = data.get('password');
		const token = data.get('token');

		const errors = await validate(
			{
				password: [presenceValidator, stringValidator],
				token: [presenceValidator, numberValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(password && token, 'Missing required fields');
		invariant(typeof password === 'string', 'Password must be a string');
		invariant(typeof token === 'string', 'Token must be a string');

		const account = await prisma.accounts.findFirst({
			where: { id: locals.session?.accountId },
		});
		if (!account || !comparePassword(password, account.password)) {
			return fail(400, {
				errors: {
					password: [$_('invalid-password')],
				} as Record<string, string[]>,
			});
		}
		if (!account.token_secret) {
			return fail(400, {
				errors: {
					token: [$_('2fa-not-enabled')],
				} as Record<string, string[]>,
			});
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		if (!(await check2faToken(token, accountId))) {
			return fail(400, {
				errors: {
					token: [$_('invalid-token')],
				} as Record<string, string[]>,
			});
		}

		const recoveryCodes = chunkString(
			crypto.randomUUID().replaceAll('-', ''),
			5,
		);

		await prisma.accounts.update({
			where: { id: accountId },
			data: {
				token_secret: null,
				backupCodes: { deleteMany: { account_id: accountId } },
			},
		});

		return {
			success: true,
			recoveryCodes,
		};
	},
} satisfies Actions;
