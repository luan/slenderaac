<script lang="ts">
	import {
		type Config as MarkdocConfig,
		default as Markdoc,
	} from '@markdoc/markdoc';

	import Callout from '$lib/components/markdoc/Callout.svelte';
	import { deepMerge } from '$lib/utils';

	import { PUBLIC_BASE_URL, PUBLIC_TITLE } from '$env/static/public';

	import Tags from './Tags.svelte';

	const defaultConfig = {
		tags: {
			callout: {
				render: 'Callout',
				description: 'Display the enclosed content in a callout box',
				children: ['paragraph', 'tag', 'list'],
				attributes: {
					type: {
						type: String,
						default: 'note',
						matches: ['check', 'error', 'note', 'warning'],
					},
				},
			},
		},
	};
	export let content = '';
	export let config: MarkdocConfig = {
		variables: {
			title: PUBLIC_TITLE,
			baseUrl: PUBLIC_BASE_URL,
		},
	};
	let components = new Map([['Callout', Callout]]);

	const ast = Markdoc.parse(content);
	const node = Markdoc.transform(ast, deepMerge(defaultConfig, config));
</script>

{#if node}
	<article class="prose dark:prose-invert">
		<Tags {node} {components} />
	</article>
{/if}
