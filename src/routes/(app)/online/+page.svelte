<script lang="ts">
	import CharactersTable from '$lib/components/ui/CharactersTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ characters, sort, order } = data);
</script>

<div class="flex flex-col gap-2">
	<CharactersTable {characters} {sort} {order} />
</div>
