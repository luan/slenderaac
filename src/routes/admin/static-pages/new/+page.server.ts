import { type Actions, fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import {
	presenceValidator,
	slugValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { PageServerLoad } from './$types';

export const load = (({ locals }) => {
	requireLogin(locals, 'admin');
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		requireLogin(locals, 'admin');

		const data = await request.formData();
		const slug = data.get('slug');
		const title = data.get('title');
		const content = data.get('content');

		const errors = await validate(
			{
				slug: [presenceValidator, stringValidator, slugValidator],
				title: [presenceValidator, stringValidator],
				content: [presenceValidator, stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		invariant(title && content && slug, 'Missing required fields');
		invariant(typeof title === 'string', 'Name must be a string');
		invariant(typeof content === 'string', 'Name must be a string');
		invariant(typeof slug === 'string', 'Slug must be a string');

		try {
			await prisma.staticPage.create({
				data: {
					title,
					content,
					slug,
				},
			});
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: { global: ['Failed to create static page'] } as Record<
					string,
					string[]
				>,
			});
		}

		throw redirect(302, '/admin/static-pages');
	},
} satisfies Actions;
