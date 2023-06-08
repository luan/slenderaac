import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async () => {
	const news = await prisma.news.findMany({
		select: {
			id: true,
			title: true,
			author: {
				select: {
					name: true,
				},
			},
			published: true,
			created_at: true,
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	return { news };
}) satisfies PageServerLoad;
