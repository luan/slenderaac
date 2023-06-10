<script lang="ts">
	import type { BoostedProps } from '$lib/boosted';
	import Boosted from '$lib/components/ui/Boosted.svelte';

	export let boostedCreature: BoostedProps | null;
	export let boostedBoss: BoostedProps | null;
</script>

<div class="px-6 flex flex-row justify-between">
	<Boosted boosted={boostedCreature} kind="creature" />
	<Boosted boosted={boostedBoss} kind="boss" />
</div>
