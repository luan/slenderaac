import { join } from 'path';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}',
		),
	],
	safelist: [
		'variant-filled-success',
		'variant-filled-error',
		'variant-filled-warning',
		'variant-filled-primary',
		'variant-filled-secondary',
		'variant-filled-tertiary',
		'variant-ghost-success',
		'variant-ghost-error',
		'variant-ghost-warning',
		'variant-ghost-primary',
		'variant-ghost-secondary',
		'variant-ghost-tertiary',
		'variant-soft-success',
		'variant-soft-error',
		'variant-soft-warning',
		'variant-soft-primary',
		'variant-soft-secondary',
		'variant-soft-tertiary',
	],
	theme: {
		extend: {},
	},
	plugins: [forms, typography, ...skeleton()],
};
