<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import invariant from 'tiny-invariant';

	import type { Order, Sort } from '$lib/sorting';
	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import TableHeader from '$lib/components/ui/TableHeader.svelte';
	import { pronounsEnabled } from '$lib/config';
	import {
		getPronoun,
		type Player,
		type PlayerWithRank,
		vocationString,
		PlayerPronoun,
	} from '$lib/players';
	import { toProperCase } from '$lib/utils';

	import GuildMembership from './GuildMembership.svelte';
	import MainCharacterIndicator from './MainCharacterIndicator.svelte';
	import OnlineIndicator from './OnlineIndicator.svelte';

	export let ranked = false;
	export let characters: (PlayerWithRank | Player)[];
	export let sort: Sort | null = null;
	export let order: Order = 'asc';
	export let skill: string | null = null;

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
					<th class="w-12">Rank</th>
				{/if}
				<th class="w-16">{$_('outfit')}</th>
				<TableHeader {sort} {order} col="name">{$_('name')}</TableHeader>
				<TableHeader {sort} {order} col="vocation" class="w-36"
					>{$_('vocation')}</TableHeader>
				<TableHeader {sort} {order} col="level" class="w-16"
					>{$_('level')}</TableHeader>
				{#if skill}
					<TableHeader {sort} {order} col={skill} class="w-24"
						>{toProperCase(skill)}</TableHeader>
				{/if}
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
					<td class=" w-fit relative">
						<div class="flex flex-col w-fit justify-center">
							<span class="font-semibold flex flex-row gap-1 items-center">
								<OnlineIndicator online={character.online} />
								{character.name}
								{#if character.isMain}
									<MainCharacterIndicator />
								{/if}
							</span>
							{#if pronounsEnabled && character.pronoun != PlayerPronoun.Name}
								<span
									class="font-light text-xs opacity-25 absolute right-0 rounded-lg hover:bg-surface-600/75 p-1 hover:opacity-100 transition-all duration-300 ease-in-out"
									>({getPronoun(character)})</span>
							{/if}
							{#if character.guild}
								<span class="text-xs text-gray-500 dark:text-gray-300">
									<GuildMembership guild={character.guild} />
								</span>
							{/if}
						</div>
					</td>
					<td>{vocationString(character.vocation)}</td>
					<td>{character.level}</td>
					{#if skill}
						<td>{'skill' in character && character.skill}</td>
					{/if}
				</a>
			{/each}
		</tbody>
	</table>
</div>
