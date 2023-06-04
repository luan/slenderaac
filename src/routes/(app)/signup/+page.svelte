<script lang="ts">
	import { enhance } from '$app/forms';

	import CreateCharacterFormFields from '$lib/components/ui/create-character/CreateCharacterFormFields.svelte';
	import TextField from '$lib/components/ui/TextField.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-xs text-error-500">{form.errors.global}</p>
	{/if}

	<TextField
		label="Account name"
		name="accountName"
		type="text"
		autocomplete="username"
		errors={form?.errors?.accountName} />

	<TextField
		label="Email"
		name="email"
		type="email"
		autocomplete="email"
		errors={form?.errors?.email} />

	<div class="flex flex-row gap-2">
		<TextField
			label="Password"
			name="password"
			type="password"
			autocomplete="new-password"
			errors={form?.errors?.password} />

		<TextField
			label="Password confirmation"
			name="passwordConfirmation"
			type="password"
			autocomplete="new-password"
			errors={form?.errors?.passwordConfirmation} />
	</div>

	<hr class="divider" />

	<h3 class="h3">Character</h3>

	<CreateCharacterFormFields {form} />

	<div class="flex flex-row justify-end">
		<button class="btn variant-filled-primary">Create Account</button>
	</div>
</form>
