<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';

	export let type: 'button' | 'submit' | 'reset' | null = null;
	export let href: string | null = null;
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'filled' | 'ghost' | 'soft' | 'none' = 'filled';
	export let color:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'error'
		| 'warning'
		| 'success'
		| 'base' = 'primary';
	export let iconBefore: IconDefinition | null = null;
	export let iconAfter: IconDefinition | null = null;
	export let disabled = false;

	let klass = '';
	export { klass as class };

	let tag: 'a' | 'button';
	$: tag = href ? 'a' : 'button';

	// $: sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
	$: sizeClass = {
		xs: 'text-xs btn-sm',
		sm: 'btn-sm',
		md: '',
		lg: 'btn-lg',
	}[size];
	$: colorSuffix = color !== 'base' ? `-${color}` : '';
	$: variantClass =
		variant !== 'none' ? `variant-${variant}${colorSuffix}` : '';
</script>

<svelte:element
	this={tag}
	{href}
	{type}
	{disabled}
	on:click
	class="btn gap-1 {sizeClass} {variantClass} {klass}">
	{#if iconBefore}
		<Fa icon={iconBefore} />
	{/if}
	<slot />
	{#if iconAfter}
		<Fa icon={iconAfter} />
	{/if}
</svelte:element>
