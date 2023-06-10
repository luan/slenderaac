<script lang="ts">
	import AccountActions from '$lib/components/ui/account/AccountActions.svelte';
	import AccountCharacters from '$lib/components/ui/account/AccountCharacters.svelte';
	import AccountInfoBox from '$lib/components/ui/account/AccountInfoBox.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex flex-col gap-2">
	<AccountInfoBox account={data.account} />
	<AccountActions />
	<AccountCharacters characters={data.characters} />
</div>

<slot />
