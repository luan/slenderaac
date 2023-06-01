import { fail, redirect } from '@sveltejs/kit';
import { createHash } from 'crypto';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';

import type { Actions, PageServerLoad } from './$types';

type ValidationRules = [string, (value: unknown) => string | null][];

const validate = (rules: ValidationRules, data: FormData) => {
	const errors: Record<string, string>[] = [];
	for (const rule of rules) {
		const [key, validator] = rule;
		const value = data.get(key);
		const error = validator(value);
		if (error) {
			errors.push({ [key]: error.replace(':field', key) });
		}
	}
	return errors;
};

const stringValidator = (value: unknown) => {
	if (typeof value !== 'string') {
		return ':field must be a string';
	}
	return null;
};

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
			[
				['accountName', stringValidator],
				['email', stringValidator],
				['password', stringValidator],
				['passwordConfirmation', stringValidator],
				[
					'passwordConfirmation',
					(value) => {
						if (value !== password) {
							return 'Passwords do not match';
						}
						return null;
					},
				],
			],
			data,
		);

		invariant(
			name && email && password && passwordConfirmation,
			'Missing required fields',
		);
		invariant(typeof name === 'string', 'Name must be a string');
		invariant(typeof email === 'string', 'Email must be a string');
		invariant(typeof password === 'string', 'Password must be a string');

		if (errors.length > 0) {
			console.log('errors', errors);
			return fail(400, { invalid: true, errors: errors });
		}

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
