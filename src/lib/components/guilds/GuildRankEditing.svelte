<script lang="ts">
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n';

	import Button from '$lib/components/ui/Button.svelte';
	import Select from '$lib/components/ui/forms/Select.svelte';
	import TextField from '$lib/components/ui/forms/TextField.svelte';

	export let rank: {
		id: number;
		name: string;
		level: number;
		order: number;
	};
	export let guildName: string;
</script>

<div class="flex flex-row gap-2 items-center">
	<span class="w-2/5">
		<TextField
			name={`ranks.${rank.id}.name`}
			value={rank.name}
			variant="horizontal" />
	</span>
	<span class="w-1/3">
		<Select
			name={`ranks.${rank.id}.level`}
			value={rank.level.toString()}
			variant="horizontal">
			<option value="1">{$_('guilds.rank-member')}</option>
			<option value="2">{$_('guilds.rank-officer')}</option>
			<option value="3">{$_('guilds.rank-leader')}</option>
		</Select>
	</span>
	<span class="w-16">
		<TextField
			name={`ranks.${rank.id}.order`}
			type="number"
			value={rank.order.toString()}
			variant="horizontal" />
	</span>
	<span class="w-16">
		<Button
			formaction="/guilds/{guildName}/edit?/deleteRank&rankId={rank.id}"
			size="icon"
			color="error"
			iconBefore={faTrash}
			tooltip={$_('guilds.delete-rank-tooltip')} />
	</span>
</div>
