import type { Handle } from '@sveltejs/kit';

import { getSession } from '$lib/server/session';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = await getSession(sid);
		if (session) {
			event.locals.email = session.email;
			event.locals.type = session.type;
		} else {
			cookies.delete('sid');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
