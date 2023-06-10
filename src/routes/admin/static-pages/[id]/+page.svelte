<script lang="ts">
	import StaticPageForm from '$lib/components/admin/StaticPageForm.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: staticPage = form?.staticPage ?? data.staticPage;
</script>

<StaticPageForm {staticPage} errors={form?.errors} />
