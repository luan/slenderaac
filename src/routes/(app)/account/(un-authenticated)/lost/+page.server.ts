import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { sendMail } from '$lib/server/email';
import { redirectWithFlash } from '$lib/server/flash';
import { prisma } from '$lib/server/prisma';
import {
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.session) {
		throw redirect(302, '/');
	}

	return {
		title: 'Account Lost',
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let email = data.get('email');

		const errors = validate(
			{
				email: [presenceValidator, stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(email, 'Missing required fields');
		invariant(typeof email === 'string', 'Email must be a string');
		email = email.toLowerCase();

		const account = await prisma.accounts.findUnique({
			where: { email },
		});
		if (!account) {
			redirectWithFlash(`/account/login`, cookies, {
				type: 'success',
				message:
					'If an account with that email exists, a verification email has been sent.',
			});
		}
		invariant(account, 'Account not found');

		await prisma.passwordReset.deleteMany({
			where: { account_id: account.id },
		});
		const reset = await prisma.passwordReset.create({
			data: {
				account_id: account.id,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
			},
		});

		await sendMail(account.email, {
			subject: 'Reset your password',
			props: {
				title: 'Reset your password',
				buttonText: 'Reset Password',
				href: `/account/password-reset?email=${account.email}&token=${reset.token}`,
				previewText: 'Click here to reset your password.',
				paragraphs: [
					'You are receiving this email because you requested a password reset for your account.',
					'If you did not request a password reset, you can safely ignore this email.',
				],
			},
		});
		redirectWithFlash(`/account/login`, cookies, {
			type: 'success',
			message:
				'If an account with that email exists, a verification email has been sent.',
		});
	},
} satisfies Actions;
