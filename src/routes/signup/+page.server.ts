import { fail, redirect } from '@sveltejs/kit';
import { createHash } from 'crypto';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';
import {
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ locals }) => {
	if (locals.email) {
		throw redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const name = data.get('accountName');
		const email = data.get('email');
		const password = data.get('password');
		const passwordConfirmation = data.get('passwordConfirmation');

		const errors = validate(
			{
				accountName: [presenceValidator, stringValidator],
				email: [presenceValidator, stringValidator],
				password: [presenceValidator, stringValidator],
				passwordConfirmation: [
					presenceValidator,
					stringValidator,
					(value) => {
						if (value !== password) {
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
			name && email && password && passwordConfirmation,
			'Missing required fields',
		);
		invariant(typeof name === 'string', 'Name must be a string');
		invariant(typeof email === 'string', 'Email must be a string');
		invariant(typeof password === 'string', 'Password must be a string');

		const account = await prisma.accounts.findUnique({ where: { email } });
		if (account) {
			return {
				success: false,
				error: 'An account with this email already exists',
			};
		}
		const hashedPassword = createHash('sha1').update(password).digest('hex');
		const created = await prisma.accounts.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		console.log('created', created);

		await performLogin(cookies, created.email);
		throw redirect(303, '/');
	},
} satisfies Actions;
