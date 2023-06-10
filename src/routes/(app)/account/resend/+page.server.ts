import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { sendVerificationEmail } from '$lib/server/email';
import { redirectWithFlash } from '$lib/server/flash';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { hashPassword } from '$lib/server/utils';
import {
	emailValidator,
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
	requireLogin(locals);
	const account = await prisma.accounts.findUniqueOrThrow({
		where: { id: locals.session?.accountId },
	});
	if (account.is_verified) {
		throw redirect(302, '/account');
	}

	await prisma.emailVerification.deleteMany({
		where: { account_id: account.id },
	});
	const verification = await prisma.emailVerification.create({
		data: {
			account_id: account.id,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		},
	});

	await sendVerificationEmail(account.email, verification.token);
	redirectWithFlash('/account', cookies, {
		type: 'success',
		message: 'Verification re-sent. Check your email to confirm your account.',
	});
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, cookies, request }) => {
		requireLogin(locals);

		const data = await request.formData();
		const password = data.get('password');
		const newEmail = data.get('newEmail');

		const errors = validate(
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
				password: hashPassword(password),
			},
		});
		if (!account) {
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

		try {
			await prisma.accounts.update({
				where: { id: locals.session?.accountId },
				data: { email: newEmail.toLowerCase() },
			});
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: {
					global: ['Failed to update email'],
				} as Record<string, string[]>,
			});
		}

		redirectWithFlash('/account', cookies, {
			type: 'success',
			message: 'Email changed successfully',
		});
	},
} satisfies Actions;
