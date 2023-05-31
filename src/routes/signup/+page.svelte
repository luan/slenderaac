<form class="flex flex-col gap-4">
	<h3 class="h3">Create an account</h3>

	<label class="label">
		<span>Account name</span>
		<input
			name="accountName"
			class="input"
			type="text"
			placeholder="accountname" />
	</label>

	<label class="label">
		<span>Email</span>
		<input
			name="email"
			class="input"
			type="email"
			placeholder="test@example.com" />
	</label>

	<div class="flex flex-row justify-between">
		<label class="label">
			<span>Password</span>
			<input
				name="password"
				class="input"
				type="password"
				placeholder="***********" />
		</label>

		<label class="label">
			<span>Password confirmation</span>
			<input
				name="passwordConfirmation"
				class="input"
				type="password"
				placeholder="***********" />
		</label>
	</div>

	<button class="btn variant-filled-primary">Create account</button>
</form>
