<script lang="ts">
	import NewsForm from '$lib/components/admin/NewsForm.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<NewsForm news={data.news} errors={form?.errors} />
