<script lang="ts">
	import { _ } from 'svelte-i18n';

	import type { AccountInfo } from '$lib/accounts';
	import { formatDate } from '$lib/utils';

	import { PUBLIC_TITLE } from '$env/static/public';

	export let account: AccountInfo;
</script>

<div class="flex flex-col gap-2">
	<h3 class="h3">{$_('general-information')}</h3>

	<div class="data-table">
		<div class="data-row">
			<dt>{$_('email')}</dt>
			<dd>
				{account.email}
				{#if !account.isVerified}
					<div class="text-error-500">
						{@html $_('account.unverified')}
					</div>
				{:else if account.newEmail}
					<div class="text-warning-800-100-token">
						{$_('account.change-pending', {
							values: { email: account.newEmail },
						})}
						<form action="/account/resend" method="post">
							<button class="anchor" type="submit"
								>{$_('account.resend')}</button>
						</form>
						)
					</div>
				{/if}
			</dd>
		</div>
		<div class="data-row">
			<dt>{$_('created')}</dt>
			<dd>{formatDate(account.createdAt)}</dd>
		</div>
		<div class="data-row">
			<dt>{$_('last-login')}</dt>
			<dd>{formatDate(account.lastLogin)}</dd>
		</div>
		<div class="data-row">
			<dt>{$_('game-coins', { values: { PUBLIC_TITLE } })}</dt>
			<dd class="flex flex-row items-center gap-2">
				{account.coinsTransferable}
				<a
					href="/shop/coins"
					class="btn btn-sm py-0.5 px-2 variant-filled-success"
					>{$_('get-coins')}</a>
			</dd>
		</div>
	</div>
</div>
