<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
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
	import { faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	import { page } from '$app/stores';

	import { browserTitle } from '$lib/utils';

	import type { LayoutData } from './$types';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;

	$: title = typeof $page.data.title === 'string' ? $page.data.title : '';
</script>

<svelte:head>
	<title>{browserTitle(title, { admin: true })}</title>
</svelte:head>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav">
			<ul class="[&_a]:flex [&_a]:flex-row [&_a]:gap-2 [&_a]:items-center">
				<li><a href="/admin/"><Fa icon={faHome} />Home</a></li>
				<li><a href="/admin/news/"><Fa icon={faNewspaper} />News</a></li>
			</ul>
		</nav>
	</svelte:fragment>

	<div class="container mx-auto p-8 space-y-8">
		<slot />
	</div>
</AppShell>
