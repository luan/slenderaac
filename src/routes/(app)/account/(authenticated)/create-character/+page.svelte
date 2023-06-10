<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	import CreateCharacterFormFields from '$lib/components/ui/create-character/CreateCharacterFormFields.svelte';
	import StatelessModal from '$lib/components/ui/StatelessModal.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;

	async function close() {
		await goto('/account');
	}
</script>

<StatelessModal title="$_('create-character')" on:close={close}>
	<form class="flex flex-col gap-4" method="post" use:enhance>
		{#if form?.errors?.global}
			<p class="text-xs text-error-500">{form.errors.global}</p>
		{/if}

		<CreateCharacterFormFields {form} />

		<div class="flex flex-row justify-end">
			<button class="btn variant-filled-primary"
				>$_('create-character-0')</button>
		</div>
	</form>
</StatelessModal>
