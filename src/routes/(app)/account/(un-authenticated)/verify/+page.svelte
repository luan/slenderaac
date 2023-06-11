<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { enhance } from '$app/forms';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<form class="flex flex-col gap-4 items-center" method="post" use:enhance>
	{#if form?.errors?.global}
		<p class="text-error-500">{form.errors.global}</p>
	{/if}

	<input type="hidden" name="token" value={data.token} />
	<input type="hidden" name="email" value={data.email} />
	<span class="h4">
		Welcome! Please verify your account by clicking the button below.
	</span>

	<button class="btn variant-filled-primary">{$_('verify-account')}</button>
</form>
