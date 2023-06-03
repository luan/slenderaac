import type { LayoutLoad } from './$types';

export const load = (({ data }) => {
	return {
		...data,
		title: `Account Management`,
	};
}) satisfies LayoutLoad;
