<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';

	import { getPaymentMethodIcon, toProperCase } from '$lib/utils';

	export let enabledPaymentMethods: string[];
	export let value = '';

	$: if (
		enabledPaymentMethods.length === 1 ||
		!enabledPaymentMethods.includes(value)
	) {
		value = enabledPaymentMethods[0];
	}
</script>

{#if enabledPaymentMethods.length === 1}
	<input type="hidden" name="paymentMethod" {value} />
{:else}
	<div class="flex flex-col gap-4">
		<h4 class="h4">{$_('shop.payment-method')}</h4>
		<RadioGroup display="flex-col">
			{#each enabledPaymentMethods as paymentMethod}
				<RadioItem bind:group={value} name="offer" value={paymentMethod}>
					<div class="flex flex-row gap-2 items-center p-1">
						<Fa icon={getPaymentMethodIcon(paymentMethod)} />
						{toProperCase(paymentMethod)}
					</div>
				</RadioItem>
			{/each}
		</RadioGroup>
	</div>
{/if}
