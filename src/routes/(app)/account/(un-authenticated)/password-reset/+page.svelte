<script lang="ts">
	import { enhance } from '$app/forms';

	import TextField from '$lib/components/ui/TextField.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-error-500">{form.errors.global}</p>
	{/if}

	<input type="hidden" name="token" value={data.token} />
	<input type="hidden" name="email" value={data.email} />

	<div class="flex flex-row gap-2">
		<TextField
			label="New password"
			name="password"
			type="password"
			autocomplete="new-password"
			errors={form?.errors?.password} />

		<TextField
			label="New password confirmation"
			name="passwordConfirmation"
			type="password"
			autocomplete="new-password"
			errors={form?.errors?.passwordConfirmation} />
	</div>

	<div class="flex flex-row justify-end items-center gap-2">
		<button class="btn variant-filled-primary">Submit</button>
	</div>
</form>
