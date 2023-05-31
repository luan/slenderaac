<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import type { LayoutData } from './$types';
	import {
		Autocomplete,
		type AutocompleteOption,
	} from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	let searchInput = $page.url.searchParams.get('search') || '';

	$: {
		if (browser) {
			$page.url.searchParams.set('search', searchInput);
			goto(`?${$page.url.searchParams.toString()}`, {
				replaceState: true,
				keepFocus: true,
				noScroll: true,
			});
		}
	}

	let options: AutocompleteOption[] | null = null;
	$: options = data.results
		? data.results.map((character) => ({
				label: character.name,
				value: character.name,
		  }))
		: null;

	function onSelect(event: { detail: { label: string } }): void {
		goto(`/characters/${event.detail.label}`);
	}
</script>

<slot />

<input
	class="input"
	type="search"
	name="demo"
	bind:value={searchInput}
	placeholder="Search..." />

{#if options}
	<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto">
		<Autocomplete bind:input={searchInput} {options} on:selection={onSelect} />
	</div>
{/if}
