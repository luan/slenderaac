import type { PlayerItems } from '@prisma/client';

import type { Item } from '$lib/items';

export function dbToItem(playerItems: PlayerItems): Item {
	console.log(playerItems);
	return {
		player_id: playerItems.player_id,
		sid: playerItems.sid,
		pid: playerItems.pid,
		type: playerItems.itemtype,
		count: playerItems.count,
	};
}
