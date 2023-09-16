<script lang="ts">
	import { tooltip } from 'svooltip';

	import { browser } from '$app/environment';

	import { fetchBackground, fetchItem } from '$lib/items';
	import { toProperCase } from '$lib/utils';

	export let item: number | string;

	let image = { src: '', alt: '' };
	let emptyBg = '';

	$: if (browser && item) {
		void (async function () {
			const itemData = await fetchItem(item);
			const bg = await fetchBackground();

			image = itemData;
			emptyBg = `url(${bg.src})`;
		})();
	} else {
		image = { src: '', alt: '' };
		emptyBg = '';
	}
</script>

<div class="w-9 h-9 rounded-sm bg-surface-500 flex justify-center items-center">
	<div style:--bg={emptyBg} class="item-image">
		{#key image.src}
			{#if image.src !== ''}
				<img
					src={image.src}
					alt={image.alt}
					use:tooltip={{
						content: toProperCase(image.alt) ?? 'None',
						placement: 'top',
						offset: 0,
					}} />
			{/if}
		{/key}
	</div>
</div>

<style scoped>
	.item-image {
		background-image: var(--bg);
	}
</style>
