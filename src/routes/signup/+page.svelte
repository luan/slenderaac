<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form class="flex flex-col gap-4" method="post" use:enhance>
	<label class="label">
		<span>Account name</span>
		<input
			name="accountName"
			class="input"
			type="text"
			autocomplete="username"
			placeholder="accountname" />
	</label>

	<label class="label">
		<span>Email</span>
		<input
			name="email"
			class="input"
			type="email"
			autocomplete="email"
			placeholder="test@example.com" />
	</label>

	<div class="flex flex-row justify-between">
		<label class="label">
			<span>Password</span>
			<input
				name="password"
				class="input"
				type="password"
				autocomplete="new-password"
				placeholder="***********" />
		</label>

		<label class="label">
			<span>Password confirmation</span>
			<input
				name="passwordConfirmation"
				class="input"
				type="password"
				autocomplete="new-password"
				placeholder="***********" />
		</label>
	</div>

	<div class="flex flex-row justify-center">
		<button class="btn variant-filled-primary">Submit</button>
	</div>
</form>
