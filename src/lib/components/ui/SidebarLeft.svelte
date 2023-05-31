<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import {
		faBookBookmark,
		faGifts,
		faNewspaper,
		faPeopleArrows,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

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
		<svelte:fragment slot="lead"><Fa icon={faPeopleArrows} /></svelte:fragment>
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
		<svelte:fragment slot="lead"><Fa icon={faBookBookmark} /></svelte:fragment>
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
		<svelte:fragment slot="lead"><Fa icon={faBookBookmark} /></svelte:fragment>
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
