<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-error-500">{form.errors.global}</p>
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

	<div class="flex flex-row justify-end items-center gap-2">
		<button class="btn variant-filled-primary">Request Password Reset</button>
	</div>

	<hr class="divider" />

	<div class="flex flex-row justify-center items-center gap-2">
		<h3 class="h3">Don't have an account?</h3>
		<a href="/account/signup" class="btn btn-sm variant-filled-secondary"
			>Create account</a>
	</div>
</form>
