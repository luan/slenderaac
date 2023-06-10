<script lang="ts">
	import { faCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { tooltip } from 'svooltip';

	export let online = false;
</script>

{#if online}
	<span class="text-success-600" use:tooltip={{ content: 'Online' }}>
		<Fa icon={faCircle} size="xs" />
	</span>
{:else}
	<span class="text-error-600" use:tooltip={{ content: 'Offline' }}>
		<Fa icon={faCircle} size="xs" />
	</span>
{/if}
