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
		<span>Account name</span>
		<input
			required
			name="accountName"
			class="input"
			class:input-error={form?.errors?.accountName}
			type="text"
			autocomplete="username" />
		{#each form?.errors?.accountName ?? [] as error}
			<p class="text-error-500">{error}</p>
		{/each}
	</label>

	<label class="label">
		<span>Email</span>
		<input
			required
			name="email"
			class="input"
			class:input-error={form?.errors?.email}
			type="email"
			autocomplete="email" />
		{#each form?.errors?.email ?? [] as error}
			<p class="text-error-500">{error}</p>
		{/each}
	</label>

	<div class="flex flex-row gap-2">
		<label class="label flex-grow">
			<span>Password</span>
			<input
				required
				name="password"
				class="input"
				class:input-error={form?.errors?.password}
				type="password"
				autocomplete="new-password" />
			{#each form?.errors?.password ?? [] as error}
				<p class="text-error-500">{error}</p>
			{/each}
		</label>

		<label class="label flex-grow">
			<span>Password confirmation</span>
			<input
				required
				name="passwordConfirmation"
				class="input"
				class:input-error={form?.errors?.passwordConfirmation}
				type="password"
				autocomplete="new-password" />
			{#each form?.errors?.passwordConfirmation ?? [] as error}
				<p class="text-error-500">{error}</p>
			{/each}
		</label>
	</div>

	<hr class="divider" />

	<label class="label">
		<span>Character name</span>
		<input
			required
			name="characterName"
			class="input"
			class:input-error={form?.errors?.characterName}
			type="text"
			autocomplete="username" />
		{#each form?.errors?.characterName ?? [] as error}
			<p class="text-error-500">{error}</p>
		{/each}
	</label>

	<div class="flex flex-row justify-end">
		<button class="btn variant-filled-primary">Create Account</button>
	</div>
</form>
