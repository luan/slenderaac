<script lang="ts">
	import CharactersTable from '$lib/components/ui/CharactersTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-2">
	<CharactersTable characters={data.characters} ranked />
</div>
