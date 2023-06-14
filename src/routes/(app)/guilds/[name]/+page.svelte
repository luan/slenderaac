<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: guild = data.guild;
</script>

{#if guild}
	{guild.name}
{:else}
	<h5 class="h4">{data.error}</h5>
{/if}
