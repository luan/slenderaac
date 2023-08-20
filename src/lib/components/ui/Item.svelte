<script lang="ts">
	import { fetchBackground, fetchItem } from '$lib/items';
	import { onMount } from 'svelte';
	import { tooltip } from 'svooltip';
	import { toProperCase } from '$lib/utils';

	export let item: number | string;

	let image = { src: '', alt: '' };
	let emptyBg: any = '';

	onMount(async function () {
		const itemData = await fetchItem(item);

		const bg = await fetchBackground();

		image = itemData;
		emptyBg = `url(${bg.src})`;
	});
</script>

{#if image.src !== ''}
	<img
		style:--bg={emptyBg}
		src={image.src}
		alt={image.alt}
		use:tooltip={{
			content: toProperCase(image.alt),
			placement: 'top',
			offset: 0,
		}} />
{/if}

<style>
	img {
		background-image: var(--bg);
		-webkit-box-shadow: inset 10px 10px 16px -6px rgba(0, 0, 0, 0.41);
		-moz-box-shadow: inset 10px 10px 16px -6px rgba(0, 0, 0, 0.41);
		box-shadow: inset 10px 10px 16px -6px rgba(0, 0, 0, 0.41);
	}
</style>
