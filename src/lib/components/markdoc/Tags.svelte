<!-- adapted from https://github.com/movingbrands/svelte-portable-text -->
<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import {
		default as Markdoc,
		type RenderableTreeNode,
	} from '@markdoc/markdoc';

	import Callout from './Callout.svelte';
	import Col from './Col.svelte';
	import Row from './Row.svelte';

	type ComponentType = typeof Callout | typeof Col | typeof Row;

	export let node: RenderableTreeNode;
	export let components: Map<string, ComponentType>;
	export let isRoot = false;

	const nodeName = (node: RenderableTreeNode) => {
		if (typeof node === 'string' || typeof node === 'number') return 'text';
		if (Array.isArray(node)) return 'fragment';
		if (node === null || typeof node !== 'object') return 'empty';
		if (!Markdoc.Tag.isTag(node)) return 'empty';
		return node.name;
	};

	const filterAttributes = (attributes: { [key: string]: any }) => {
		// Filter out any attributes that might cause type conflicts
		const filtered: Record<string, never> = {} as Record<string, never>;
		const validKeys = ['center'];

		for (const [key, value] of Object.entries(attributes)) {
			if (validKeys.includes(key)) {
				(filtered as Record<string, any>)[key] = value;
			}
		}

		return filtered;
	};
</script>

{#if typeof node === 'string' || typeof node === 'number'}
	{@html node}
{:else if Array.isArray(node)}
	{#each node as child}
		<svelte:self node={child} {components} />
	{/each}
{:else if node === null || typeof node !== 'object' || !Markdoc.Tag.isTag(node)}
	{''}
{:else if !node.name}
	<svelte:self node={node.children} {components} />
{:else if components.has(nodeName(node))}
	{@const component = components.get(nodeName(node))}
	{@const filteredAttrs = filterAttributes(node.attributes)}
	<svelte:component this={component} {...filteredAttrs}>
		<svelte:self node={node.children} {components} />
	</svelte:component>
{:else if node.children.length > 0}
	{#if isRoot}
		<svelte:self node={node.children} {components} />
	{:else}
		<svelte:element this={node.name} {...node.attributes}>
			<svelte:self node={node.children} {components} />
		</svelte:element>
	{/if}
{:else}
	<svelte:element this={node.name} {...node.attributes} />
{/if}
