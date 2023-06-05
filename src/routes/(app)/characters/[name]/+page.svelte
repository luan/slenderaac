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

<style lang="postcss">
	.data-table {
		@apply flex flex-col gap-0 items-center justify-center justify-items-center;
		@apply bg-surface-300-600-token border-surface-500 border-2;
	}
	.data-row {
		@apply flex flex-row items-center w-full;
	}
	.data-row:nth-child(even) {
		@apply bg-surface-400-500-token;
	}
	.data-row dt,
	.data-row dd {
		@apply p-2;
		@apply border-y-2 border-x border-surface-500;
	}
	.data-row dt {
		@apply font-bold flex-1 text-right;
		@apply border-t-0 border-l-0;
	}
	.data-row:last-child dt {
		@apply border-b-0;
	}
	.data-row dd {
		@apply flex-1;
		@apply border-t-0 border-r-0;
	}
	.data-row:last-child dd {
		@apply border-b-0;
	}
	.data-row:first-child {
		@apply !rounded-t-lg;
	}
	.data-row:last-child {
		@apply !rounded-b-lg;
	}
</style>
