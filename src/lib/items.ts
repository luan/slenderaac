export type Item = {
	player_id: number;
	sid: number;
	pid: number;
	type: number;
	count: number;
	id: number;
};

export function itemURL(type: number | string) {
	return `/api/items?id=${type.toString()}`;
}

export async function fetchBackground() {
	const background = await fetch(itemURL('empty'));
	return background.json();
}

export async function fetchItem(id: number | string) {
	const item = await fetch(itemURL(id));
	return item.json();
}
