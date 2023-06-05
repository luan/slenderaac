<script lang="ts">
	import { tooltip } from 'svooltip';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';

	export let boosted: {
		boostname: string | null;
		looktype: number;
		lookaddons: number;
		lookhead: number;
		lookbody: number;
		looklegs: number;
		lookfeet: number;
		lookmount: number | null;
	} | null = null;
</script>

{#if boosted}
	<div
		use:tooltip={{
			content: boosted.boostname,
			offset: 20,
		}}>
		<AnimatedOutfit outfit={boosted} alt={boosted.boostname ?? ''}>
			<div class="w-full h-full bg-surface-500/30 rounded-full blur-sm" />
		</AnimatedOutfit>
	</div>
{/if}
