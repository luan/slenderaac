<script lang="ts">
	import { faCircle, faDiamond } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { tooltip } from 'svooltip';

	import PageTitle from '$lib/components/PageTitle.svelte';
	import {
		PlayerPronoun,
		PlayerSex,
		pronounString,
		vocationString,
	} from '$lib/players';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	function getPronoun(character: LayoutData['characters'][0]) {
		if (character.pronoun === PlayerPronoun.Name) {
			return character.name;
		}
		const pronoun =
			character.pronoun > 0
				? character.pronoun
				: character.sex === PlayerSex.Female
				? PlayerPronoun.She
				: PlayerPronoun.He;
		return pronounString(pronoun);
	}
</script>

<PageTitle title="AccountManagement" />

<div
	class="card p-2 text-warning-500 text-xs !opacity-75"
	data-popup="main-character-tooltip">
	<p>Main Character</p>
	<div class="arrow variant-filled-tertiary" />
</div>

<div
	class="card p-2 text-warning-500 text-xs !opacity-75"
	data-popup="status-tooltip-online">
	<p>Online</p>
	<div class="arrow variant-filled-tertiary" />
</div>

<div
	class="card p-2 text-warning-500 text-xs !opacity-75"
	data-popup="status-tooltip-offline">
	<p>Offline</p>
	<div class="arrow variant-filled-tertiary" />
</div>

<div class="flex flex-col gap-2">
	<h3 class="h3">Characters</h3>

	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover table-fixed">
			<thead class="!bg-surface-600 dark:!bg-surface-800">
				<tr class="[&>th]:!p-2">
					<th class="w-10" />
					<th class="w-16">Outfit</th>
					<th>Name</th>
					<th class="w-16">status</th>
					<th class="w-16" />
				</tr>
			</thead>
			<tbody class="!bg-surface-400 dark:!bg-surface-600">
				{#each data.characters as character, i}
					<tr class="[&>td]:!align-middle">
						<td>{i + 1}</td>
						<td>-</td>
						<td class="flex flex-col">
							<span class="font-semibold flex flex-row gap-1 items-center">
								{#if character.online}
									<span
										class="text-success-600"
										use:tooltip={{ content: 'Online' }}>
										<Fa icon={faCircle} size="xs" />
									</span>
								{:else}
									<span
										class="text-error-600"
										use:tooltip={{ content: 'Offline' }}>
										<Fa icon={faCircle} size="xs" />
									</span>
								{/if}
								{character.name}
								<em class="font-light">({getPronoun(character)})</em>
								{#if character.is_main}
									<span
										class="text-xs text-success-800"
										use:tooltip={{ content: 'Main Character' }}>
										<Fa icon={faDiamond} />
									</span>
								{/if}
							</span>
							<span class="text-xs">
								{vocationString(character.vocation)} &dash; Level {character.level}
							</span>
						</td>
						<td>-</td>
						<td>-</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex flex-row justify-end">
		<a href="/account/createcharacter" class="btn btn-sm variant-filled-primary"
			>New Character</a>
	</div>

	<slot />
</div>
