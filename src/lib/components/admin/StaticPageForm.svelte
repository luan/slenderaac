<script lang="ts">
	import type { StaticPage } from '@prisma/client';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { focusTrap, toastStore } from '@skeletonlabs/skeleton';
	// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
	import CodeMirror from 'svelte-codemirror-editor';

	import { applyAction, enhance } from '$app/forms';

	import TextField from '$lib/components/ui/forms/TextField.svelte';
	import { hotkeys } from '$lib/hotkeys';

	export let staticPage: StaticPage | null = null;
	export let errors: Record<string, string[]> | null = null;
	$: ({ title, slug } = staticPage ?? {
		title: '',
		slug: '',
	});
	let value = staticPage?.content ?? '';

	let isFocused = true;
	let form: HTMLFormElement;

	function save() {
		form.requestSubmit();
	}
</script>

<form
	bind:this={form}
	method="post"
	class="flex flex-col gap-2 max-w-3xl"
	data-hotkeys-global
	use:hotkeys={[
		{ key: 's', metaKey: true, fn: save },
		{ key: 's', ctrlKey: true, fn: save },
	]}
	use:focusTrap={isFocused}
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				toastStore.trigger({
					background: 'bg-success-500',
					message: 'Saved',
					timeout: 1000,
				});
			}
			return applyAction(result);
		};
	}}>
	{#if errors?.global}
		<p class="text-xs text-error-500">{errors.global}</p>
	{/if}

	<TextField label="Title" name="title" value={title} errors={errors?.title} />

	<TextField label="Slug" name="slug" value={slug} errors={errors?.slug} />

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

	<div class="flex flex-row gap-2 w-full">
		<a href="/admin/static-pages" class="btn variant-filled-secondary flex-grow"
			>Go back</a>
		<button type="submit" class="btn variant-filled-primary flex-grow"
			>Save</button>
	</div>
</form>
