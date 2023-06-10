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
	import { _ } from 'svelte-i18n';
</script>

<StatelessModal title={$_('change-password')} on:close={close}>
	<form class="flex flex-col gap-6" method="post" use:enhance>
		{#if form?.errors?.global}
			<p class="text-xs text-error-500">{form.errors.global}</p>
		{/if}

		<div class="flex flex-wrap gap-4 items-center">
			<TextField
				labelClass="w-full"
				label={$_('current-password')}
				name="currentPassword"
				type="password"
				autocomplete="current-password"
				errors={form?.errors?.currentPassword} />
			<TextField
				label={$_('new-password')}
				name="newPassword"
				type="password"
				autocomplete="new-password"
				errors={form?.errors?.newPassword} />
			<TextField
				label={$_('confirm-new-password')}
				name="newPasswordConfirm"
				type="password"
				autocomplete="new-password"
				errors={form?.errors?.newPasswordConfirm} />
		</div>

		<div class="flex flex-row justify-end">
			<button class="btn variant-filled-primary"
				>{$_('change-password')}</button>
		</div>
	</form>
</StatelessModal>
