<script lang="ts">
	import { faLevelUp, faMedal } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import { type Player, vocationString } from '$lib/players';

	export let highscores: Player[] = [];
</script>

<div class="card card-tertiary card-hover overflow-hidden">
	<header
		class="flex flex-row justify-center items-center gap-2 py-1 px-2 variant-filled-secondary rounded-t-md">
		<Fa icon={faMedal} />
		<h6 class="h6">Highscores</h6>
	</header>
	<hr class="opacity-5" />
	<article class="py-2 px-4 flex flex-col gap-2">
		{#each highscores as character, i}
			<div class="flex flex-row items-center">
				<span
					class="badge-icon variant-filled"
					class:bg-yellow-600={i === 0}
					class:bg-slate-500={i === 1}
					class:bg-amber-700={i === 2}
					class:bg-stone-600={i >= 3}>
					{i + 1}
				</span>
				<AnimatedOutfit
					outfit={character}
					alt={character.name}
					class="scale-75" />
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
	</article>
	<hr class="opacity-5" />
	<footer class="py-2 px-2">
		<a href="/highscores" class="btn btn-sm variant-filled-primary w-full">
			View more
		</a>
	</footer>
</div>
