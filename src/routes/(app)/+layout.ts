import '$lib/i18n';

import { locale, waitLocale } from 'svelte-i18n';

import { browser } from '$app/environment';

import type { LayoutLoad } from './$types';

export const load = (async ({ data, fetch }) => {
	if (browser) {
		await locale.set(window.navigator.language);
	}
	await waitLocale();

	return { ...data };
}) satisfies LayoutLoad;
