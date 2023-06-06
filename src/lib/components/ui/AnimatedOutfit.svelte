<script lang="ts">
	import { outfitURL } from '$lib/players';

	export let outfit: {
		looktype: number;
		lookaddons?: number;
		lookhead?: number;
		lookbody?: number;
		looklegs?: number;
		lookfeet?: number;
		mount?: number | null;
		lookmount?: number | null;
	};

	export let alt: string;
	let klass = '';
	export { klass as class };
</script>

<div class="relative w-12 h-12 {klass} overflow-visible">
	<slot />
	<div class="absolute -left-10 bottom-1">
		<img
			class="w-20 h-20"
			src={outfitURL({
				...outfit,
				mount: outfit.mount ?? outfit.lookmount ?? 0,
				resize: true,
			})}
			{alt} />
	</div>
</div>
