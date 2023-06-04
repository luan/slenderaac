import type { Handle } from '@sveltejs/kit';

import { AccountType, isAccountType } from '$lib/accounts';
import { prisma } from '$lib/server/prisma';
import { getSession } from '$lib/server/session';

const unauthorized = new Response(null, {
	status: 401,
	headers: {
		location: '/login',
	},
});

export const handle = (async ({ event, resolve }) => {
	const { cookies, url } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = await getSession(sid);
		if (session) {
			event.locals.accountId = session.accountId;
			event.locals.email = session.email;
		} else {
			cookies.delete('sid');
		}
	}

	console.log(url);

	if (url.pathname.startsWith('/admin')) {
		const account = await prisma.accounts.findUnique({
			where: { id: event.locals.accountId },
			select: { type: true },
		});
		if (!account || !isAccountType(account.type)) {
			return unauthorized;
		}
		if (!event.locals.accountId || account.type !== AccountType.God) {
			return unauthorized;
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
