import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import { legbone } from './src/legbone-theme';

const config = {
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
		'variant-glass-success',
		'variant-glass-error',
		'variant-glass-warning',
		'variant-glass-primary',
		'variant-glass-secondary',
		'variant-glass-tertiary',
		'variant-ringed-success',
		'variant-ringed-error',
		'variant-ringed-warning',
		'variant-ringed-primary',
		'variant-ringed-secondary',
		'variant-ringed-tertiary',
	],
	theme: {
		extend: {
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-bullets': theme('colors.slate[800]'),
						'--tw-prose-invert-bullets': theme('colors.slate[200]'),
					},
				},
			}),
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [legbone],
			},
		}),
	],
} satisfies Config;

export default config;
