import { loadFlashMessage } from 'sveltekit-flash-message/server';
import { check as checkPort } from 'tcp-port-used';

import { AccountType } from '$lib/accounts';
import { PlayerGroup } from '$lib/players';
import { dbToPlayer, PlayerSelectForList } from '$lib/server/players';
import { prisma } from '$lib/server/prisma';

import { SERVER_ADDRESS, SERVER_PORT } from '$env/static/private';

import type { LayoutServerLoad } from './$types';

export const load = loadFlashMessage(async ({ locals, depends }) => {
	depends('app:layout');

	const highscores = await prisma.players.findMany({
		where: { group_id: { lt: PlayerGroup.Gamemaster } },
		select: PlayerSelectForList,
		orderBy: { experience: 'desc' },
		take: 5,
	});

	const boostedBoss = await prisma.boostedBoss.findFirst();
	const boostedCreature = await prisma.boostedCreature.findFirst();
	const staticPages = await prisma.staticPage.findMany({
		orderBy: { order: 'asc' },
	});

	const serverOnline = await checkPort(Number(SERVER_PORT), SERVER_ADDRESS);
	const onlinePlayerCount = await prisma.playerOnline.count({
		where: { player: { group_id: { lt: PlayerGroup.Gamemaster } } },
	});

	const accountCharacters = locals.session?.accountId
		? await prisma.players.findMany({
				where: { account_id: locals.session.accountId },
				select: PlayerSelectForList,
		  })
		: null;

	return {
		highscores: highscores.map(dbToPlayer),
		boostedBoss,
		boostedCreature,
		isLoggedIn: Boolean(locals.session),
		isAdmin: locals.session?.type === AccountType.God,
		staticPages,
		serverOnline,
		onlinePlayerCount,
		accountCharacters: accountCharacters?.map(dbToPlayer),
	};
}) satisfies LayoutServerLoad;
