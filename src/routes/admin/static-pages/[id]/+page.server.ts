import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import {
	slugValidator,
	stringValidator,
	validate,
} from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ params }) => {
	const staticPage = prisma.staticPage.findFirst({
		where: { id: params.id },
	});
	return { staticPage };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, params }) => {
		requireLogin(locals, 'admin');

		const data = await request.formData();
		const method = data.get('_method');
		if (method === 'DELETE') {
			await prisma.staticPage.delete({ where: { id: params.id } });
			throw redirect(302, '/admin/static-pages');
		}

		const title = data.get('title');
		const content = data.get('content');
		const slug = data.get('slug');
		const hide = data.get('hide');

		const errors = await validate(
			{
				title: [stringValidator],
				slug: [stringValidator, slugValidator],
				content: [stringValidator],
			},
			data,
		);

		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors: errors });
		}

		if (title) {
			invariant(typeof title === 'string', 'Name must be a string');
		}
		if (content) {
			invariant(typeof content === 'string', 'Name must be a string');
		}
		if (slug) {
			invariant(typeof slug === 'string', 'Slug must be a string');
		}

		try {
			await prisma.staticPage.update({
				where: { id: params.id },
				data: {
					...(title ? { title } : {}),
					...(slug ? { slug } : {}),
					...(content ? { content } : {}),
					...(hide ? { hide: hide === 'on' } : {}),
				},
			});
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: { global: ['Failed to update static page'] } as Record<
					string,
					string[]
				>,
			});
		}

		const staticPage = await prisma.staticPage.findFirst({
			where: { id: params.id },
		});

		return { staticPage };
	},
} satisfies Actions;
