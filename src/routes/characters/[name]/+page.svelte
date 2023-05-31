<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.character}
	<h1>{data.character.name}</h1>
	<h1>{data.character.level}</h1>
{:else}
	<h1>{data.error}</h1>
{/if}
