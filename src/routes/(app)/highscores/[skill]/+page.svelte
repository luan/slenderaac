<script lang="ts">
	import { faLevelUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import { vocationString } from '$lib/players';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.highscores as character, i}
	<div class="flex flex-row items-center">
		<span
			class="badge-icon variant-filled"
			class:bg-yellow-600={i === 0}
			class:bg-slate-500={i === 1}
			class:bg-amber-700={i === 2}
			class:bg-stone-600={i >= 3}>
			{i + 1}
		</span>
		<AnimatedOutfit outfit={character} alt={character.name} class="scale-75" />
		<span class="flex flex-col">
			<span class="text-sm font-semibold">{character.name}</span>
			<span class="text-xs font-light flex flex-row items-center gap-1"
				>{vocationString(character.vocation)}
				<Fa icon={faLevelUp} />
				<span class="font-normal">
					{character.level}
				</span>
			</span>
		</span>
	</div>
{/each}
