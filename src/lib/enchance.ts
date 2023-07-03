import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

import { applyAction, enhance as original } from '$app/forms';
import { goto } from '$app/navigation';

import { setLoading } from '$lib/stores/loading';

export function enhance(form: HTMLFormElement, submit?: SubmitFunction) {
	async function handleSubmit(input: Parameters<SubmitFunction>[0]) {
		setLoading(true);
		if (submit) {
			const callback = await submit(input);
			setLoading(false);
			return callback;
		}

		const noReset = form.dataset['enhanceNoreset'] != null;
		const noScroll = form.dataset['enhanceNoscroll'] != null;

		return async ({
			result,
			update,
		}: {
			result: ActionResult;
			update: (options?: { reset: boolean }) => Promise<void>;
		}) => {
			setLoading(false);
			if (result.type === 'error') {
				return applyAction(result);
			}
			if (result.type === 'success') {
				return update({ reset: !noReset });
			}
			if (noScroll && result.type === 'redirect') {
				return goto(result.location, {
					invalidateAll: true,
					noScroll: true,
					replaceState: true,
				});
			}
			return applyAction(result);
		};
	}
	return original(form, handleSubmit);
}
