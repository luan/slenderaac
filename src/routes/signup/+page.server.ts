import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { parsePlayerPronoun, parsePlayerSex } from '$lib/players';
import { generateCharacterInput } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';
import { hashPassword } from '$lib/server/utils';
import {
	nameValidator,
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

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
		let accountName = data.get('accountName');
		let email = data.get('email');
		const password = data.get('password');
		const characterName = data.get('characterName');
		const characterSex = data.get('characterSex');
		const characterPronouns = data.get('characterPronouns');

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
				characterName: [presenceValidator, nameValidator],
				characterSex: [presenceValidator, stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(
			accountName && email && password && characterName && characterSex,
			'Missing required fields',
		);
		invariant(typeof accountName === 'string', 'Name must be a string');
		invariant(typeof email === 'string', 'Email must be a string');
		invariant(typeof password === 'string', 'Password must be a string');
		invariant(typeof characterName === 'string', 'Name must be a string');
		invariant(typeof characterSex === 'string', 'Name must be a string');

		const characterSexValue = parsePlayerSex(characterSex);
		const characterPronounsValue = parsePlayerPronoun(characterPronouns);

		accountName = accountName.toLowerCase();
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
			const account = await prisma.accounts.findUnique({
				where: { name: accountName },
			});
			if (account) {
				return fail(400, {
					errors: {
						accountName: ['Account name is already taken'],
					} as Record<string, string[]>,
				});
			}
		}

		const hashedPassword = hashPassword(password);
		const characterInput = await generateCharacterInput({
			name: characterName,
			pronoun: characterPronounsValue,
			sex: characterSexValue,
		});

		const existingPlayer = await prisma.players.findFirst({
			where: { name: characterName },
		});
		if (existingPlayer) {
			return fail(400, {
				errors: {
					characterName: ['Character name is already taken'],
				} as Record<string, string[]>,
			});
		}

		try {
			const created = await prisma.accounts.create({
				data: {
					name: accountName,
					email,
					password: hashedPassword,

					players: {
						createMany: {
							data: [{ ...characterInput, is_main: true }],
						},
					},
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

		throw redirect(302, '/account');
	},
} satisfies Actions;
