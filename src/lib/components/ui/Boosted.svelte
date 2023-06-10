<script lang="ts">
	import { tooltip } from 'svooltip';

	import type { BoostedProps } from '$lib/boosted';
	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import { toProperCase } from '$lib/utils';

	export let kind: 'boss' | 'creature' = 'boss';
	export let boosted: BoostedProps | null = null;
</script>

{#if boosted}
	<div
		class="transition-all ease-in-out duration-300 hover:scale-110"
		use:tooltip={{
			content: `Boosted ${toProperCase(kind)}: ${boosted.boostname ?? ''}`,
			offset: 20,
		}}>
		<AnimatedOutfit
			outfit={boosted}
			alt={boosted.boostname ?? ''}
			class="scale-110">
			<div
				class="w-full h-full bg-surface-800-100-token opacity-75 rounded-full blur-md" />
		</AnimatedOutfit>
	</div>
{/if}
