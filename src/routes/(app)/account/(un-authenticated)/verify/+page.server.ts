import { error, fail } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { redirectWithFlash } from '$lib/server/flash';
import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';
import {
	emailValidator,
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const email = url.searchParams.get('email');
	const token = url.searchParams.get('token');
	if (!email || !token) {
		throw error(422, 'Invalid email or token');
	}

	const verification = await prisma.emailVerification.findUnique({
		where: { token },
		include: { account: true },
	});
	if (!verification || !verification.account) {
		throw error(422, 'Invalid email or token');
	}
	if (verification.expires < new Date()) {
		throw error(422, 'Token expired');
	}

	return { email, token };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const token = data.get('token');

		const errors = validate(
			{
				token: [presenceValidator, stringValidator],
				email: [presenceValidator, emailValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(token && email, 'Missing required fields');
		invariant(typeof token === 'string', 'Token must be a string');
		invariant(typeof email === 'string', 'Email must be a string');

		const verification = await prisma.emailVerification.findUnique({
			where: { token },
			include: { account: true },
		});
		if (!verification || !verification.account) {
			throw error(422, 'Invalid email or token');
		}
		if (verification.expires < new Date()) {
			throw error(422, 'Token expired');
		}

		const newEmail = verification.new_email;
		const account = verification.account;

		await prisma.$transaction([
			prisma.accounts.update({
				where: { id: account.id },
				data: {
					...(newEmail && newEmail !== account.email
						? { email: newEmail }
						: {}),
					is_verified: true,
				},
			}),
			prisma.emailVerification.delete({
				where: { token },
			}),
		]);
		const sessionEmail = newEmail || account.email;

		await performLogin(cookies, sessionEmail);

		redirectWithFlash('/account', cookies, {
			type: 'success',
			message: 'Your email has been verified.',
		});
	},
} satisfies Actions;
