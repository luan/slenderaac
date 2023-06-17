<script lang="ts">
	import {
		faEdit,
		faHandHoldingHand,
		faPersonCirclePlus,
		faRefresh,
	} from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n';

	import { page } from '$app/stores';

	import Button from '$lib/components/ui/Button.svelte';

	export let name: string;
	export let isOwner: boolean;
	export let isLeader: boolean;
	export let isVice: boolean;

	$: resigning = $page.data.resigning;
</script>

<div class="flex flex-row items-end gap-1">
	{#if isVice}
		<Button
			href="/guilds/{name}/invite"
			size="sm"
			iconBefore={faPersonCirclePlus}>
			{$_('guilds.invite')}
		</Button>
	{/if}
	{#if isLeader}
		<Button
			href="/guilds/{name}/edit"
			size="sm"
			color="secondary"
			iconBefore={faEdit}>
			{$_('guilds.edit')}
		</Button>
	{/if}
	{#if isOwner}
		{#if resigning}
			<Button
				href="/guilds/{name}"
				size="sm"
				color="warning"
				iconBefore={faRefresh}>
				{$_('guilds.cancel-resign')}
			</Button>
		{:else}
			<Button
				href="/guilds/{name}/resign"
				size="sm"
				color="warning"
				iconBefore={faHandHoldingHand}>
				{$_('guilds.resign')}
			</Button>
		{/if}
	{/if}
</div>
