<script lang="ts">
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	import CharactersTable from '$lib/components/ui/CharactersTable.svelte';
	import SearchQuerier from '$lib/components/ui/SearchQuerier.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let reset: () => void;

	$: results = data.results ?? [];
</script>

<div class="flex flex-col items-center gap-2">
	<slot />

	<SearchQuerier label={$_('character-name')} bind:reset />

	{#if results.length > 0}
		<div transition:slide>
			<CharactersTable characters={results} on:selected={reset} />
		</div>
	{/if}
</div>
