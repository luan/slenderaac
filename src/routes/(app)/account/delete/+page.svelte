<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	import StatelessModal from '$lib/components/ui/StatelessModal.svelte';
	import TextField from '$lib/components/ui/TextField.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	async function close() {
		await goto('/account');
	}
</script>

<StatelessModal title="Delete Character" on:close={close}>
	<form class="flex flex-col gap-4" method="post" use:enhance>
		{#if form?.errors?.global}
			<p class="text-xs text-error-500">{form.errors.global}</p>
		{/if}

		<h4 class="h4">Are you sure you want to delete "{data.name}"?</h4>
		<div class="w-full px-32">
			<TextField
				type="password"
				name="password"
				label="Password"
				labelClass="!flex-row items-center gap-2"
				errors={form?.errors?.password} />
		</div>

		<div class="flex flex-row justify-end">
			<button class="btn variant-filled-error">Confirm Deletion</button>
		</div>
	</form>
</StatelessModal>
