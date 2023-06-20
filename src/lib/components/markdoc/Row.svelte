<script lang="ts">
	export let center = false;
</script>

<div
	class="flex flex-row gap-2"
	class:items-center={center}
	class:justify-center={center}>
	<slot />
</div>
