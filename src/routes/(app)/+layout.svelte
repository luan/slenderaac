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
	import {
		AppBar,
		AppShell,
		LightSwitch,
		Toast,
		toastStore,
	} from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';

	import { browser } from '$app/environment';
	import { afterNavigate, invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	import ServerStatus from '$lib/components/ui/ServerStatus.svelte';
	import SidebarLeft from '$lib/components/ui/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/ui/SidebarRight.svelte';
	import { browserTitle } from '$lib/utils';

	import { PUBLIC_DISCORD_URL, PUBLIC_TITLE } from '$env/static/public';

	import type { LayoutData } from './$types';
	import BoostedSection from '../../lib/components/ui/BoostedSection.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;

	$: ({
		highscores,
		isLoggedIn,
		boostedBoss,
		boostedCreature,
		serverOnline,
		onlinePlayerCount,
	} = data);
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
		if (browser && data.flash) {
			const { message, type: flashType } = data.flash;
			toastStore.trigger({
				message: message,
				background: `${
					flashType === 'success' ? 'bg-success-800' : 'bg-error-800'
				} text-white`,
			});
		}
	});

	onMount(() => {
		const interval = setInterval(() => invalidate('app:layout'), 5 * 1000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>{browserTitle(title)}</title>
</svelte:head>

{#if browser}
	<Toast />
{/if}

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

<AppShell
	slotSidebarLeft="w-0 md:w-56"
	slotSidebarRight="w-0 lg:w-56"
	slotHeader="md:py-1">
	<svelte:fragment slot="header">
		<AppBar
			background="variant-filled-secondary dark:md:bg-transparent md:bg-transparent"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotLead="md:w-48 flex items-center justify-center transition-all"
			slotTrail="flex flex-col md:h-full justify-end !items-end">
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<Fa icon={faBars} />
				</button>
				<div class="md:w-36 md:h-32">
					<img
						src="/images/logo.png"
						alt="logo"
						class="hidden md:block object-cover" />
				</div>
			</svelte:fragment>
			<div class="flex md:hidden items-center gap-2">
				<img src="/images/logo.png" alt="logo" class="h-12 -my-4" />
				{PUBLIC_TITLE}
			</div>
			<svelte:fragment slot="trail">
				<div class="hidden md:block w-48">
					<BoostedSection {boostedCreature} {boostedBoss} />
				</div>
				<div class="block md:hidden">
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<nav class="mx-4 mt-2 flex flex-col gap-2" slot="sidebarLeft">
		<SidebarLeft {isLoggedIn} {staticPages} />
		<nav class="hidden md:flex lg:hidden mx-4 mt-2 flex-col gap-2 pt-4">
			<SidebarRight {highscores} />
		</nav>
	</nav>
	<nav class="mx-4 mt-2 flex flex-col gap-2" slot="sidebarRight">
		<SidebarRight {highscores} />
	</nav>
	<svelte:fragment slot="pageHeader">
		<AppBar
			padding="py-2 pl-2 pr-1"
			class="hidden md:mr-2 lg:mr-0 md:block mt-2 text-white text-xs rounded-container-token variant-filled-secondary"
			slotTrail="!space-x-2"
			background="bg-secondary-500">
			<svelte:fragment slot="lead">
				<a
					href={PUBLIC_DISCORD_URL}
					target="_blank"
					rel="noreferrer"
					class="flex flex-row items-center gap-1">
					<Fa icon={faDiscord} />
					{$_('layout.join_discord')}
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ServerStatus {serverOnline} {onlinePlayerCount} />
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<main class="mx-2 md:ml-0 lg:mx-0 my-2 card card-surface transition-all">
		{#if title.length > 0}
			<div
				class="rounded-container-token px-4 py-1 bg-tertiary-900 text-warning-400">
				<h4 class="h4">{title}</h4>
			</div>
		{/if}

		<div class="px-4 pt-2 pb-2 overflow-y-auto">
			<slot />
		</div>
	</main>
	<svelte:fragment slot="pageFooter" />
</AppShell>
