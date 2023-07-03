import { derived, writable } from 'svelte/store';

import { navigating } from '$app/stores';

const isLoading = writable(false);
export const setLoading = isLoading.set;
export const loading = derived(
	[navigating, isLoading],
	([$navigating, $isLoading]) => Boolean($navigating || $isLoading),
	false,
);
