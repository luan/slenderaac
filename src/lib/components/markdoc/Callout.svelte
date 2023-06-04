<script lang="ts">
	export let type = 'check';

	if (type != 'check') console.warn('Callout.svelte only supports type: check');
</script>

<div class="card p-2 {type}">
	<slot />
</div>
