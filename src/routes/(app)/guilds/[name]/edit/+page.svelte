<script lang="ts">
	import { faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n';

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

	import GuildMemberEditing from '$lib/components/guilds/GuildMemberEditing.svelte';
	import GuildRankEditing from '$lib/components/guilds/GuildRankEditing.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import StatelessModal from '$lib/components/ui/StatelessModal.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: guild = data.guild;
	$: guildName = guild?.name ?? '';
	$: errors = form?.errors ?? {};

	function close() {
		guild && void goto(`/guilds/${guild.name}`);
	}
</script>

{#if guild}
	<StatelessModal
		title={$_('guilds.edit-guild', { values: { name: guild.name } })}
		on:close={close}>
		{#if errors}
			{#each Object.keys(errors) as key}
				{#each errors[key] as error}
					<p class="text-xs text-error-500">{error}</p>
				{/each}
			{/each}
		{/if}
		<form
			action="/guilds/{guildName}/edit?/saveRanks"
			class="flex flex-col gap-1"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						await invalidateAll();
					}
					return applyAction(result);
				};
			}}>
			<h4 class="h4">
				{$_('guilds.ranks')}
				<Button size="sm" iconBefore={faSave}>{$_('save')}</Button>
			</h4>
			<div class="flex flex-row gap-2">
				<h5 class="h5 w-2/5">{$_('guilds.rank-name')}</h5>
				<h5 class="h5 w-1/3">{$_('guilds.rank-level')}</h5>
				<h5 class="h5 w-16">{$_('order')}</h5>
			</div>
			{#each guild.ranks as rank}
				<GuildRankEditing {rank} {guildName} />
			{/each}
			<div class="flex flex-row">
				<Button
					formaction="/guilds/{guildName}/edit?/addRank"
					color="success"
					size="sm"
					iconBefore={faPlusCircle}>{$_('add')}</Button>
			</div>
		</form>
		<form
			action="/guilds/{guildName}/edit?/saveMembers"
			class="flex flex-col gap-1"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						await invalidateAll();
					}
					return applyAction(result);
				};
			}}>
			<h4 class="h4">
				{$_('guilds.members')}
				<Button size="sm" iconBefore={faSave}>{$_('save')}</Button>
			</h4>
			<div class="flex flex-row gap-2">
				<h5 class="h5 w-2/5">{$_('guilds.rank-name')}</h5>
				<h5 class="h5 w-1/3">{$_('guilds.rank')}</h5>
				<h5 class="h5 w-16">{$_('guilds.nick')}</h5>
			</div>
			{#each guild.memberships as member}
				<GuildMemberEditing {member} ranks={guild.ranks} />
			{/each}
		</form>
	</StatelessModal>
{/if}
