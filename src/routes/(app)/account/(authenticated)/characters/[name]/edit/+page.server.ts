import { fail } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { parsePlayerPronoun } from '$lib/players';
import { redirectWithFlash } from '$lib/server/flash';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { stringValidator, validate } from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const characterName = params.name;
	invariant(characterName, 'Missing character name');

	const player = await prisma.players.findUnique({
		where: { name: characterName },
		include: { settings: true },
	});

	if (!player) {
		throw fail(404, {
			errors: {
				global: ['Character not found'],
			} as Record<string, string[]>,
		});
	}

	let settings = player.settings;
	if (!settings) {
		settings = await prisma.playerSettings.create({
			data: { player_id: player.id },
		});
	}

	return {
		player: {
			name: player.name,
			pronoun: player.pronoun,
			settings: settings,
		},
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ params, cookies, locals, request }) => {
		requireLogin(locals);

		const characterName = params.name;
		invariant(characterName, 'Missing character name');

		const data = await request.formData();
		const characterPronouns = data.get('pronoun');
		const characterHidden = data.get('characterHidden');
		const showSkills = data.get('showSkills');
		const showInventory = data.get('showInventory');
		const comment = data.get('comment');

		const errors = validate({ comment: [stringValidator] }, data);
		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}
		invariant(
			comment === null || typeof comment === 'string',
			'Comment must be a string or not set',
		);

		const characterPronounsValue = parsePlayerPronoun(characterPronouns);

		const existingPlayer = await prisma.players.findFirst({
			where: { name: characterName },
		});
		if (
			!existingPlayer ||
			existingPlayer.account_id !== locals.session?.accountId
		) {
			return fail(400, {
				errors: {
					characterName: ['This character does not exist'],
				} as Record<string, string[]>,
			});
		}

		await prisma.players.update({
			where: { name: characterName },
			data: {
				pronoun: characterPronounsValue,
				settings: {
					update: {
						hidden: characterHidden === 'on',
						show_skills: showSkills === 'on',
						show_inventory: showInventory === 'on',
						comment: comment,
					},
				},
			},
		});

		redirectWithFlash('/account', cookies, {
			message: `Character ${characterName} saved!`,
			type: 'success',
		});
	},
} satisfies Actions;
