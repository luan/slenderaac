<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let is2faEnabled: boolean;
</script>

<div class="flex flex-row justify-between gap-2">
	<span />
	<div class="flex flex-row justify-start gap-2">
		{#if is2faEnabled}
			<a href="/account/disable-2fa" class="btn btn-sm bg-error-500 text-white">
				{$_('disable-2fa.button')}
			</a>
		{:else}
			<a
				href="/account/enable-2fa"
				class="btn btn-sm bg-success-500 text-white">
				{$_('enable-2fa')}
			</a>
		{/if}
		<a
			href="/account/change-password"
			class="btn btn-sm variant-filled-primary">
			{$_('change-password')}
		</a>
		<a href="/account/change-email" class="btn btn-sm variant-filled-primary">
			{$_('change-email')}
		</a>
	</div>
</div>
