import { fail } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { parsePlayerPronoun, parsePlayerSex } from '$lib/players';
import { redirectWithFlash } from '$lib/server/flash';
import { generateCharacterInput } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import {
	nameValidator,
	presenceValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (() => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, locals, request }) => {
		requireLogin(locals);

		const data = await request.formData();
		const characterName = data.get('characterName');
		const characterSex = data.get('characterSex');
		const characterPronouns = data.get('characterPronouns');

		const errors = validate(
			{
				characterName: [presenceValidator, nameValidator],
				characterSex: [presenceValidator, stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(characterName && characterSex, 'Missing required fields');
		invariant(typeof characterName === 'string', 'Name must be a string');
		invariant(typeof characterSex === 'string', 'Name must be a string');

		const characterSexValue = parsePlayerSex(characterSex);
		const characterPronounsValue = parsePlayerPronoun(characterPronouns);

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

		const characterInput = await generateCharacterInput({
			name: characterName,
			pronoun: characterPronounsValue,
			sex: characterSexValue,
		});
		try {
			await prisma.players.create({
				data: {
					account_id: locals.session?.accountId,
					...characterInput,
				},
			});
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: { global: ['Failed to create character'] } as Record<
					string,
					string[]
				>,
			});
		}

		redirectWithFlash('/account', cookies, {
			message: `Character ${characterName} created!`,
			type: 'success',
		});
	},
} satisfies Actions;
