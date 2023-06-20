<script lang="ts">
	import type { StaticPage } from '@prisma/client';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { focusTrap, SlideToggle, toastStore } from '@skeletonlabs/skeleton';
	// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
	import CodeMirror from 'svelte-codemirror-editor';

	import { applyAction, enhance } from '$app/forms';

	import Button from '$lib/components/ui/Button.svelte';
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

	let hideFromMenu = staticPage?.hide ?? false;

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

	<TextField
		required
		label="Title"
		name="title"
		value={title}
		errors={errors?.title} />

	<TextField
		required
		label="Slug"
		name="slug"
		value={slug}
		errors={errors?.slug} />

	<label class="label flex flex-row items-center gap-2">
		<input
			class="hidden"
			type="checkbox"
			name="hide"
			bind:checked={hideFromMenu} />
		<span>Hide from menu</span>
		<SlideToggle name="slide" bind:checked={hideFromMenu} />
	</label>

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
		<Button href="/admin/static-pages" color="secondary" class="flex-grow"
			>Go back</Button>
		<Button type="submit" class="flex-grow">Save</Button>
	</div>
</form>
