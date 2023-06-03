<script lang="ts">
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
							<span class="font-semibold">
								{character.name}
								<em class="font-light">({getPronoun(character)})</em>
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

	<hr class="divider" />

	<slot />
</div>
