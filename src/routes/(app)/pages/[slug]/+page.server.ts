import { fail } from '@sveltejs/kit';

import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { slug } = params;
	const staticPage = await prisma.staticPage.findUnique({
		where: { slug },
		select: {
			slug: true,
			title: true,
			content: true,
		},
	});

	if (!staticPage) {
		return fail(404, {
			error: `Page "${slug}" not found`,
		});
	}
	return { title: staticPage.title, staticPage };
}) satisfies PageServerLoad;
