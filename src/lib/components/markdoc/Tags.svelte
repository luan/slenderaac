<!-- adapted from https://github.com/movingbrands/svelte-portable-text -->
<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import {
		default as Markdoc,
		type RenderableTreeNode,
	} from '@markdoc/markdoc';

	export let node: RenderableTreeNode;
	export let components: Map<string, typeof SvelteComponent>;

	const nodeName = (node: RenderableTreeNode) => {
		if (typeof node === 'string' || typeof node === 'number') return 'text';
		if (Array.isArray(node)) return 'fragment';
		if (node === null || typeof node !== 'object') return 'empty';
		if (!Markdoc.Tag.isTag(node)) return 'empty';
		return node.name;
	};
</script>

{#if typeof node === 'string' || typeof node === 'number'}
	{node}
{:else if Array.isArray(node)}
	{#each node as child}
		<svelte:self node={child} {components} />
	{/each}
{:else if node === null || typeof node !== 'object' || !Markdoc.Tag.isTag(node)}
	{''}
{:else if !node.name}
	<svelte:self node={node.children} {components} />
{:else if components.has(nodeName(node))}
	<svelte:component this={components.get(nodeName(node))} {...node.attributes}>
		<svelte:self node={node.children} {components} />
	</svelte:component>
{:else}
	<svelte:element this={node.name} {...node.attributes}>
		<svelte:self node={node.children} {components} />
	</svelte:element>
{/if}
