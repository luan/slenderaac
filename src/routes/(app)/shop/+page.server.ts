import { redirect } from '@sveltejs/kit';

import { requireLogin } from '$lib/server/session';

import type { PageServerLoad } from '../$types';

export const load = (({ locals }) => {
	requireLogin(locals);

	throw redirect(302, '/shop/coins');
}) satisfies PageServerLoad;
