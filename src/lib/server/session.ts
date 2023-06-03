import type { Cookies } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import type { AccountType } from '$lib/accounts';
import { isAccountType } from '$lib/accounts';
import { prisma } from '$lib/server/prisma';

type SessionInfo = {
	accountId: number;
	email: string;
	type: AccountType;
	expires: bigint;
};
type Sid = string;

const sessionStore = new Map<Sid, SessionInfo>();

export async function performLogin(cookies: Cookies, email: string) {
	const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
	const sid = await createSession(email, maxAge);
	cookies.set('sid', sid, { maxAge });
}

export async function createSession(
	email: string,
	maxAge: number,
): Promise<string> {
	const account = await prisma.accounts.findUnique({
		where: { email },
	});
	invariant(account, 'Account not found');
	invariant(isAccountType(account.type), 'Invalid account type');

	const session = await prisma.accountSessions.create({
		data: {
			account_id: account.id,
			expires: Date.now() + maxAge * 1000,
		},
	});
	sessionStore.set(session.id, {
		accountId: account.id,
		email: account.email,
		type: account.type,
		expires: session.expires,
	});

	return session.id;
}

export async function deleteSession(sid: Sid) {
	sessionStore.delete(sid);
	await prisma.accountSessions.delete({ where: { id: sid } });
}

export async function getSession(sid: Sid): Promise<SessionInfo | undefined> {
	if (sessionStore.has(sid)) {
		const session = sessionStore.get(sid);
		if (session) {
			if (Date.now() > session.expires) {
				await deleteSession(sid);
				return undefined;
			}
			return session;
		}
	}

	const session = await prisma.accountSessions.findUnique({
		where: { id: sid },
		include: { account: { select: { id: true, email: true, type: true } } },
	});

	if (session) {
		if (Date.now() > session.expires) {
			await deleteSession(sid);
			return undefined;
		} else {
			const sessionInfo: SessionInfo = {
				accountId: session.account.id,
				email: session.account.email,
				type: session.account.type,
				expires: session.expires,
			};
			return sessionInfo;
		}
	} else {
		return undefined;
	}
}

let nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
async function clean() {
	await prisma.accountSessions.deleteMany({
		where: { expires: { lt: Date.now() } },
	});
	const now = Date.now();
	for (const [sid, session] of sessionStore) {
		if (session.expires < now) {
			sessionStore.delete(sid);
		}
	}
	nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
}

if (Date.now() > nextClean) {
	setTimeout(async () => {
		await clean();
	}, 5000);
}
