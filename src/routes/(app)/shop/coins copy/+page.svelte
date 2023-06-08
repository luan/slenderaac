<script lang="ts">
	import {
		Toast,
		type ToastSettings,
		toastStore,
	} from '@skeletonlabs/skeleton';
	import { loadStripe, type Stripe } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import { Elements } from 'svelte-stripe';

	import { goto } from '$app/navigation';

	import PaymentMethodSelection from '$lib/components/shop/PaymentMethodSelection.svelte';
	import ProductSelection from '$lib/components/shop/ProductSelection.svelte';
	import Steps from '$lib/components/ui/Steps.svelte';

	import { PUBLIC_STRIPE_KEY } from '$env/static/public';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let stripe: Stripe | null = null;
	let offerId: string | undefined = '';
	let paymentMethod: string | undefined = '';

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		if (data.shouldReset) {
			const t: ToastSettings = {
				message:
					'There was an issue processing your purchase. Please try again.',
			};
			toastStore.trigger(t);
			await goto('/shop');
		}
	});
</script>

<Toast />

<Steps steps={3} current={0} label="Quantity">
	<svelte:fragment slot="header">Select amount of coins</svelte:fragment>
	<div class="flex flex-row justify-between items-baseline">
		<span />
		<ProductSelection offers={data.offers} bind:value={offerId} />
		<PaymentMethodSelection
			enabledPaymentMethods={data.enabledPaymentMethods}
			bind:value={paymentMethod} />
		<span />
	</div>
</Steps>

{#if stripe}
	<Elements {stripe}>
		<!-- this is where your Stripe components go -->
	</Elements>
{/if}
