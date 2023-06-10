import { fail } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { redirectWithFlash } from '$lib/server/flash';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { hashPassword } from '$lib/server/utils';
import {
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (() => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, cookies, request }) => {
		requireLogin(locals);

		const data = await request.formData();
		const currentPassword = data.get('currentPassword');
		const newPassword = data.get('newPassword');
		const newPasswordConfirm = data.get('newPasswordConfirm');

		const errors = validate(
			{
				currentPassword: [presenceValidator, stringValidator],
				newPassword: [presenceValidator, stringValidator],
				newPasswordConfirm: [
					presenceValidator,
					stringValidator,
					(value) => {
						if (value !== newPassword) {
							return 'Passwords do not match';
						}
						return null;
					},
				],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(
			currentPassword && newPassword && newPasswordConfirm,
			'Missing required fields',
		);
		invariant(typeof currentPassword === 'string', 'Name must be a string');
		invariant(typeof newPassword === 'string', 'Name must be a string');
		invariant(typeof newPasswordConfirm === 'string', 'Name must be a string');

		const account = await prisma.accounts.findFirst({
			where: {
				id: locals.session?.accountId,
				password: hashPassword(currentPassword),
			},
		});
		if (!account) {
			return fail(400, {
				errors: {
					currentPassword: ['Invalid password'],
				} as Record<string, string[]>,
			});
		}
		if (account.password === hashPassword(newPassword)) {
			return fail(400, {
				errors: {
					newPassword: ['New password cannot be the same as the old password'],
				} as Record<string, string[]>,
			});
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		try {
			await prisma.accounts.update({
				where: { id: locals.session?.accountId },
				data: { password: hashPassword(newPassword) },
			});
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: {
					global: ['Failed to update password'],
				} as Record<string, string[]>,
			});
		}

		redirectWithFlash('/account', cookies, {
			type: 'success',
			message: 'Password changed successfully',
		});
	},
} satisfies Actions;
