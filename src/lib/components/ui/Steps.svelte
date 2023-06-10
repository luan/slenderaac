<script lang="ts">
	export let steps: number;
	export let current = 0;
	import { _ } from 'svelte-i18n';

	export let label = $_('step');
</script>

<div class="stepper space-y-4">
	<header
		class="stepper-header flex items-center border-t mt-[15px] border-surface-400-500-token gap-4">
		{#each Array.from({ length: steps }) as _, i}
			<div
				class="stepper-header-step -mt-[15px] transition-all duration-300 flex-1"
				class:flex-1={i === current}>
				<span
					class="badge {i === current
						? 'variant-filled'
						: 'variant-filled-surface'}"
					>{i + 1}{i === current ? `. ${label}` : ''}</span>
			</div>
		{/each}
	</header>
	<div class="stepper-content">
		<div class="step space-y-4">
			<div class="step-content space-y-4">
				<slot />
			</div>
		</div>
	</div>
</div>
