import type { Players, Prisma } from '@prisma/client';

import {
	isPlayerPronoun,
	isPlayerSex,
	isPlayerVocation,
	type Player,
	PlayerGroup,
	PlayerPronoun,
	PlayerSex,
	PlayerVocation,
} from '$lib/players';
import { prisma } from '$lib/server/prisma';
import { parseDate, toTitleCase } from '$lib/utils';

export const MountStorageKey = 10000000 + 2001 + 10;

export const PlayerSelectForList = {
	id: true,
	name: true,
	pronoun: true,
	sex: true,
	vocation: true,
	level: true,
	is_main: true,
	looktype: true,
	lookaddons: true,
	lookhead: true,
	lookbody: true,
	looklegs: true,
	lookfeet: true,
	deletion: true,
	player_storage: {
		select: {
			value: true,
		},
		where: {
			key: MountStorageKey,
		},
	},
	online: {
		select: { player_id: true },
	},
};

export async function getTemplate(vocation: PlayerVocation): Promise<Players> {
	const vocationName = toTitleCase(PlayerVocation[vocation]);
	const characterName = `~~${vocationName} Template`;

	const template = await prisma.players.findUnique({
		where: {
			name: characterName,
		},
	});
	if (template) {
		return template;
	}

	const createData: Partial<Prisma.PlayersCreateInput> =
		vocation === PlayerVocation.None
			? {
					level: 1,
					health: 150,
					healthmax: 150,
					experience: 0,
					mana: 0,
					manamax: 0,
					cap: 400,
					town_id: 3,
			  }
			: {
					level: 8,
					health: 185,
					healthmax: 185,
					experience: 4200,
					mana: 90,
					manamax: 90,
					cap: 470,
					town_id: 8,
			  };

	return await prisma.players.create({
		data: {
			account: {
				connectOrCreate: {
					where: {
						name: 'Template Account',
					},
					create: {
						name: 'Template Account',
						email: 'template',
						password: 'template',
					},
				},
			},
			name: characterName,
			vocation,
			soul: 100,
			looktype: 128,
			lookbody: 113,
			lookfeet: 115,
			lookhead: 95,
			looklegs: 39,
			group_id: PlayerGroup.Gamemaster,
			conditions: Buffer.from([]),
			...createData,
		},
	});
}

export async function generateCharacterInput({
	name,
	pronoun,
	sex,
}: {
	name: string;
	pronoun: PlayerPronoun;
	sex: PlayerSex;
}) {
	const vocation = PlayerVocation.None;
	const template = await getTemplate(vocation);
	return {
		level: template.level,
		vocation: template.vocation,
		health: template.health,
		healthmax: template.healthmax,
		experience: template.experience,
		mana: template.mana,
		manamax: template.manamax,
		cap: template.cap,
		town_id: template.town_id,
		soul: template.soul,
		looktype: template.looktype,
		lookaddons: template.lookaddons,
		lookhead: template.lookhead,
		lookbody: template.lookbody,
		looklegs: template.looklegs,
		lookfeet: template.lookfeet,
		conditions: template.conditions,
		name,
		sex,
		pronoun,
		group_id: PlayerGroup.Normal,
	};
}

type PlayerWithData = Players & {
	online: { player_id: number } | null;
	player_storage: { value: number }[];
	town: { name: string };
};

type PlayerWithoutOptionasl = Pick<
	PlayerWithData,
	| 'id'
	| 'name'
	| 'pronoun'
	| 'sex'
	| 'vocation'
	| 'level'
	| 'is_main'
	| 'looktype'
	| 'lookaddons'
	| 'lookhead'
	| 'lookbody'
	| 'looklegs'
	| 'lookfeet'
	| 'deletion'
	| 'player_storage'
	| 'online'
>;

export function dbToPlayer(
	player: Partial<PlayerWithData> & PlayerWithoutOptionasl,
): Player {
	return {
		...player,
		deletion:
			player.deletion && player.deletion > 0
				? parseDate(player.deletion)
				: null,
		online: Boolean(player.online),
		vocation: isPlayerVocation(player.vocation)
			? player.vocation
			: PlayerVocation.None,
		pronoun: isPlayerPronoun(player.pronoun)
			? player.pronoun
			: PlayerPronoun.Unset,
		sex: isPlayerSex(player.sex) ? player.sex : PlayerSex.Female,
		mount: (player.player_storage && player.player_storage[0]?.value) ?? 0,
		isMain: Boolean(player.is_main),
		townName: (player.town && player.town.name) ?? null,
		lastLogin: player.lastlogin ? parseDate(player.lastlogin) : null,
	};
}
