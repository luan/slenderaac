import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import invariant from 'tiny-invariant';

import { sendVerificationEmail } from '$lib/server/email';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { comparePassword } from '$lib/server/utils';
import {
	emailValidator,
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
		const password = data.get('password');
		const newEmail = data.get('newEmail');

		const errors = await validate(
			{
				password: [presenceValidator, stringValidator],
				newEmail: [presenceValidator, emailValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(password && newEmail, 'Missing required fields');
		invariant(typeof password === 'string', 'Name must be a string');
		invariant(typeof newEmail === 'string', 'Name must be a string');

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
		if (account.email === newEmail.toLowerCase()) {
			return fail(400, {
				errors: {
					newEmail: ['New email must be different from current email'],
				} as Record<string, string[]>,
			});
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		if (!account.is_verified) {
			await prisma.accounts.update({
				where: { id: locals.session?.accountId },
				data: { email: newEmail.toLowerCase() },
			});
		}

		await prisma.emailVerification.deleteMany({
			where: { account_id: account.id },
		});
		const verification = await prisma.emailVerification.create({
			data: {
				account_id: account.id,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
				new_email: newEmail.toLowerCase(),
			},
		});

		await sendVerificationEmail(account.email, verification.token);
		throw redirect(
			'/account',
			{
				type: 'success',
				message:
					'Email changed requested. Please check your email for a confirmation link.',
			},
			event,
		);
	},
} satisfies Actions;
