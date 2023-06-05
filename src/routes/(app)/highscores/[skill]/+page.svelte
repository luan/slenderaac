<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';

	import { goto } from '$app/navigation';

	import CharactersTable from '$lib/components/ui/CharactersTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let page = {
		offset: data.offset,
		limit: data.limit,
		size: data.count,
		amounts: [50, 100, 200],
	};

	function onPageChange() {
		void goto(
			`/highscores/${data.skill}?page=${page.offset + 1}&limit=${page.limit}`,
		);
	}
</script>

<div class="flex flex-col gap-2">
	<CharactersTable characters={data.characters} ranked />
	<Paginator
		bind:settings={page}
		showFirstLastButtons
		amountText="per page"
		on:page={onPageChange}
		on:amount={onPageChange} />
</div>
