<script lang="ts">
	import { outfitURL } from '$lib/players';

	export let outfit: {
		looktype: number;
		lookaddons?: number;
		lookhead?: number;
		lookbody?: number;
		looklegs?: number;
		lookfeet?: number;
		lookmount?: number;
	};

	export let alt: string;
</script>

<div class="relative w-16 h-16">
	<slot />
	<div class="absolute -left-8 bottom-3">
		<img
			class="w-20 h-20"
			src={outfitURL({
				...outfit,
				resize: true,
			})}
			{alt} />
	</div>
</div>
