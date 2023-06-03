<script lang="ts">
	import { enhance } from '$app/forms';

	import PageTitle from '$lib/components/PageTitle.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<PageTitle title="Login" />

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-xs text-error-500">{form.errors.global}</p>
	{/if}

	<label class="label">
		<span>Email</span>
		<input
			required
			name="email"
			class="input"
			type="email"
			autocomplete="email" />
	</label>

	<label class="label flex-grow">
		<span>Password</span>
		<input
			required
			name="password"
			class="input"
			type="password"
			autocomplete="new-password" />
	</label>

	<div class="flex flex-row justify-end items-center gap-2">
		<a href="/account-lost">Lost account?</a>
		<button class="btn variant-filled-primary">Login</button>
	</div>

	<hr class="divider" />

	<div class="flex flex-row justify-center items-center gap-2">
		<h3 class="h3">Don't have an account?</h3>
		<a href="/signup" class="btn btn-sm variant-filled-secondary"
			>Create account</a>
	</div>
</form>
