import type { AccountInfo } from '$lib/accounts';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	requireLogin(locals);

	const account = await prisma.accounts.findUniqueOrThrow({
		where: {
			id: locals.accountId,
		},
		select: {
			name: true,
			email: true,
			creation: true,
			coins_transferable: true,
			players: {
				select: PlayerSelectForList,
			},
		},
	});

	const characters = account.players.map(dbToPlayer);
	const accountInfo: AccountInfo = {
		name: account.name,
		email: account.email,
		createdAt: account.creation,
		coinsTransferable: account.coins_transferable,
		lastLogin: new Date(
			characters.reduce(
				(acc, cur) => Math.max(acc, cur.lastLogin?.getTime() ?? 0),
				0,
			),
		),
	};
	return {
		title: 'Account Management',
		characters,
		account: accountInfo,
	};
}) satisfies LayoutServerLoad;
