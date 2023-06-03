import type { Players, Prisma } from '@prisma/client';

import { PlayerGroup, PlayerVocation } from '$lib/players';
import { prisma } from '$lib/server/prisma';
import { toTitleCase } from '$lib/utils';

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
			looktype: 130,
			group_id: PlayerGroup.Gamemaster,
			conditions: Buffer.from([]),
			...createData,
		},
	});
}
