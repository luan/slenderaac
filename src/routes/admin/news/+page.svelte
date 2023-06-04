<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	export let data: PageData;

	function updatePublished(id: string, published: boolean) {
		return async () => {
			const formData = new FormData();
			formData.append('published', published ? 'on' : '');
			const res = await fetch(`/admin/news/${id}`, {
				method: 'POST',
				body: formData,
			});

			if (res.ok) {
				const news = data.news.find((n) => n.id === id);
				if (news) news.published = published;
			}
		};
	}
</script>

<h1 class="h1">News</h1>
<a href="/admin/news/new" class="btn variant-filled-primary">Create</a>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Title</th>
				<th class="w-48">Author</th>
				<th class="w-48">Date</th>
				<th class="w-16">Published?</th>
				<th class="w-16">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.news as news}
				<tr class="[&>td]:!align-middle">
					<td>{news.title}</td>
					<td>{news.author.name}</td>
					<td>{new Date(Number(news.published_at)).toLocaleString()}</td>
					<td
						><SlideToggle
							name="slide"
							bind:checked={news.published}
							on:change={updatePublished(news.id, news.published)} />
					</td>
					<td>
						<div class="flex flex-col items-center gap-1">
							<a
								href="/admin/news/{news.id}"
								class="btn btn-sm variant-filled-primary">Edit</a>
							<form action="/admin/news/{news.id}" method="post">
								<input type="hidden" name="_method" value="DELETE" />
								<button type="submit" class="btn btn-sm variant-filled-error"
									>Delete</button>
							</form>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
