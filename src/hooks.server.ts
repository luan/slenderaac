import type { Handle } from '@sveltejs/kit';

import type { Flash } from '$lib/server/flash';
import { AccountType, isAccountType } from '$lib/accounts';
import { prisma } from '$lib/server/prisma';
import { getSession, requireLogin } from '$lib/server/session';

const unauthorized = new Response(null, {
	status: 401,
	headers: {
		location: '/account/login',
	},
});

export const handle = (async ({ event, resolve }) => {
	const { cookies, url } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = await getSession(sid);
		if (session) {
			event.locals.session = session;
		} else {
			cookies.delete('sid');
		}
	}
	event.locals.flash = undefined;
	const flashJSON = cookies.get('flashMessage');
	if (flashJSON) {
		const flashMessage = JSON.parse(flashJSON) as Flash;
		event.locals.flash = flashMessage;
		cookies.delete('flashMessage');
	}

	if (url.pathname.startsWith('/admin')) {
		requireLogin(event.locals, 'admin');
		const account = await prisma.accounts.findUnique({
			where: { id: event.locals.session?.accountId },
			select: { type: true },
		});
		if (!account || !isAccountType(account.type)) {
			return unauthorized;
		}
		if (!event.locals.session?.accountId || account.type !== AccountType.God) {
			return unauthorized;
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
