<script lang="ts">
	export let label: string | undefined = undefined;
	export let name: string;
	export let value = '';
	export let errors: string[] | undefined = undefined;
	export let labelClass = '';
	export let variant: 'horizontal' | 'vertical' = 'vertical';

	$: error = (errors ?? [])[0];
</script>

<label
	class="relative label flex {variant === 'horizontal'
		? 'flex-row gap-2 items-center'
		: 'flex-col gap-0'} flex-grow {labelClass}">
	{#if label}<span>{label}</span>{/if}
	<select
		class="select"
		{name}
		bind:value
		class:input-error={Boolean(errors)}
		on:change>
		<slot />
	</select>
	{#if error}
		<p class="absolute top-full text-xs text-error-500-400-token">{error}</p>
	{/if}
</label>
