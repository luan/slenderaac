<script lang="ts">
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	type Highscore = {
		name: string;
		level: number;
		vocation: string;
	};
	export let highscores: Highscore[] = [];
</script>

<div class="card bg-initial card-hover overflow-hidden">
	<div class="py-2 px-4 flex flex-row gap-2 justify-between">
		<div class="placeholder w-1/2 h-12" />
		<div class="placeholder w-1/2 h-12" />
	</div>
</div>

<div class="card bg-initial card-hover overflow-hidden">
	<header class="py-2 px-4">
		<h6 class="h6">Highscores</h6>
	</header>
	<hr class="opacity-50" />
	<article class="py-2 px-4">
		<ol class="list">
			{#each highscores as player, i}
				<li class="flex flex-row justify-start !items-start">
					<span>{i + 1}.</span>
					<span class="flex-auto flex flex-col">
						<span>{player.name}</span>
						<span class="text-xs flex flex-row items-center gap-0.5">
							Level: {player.level}
							<Fa icon={faArrowRight} />
							{player.vocation}
						</span>
					</span>
				</li>
			{/each}
		</ol>
	</article>
	<hr class="opacity-50" />
	<footer class="py-2 px-2">
		<a href="#" class="btn btn-sm variant-filled-primary w-full">View more</a>
	</footer>
</div>
