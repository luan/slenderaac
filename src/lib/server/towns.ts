import { prisma } from '$lib/server/prisma';

export async function getAvailableTowns() {
	const towns = await prisma.towns.findMany({
		where: { starter: true },
	});

	return towns.length > 0
		? towns
		: [
				{
					id: 1,
					name: 'Dawnport Tutorial',
				},
				{
					id: 2,
					name: 'Dawnport',
				},
				{
					id: 3,
					name: 'Rookgaard',
				},
		  ];
}
