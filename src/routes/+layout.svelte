<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faDiscord } from '@fortawesome/free-brands-svg-icons';

	import { PUBLIC_DISCORD_URL, PUBLIC_TITLE } from '$env/static/public';
	import SidebarLeft from '$lib/components/ui/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/ui/SidebarRight.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">{PUBLIC_TITLE}</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href={PUBLIC_DISCORD_URL} target="_blank" rel="noreferrer">
					<Fa icon={faDiscord} />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<nav class="m-4 w-48 flex flex-col gap-2" slot="sidebarLeft">
		<SidebarLeft />
	</nav>
	<nav class="m-4 w-48 flex flex-col gap-2" slot="sidebarRight">
		<SidebarRight />
	</nav>
	<main class="m-4">
		<slot />
	</main>
	<svelte:fragment slot="pageFooter" />
</AppShell>
