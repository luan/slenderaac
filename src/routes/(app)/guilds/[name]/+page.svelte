<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import OnlineIndicator from '$lib/components/ui/OnlineIndicator.svelte';
	import { vocationString } from '$lib/players';

	import type { PageData } from './$types';

	export let data: PageData;

	$: guild = data.guild;
</script>

{#if guild}
	<div class="flex flex-col gap-2 items-center">
		<h3 class="h3">{guild.name}</h3>
		{#if guild.description}
			<div class="flex data-table p-2">
				<pre
					class="font-sans font-light whitespace-pre-wrap">{guild.description}</pre>
			</div>
		{/if}

		<div class="table-container">
			<table class="table table-noeven table-hover table-auto">
				<thead class="border-x-4">
					<tr class="[&>th]:!p-2">
						<th class="w-20">Outfit</th>
						<th>{$_('name')}</th>
						<th class="w-32">{$_('vocation')}</th>
						<th class="w-24">{$_('level')}</th>
					</tr>
				</thead>
				{#each guild.ranks as rank}
					<tr
						class="text-white border-4"
						class:bg-primary-500={rank.level === 3}
						class:bg-secondary-500={rank.level === 2}
						class:bg-tertiary-500={rank.level < 2}
						class:border-primary-500={rank.level === 3}
						class:border-secondary-500={rank.level === 2}
						class:border-tertiary-500={rank.level < 2}>
						<th colspan="5" class="text-center">{rank.name}</th>
					</tr>
					<tbody
						class="transition-all duration-300 ease-in-out border-x-4"
						class:bg-primary-200-700-token={rank.level === 3}
						class:bg-secondary-200-700-token={rank.level === 2}
						class:bg-tertiary-200-700-token={rank.level < 2}
						class:border-primary-500={rank.level === 3}
						class:border-secondary-500={rank.level === 2}
						class:border-tertiary-500={rank.level < 2}>
						{#each rank.members as character}
							<a
								href="/characters/{character.name}"
								class="table-row [&>td]:!align-middle cursor-pointer border-b"
								class:border-primary-300-600-token={rank.level === 3}
								class:border-secondary-300-600-token={rank.level === 2}
								class:border-tertiary-300-600-token={rank.level < 2}
								transition:fly|local={{
									duration: 300,
									y: -20,
									easing: cubicInOut,
								}}>
								<td>
									<AnimatedOutfit outfit={character} alt={character.name} />
								</td>
								<td class=" w-fit">
									<div class="flex flex-col w-fit">
										<span
											class="font-semibold flex flex-row gap-1 items-center">
											<OnlineIndicator online={character.online} />
											{character.name}
											{#if character.guild?.nick}
												<em class="font-light">({character.guild.nick})</em>
											{/if}
										</span>
									</div>
								</td>
								<td>{vocationString(character.vocation)}</td>
								<td>{character.level}</td>
							</a>
						{/each}
					</tbody>
				{/each}
			</table>
		</div>
	</div>
{:else}
	<h5 class="h4">{data.error}</h5>
{/if}
