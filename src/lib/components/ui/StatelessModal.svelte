<script lang="ts">
	import { faClose } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { portal } from 'svelte-portal';

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	export let title: string;
</script>

<div
	class="modal-backdrop fixed top-0 left-0 right-0 bottom-0 bg-surface-backdrop-token z-[999]"
	use:portal={'body'}>
	<div
		class="w-full h-full p-4 overflow-y-auto flex justify-center items-center"
		transition:fade={{ duration: 300 }}>
		<div
			class="modal block bg-surface-100-800-token w-modal h-auto p-4 space-y-4 rounded-container-token shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-label={title}>
			<header
				class="text-2xl font-bold flex flex-row justify-between items-center">
				{title}
				<button on:click={close}><Fa icon={faClose} size="xs" /></button>
			</header>
			<slot />
		</div>
	</div>
</div>
