import { prisma } from '$lib/server/prisma';

export async function getAvailableTowns() {
	let towns = await prisma.towns.findMany({
		where: { starter: true },
		select: { id: true, name: true },
	});

	towns =
		towns.length > 0
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

	if (towns[0].name === 'Dawnport Tutorial') {
		towns = towns.slice(1);
		towns[0].id = 1;
	}

	return towns;
}
