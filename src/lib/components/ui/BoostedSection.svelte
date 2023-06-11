<script lang="ts">
	import { faRocket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';

	import type { BoostedProps } from '$lib/boosted';
	import Boosted from '$lib/components/ui/Boosted.svelte';

	export let boostedCreature: BoostedProps | null;
	export let boostedBoss: BoostedProps | null;
</script>

<div class="flex flex-col-reverse items-center gap-2 mt-4 md:mt-0 md:-mb-4">
	<span
		class="hidden md:flex chip rounded-full variant-filled-tertiary opacity-75 mr-2 gap-2">
		<Fa icon={faRocket} />
		{$_('boosted')}
	</span>
	<div class="flex flex-row gap-8">
		<Boosted boosted={boostedCreature} kind="creature" />
		<Boosted boosted={boostedBoss} kind="boss" />
	</div>
</div>
