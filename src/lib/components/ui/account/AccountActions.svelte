<script lang="ts">
	import { _ } from 'svelte-i18n';

	import Button from '$lib/components/ui/Button.svelte';

	export let is2faEnabled: boolean;
</script>

<div class="flex flex-row justify-between gap-2">
	<span />
	<div class="flex flex-row justify-start gap-2">
		{#if is2faEnabled}
			<Button href="/account/disable-2fa" size="sm" color="error">
				{$_('disable-2fa.button')}
			</Button>
		{:else}
			<Button href="/account/enable-2fa" size="sm" color="success">
				{$_('enable-2fa')}
			</Button>
		{/if}
		<Button href="/account/change-password" size="sm">
			{$_('change-password')}
		</Button>
		<Button href="/account/change-email" size="sm">
			{$_('change-email')}
		</Button>
	</div>
</div>
