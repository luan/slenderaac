<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { enhance } from '$app/forms';

	import Select from '$lib/components/ui/forms/Select.svelte';
	import TextField from '$lib/components/ui/forms/TextField.svelte';
	import { toTitleCase } from '$lib/utils';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let name = '';
	$: name = toTitleCase(name);

	$: characters = (data.accountCharacters ?? []).filter(
		(character) => !character.guild,
	);
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-xs text-error-500">{form.errors.global}</p>
	{/if}

	<div class="flex flex-row gap-2">
		<Select
			name="leader"
			labelClass="min-w-[12rem]"
			label={$_('character')}
			errors={form?.errors?.leader}>
			{#each characters as character}
				<option value={character.id}>
					{character.name}
				</option>
			{/each}
		</Select>

		<TextField
			required
			label={$_('guilds.guild-name')}
			name="name"
			bind:value={name}
			errors={form?.errors?.name} />
	</div>

	<div class="flex flex-row justify-end">
		<button class="btn variant-filled-primary">
			{$_('guilds.create-butotn')}
		</button>
	</div>
</form>
