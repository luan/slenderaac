<script lang="ts">
	import { _ } from 'svelte-i18n';

	import CharactersTable from '$lib/components/ui/CharactersTable.svelte';
	import { getPronoun, sexString, vocationString } from '$lib/players';
	import { formatDate } from '$lib/utils';

	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;
</script>

{#if character}
	<div class="data-table">
		<div class="data-row">
			<dt>{$_('name')}</dt>
			<dd>
				{character.name} <em class="text-xs">({getPronoun(character)})</em>
			</dd>
		</div>
		<div class="data-row">
			<dt>{$_('sex')}</dt>
			<dd>{sexString(character.sex)}</dd>
		</div>
		<div class="data-row">
			<dt>{$_('vocation')}</dt>
			<dd>{vocationString(character.vocation)}</dd>
		</div>
		<div class="data-row">
			<dt>{$_('level')}</dt>
			<dd>{character.level}</dd>
		</div>
		<div class="data-row">
			<dt>{$_('residence')}</dt>
			<dd>{character.townName}</dd>
		</div>
		<div class="data-row">
			<dt>{$_('last-login')}</dt>
			<dd>
				{formatDate(character.lastLogin)}
			</dd>
		</div>

		{#if character.settings?.comment}
			<div class="data-row">
				<dt>{$_('character-comment')}</dt>
				<dd>
					<pre class="font-sans font-light">{character.settings.comment}</pre>
				</dd>
			</div>
		{/if}
	</div>

	{#if data.accountCharacters && data.accountCharacters.length > 0}
		<CharactersTable characters={data.accountCharacters} />
	{/if}

	{#if data.deaths && data.deaths.length > 0}
		<h3 class="h4">{$_('deaths')}</h3>
		<div class="table-container">
			<table class="table table-hover table-auto">
				<thead>
					<tr class="[&>th]:!p-2">
						<th class="w-48">When</th>
						<th>By</th>
					</tr>
				</thead>
				<tbody class="transition-all duration-300 ease-in-out">
					{#each data.deaths as death}
						<tr class="[&>td]:!p-2">
							<td>{formatDate(death.time)}</td>
							<td>
								{#if death.mostdamage_by !== death.killed_by}
									{@html $_('death-log-double', {
										values: {
											killer: death.is_player
												? `<a href="/characters/${death.killed_by}" class="anchor">${death.killed_by}</a>`
												: death.killed_by,
											killerJust: death.unjustified
												? '' + $_('unjustified')
												: '',
											mostdamage: death.mostdamage_is_player
												? `<a href="/characters/${death.mostdamage_by}" class="anchor">${death.mostdamage_by}</a>`
												: death.mostdamage_by,
											mostdamageJust: death.mostdamage_unjustified
												? '' + $_('unjustified')
												: '',
											level: death.level,
										},
									})}
								{:else}
									{@html $_('death-log-single', {
										values: {
											killer: death.is_player
												? `<a href="/characters/${death.killed_by} class="anchor">${death.killed_by}</a>`
												: death.killed_by,
											just: death.unjustified ? '' + $_('unjustified') : '',
											level: death.level,
										},
									})}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{:else}
	<h5 class="h4">{data.error}</h5>
{/if}
