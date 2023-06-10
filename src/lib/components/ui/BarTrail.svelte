<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';

	export let serverOnline: boolean;
	export let onlinePlayerCount: number;
</script>

<div class="flex flex-row gap-2">
	<a
		href="/online"
		class="px-2 rounded-full py-1 flex flex-row items-center gap-1 bg-surface-200/75">
		{#if serverOnline}
			<div class="w-2 h-2 rounded-full bg-success-500" />
			<div class="text-success-500">{$_('online')}</div>
			{$_('layout.onlinePlayerCount', { values: { onlinePlayerCount } })}
		{:else}
			<div class="w-2 h-2 rounded-full bg-error-500" />
			<div class="text-error-500">{$_('offline')}</div>
		{/if}
	</a>
	<LightSwitch />
</div>
