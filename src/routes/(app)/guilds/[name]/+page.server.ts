import { prisma } from '$lib/server/prisma';
import { $_ } from '$lib/utils';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const guild = await prisma.guilds.findFirst({
		where: { name: params.name },
	});
	if (!guild) {
		return {
			status: 404,
			error: $_('guilds.not-found', { values: { name: params.name } }),
		};
	}

	return {
		guild,
	};
}) satisfies PageServerLoad;
