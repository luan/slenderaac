<script lang="ts">
	import { _ } from 'svelte-i18n';

	import type { PlayerItem } from '$lib/players';
	import Item from '$lib/components/ui/Item.svelte';

	export let items: PlayerItem[];

	enum Slot {
		Head = 1,
		Necklace,
		Backpack,
		Armor,
		Right,
		Left,
		Legs,
		Feet,
		Ring,
		Ammo,
	}

	enum EmptySlot {
		Head = 'no_helmet',
		Necklace = 'no_necklace',
		Backpack = 'no_bagpack',
		Armor = 'no_armor',
		Right = 'no_handright',
		Left = 'no_handleft',
		Legs = 'no_legs',
		Feet = 'no_boots',
		Ring = 'no_ring',
		Ammo = 'no_ammo',
	}

	function isEquiped(item: PlayerItem) {
		return item.pid <= Slot.Ammo;
	}

	let inventory: Map<Slot, number>;

	$: inventory = items.filter(isEquiped).reduce((acc, item) => {
		acc.set(item.pid, item.type);
		return acc;
	}, new Map<Slot, number>());
</script>

<div class="box table-container">
	<div class="title">
		<h3 class="h4 pl-2 pt-1 pb-2">{$_('inventory')}</h3>
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex flex-row justify-center gap-1 items-center">
			<div class="mt-5">
				<Item item={inventory.get(Slot.Necklace) || EmptySlot.Necklace} />
			</div>
			<Item item={inventory.get(Slot.Head) || EmptySlot.Head} />
			<div class="mt-5">
				<Item item={inventory.get(Slot.Backpack) || EmptySlot.Backpack} />
			</div>
		</div>
		<div class="flex flex-row justify-center gap-1 items-center">
			<Item item={inventory.get(Slot.Left) || EmptySlot.Head} />
			<div class="-mt-5">
				<Item item={inventory.get(Slot.Armor) || EmptySlot.Armor} />
			</div>
			<Item item={inventory.get(Slot.Right) || EmptySlot.Right} />
		</div>
		<div class="flex flex-row justify-center gap-1 items-center">
			<Item item={inventory.get(Slot.Ring) || EmptySlot.Ring} />
			<div class="-mt-5">
				<Item item={inventory.get(Slot.Legs) || EmptySlot.Legs} />
			</div>
			<Item item={inventory.get(Slot.Ammo) || EmptySlot.Ammo} />
		</div>
		<div class="flex flex-row justify-center gap-1 items-center">
			<div class="py-4" />
			<div class="-mt-5">
				<Item item={inventory.get(Slot.Feet) || EmptySlot.Feet} />
			</div>
			<div class="py-4" />
		</div>
	</div>
</div>

<style>
	.box {
		background-color: rgb(var(--color-surface-700));
		border-radius: var(--theme-rounded-container);
	}
	.box .title {
		background-color: rgb(var(--color-surface-800));
	}
</style>
