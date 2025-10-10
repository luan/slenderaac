import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption } from 'vite';

export default defineConfig({
	plugins: [sveltekit() as PluginOption],
	optimizeDeps: {
		exclude: [
			'codemirror',
			'@codemirror/lang-markdown',
			'@codemirror/theme-one-dark',
			'svelte',
			'svelte-portal',
			'svelte-dnd-action',
		],
		include: ['intl-messageformat', '@formatjs/icu-messageformat-parser', '@formatjs/icu-skeleton-parser'],
	},
	ssr: {
		noExternal: ['intl-messageformat', '@formatjs/icu-messageformat-parser', '@formatjs/icu-skeleton-parser'],
	},
	});
