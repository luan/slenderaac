<script lang="ts">
	import type { StaticPage } from '@prisma/client';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { focusTrap } from '@skeletonlabs/skeleton';
	// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
	import CodeMirror from 'svelte-codemirror-editor';

	import { enhance } from '$app/forms';

	import TextField from '$lib/components/ui/TextField.svelte';

	export let staticPage: StaticPage | null = null;
	export let errors: Record<string, string[]> | null = null;
	let value = staticPage ? staticPage.content : '';

	let isFocused = true;
</script>

<form
	method="post"
	class="flex flex-col gap-2 max-w-3xl"
	use:focusTrap={isFocused}
	use:enhance>
	{#if errors?.global}
		<p class="text-xs text-error-500">{errors.global}</p>
	{/if}

	<TextField
		label="Title"
		name="title"
		value={staticPage?.title}
		errors={errors?.title} />

	<TextField
		label="Slug"
		name="slug"
		value={staticPage?.slug}
		errors={errors?.slug} />

	<input type="hidden" name="content" bind:value />
	<div class="label">
		<span
			>Content (<a
				tabindex="-1"
				href="https://markdoc.dev/docs/syntax"
				class="anchor cursor-pointer">markdoc</a
			>)</span>
		<CodeMirror
			bind:value
			lang={markdown()}
			theme={oneDark}
			styles={{
				'&': {
					minHeight: '30rem',
					maxHeight: '75vh',
				},
			}} />
		{#if errors?.content}
			<p class="text-xs text-error-500-400-token">{errors.content}</p>
		{/if}
	</div>

	<button type="submit" class="btn variant-filled-primary">Save</button>
</form>
