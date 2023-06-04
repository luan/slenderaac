<script lang="ts">
	export let label: string;
	export let name: string;
	export let value = '';
	export let errors: string[] | undefined;
	export let autocomplete = 'off';
	export let type = 'text';
	export let labelClass = '';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<label class="relative label flex flex-col gap-0 flex-grow {labelClass}">
	<span>{label}</span>
	<input
		required
		bind:value
		{name}
		class="input"
		class:input-error={Boolean(errors)}
		{autocomplete}
		use:typeAction />
	{#each errors ?? [] as error}
		<p class="absolute top-full text-xs text-error-500">{error}</p>
	{/each}
</label>
