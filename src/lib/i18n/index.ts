import { init, register } from 'svelte-i18n';

import { browser } from '$app/environment';

const defaultLocale = 'en';

register('en', () => import('./locales/en.json'));

void init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
});
