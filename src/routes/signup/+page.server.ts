import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';
import {
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';
import { hashPassword } from '$lib/utils';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ locals }) => {
	if (locals.email) {
		throw redirect(302, '/');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let name = data.get('accountName');
		let email = data.get('email');
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
		name = name.toLowerCase();
		email = email.toLowerCase();

		{
			const account = await prisma.accounts.findUnique({ where: { email } });
			if (account) {
				return fail(400, {
					errors: {
						email: ['Email is already taken'],
					} as Record<string, string[]>,
				});
			}
		}
		{
			const account = await prisma.accounts.findUnique({ where: { name } });
			if (account) {
				return fail(400, {
					errors: {
						accountName: ['Account name is already taken'],
					} as Record<string, string[]>,
				});
			}
		}

		const hashedPassword = hashPassword(password);
		try {
			const created = await prisma.accounts.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			await performLogin(cookies, created.email);
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: { global: ['Failed to create account'] } as Record<
					string,
					string[]
				>,
			});
		}

		throw redirect(302, '/');
	},
} satisfies Actions;
