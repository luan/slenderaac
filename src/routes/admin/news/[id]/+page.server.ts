import { fail, redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';
import { stringValidator, validate } from '$lib/server/validations';

import type { Actions, PageServerLoad } from './$types';

export const load = (({ params }) => {
	const news = prisma.news.findFirst({
		where: { id: params.id },
	});
	return { news };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, params }) => {
		requireLogin(locals, 'admin');

		const data = await request.formData();
		const method = data.get('_method');
		if (method === 'DELETE') {
			await prisma.news.delete({ where: { id: params.id } });
			throw redirect(302, '/admin/news');
		}

		const title = data.get('title');
		const content = data.get('content');
		const published = data.get('published');

		const errors = validate(
			{
				title: [stringValidator],
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

		const author = await prisma.players.findFirst({
			where: {
				account_id: locals.accountId,
				is_main: true,
			},
		});

		if (!author) {
			return fail(400, {
				invalid: true,
				errors: { global: ['No main character found'] } as Record<
					string,
					string[]
				>,
			});
		}

		try {
			await prisma.news.update({
				where: { id: params.id },
				data: {
					...(title ? { title } : {}),
					...(content ? { content } : {}),
					published: published === 'on',
				},
			});
		} catch (e) {
			console.error(e);
			return fail(500, {
				errors: { global: ['Failed to create news article'] } as Record<
					string,
					string[]
				>,
			});
		}

		throw redirect(302, '/admin/news');
	},
} satisfies Actions;
