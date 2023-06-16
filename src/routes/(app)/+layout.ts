import '$lib/i18n';

import { locale, waitLocale } from 'svelte-i18n';

import { browser } from '$app/environment';

import type { LayoutLoad } from './$types';

export const load = (async ({ data, fetch }) => {
	if (browser) {
		await locale.set(window.navigator.language);
	}
	await waitLocale();

	const onlineData = (await (await fetch('/api/online-status')).json()) as {
		serverOnline: boolean;
		onlinePlayerCount: number;
	};

	return { ...data, ...onlineData };
}) satisfies LayoutLoad;
