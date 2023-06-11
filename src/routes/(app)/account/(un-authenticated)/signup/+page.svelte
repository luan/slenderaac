<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { enhance } from '$app/forms';

	import CreateCharacterFormFields from '$lib/components/ui/create-character/CreateCharacterFormFields.svelte';
	import TextField from '$lib/components/ui/forms/TextField.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-xs text-error-500">{form.errors.global}</p>
	{/if}

	<TextField
		label={$_('email')}
		name="email"
		type="email"
		autocomplete="email"
		errors={form?.errors?.email} />

	<div class="flex flex-row gap-2">
		<TextField
			label={$_('password')}
			name="password"
			type="password"
			autocomplete="new-password"
			errors={form?.errors?.password} />

		<TextField
			label={$_('password-confirmation')}
			name="passwordConfirmation"
			type="password"
			autocomplete="new-password"
			errors={form?.errors?.passwordConfirmation} />
	</div>

	<hr class="divider" />

	<h3 class="h3">{$_('character')}</h3>

	<CreateCharacterFormFields {form} />

	<div class="flex flex-row justify-end">
		<button class="btn variant-filled-primary">{$_('create-account-0')}</button>
	</div>
</form>
