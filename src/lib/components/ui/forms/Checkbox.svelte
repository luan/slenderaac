<script lang="ts">
	export let label: string;
	export let name: string;
	export let checked = false;
	export let errors: string[] | undefined;
	export let labelClass = '';

	$: error = (errors ?? [])[0];
</script>

<label
	class:input-error={Boolean(errors)}
	class="relative label flex flex-row gap-2 items-center flex-grow {labelClass}">
	<input class="checkbox" type="checkbox" {name} bind:checked />
	<p>{label}</p>
	{#if error}
		<p class="absolute top-full text-xs text-error-500-400-token">{error}</p>
	{/if}
</label>
