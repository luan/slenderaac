import { redirect } from '@sveltejs/kit';

import { deleteSession } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const sid = cookies.get('sid');
	if (sid) {
		cookies.delete('sid');
		await deleteSession(sid);
	}

	throw redirect(303, '/?loggedOut');
}) satisfies PageServerLoad;
