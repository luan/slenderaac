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

<StatelessModal title="Change Password" on:close={close}>
	<form class="flex flex-col gap-6" method="post" use:enhance>
		{#if form?.errors?.global}
			<p class="text-xs text-error-500">{form.errors.global}</p>
		{/if}

		<div class="flex flex-wrap gap-4 items-center">
			<TextField
				labelClass="w-full"
				label="Current Password"
				name="currentPassword"
				type="password"
				autocomplete="current-password"
				errors={form?.errors?.currentPassword} />
			<TextField
				label="New Password"
				name="newPassword"
				type="password"
				autocomplete="new-password"
				errors={form?.errors?.newPassword} />
			<TextField
				label="Confirm New Password"
				name="newPasswordConfirm"
				type="password"
				autocomplete="new-password"
				errors={form?.errors?.newPasswordConfirm} />
		</div>

		<div class="flex flex-row justify-end">
			<button class="btn variant-filled-primary">Change Password</button>
		</div>
	</form>
</StatelessModal>
