<script lang="ts">
	export let label: string;
	export let name: string;
	export let value = '';
	export let rows = 4;
	export let errors: string[] | undefined;
	export let labelClass = '';
	export let variant: 'horizontal' | 'vertical' = 'vertical';
	export let required = false;
	export let placeholder = '';

	$: error = (errors ?? [])[0];
</script>

<label
	class="relative label flex {variant === 'horizontal'
		? 'flex-row gap-2 items-center'
		: 'flex-col gap-0'} flex-grow {labelClass}">
	<span>{label}</span>
	<textarea
		{name}
		{rows}
		{placeholder}
		{required}
		class:input-error={Boolean(errors)}
		class="textarea"
		bind:value />

	{#if error}
		<p class="absolute top-full text-xs text-error-500-400-token">{error}</p>
	{/if}
</label>
