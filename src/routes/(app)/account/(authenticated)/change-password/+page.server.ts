import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { comparePassword, hashPassword } from '$lib/server/utils';
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
	default: async (event) => {
		const { request, locals } = event;
		requireLogin(locals);

		const data = await request.formData();
		const currentPassword = data.get('currentPassword');
		const newPassword = data.get('newPassword');
		const newPasswordConfirm = data.get('newPasswordConfirm');

		const errors = await validate(
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
			},
		});
		if (!account || !comparePassword(currentPassword, account.password)) {
			return fail(400, {
				errors: {
					currentPassword: ['Invalid password'],
				} as Record<string, string[]>,
			});
		}
		if (comparePassword(newPassword, account.password)) {
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

		throw redirect(
			'/account',
			{
				type: 'success',
				message: 'Password changed successfully',
			},
			event,
		);
	},
} satisfies Actions;
