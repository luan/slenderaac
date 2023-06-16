import type { Guilds } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';

export async function getGuildWithMinRank({
	guildName,
	accountId,
	minRank,
}: {
	guildName: string;
	accountId: number;
	minRank: number;
}) {
	return prisma.guilds.findFirst({
		where: {
			name: guildName,
			OR: [
				{
					guild_membership: {
						some: {
							rank: { level: { gte: minRank } },
							player: { account_id: accountId },
						},
					},
				},
				{ owner: { account_id: accountId } },
			],
		},
	});
}

export async function ensureGuildWithPermission({
	locals,
	params,
	minRank,
}: {
	locals: App.Locals;
	params: Partial<Record<string, string>>;
	minRank: number;
}): Promise<Guilds> {
	requireLogin(locals);

	const guildName = params.name;
	invariant(typeof guildName === 'string', 'guildName is not a string');

	// check if guild exists and user is a member with rank >= 2 (vice-leader)
	const guild = await getGuildWithMinRank({
		guildName,
		accountId: locals.session.accountId,
		minRank,
	});

	if (!guild) {
		throw redirect(303, `/guilds/${guildName}`);
	}

	return guild;
}

export async function getGuildWithInvitation({
	guildName,
	accountId,
}: {
	guildName: string;
	accountId: number;
}) {
	return prisma.guilds.findFirst({
		where: {
			name: guildName,
			guild_invites: { some: { player: { account_id: accountId } } },
		},
	});
}

export async function ensureGuildWithInvitation({
	locals,
	params,
}: {
	locals: App.Locals;
	params: Partial<Record<string, string>>;
}): Promise<Guilds> {
	requireLogin(locals);

	const guildName = params.name;
	invariant(typeof guildName === 'string', 'guildName is not a string');

	const guild = await getGuildWithInvitation({
		guildName,
		accountId: locals.session.accountId,
	});

	if (!guild) {
		throw redirect(303, `/guilds/${guildName}`);
	}

	return guild;
}

export async function getGuildWithMembership({
	guildName,
	characterName,
}: {
	guildName: string;
	characterName: string;
}) {
	return prisma.guilds.findFirst({
		where: {
			name: guildName,
			guild_membership: {
				some: { player: { name: characterName } },
			},
		},
	});
}

export async function ensureGuildWithMembership({
	locals,
	params,
	characterName,
}: {
	locals: App.Locals;
	params: Partial<Record<string, string>>;
	characterName: string;
}): Promise<Guilds> {
	requireLogin(locals);

	const guildName = params.name;
	invariant(typeof guildName === 'string', 'guildName is not a string');

	const guild = await getGuildWithMembership({
		guildName,
		characterName,
	});

	if (!guild) {
		throw redirect(303, `/guilds/${guildName}`);
	}

	if (
		(await prisma.players.count({
			where: { name: characterName, account_id: locals.session.accountId },
		})) === 1
	) {
		return guild;
	}

	return ensureGuildWithPermission({
		locals,
		params,
		minRank: 1,
	});
}

export async function guildLowestRankId(guildId: number) {
	const ranks = await prisma.guildRanks.findMany({
		where: { guild_id: guildId },
		orderBy: [{ level: 'asc' }, { order: 'desc' }],
	});
	return ranks[0].id;
}
