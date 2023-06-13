<script lang="ts">
	import { goto } from '$app/navigation';

	import StatelessModal from '$lib/components/ui/StatelessModal.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	async function close() {
		await goto('/account');
	}
	import { _ } from 'svelte-i18n';

	import Disable2FaForm from '$lib/components/ui/forms/Disable2FAForm.svelte';
</script>

<StatelessModal title={$_('enable-2fa')} on:close={close}>
	{#if !data.enabled}
		<h3 class="h3">Success!</h3>
		<p>{$_('disable-2fa.success')}</p>
		<p />
		<div class="flex flex-col items-center gap-4">
			<a href="/account" class="btn variant-filled-secondary">{$_('close')}</a>
		</div>
	{:else}
		<Disable2FaForm errors={form?.errors} />
	{/if}
</StatelessModal>
