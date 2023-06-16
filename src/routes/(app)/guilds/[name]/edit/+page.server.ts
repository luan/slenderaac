import { type Actions, fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import invariant from 'tiny-invariant';

import { ensureGuildWithPermission } from '$lib/server/guilds';
import { prisma } from '$lib/server/prisma';
import {
	guildNickValidator,
	guildRankValidator,
	presenceValidator,
	stringValidator,
	validate,
	type ValidationRules,
} from '$lib/server/validations';
import { $_ } from '$lib/utils';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals, params }) => {
	await ensureGuildWithPermission({
		locals,
		params,
		minRank: 3,
	});
	const parentData = await parent();

	return {
		...parentData,
	};
}) satisfies PageServerLoad;

export const actions = {
	saveDescription: async (event) => {
		const { request, locals, params } = event;
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 3,
		});

		const data = await request.formData();
		const errors = await validate(
			{
				description: [stringValidator],
			},
			data,
		);
		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors });
		}
		await prisma.guilds.update({
			where: { id: guild.id },
			data: {
				description: data.get('description')?.toString(),
			},
		});

		setFlash({ type: 'success', message: $_('saved') }, event);
	},

	saveMembers: async (event) => {
		const { request, locals, params } = event;
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 3,
		});

		const memberData: Record<number, { nick: string; rank: number }> = {};

		const data = await request.formData();
		const rules: ValidationRules = {};
		for (const key of data.keys()) {
			const value = data.get(key);
			if (typeof value !== 'string') {
				continue;
			}
			const [, playerId, field] = key.split('.');
			memberData[Number(playerId)] = {
				...memberData[Number(playerId)],
				[field]: field === 'nick' ? value.trim() : Number(value),
			};
			if (field === 'nick') {
				rules[key] = [guildNickValidator];
			}
		}

		const errors = await validate(rules, data);
		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors });
		}

		for (const memberId of Object.keys(memberData)) {
			const member = memberData[Number(memberId)];
			await prisma.guildMembership.updateMany({
				where: {
					guild_id: guild.id,
					player_id: Number(memberId),
				},
				data: {
					nick: member.nick,
					rank_id: member.rank,
				},
			});
		}

		setFlash({ type: 'success', message: $_('saved') }, event);
	},

	saveRanks: async (event) => {
		const { request, locals, params } = event;
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 3,
		});

		const rankData: Record<
			number,
			{ name: string; level: number; order: number }
		> = {};

		const data = await request.formData();
		const rules: ValidationRules = {};
		for (const key of data.keys()) {
			const value = data.get(key);
			if (typeof value !== 'string') {
				continue;
			}
			const [, rankId, field] = key.split('.');
			rankData[Number(rankId)] = {
				...rankData[Number(rankId)],
				[field]: field === 'name' ? value.trim() : Number(value),
			};
			if (field === 'name') {
				rules[key] = [presenceValidator, guildRankValidator];
			}
		}

		const errors = await validate(rules, data);
		if (Object.keys(errors).length > 0) {
			return fail(400, { invalid: true, errors });
		}

		for (const rankId of Object.keys(rankData)) {
			const rank = rankData[Number(rankId)];
			await prisma.guildRanks.updateMany({
				where: { id: Number(rankId), guild_id: guild.id },
				data: rank,
			});
		}

		setFlash({ type: 'success', message: $_('saved') }, event);
	},

	addRank: async ({ locals, params }) => {
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 3,
		});

		await prisma.guildRanks.create({
			data: {
				guild_id: guild.id,
				name: $_('guilds-ranks-new'),
				level: 1,
				order: await prisma.guildRanks.count({
					where: { guild_id: guild.id, level: 1 },
				}),
			},
		});

		return { errors: null };
	},

	deleteRank: async ({ url, locals, params }) => {
		const guild = await ensureGuildWithPermission({
			locals,
			params,
			minRank: 3,
		});

		const rankId = Number(url.searchParams.get('rankId'));
		invariant(!Number.isNaN(rankId), 'Invalid rank ID');

		const rank = await prisma.guildRanks.findFirst({
			where: { id: rankId, guild_id: guild.id },
		});
		if (!rank) {
			return fail(404, {
				errors: { global: [$_('guilds-ranks-not-found')] } as Record<
					string,
					string[]
				>,
			});
		}
		if (
			(await prisma.guildMembership.count({ where: { rank_id: rank.id } })) ===
			0
		) {
			await prisma.guildRanks.delete({ where: { id: rank.id } });
			return {};
		}

		const ranks = await prisma.guildRanks.findMany({
			where: {
				guild_id: guild.id,
			},
			orderBy: [{ level: 'desc' }, { order: 'asc' }],
		});
		if (ranks.length <= 1) {
			return fail(400, {
				errors: { global: [$_('guilds-ranks-delete-last')] } as Record<
					string,
					string[]
				>,
			});
		}

		const nextRank = ranks.find(
			(r) => r.id !== rankId && r.level <= rank.level,
		);
		if (!nextRank) {
			return fail(400, {
				errors: { global: [$_('guilds-ranks-delete-promotion')] } as Record<
					string,
					string[]
				>,
			});
		}

		await prisma.$transaction([
			prisma.guildMembership.updateMany({
				where: { rank_id: rank.id },
				data: { rank_id: nextRank.id },
			}),
			prisma.guildRanks.delete({
				where: { id: rank.id },
			}),
		]);

		return { errors: {} as Record<string, string[]> };
	},
} satisfies Actions;
