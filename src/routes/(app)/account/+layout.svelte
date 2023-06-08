<script lang="ts">
	import AccountCharacters from '$lib/components/ui/account/AccountCharacters.svelte';
	import AccountInfoBox from '$lib/components/ui/account/AccountInfoBox.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<AccountInfoBox account={data.account} />
<AccountCharacters characters={data.characters} />

<slot />
