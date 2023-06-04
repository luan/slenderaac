import type { Players, Prisma } from '@prisma/client';

import {
	PlayerGroup,
	PlayerPronoun,
	PlayerSex,
	PlayerVocation,
} from '$lib/players';
import { prisma } from '$lib/server/prisma';
import { toTitleCase } from '$lib/utils';

export const MountStorageKey = 10000000 + 2001 + 10;

export const PlayerSelectForList = {
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
					town: {
						connectOrCreate: {
							where: {
								name: 'Rookgaard',
							},
							create: {
								id: 3,
								name: 'Rookgaard',
								posx: 32097,
								posy: 32219,
								posz: 7,
							},
						},
					},
			  }
			: {
					level: 8,
					health: 185,
					healthmax: 185,
					experience: 4200,
					mana: 90,
					manamax: 90,
					cap: 470,
					town: {
						connectOrCreate: {
							where: {
								name: 'Thais',
							},
							create: {
								id: 8,
								name: 'Thais',
								posx: 32369,
								posy: 32241,
								posz: 7,
							},
						},
					},
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
		conditions: template.conditions,
		name,
		sex,
		pronoun,
		group_id: PlayerGroup.Normal,
	};
}
