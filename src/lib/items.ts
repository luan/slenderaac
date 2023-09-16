export const itemSlots = [
	'head',
	'necklace',
	'backpack',
	'armor',
	'right',
	'left',
	'legs',
	'feet',
	'ring',
	'ammo',
] as const;

export type Slot = (typeof itemSlots)[number];

export const emptySlot: Record<Slot, string> = {
	head: 'no_helmet',
	necklace: 'no_necklace',
	backpack: 'no_bagpack',
	armor: 'no_armor',
	right: 'no_handright',
	left: 'no_handleft',
	legs: 'no_legs',
	feet: 'no_boots',
	ring: 'no_ring',
	ammo: 'no_ammo',
};

export type Item = {
	player_id: number;
	sid: number;
	pid: number;
	type: number;
	count: number;
};

export function itemURL(type: number | string) {
	return `/api/items?id=${type.toString()}`;
}

export async function fetchBackground(): Promise<{ src: string }> {
	const background = await fetch(itemURL('empty'));
	return background.json() as Promise<{ src: string }>;
}

export async function fetchItem(id: number | string) {
	const item = await fetch(itemURL(id));
	return item.json();
}
