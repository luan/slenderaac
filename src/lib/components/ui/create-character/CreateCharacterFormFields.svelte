<script lang="ts">
	import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';
	import invariant from 'tiny-invariant';

	import type { Town } from '$lib/towns';
	import Select from '$lib/components/ui/forms/Select.svelte';
	import TextField from '$lib/components/ui/forms/TextField.svelte';
	import { pronounsEnabled, tutorialEnabled } from '$lib/config';
	import {
		allPronouns,
		PlayerPronoun,
		PlayerSex,
		pronounString,
		sexString,
	} from '$lib/players';
	import { toTitleCase } from '$lib/utils';

	type CharacterActionData = {
		errors?: {
			characterName?: string[];
		};
	} | null;

	export let form: CharacterActionData;
	export let availableTowns: Town[];

	invariant(availableTowns.length > 0, 'No towns available');

	let sex = PlayerSex.Female;
	let characterName = '';
	let startingTown = availableTowns[0].id;

	$: characterName = toTitleCase(characterName);
</script>

<div class="flex flex-row gap-4 items-center">
	<TextField
		required
		label={$_('name')}
		name="characterName"
		bind:value={characterName}
		errors={form?.errors?.characterName} />

	<div class="label flex flex-col gap-0">
		<span>{$_('sex')}</span>
		<RadioGroup>
			<RadioItem bind:group={sex} name="characterSex" value={PlayerSex.Female}>
				<div class="flex flex-row gap-1 items-center">
					<Fa icon={faVenus} />{sexString(PlayerSex.Female)}
				</div>
			</RadioItem>
			<RadioItem bind:group={sex} name="characterSex" value={PlayerSex.Male}>
				<div class="flex flex-row gap-1 items-center">
					<Fa icon={faMars} />{sexString(PlayerSex.Male)}
				</div>
			</RadioItem>
		</RadioGroup>
	</div>

	{#if pronounsEnabled}
		<Select
			name="characterPronouns"
			value={PlayerPronoun.Unset.toString()}
			label={$_('character-pronoun')}>
			{#each allPronouns as pronounValue}
				<option value={pronounValue.toString()}>
					{pronounString(pronounValue)}
				</option>
			{/each}
		</Select>
	{/if}
</div>

<div class="flex flex-row gap-4 items-center justify-center">
	<div class="label flex flex-col gap-0">
		{#if tutorialEnabled}
			<span class="flex flex-row justify-between">
				{$_('starting-town')}
				<label class="flex items-center space-x-2">
					<p>{$_('play-tutorial')}</p>
					<input class="checkbox" type="checkbox" name="tutorial" />
				</label>
			</span>
		{/if}
		{#if availableTowns.length > 1}
			<RadioGroup>
				{#each availableTowns as town}
					<RadioItem
						bind:group={startingTown}
						name="startingTown"
						value={town.id}>
						<div class="flex flex-row gap-1 items-center">
							{town.name}
						</div>
					</RadioItem>
				{/each}
			</RadioGroup>
		{:else}
			<input type="hidden" name="startingTown" value={availableTowns[0].id} />
		{/if}
	</div>
</div>
