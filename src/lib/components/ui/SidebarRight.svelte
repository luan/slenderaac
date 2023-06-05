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

<div
	class="card bg-tertiary-500 dark:bg-tertiary-800 overflow-hidden text-white">
	<header class="py-2 px-4">
		<h6 class="h6">Highscores</h6>
	</header>
	<hr class="opacity-5" />
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
	<hr class="opacity-5" />
	<footer class="py-2 px-2">
		<a href="#" class="btn btn-sm variant-filled-primary w-full">View more</a>
	</footer>
</div>
