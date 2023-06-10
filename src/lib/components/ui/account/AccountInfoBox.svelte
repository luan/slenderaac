<script lang="ts">
	import type { AccountInfo } from '$lib/accounts';
	import { formatDate } from '$lib/utils';

	import { PUBLIC_TITLE } from '$env/static/public';

	export let account: AccountInfo;
</script>

<div class="flex flex-col gap-2">
	<h3 class="h3">General Information</h3>

	<div class="data-table">
		<div class="data-row">
			<dt>Name</dt>
			<dd>{account.name}</dd>
		</div>
		<div class="data-row">
			<dt>Email</dt>
			<dd>
				{account.email}
				{#if !account.isVerified}
					<div class="text-error-500">
						(unverified <a class="anchor" href="/account/resend">re-send</a>)
					</div>
				{:else if account.newEmail}
					<div class="text-warning-800-100-token">
						(verification pending for email change to {account.newEmail}
						<a
							class="anchor"
							href="/account/resend"
							data-sveltekit-preload-data="off"
							data-sveltekit-preload-code="off"
							data-sveltekit-reload>re-send</a
						>)
					</div>
				{/if}
			</dd>
		</div>
		<div class="data-row">
			<dt>Created</dt>
			<dd>{formatDate(account.createdAt)}</dd>
		</div>
		<div class="data-row">
			<dt>Last login</dt>
			<dd>{formatDate(account.lastLogin)}</dd>
		</div>
		<div class="data-row">
			<dt>{PUBLIC_TITLE} Coins</dt>
			<dd class="flex flex-row items-center gap-2">
				{account.coinsTransferable}
				<a
					href="/shop/coins"
					class="btn btn-sm py-0.5 px-2 variant-filled-success">Get coins</a>
			</dd>
		</div>
	</div>
</div>
