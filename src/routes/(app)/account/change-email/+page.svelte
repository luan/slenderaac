<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	import StatelessModal from '$lib/components/ui/StatelessModal.svelte';
	import TextField from '$lib/components/ui/TextField.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;

	async function close() {
		await goto('/account');
	}
</script>

<StatelessModal title="Change Email" on:close={close}>
	<form class="flex flex-col gap-6" method="post" use:enhance>
		{#if form?.errors?.global}
			<p class="text-xs text-error-500">{form.errors.global}</p>
		{/if}

		<div class="flex flex-wrap gap-4 items-center">
			<TextField
				labelClass="w-full"
				label="Password"
				name="password"
				type="password"
				autocomplete="password"
				errors={form?.errors?.password} />
			<TextField
				label="New Email"
				name="newEmail"
				type="email"
				errors={form?.errors?.newEmail} />
		</div>

		<div class="flex flex-row justify-end">
			<button class="btn variant-filled-primary">Change Email</button>
		</div>
	</form>
</StatelessModal>
