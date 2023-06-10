<script lang="ts">
	import { isSort, type Order, type Sort } from '$lib/sorting';

	export let sort: Sort | null = null;
	export let order: Order = 'asc';
	export let col: string;
	let klass = '';
	export { klass as class };

	let sortLink: string | null = null;
	let sortClass = '';

	$: if (!isSort(col)) {
		sortLink = null;
	} else if (sort === col) {
		sortLink = `?sort=${col}&order=${order === 'asc' ? 'desc' : 'asc'}`;
	} else {
		sortLink = `?sort=${col}`;
	}

	$: if (sort === col) {
		sortClass = `table-sort-${order === 'asc' ? 'asc' : 'dsc'}`;
	} else {
		sortClass = '';
	}
</script>

<th class="{klass} {sortClass}">
	{#if sortLink}
		<a href={sortLink}><slot /></a>
	{:else}
		<slot />
	{/if}
</th>
