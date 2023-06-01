import type { PageLoad } from './$types';

export const load = (() => {
	return {
		title: `Create an account`,
	};
}) satisfies PageLoad;
