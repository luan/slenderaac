import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const title = 'Guilds';
	const search = url.searchParams.get('search');

	const guilds = await prisma.guilds.findMany({
		where: {
			name: {
				...(search ? { contains: search } : {}),
				not: { contains: '~~' },
			},
		},
		select: {
			name: true,
			image_url: true,
			description: true,
			owner: { select: { name: true } },
		},
	});

	return {
		title,
		results: guilds,
	};
}) satisfies PageServerLoad;
