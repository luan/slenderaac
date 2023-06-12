<script lang="ts">
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import CharactersTable from '$lib/components/ui/CharactersTable.svelte';
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
		<span>{$_('character-name')}:</span>

		<input
			class="input flex-1"
			type="search"
			name="search"
			bind:value={searchInput}
			placeholder="{$_('search')}..." />
	</label>

	{#if results.length > 0}
		<div transition:slide>
			<CharactersTable
				characters={results}
				on:selected={() => (searchInput = '')} />
		</div>
	{/if}
</div>
