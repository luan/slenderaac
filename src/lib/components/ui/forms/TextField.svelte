<script lang="ts">
	export let label: string;
	export let name: string;
	export let value = '';
	export let errors: string[] | undefined;
	export let autocomplete = 'off';
	export let type = 'text';
	export let labelClass = '';
	export let variant: 'horizontal' | 'vertical' = 'vertical';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
	$: error = (errors ?? [])[0];
</script>

<label
	class="relative label flex {variant === 'horizontal'
		? 'flex-row gap-2 items-center'
		: 'flex-col gap-0'} flex-grow {labelClass}">
	<span>{label}</span>
	<input
		required
		bind:value
		{name}
		class="input"
		class:input-error={Boolean(errors)}
		{autocomplete}
		use:typeAction />
	{#if error}
		<p class="absolute top-full text-xs text-error-500-400-token">{error}</p>
	{/if}
</label>
