<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import TextField from '$lib/components/ui/forms/TextField.svelte';
	import { debounce } from '$lib/utils';

	export let label: string;

	let value = $page.url.searchParams.get('search') || '';

	export const reset = (): void => void (value = '');

	$: {
		if (browser) {
			$page.url.searchParams.get('search') !== value && onSearchInput();
		}
	}

	const onSearchInput = debounce(() => {
		if (value === '') {
			$page.url.searchParams.delete('search');
			void goto($page.url.pathname, {
				replaceState: true,
				keepFocus: true,
				noScroll: true,
			});
			return;
		}
		$page.url.searchParams.set('search', value);
		void goto(`?${$page.url.searchParams.toString()}`, {
			replaceState: true,
			keepFocus: true,
			noScroll: true,
		});
	}, 200);
</script>

<TextField
	{label}
	type="search"
	name="search"
	variant="horizontal"
	placeholder={$_('search')}
	bind:value />
