<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import {
		faBookBookmark,
		faGifts,
		faNewspaper,
		faPeopleArrows,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { PUBLIC_DOWNLOAD_URL } from '$env/static/public';
</script>

<div
	class="card bg-tertiary-500 dark:bg-tertiary-800 card-hover overflow-hidden">
	<div class="flex flex-col gap-0 py-2 px-2 items-center">
		<a href="#" class="btn variant-filled-primary w-full">Login</a>
		<a
			href="/signup"
			class="btn btn-sm variant-soft-secondary text-white w-2/3 text-xs p-0.5 rounded-t-none">
			Create account
		</a>
	</div>
	<hr class="opacity-5" />
	<div class="py-2 px-2">
		<a
			href={PUBLIC_DOWNLOAD_URL}
			class="btn btn-sm variant-filled-primary w-full text-xs p-1">
			Download
		</a>
	</div>
</div>

<div
	class="card bg-tertiary-500 dark:bg-tertiary-800 text-white card-hover overflow-hidden">
	<article class="py-2 px-2">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faNewspaper} /></svelte:fragment>
				<svelte:fragment slot="summary">News</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="#">Latest news</a></li>
							<li><a href="#">News archive</a></li>
							<li><a href="#">Event schedule</a></li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"
					><Fa icon={faPeopleArrows} /></svelte:fragment>
				<svelte:fragment slot="summary">Community</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="/characters">Characters</a></li>
							<li><a href="#">Worlds</a></li>
							<li><a href="#">Highscores</a></li>
							<li><a href="#">Latest deaths</a></li>
							<li><a href="#">Power gamers</a></li>
							<li><a href="#">Guilds</a></li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"
					><Fa icon={faBookBookmark} /></svelte:fragment>
				<svelte:fragment slot="summary">Library</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="#">Server info</a></li>
							<li><a href="#">Loyalty</a></li>
							<li><a href="#">Commands</a></li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"
					><Fa icon={faBookBookmark} /></svelte:fragment>
				<svelte:fragment slot="summary">About</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="#">Staff</a></li>
							<li><a href="#">Rules</a></li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faGifts} /></svelte:fragment>
				<svelte:fragment slot="summary">Shop</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav">
						<ul>
							<li><a href="#">Buy coins</a></li>
						</ul>
					</nav>
				</svelte:fragment>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
	</article>
</div>
