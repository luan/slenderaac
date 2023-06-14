<script lang="ts">
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { debounce } from '$lib/utils';

	import type { PageData } from './$types';

	export let data: PageData;

	let searchInput = $page.url.searchParams.get('search') || '';

	$: {
		if (browser) {
			$page.url.searchParams.get('search') !== searchInput && onSearchInput();
		}
	}

	const onSearchInput = debounce(() => {
		if (searchInput === '') {
			$page.url.searchParams.delete('search');
			void goto($page.url.pathname, {
				replaceState: true,
				keepFocus: true,
				noScroll: true,
			});
			return;
		}
		$page.url.searchParams.set('search', searchInput);
		void goto(`?${$page.url.searchParams.toString()}`, {
			replaceState: true,
			keepFocus: true,
			noScroll: true,
		});
	}, 200);

	$: results = data.results ?? [];
</script>

<div class="flex flex-col items-center gap-2">
	<slot />

	<label class="label flex flex-row gap-2 items-center">
		<span>{$_('guilds.guild-name')}:</span>

		<input
			class="input flex-1"
			type="search"
			name="search"
			bind:value={searchInput}
			placeholder="{$_('search')}..." />
	</label>

	{#if results.length > 0}
		<div transition:slide>
			{#each results as guild}
				{guild.name}
			{/each}
		</div>
	{/if}

	<div class="flex flex-col items-center gap-2">
		<p>{$_('guilds.cant-find')}</p>
		{#if data.isLoggedIn}
			<a href="/guilds/new" class="btn variant-filled-primary">
				{$_('guilds.create-new')}
			</a>
		{:else}
			<a href="/account/login?returnTo=/guilds/new" class="anchor">
				{$_('guilds.login')}
			</a>
		{/if}
	</div>
</div>
