import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async () => {
	const articles = await prisma.news.findMany({
		where: {
			published: true,
		},
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			created_at: 'desc',
		},
		take: 5,
	});

	return {
		title: 'Latest News',
		articles,
	};
}) satisfies PageServerLoad;
