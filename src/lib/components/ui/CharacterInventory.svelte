<script lang="ts">
	import { _ } from 'svelte-i18n';

	import Item from '$lib/components/ui/Item.svelte';
	import {
		emptySlot,
		type Item as PlayerItem,
		itemSlots,
		type Slot,
	} from '$lib/items';

	export let items: PlayerItem[];

	function pidToSlot(pid: number) {
		return itemSlots[pid - 1];
	}

	function isEquiped(item: PlayerItem) {
		return itemSlots.includes(pidToSlot(item.pid));
	}

	$: inventory = items.filter(isEquiped).reduce(
		(acc, item) => {
			return { ...acc, [pidToSlot(item.pid)]: item.type };
		},
		itemSlots.reduce(
			(acc, slot) => ({ ...acc, [slot]: emptySlot[slot] }),
			{} as Record<Slot, number | string>,
		),
	);
</script>

<div class="box table-container ease-in-out">
	<div class="title bg-surface-500">
		<h3 class="h5 font-semibold pl-2 pt-1 pb-2">{$_('inventory')}</h3>
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex flex-row justify-center gap-1 items-center">
			<div class="mt-5">
				<Item item={inventory.necklace} />
			</div>
			<Item item={inventory.head} />
			<div class="mt-5">
				<Item item={inventory.backpack} />
			</div>
		</div>
		<div class="flex flex-row justify-center gap-1 items-center">
			<Item item={inventory.left} />
			<div class="-mt-5">
				<Item item={inventory.armor} />
			</div>
			<Item item={inventory.right} />
		</div>
		<div class="flex flex-row justify-center gap-1 items-center">
			<Item item={inventory.ring} />
			<div class="-mt-5">
				<Item item={inventory.legs} />
			</div>
			<Item item={inventory.ammo} />
		</div>
		<div class="flex flex-row justify-center gap-1 items-center">
			<div class="py-4" />
			<div class="-mt-5">
				<Item item={inventory.feet} />
			</div>
			<div class="py-4" />
		</div>
	</div>
</div>

<style lang="postcss">
	.box {
		background-color: theme(colors.surface.400);
	}
	:is(.dark .box) {
		background-color: theme(colors.surface.700);
	}

	:is(.dark .box .title) {
		background-color: theme(colors.surface.800);
	}
</style>
