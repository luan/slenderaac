<script lang="ts">
	import {
		faBookBookmark,
		faGifts,
		faNewspaper,
		faPeopleArrows,
	} from '@fortawesome/free-solid-svg-icons';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';

	import { PUBLIC_DOWNLOAD_URL } from '$env/static/public';

	export let isLoggedIn = false;
	export let staticPages: { title: string; slug: string }[];
</script>

<div class="card card-tertiary card-hover overflow-hidden">
	<div class="flex flex-col gap-0 py-2 px-2 items-center">
		{#if isLoggedIn}
			<a href="/account" class="btn variant-filled-primary w-full">
				{$_('my-account')}
			</a>
			<form action="/account/logout" method="post" class="flex w-2/3">
				<button
					type="submit"
					class="btn btn-sm variant-soft-secondary text-white text-xs p-0.5 rounded-t-none w-full">
					{$_('logout')}
				</button>
			</form>
		{:else}
			<a href="/account/login" class="btn variant-filled-primary w-full"
				>{$_('login')}</a>
			<a
				href="/account/signup"
				class="btn btn-sm variant-soft-secondary text-white w-2/3 text-xs p-0.5 rounded-t-none">
				{$_('create-account')}
			</a>
		{/if}
	</div>
	<hr class="opacity-5" />
	<div class="py-2 px-2">
		<a
			href={PUBLIC_DOWNLOAD_URL}
			class="btn btn-sm variant-filled-primary w-full text-xs p-1">
			{$_('download')}
		</a>
	</div>
</div>

<div class="card card-tertiary text-white overflow-hidden">
	<article class="py-2 px-2">
		<Accordion>
			<AccordionItem open>
				<svelte:fragment slot="lead"><Fa icon={faNewspaper} /></svelte:fragment>
				<svelte:fragment slot="summary">{$_('news')}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="/">{$_('latest-news')}</a></li>
							<!-- <li><a href="/news-archive">News archive</a></li> -->
							<!-- <li><a href="/events">Event schedule</a></li> -->
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem open>
				<svelte:fragment slot="lead"
					><Fa icon={faPeopleArrows} /></svelte:fragment>
				<svelte:fragment slot="summary">{$_('community')}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="/characters">{$_('characters')}</a></li>
							<li><a href="/online">{$_('whos-online')}</a></li>
							<li><a href="/highscores">{$_('highscores')}</a></li>
							<li><a href="/guilds">{$_('guilds.title')}</a></li>
							<!-- <li><a href="/latest-deaths">Latest deaths</a></li> -->
							<!-- <li><a href="#">Power gamers</a></li> -->
							<!-- <li><a href="#">Staff</a></li> -->
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem open>
				<svelte:fragment slot="lead"
					><Fa icon={faBookBookmark} /></svelte:fragment>
				<svelte:fragment slot="summary">{$_('library')}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							{#each staticPages as page}
								<li>
									<a href={`/pages/${page.slug}`}>{page.title}</a>
								</li>
							{/each}
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem open>
				<svelte:fragment slot="lead"><Fa icon={faGifts} /></svelte:fragment>
				<svelte:fragment slot="summary">{$_('shop.title')}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="/shop">{$_('buy-coins')}</a></li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</article>
</div>
