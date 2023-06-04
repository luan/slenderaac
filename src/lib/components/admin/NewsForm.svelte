<script lang="ts">
	import type { News } from '@prisma/client';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { focusTrap, SlideToggle } from '@skeletonlabs/skeleton';
	// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
	import CodeMirror from 'svelte-codemirror-editor';

	import { enhance } from '$app/forms';

	import TextField from '$lib/components/ui/TextField.svelte';

	export let news: News | null = null;
	export let authorName: string | null = null;
	export let errors: Record<string, string[]> | null = null;
	let published = news ? news.published : false;
	let value = news ? news.content : '';

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
		value={news?.title}
		errors={errors?.title} />

	<input type="hidden" name="content" bind:value />
	<div class="label">
		<span
			>Content (<a
				tabindex="-1"
				href="https://markdoc.dev/docs/syntax"
				class="underline cursor-pointer">markdoc</a
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
	<label class="label flex flex-row items-center gap-2">
		<input
			class="hidden"
			type="checkbox"
			name="published"
			bind:checked={published} />
		<span>Publish</span>
		<SlideToggle name="slide" bind:checked={published} />
		{#if published}
			<span class="text-success-500-400-token">Yes</span>
			<span class="text-sm">(will be visible to the public)</span>
		{:else}
			<span class="text-error-500-400-token">No</span>
			<span class="text-sm">(will not be visible to the public)</span>
		{/if}
	</label>

	<div>
		{#if authorName}
			This article will be published by your main character {authorName}.
		{/if}
	</div>

	<button type="submit" class="btn variant-filled-primary">Save</button>
</form>
