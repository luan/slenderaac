<script lang="ts">
	import {
		faCheckCircle,
		faCircle,
		faCircleExclamation,
		faCircleXmark,
	} from '@fortawesome/free-solid-svg-icons';
	import { CoinOrderStatus } from '@prisma/client';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';

	import { invalidate } from '$app/navigation';

	import { PUBLIC_SUPPORT_EMAIL, PUBLIC_TITLE } from '$env/static/public';

	export let status: CoinOrderStatus;
	export let amount: number;

	const MAX_TRIES = 10;
	let tries = 0;

	onMount(() => {
		const interval = setInterval(async () => {
			await invalidate('shop:order');
			tries++;
			if (
				status === CoinOrderStatus.COMPLETED ||
				status === CoinOrderStatus.CANCELED ||
				tries >= MAX_TRIES
			) {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	const nonFinalStatus: CoinOrderStatus[] = [
		CoinOrderStatus.PENDING,
		CoinOrderStatus.FAILED_ATTEMPT,
	];
	$: isFinal = !nonFinalStatus.includes(status);
	$: processing = !isFinal && tries < MAX_TRIES;

	$: headerText = {
		[CoinOrderStatus.PENDING]: processing
			? 'We are processing your order...'
			: 'Confirming your order is taking longer than expected.',
		[CoinOrderStatus.FAILED_ATTEMPT]: processing
			? 'There may have been a problem with your order...'
			: 'There was a problem with your order.',
		[CoinOrderStatus.COMPLETED]: 'Thank you for your order!',
		[CoinOrderStatus.CANCELED]: 'Your order has been canceled.',
	}[status];

	$: icon = {
		[CoinOrderStatus.PENDING]: faCircle,
		[CoinOrderStatus.FAILED_ATTEMPT]: faCircleExclamation,
		[CoinOrderStatus.COMPLETED]: faCheckCircle,
		[CoinOrderStatus.CANCELED]: faCircleXmark,
	}[status];

	$: meterClass = {
		[CoinOrderStatus.PENDING]: 'bg-primary-700',
		[CoinOrderStatus.FAILED_ATTEMPT]: 'bg-error-700',
		[CoinOrderStatus.COMPLETED]: 'bg-success-700',
		[CoinOrderStatus.CANCELED]: 'bg-warning-700',
	}[status];
	$: textClass = {
		[CoinOrderStatus.PENDING]: 'text-primary-700',
		[CoinOrderStatus.FAILED_ATTEMPT]: 'text-error-700',
		[CoinOrderStatus.COMPLETED]: 'text-success-700',
		[CoinOrderStatus.CANCELED]: 'text-warning-700',
	}[status];
</script>

<header class="step-header text-2xl font-bold">
	{headerText}
</header>
<ProgressBar
	meter="{meterClass} transition-all duration-1000"
	max={1}
	value={processing ? undefined : 1} />
<div
	class="transition-all duration-1000 placeholder flex flex-row items-center justify-center {textClass}"
	class:animate-pulse={processing}>
	{#if !processing}
		<span transition:fade={{ duration: 1000 }}>
			<Fa {icon} class="text-3xl" />
		</span>
	{/if}
</div>
{#if !processing}
	<div class="py-4 px-8 text-center" transition:slide={{ duration: 1000 }}>
		{#if !isFinal}
			Processing your order is taking longer than expected, please reach us at <a
				href="mailto:{PUBLIC_SUPPORT_EMAIL}"
				class="anchor">{PUBLIC_SUPPORT_EMAIL}</a> for assistance. for assistance.
		{:else if status === CoinOrderStatus.CANCELED}
			It seems you have canceled your payment. If you have any questions, please
			reach us at <a href="mailto:{PUBLIC_SUPPORT_EMAIL}" class="anchor"
				>{PUBLIC_SUPPORT_EMAIL}</a
			>. If you want to try again, please go back to the previous step, your
			payment method has not been charged.
		{:else if status === CoinOrderStatus.COMPLETED}
			Your order of {amount}
			{PUBLIC_TITLE} coins has been confirmed.<br />Your account has been
			credited with the coins.
		{/if}
	</div>
	<div class="flex flex-row w-full justify-between">
		<a href="/shop/coin" class="btn variant-filled">Go back to the shop</a>
		<a href="/account" class="btn variant-filled-primary">My Account</a>
	</div>
{/if}
