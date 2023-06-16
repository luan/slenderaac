<script lang="ts">
	import {
		faEdit,
		faHandHoldingHand,
		faPersonCirclePlus,
	} from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n';

	import Button from '$lib/components/ui/Button.svelte';

	export let name: string;
	export let isOwner: boolean;
	export let isLeader: boolean;
	export let isVice: boolean;
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
			{$_('guilds.edit-ranks')}
		</Button>
	{/if}
	{#if isOwner}
		<Button
			href="/guilds/{name}/resign"
			size="sm"
			color="warning"
			iconBefore={faHandHoldingHand}>
			{$_('guilds.resign')}
		</Button>
	{/if}
</div>
