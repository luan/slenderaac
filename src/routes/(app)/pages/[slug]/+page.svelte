<script lang="ts">
	import Markdoc from '$lib/components/markdoc/Markdoc.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#key data.staticPage?.slug}
	<Markdoc content={data.staticPage?.content} />
{/key}
