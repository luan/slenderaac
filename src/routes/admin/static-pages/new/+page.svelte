<script lang="ts">
	import StaticPageForm from '$lib/components/admin/StaticPageForm.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<StaticPageForm errors={form?.errors} />
