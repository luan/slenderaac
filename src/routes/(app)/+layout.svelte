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
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import SidebarLeft from '$lib/components/ui/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/ui/SidebarRight.svelte';
	import { browserTitle } from '$lib/utils';

	import { PUBLIC_DISCORD_URL, PUBLIC_TITLE } from '$env/static/public';

	import type { LayoutData } from './$types';
	import BoostedSection from '../../lib/components/ui/BoostedSection.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;

	$: ({ highscores, isLoggedIn, boostedBoss, boostedCreature } = data);
	$: title = typeof $page.data.title === 'string' ? $page.data.title : '';
	$: staticPages = data.staticPages;

	function drawerOpen(): void {
		drawerStore.open({});
	}
	function drawerClose(): void {
		drawerStore.close();
	}

	afterNavigate(() => {
		drawerClose();
	});
</script>

<svelte:head>
	<title>{browserTitle(title)}</title>
</svelte:head>

<Drawer
	width="w-56"
	bgDrawer="bg-tertiary-900/75 dark:bg-tertiary-800/75"
	bgBackdrop="bg-tertiary-900/50 backdrop-blur-sm">
	<div class="flex flex-col items-stretch gap-2 p-2 pt-4">
		<SidebarLeft {isLoggedIn} {staticPages} />
		<BoostedSection {boostedCreature} {boostedBoss} />
		<SidebarRight {highscores} />
	</div>
</Drawer>

<AppShell slotSidebarLeft="w-0 lg:w-56" slotSidebarRight="w-0 lg:w-56">
	<svelte:fragment slot="header">
		<AppBar
			background="variant-filled-secondary dark:lg:bg-transparent lg:bg-transparent"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div
					class="lg:w-48 h-full flex items-center justify-center transition-all">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<Fa icon={faBars} />
					</button>
					<img src="/images/logo.png" alt="logo" class="hidden lg:block" />
				</div>
			</svelte:fragment>
			<div class="flex lg:hidden items-center gap-2">
				<img src="/images/logo.png" alt="logo" class="h-12 -my-4" />
				{PUBLIC_TITLE}
			</div>
			<svelte:fragment slot="trail">
				<div class="hidden lg:block w-48">
					<BoostedSection {boostedCreature} {boostedBoss} />
				</div>
				<div class="block lg:hidden">
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<nav class="mx-4 mt-2 flex flex-col gap-2" slot="sidebarLeft">
		<SidebarLeft {isLoggedIn} {staticPages} />
	</nav>
	<nav class="mx-4 mt-2 flex flex-col gap-2" slot="sidebarRight">
		<SidebarRight {highscores} />
	</nav>
	<svelte:fragment slot="pageHeader">
		<AppBar
			padding="py-2 pl-2 pr-1"
			class="hidden lg:block mt-2 text-white text-xs rounded-lg variant-filled-secondary"
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

	<main class="mx-2 lg:mx-0 my-2 card card-surface transition-all">
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
