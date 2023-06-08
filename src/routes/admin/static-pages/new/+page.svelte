<script lang="ts">
	import StaticPageForm from '$lib/components/admin/StaticPageForm.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<StaticPageForm errors={form?.errors} />
