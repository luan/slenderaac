<script lang="ts">
	import {
		faArrowLeft,
		faCartShopping,
		faLock,
	} from '@fortawesome/free-solid-svg-icons';
	import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';
	import {
		loadStripe,
		type Stripe,
		type StripeElements,
	} from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import {
		Elements,
		LinkAuthenticationElement,
		PaymentElement,
		PaymentRequestButton,
	} from 'svelte-stripe';

	import { goto } from '$app/navigation';

	import {
		PUBLIC_BASE_URL,
		PUBLIC_STRIPE_KEY,
		PUBLIC_TITLE,
	} from '$env/static/public';

	export let email: string;
	export let offerId: string;
	export let clientSecret: string;

	let stripe: Stripe | null = null;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});

	let processing = false;
	let elements: StripeElements;

	async function submitPayment() {
		if (processing || !stripe) return;

		processing = true;

		const result = await stripe.confirmPayment({
			elements,
			redirect: 'always',
			confirmParams: {
				return_url: `${PUBLIC_BASE_URL}/shop/coins?step=confirmation`,
			},
		});
		if (result.error) {
			processing = false;
			toastStore.trigger({
				message:
					result.error.message ?? 'Something went wrong, please try again.',
				background: 'variant-filled-error',
				autohide: false,
			});
		}
	}
</script>

{#if stripe}
	<form on:submit|preventDefault={submitPayment} class="flex flex-col gap-2">
		<input type="hidden" name="offerId" value={offerId} />
		<input type="hidden" name="paymentMethod" value="stripe" />
		<Elements
			loader="always"
			{stripe}
			bind:elements
			{clientSecret}
			theme="flat"
			labels="floating"
			variables={{
				colorPrimary: '#000000aa',
				colorBackground: 'var(--color-surface-800)',
			}}>
			<LinkAuthenticationElement defaultValues={{ email }} />

			<PaymentRequestButton
				paymentRequest={{
					country: 'US',
					currency: 'usd',
					total: { label: 'Demo total', amount: 199 },
					requestPayerName: true,
					requestPayerEmail: true,
				}} />
			<PaymentElement />
		</Elements>
		<div
			class="flex justify-between gap-4 items-center p-4 lg:px-12 text-sm italic">
			<span class="text-success-600-300-token">
				<Fa icon={faLock} />
			</span>
			<span>
				{PUBLIC_TITLE} uses
				<a href="https://stripe.com" class="anchor" target="_blank">Stripe</a> to
				process payments. Your payment information never goes through our servers.
			</span>
		</div>
		<div class="step-navigation flex justify-between gap-4">
			<button
				disabled={processing}
				type="button"
				class="btn variant-ghost flex-row gap-1"
				on:click={() => goto('/shop/coins')}>
				<Fa icon={faArrowLeft} /> Back
			</button>
			<button
				disabled={processing}
				type="submit"
				class="btn variant-filled-primary flex-row gap-1">
				{#if processing}
					<ProgressRadial
						width="w-4"
						stroke={150}
						meter="stroke-warning-500"
						track="stroke-primary-400" />
					Processing...
				{:else}
					<Fa icon={faCartShopping} /> Pay
				{/if}
			</button>
		</div>
	</form>
{/if}
