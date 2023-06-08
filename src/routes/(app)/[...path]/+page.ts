import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (({ url }) => {
	throw error(404, { message: `Page not found: ${url.pathname}` });
}) satisfies PageLoad;
