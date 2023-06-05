<script lang="ts">
	import { faCircle, faDiamond } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { tooltip } from 'svooltip';
	import invariant from 'tiny-invariant';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import {
		getPronoun,
		type Player,
		type PlayerWithRank,
		vocationString,
	} from '$lib/players';

	export let ranked = false;
	export let characters: (PlayerWithRank | Player)[];

	const dispatch = createEventDispatcher();

	function selected() {
		dispatch('selected');
	}

	if (ranked) {
		invariant(characters.every((c) => 'rank' in c));
	}
</script>

<div class="table-container">
	<table class="table table-hover table-fixed">
		<thead>
			<tr class="[&>th]:!p-2">
				{#if ranked}
					<th class="w-20">Rank</th>
				{/if}
				<th class="w-20">Outfit</th>
				<th>Name</th>
				<th class="w-32">Vocation</th>
				<th class="w-24">Level</th>
			</tr>
		</thead>
		<tbody class="transition-all duration-300 ease-in-out">
			{#each characters as character}
				<a
					href="/characters/{character.name}"
					class="table-row [&>td]:!align-middle hover:!bg-surface-200-700-token cursor-pointer"
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
					<td>
						<div class="flex flex-col">
							<span class="font-semibold flex flex-row gap-1 items-center">
								{#if character.online}
									<span
										class="text-success-600"
										use:tooltip={{ content: 'Online' }}>
										<Fa icon={faCircle} size="xs" />
									</span>
								{:else}
									<span
										class="text-error-600"
										use:tooltip={{ content: 'Offline' }}>
										<Fa icon={faCircle} size="xs" />
									</span>
								{/if}
								{character.name}
								<em class="font-light">({getPronoun(character)})</em>
								{#if character.isMain}
									<span
										class="text-xs text-success-800"
										use:tooltip={{ content: 'Main Character' }}>
										<Fa icon={faDiamond} />
									</span>
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
