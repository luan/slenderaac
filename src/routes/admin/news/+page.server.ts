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
			published_at: true,
		},
	});

	return { news };
}) satisfies PageServerLoad;
