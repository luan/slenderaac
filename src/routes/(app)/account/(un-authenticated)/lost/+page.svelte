<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { enhance } from '$lib/enchance';

	import type { ActionData } from './$types';

	export let form: ActionData;
	import { _ } from 'svelte-i18n';
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-error-500">{form.errors.global}</p>
	{/if}

	<label class="label">
		<span>{$_('email')}</span>
		<input
			required
			name="email"
			class="input"
			type="email"
			autocomplete="email" />
	</label>

	<div class="flex flex-row justify-end items-center gap-2">
		<Button>{$_('request-password-reset')}</Button>
	</div>

	<hr class="divider" />

	<div class="flex flex-row justify-center items-center gap-2">
		<h3 class="h3">{$_('dont-have-an-account')}</h3>
		<Button href="/account/signup" size="sm" color="secondary"
			>{$_('create-account')}</Button>
	</div>
</form>
