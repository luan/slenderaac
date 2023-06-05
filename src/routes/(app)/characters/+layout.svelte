<script lang="ts">
	import { faCircle, faDiamond } from '@fortawesome/free-solid-svg-icons';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { tooltip } from 'svooltip';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import { getPronoun, vocationString } from '$lib/players';
	import { debounce } from '$lib/utils';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let searchInput = $page.url.searchParams.get('search') || '';

	$: {
		if (browser) {
			$page.url.searchParams.get('search') !== searchInput && onSearchInput();
		}
	}

	const onSearchInput = debounce(() => {
		if (searchInput === '') {
			$page.url.searchParams.delete('search');
			void goto($page.url.pathname, {
				replaceState: true,
				keepFocus: true,
				noScroll: true,
			});
			return;
		}
		$page.url.searchParams.set('search', searchInput);
		void goto(`?${$page.url.searchParams.toString()}`, {
			replaceState: true,
			keepFocus: true,
			noScroll: true,
		});
	}, 200);

	$: results = data.results ?? [];
</script>

<div class="flex flex-col gap-2">
	<slot />

	<label class="label flex flex-row gap-2 items-center">
		<span>Character name:</span>

		<input
			class="input flex-1"
			type="search"
			name="demo"
			bind:value={searchInput}
			placeholder="Search..." />
	</label>

	<div class="table-container">
		<table class="table table-hover table-fixed">
			<thead class="!bg-surface-600 dark:!bg-surface-800">
				<tr class="[&>th]:!p-2">
					<th class="w-20">Outfit</th>
					<th>Name</th>
					<th class="w-24">Level</th>
					<th class="w-32">Vocation</th>
				</tr>
			</thead>
			<tbody
				class="!bg-surface-400 dark:!bg-surface-600 transition-all duration-300 ease-in-out">
				{#each results as character}
					<a
						href="/characters/{character.name}"
						class="table-row [&>td]:!align-middle hover:!bg-surface-500 cursor-pointer"
						on:click={() => (searchInput = '')}
						transition:fly|local={{
							duration: 300,
							y: -20,
							easing: cubicInOut,
						}}>
						<td>
							<AnimatedOutfit outfit={character} alt={character.name} />
						</td>
						<td class="flex flex-col">
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
								{#if character.is_main}
									<span
										class="text-xs text-success-800"
										use:tooltip={{ content: 'Main Character' }}>
										<Fa icon={faDiamond} />
									</span>
								{/if}
							</span>
						</td>
						<td>{character.level}</td>
						<td>{vocationString(character.vocation)}</td>
					</a>
				{/each}
			</tbody>
		</table>
	</div>
</div>
