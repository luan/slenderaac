<script lang="ts">
	import { portal } from 'svelte-portal';

	import { browserTitle } from '$lib/utils';

	export let title: string;
</script>

<svelte:head>
	<title>{browserTitle(title)}</title>
</svelte:head>

<div
	class="rounded-t-md px-4 py-1 bg-success-900 text-warning-400"
	use:portal={'#pageTitle'}>
	<h4 class="h4" id="pageTitle">{title}</h4>
</div>
