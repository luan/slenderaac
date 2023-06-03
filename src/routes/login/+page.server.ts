import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';
import { hashPassword } from '$lib/server/utils';
import {
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.email) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let email = data.get('email');
		const password = data.get('password');

		const errors = validate(
			{
				email: [presenceValidator, stringValidator],
				password: [presenceValidator, stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(email && password, 'Missing required fields');
		invariant(typeof email === 'string', 'Email must be a string');
		invariant(typeof password === 'string', 'Passsword must be a string');
		email = email.toLowerCase();

		const account = await prisma.accounts.findUnique({
			where: { email },
			select: { email: true, password: true },
		});
		const hashedPassword = hashPassword(password);

		if (!account || account.password !== hashedPassword) {
			return fail(400, { errors: { global: ['Invalid email or password'] } });
		}

		await performLogin(cookies, account.email);
		throw redirect(302, '/account');
	},
} satisfies Actions;
