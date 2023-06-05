<script lang="ts">
	import { tooltip } from 'svooltip';

	import { outfitURL } from '$lib/players';

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
		class="relative w-16 h-16"
		use:tooltip={{
			content: boosted.boostname,
			offset: 20,
		}}>
		<div class="w-full h-full bg-surface-500/30 rounded-full blur-sm" />
		<div class="absolute -left-7 bottom-0">
			<img
				class="w-20 h-20"
				src={outfitURL({
					looktype: boosted.looktype,
					lookaddons: boosted.lookaddons,
					lookhead: boosted.lookhead,
					lookbody: boosted.lookbody,
					looklegs: boosted.looklegs,
					lookfeet: boosted.lookfeet,
					mount: boosted.lookmount ?? 0,
					resize: true,
				})}
				alt={boosted.boostname} />
		</div>
	</div>
{/if}
