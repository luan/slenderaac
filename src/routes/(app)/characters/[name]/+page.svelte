<script lang="ts">
	import { getPronoun, sexString, vocationString } from '$lib/players';

	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;
</script>

{#if character}
	<div class="card data-table">
		<div class="data-row">
			<dt>Name</dt>
			<dd>
				{character.name} <em class="text-xs">({getPronoun(character)})</em>
			</dd>
		</div>
		<div class="data-row">
			<dt>Sex</dt>
			<dd>{sexString(character.sex)}</dd>
		</div>
		<div class="data-row">
			<dt>Vocation</dt>
			<dd>{vocationString(character.vocation)}</dd>
		</div>
		<div class="data-row">
			<dt>Level</dt>
			<dd>{character.level}</dd>
		</div>
		<div class="data-row">
			<dt>Residence</dt>
			<dd>{character.townName}</dd>
		</div>
		<div class="data-row">
			<dt>Last login</dt>
			<dd>
				{character.lastLogin ? character.lastLogin.toLocaleString() : 'Never'}
			</dd>
		</div>
	</div>
{:else}
	<h5 class="h4">{data.error}</h5>
{/if}
