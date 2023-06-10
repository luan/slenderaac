<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
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

	<label class="label flex-grow">
		<span>{$_('password')}</span>
		<input
			required
			name="password"
			class="input"
			type="password"
			autocomplete="new-password" />
	</label>

	<div class="flex flex-row justify-end items-center gap-2">
		<a href="/account/lost">{$_('lost-account')}</a>
		<button class="btn variant-filled-primary">{$_('login')}</button>
	</div>

	<hr class="divider" />

	<div class="flex flex-row justify-center items-center gap-2">
		<h3 class="h3">{$_('dont-have-an-account')}</h3>
		<a href="/account/signup" class="btn btn-sm variant-filled-secondary"
			>{$_('create-account')}</a>
	</div>
</form>
