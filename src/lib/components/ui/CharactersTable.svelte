<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import invariant from 'tiny-invariant';

	import type { Order, Sort } from '$lib/sorting';
	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import TableHeader from '$lib/components/ui/TableHeader.svelte';
	import {
		getPronoun,
		type Player,
		type PlayerWithRank,
		vocationString,
	} from '$lib/players';

	import MainCharacterIndicator from './MainCharacterIndicator.svelte';
	import OnlineIndicator from './OnlineIndicator.svelte';

	export let ranked = false;
	export let characters: (PlayerWithRank | Player)[];
	export let sort: Sort | null = null;
	export let order: Order = 'asc';

	const dispatch = createEventDispatcher();

	function selected() {
		dispatch('selected');
	}

	if (ranked) {
		invariant(characters.every((c) => 'rank' in c));
	}
</script>

<div class="table-container">
	<table class="table table-hover table-auto">
		<thead>
			<tr class="[&>th]:!p-2">
				{#if ranked}
					<th class="w-20">Rank</th>
				{/if}
				<th class="w-20">Outfit</th>
				<TableHeader {sort} {order} col="name">{$_('name')}</TableHeader>
				<TableHeader {sort} {order} col="vocation" class="w-32"
					>{$_('vocation')}</TableHeader>
				<TableHeader {sort} {order} col="level" class="w-24"
					>{$_('level')}</TableHeader>
			</tr>
		</thead>
		<tbody class="transition-all duration-300 ease-in-out">
			{#each characters as character}
				<a
					href="/characters/{character.name}"
					class="table-row [&>td]:!align-middle cursor-pointer"
					on:click={selected}
					transition:fly|local={{
						duration: 300,
						y: -20,
						easing: cubicInOut,
					}}>
					{#if ranked}
						<td>{'rank' in character && character.rank}</td>
					{/if}
					<td>
						<AnimatedOutfit outfit={character} alt={character.name} />
					</td>
					<td class=" w-fit">
						<div class="flex flex-col w-fit">
							<span class="font-semibold flex flex-row gap-1 items-center">
								<OnlineIndicator online={character.online} />
								{character.name}
								<em class="font-light">({getPronoun(character)})</em>
								{#if character.isMain}
									<MainCharacterIndicator />
								{/if}
							</span>
						</div>
					</td>
					<td>{vocationString(character.vocation)}</td>
					<td>{character.level}</td>
				</a>
			{/each}
		</tbody>
	</table>
</div>
