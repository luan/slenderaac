<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	<label class="label">
		<span>Account name</span>
		<input
			name="accountName"
			class="input"
			class:input-error={form?.errors?.accountName}
			type="text"
			autocomplete="username" />
		{#if form?.errors?.accountName}
			<p class="text-error-500">{form.errors.accountName}</p>
		{/if}
	</label>

	<label class="label">
		<span>Email</span>
		<input
			name="email"
			class="input"
			class:input-error={form?.errors?.email}
			type="email"
			autocomplete="email" />
		{#if form?.errors?.email}
			<p class="text-error-500">{form.errors.email}</p>
		{/if}
	</label>

	<div class="flex flex-row gap-2">
		<label class="label flex-grow">
			<span>Password</span>
			<input
				name="password"
				class="input"
				class:input-error={form?.errors?.password}
				type="password"
				autocomplete="new-password" />
			{#if form?.errors?.password}
				<p class="text-error-500">{form.errors.password}</p>
			{/if}
		</label>

		<label class="label flex-grow">
			<span>Password confirmation</span>
			<input
				name="passwordConfirmation"
				class="input"
				class:input-error={form?.errors?.passwordConfirmation}
				type="password"
				autocomplete="new-password" />
			{#if form?.errors?.passwordConfirmation}
				<p class="text-error-500">{form.errors.passwordConfirmation}</p>
			{/if}
		</label>
	</div>

	<div class="flex flex-row justify-end">
		<button class="btn variant-filled-primary">Create Account</button>
	</div>
</form>
