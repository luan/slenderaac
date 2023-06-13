import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

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
	const lang =
		event.request.headers.get('accept-language')?.split(',')[0] || 'en';
	if (lang) {
		await locale.set(lang);
	}

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
