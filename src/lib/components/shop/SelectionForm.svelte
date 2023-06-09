<script lang="ts">
	import { faArrowRight, faLock } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import { enhance } from '$app/forms';

	import type { CoinOffer } from '$lib/coinOffers';
	import PaymentMethodSelection from '$lib/components/shop/PaymentMethodSelection.svelte';
	import ProductSelection from '$lib/components/shop/ProductSelection.svelte';

	let offerId = '';
	let paymentMethod = '';

	export let offers: Record<string, CoinOffer[]>;
	export let enabledPaymentMethods: string[];
</script>

<header class="step-header text-2xl font-bold">Select amount of coins</header>

<form
	class="flex flex-col gap-2"
	method="post"
	action="?/createIntent"
	use:enhance>
	<input type="hidden" name="offerId" value={offerId} />
	<input type="hidden" name="paymentMethod" value={paymentMethod} />
	<div class="flex flex-row justify-between items-baseline">
		<span />
		<ProductSelection {offers} bind:value={offerId} />
		<PaymentMethodSelection
			{enabledPaymentMethods}
			bind:value={paymentMethod} />
		<span />
	</div>
	<div class="step-navigation flex justify-between gap-4">
		<span />
		<button
			type="submit"
			class="btn variant-filled flex-row gap-1"
			disabled={!offerId || !paymentMethod}>
			Next
			<Fa icon={!offerId || !paymentMethod ? faLock : faArrowRight} />
		</button>
	</div>
</form>
