import type { Actions } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	requireLogin(locals, 'admin');

	const staticPages = await prisma.staticPage.findMany({
		select: {
			id: true,
			slug: true,
			title: true,
		},
		orderBy: {
			order: 'asc',
		},
	});

	return { staticPages };
}) satisfies PageServerLoad;

export const actions = {
	reorder: async ({ locals, request }) => {
		requireLogin(locals, 'admin');

		const data = await request.formData();

		const staticPages = data.getAll('staticPages');
		await Promise.all(
			staticPages.map(async (staticPageId, idx) => {
				const order = idx;
				invariant(typeof staticPageId === 'string', 'staticPageId is string');
				return prisma.staticPage.update({
					where: { id: staticPageId },
					data: { order },
				});
			}),
		);
		return { success: true };
	},
} satisfies Actions;
