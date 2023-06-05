<script lang="ts">
	import './theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import 'svooltip/styles.css';
	import './app.postcss';

	import {
		arrow,
		autoUpdate,
		computePosition,
		flip,
		offset,
		shift,
	} from '@floating-ui/dom';
	import { faDiscord } from '@fortawesome/free-brands-svg-icons';
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	import { page } from '$app/stores';

	import Boosted from '$lib/components/ui/Boosted.svelte';
	import SidebarLeft from '$lib/components/ui/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/ui/SidebarRight.svelte';
	import { browserTitle } from '$lib/utils';

	import { PUBLIC_DISCORD_URL } from '$env/static/public';

	import type { LayoutData } from './$types';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;

	$: ({ highscores, isLoggedIn, boostedBoss, boostedCreature } = data);
	$: title = typeof $page.data.title === 'string' ? $page.data.title : '';
</script>

<svelte:head>
	<title>{browserTitle(title)}</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<div class="mx-4 mt-4 h-24 flex flex-row">
			<div class="w-auto h-full">
				<div class="w-48 h-full flex items-center justify-center">
					<img src="/images/logo.png" alt="logo" />
				</div>
			</div>
			<div class="w-full h-full" />
			<div class="w-auto h-full flex items-end">
				<div class="w-48">
					<div
						class="card !bg-tertiary-500/75 dark:!bg-tertiary-800/75 card-hover overflow-hidden backdrop-blur-sm rounded-full">
						<div class="py-4 px-6 flex flex-row justify-between">
							<Boosted boosted={boostedCreature} />
							<Boosted boosted={boostedBoss} />
						</div>
					</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
	<nav class="mx-4 mt-2 w-48 flex flex-col gap-2" slot="sidebarLeft">
		<SidebarLeft {isLoggedIn} />
	</nav>
	<nav class="mx-4 mt-2 w-48 flex flex-col gap-2" slot="sidebarRight">
		<SidebarRight {highscores} />
	</nav>
	<svelte:fragment slot="pageHeader">
		<AppBar
			padding="py-2 pl-2 pr-1"
			class="mt-2 text-white text-xs rounded-lg variant-filled-secondary"
			background="bg-secondary-500">
			<svelte:fragment slot="lead">
				<a
					href={PUBLIC_DISCORD_URL}
					target="_blank"
					rel="noreferrer"
					class="flex flex-row items-center gap-1">
					<Fa icon={faDiscord} />
					Join Discord
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch height="h-5" width="w-10" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<main class="my-2 card card-surface">
		{#if title.length > 0}
			<div class="rounded-t-md px-4 py-1 bg-success-900 text-warning-400">
				<h4 class="h4">{title}</h4>
			</div>
		{/if}

		<div class="px-4 pt-2 pb-2 overflow-y-auto">
			<slot />
		</div>
	</main>
	<svelte:fragment slot="pageFooter" />
</AppShell>
