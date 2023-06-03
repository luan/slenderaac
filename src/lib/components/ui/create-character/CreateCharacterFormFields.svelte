<script lang="ts">
	import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
	import {
		ListBox,
		ListBoxItem,
		popup,
		type PopupSettings,
		RadioGroup,
		RadioItem,
	} from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	import TextField from '$lib/components/ui/TextField.svelte';
	import { pronounsEnabled } from '$lib/config';
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

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item',
	};

	let sex = PlayerSex.Female;
	let pronoun = PlayerPronoun.Unset;
	let characterName = '';

	$: characterName = toTitleCase(characterName);
</script>

<div class="flex flex-row gap-4 items-center">
	<TextField
		label="Name"
		name="characterName"
		bind:value={characterName}
		errors={form?.errors?.characterName} />

	<div class="label flex flex-col gap-0">
		<span>Sex</span>
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
		<div class="label flex flex-col gap-0">
			<span>Pronoun</span>
			<input type="hidden" name="characterPronouns" bind:value={pronoun} />
			<button
				type="button"
				class="flex items-center input h-11 w-48 px-4 justify-between"
				use:popup={popupCombobox}>
				<span>{pronounString(pronoun)}</span>
				<span>↓</span>
			</button>
			<div class="card card-surface w-48 shadow-xl" data-popup="popupCombobox">
				<ListBox rounded="rounded-none">
					{#each allPronouns as pronounValue}
						<ListBoxItem
							bind:group={pronoun}
							name="medium"
							value={pronounValue}>
							{pronounString(pronounValue)}
						</ListBoxItem>
					{/each}
				</ListBox>
				<div class="arrow bg-surface-300" />
			</div>
		</div>
	{/if}
</div>
