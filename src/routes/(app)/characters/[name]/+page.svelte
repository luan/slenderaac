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
	</div>

	{#if data.accountCharacters && data.accountCharacters.length > 0}
		<CharactersTable characters={data.accountCharacters} />
	{/if}
{:else}
	<h5 class="h4">{data.error}</h5>
{/if}
