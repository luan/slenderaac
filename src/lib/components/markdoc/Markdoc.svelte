<script lang="ts">
	import {
		type Config as MarkdocConfig,
		default as Markdoc,
	} from '@markdoc/markdoc';

	import Callout from '$lib/components/markdoc/Callout.svelte';
	import { deepMerge } from '$lib/utils';

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
	export let config: MarkdocConfig = {};
	let components = new Map([['Callout', Callout]]);

	const ast = Markdoc.parse(content);
	const node = Markdoc.transform(ast, deepMerge(defaultConfig, config));
</script>

{#if node}
	<div class="prose">
		<Tags {node} {components} />
	</div>
{/if}
