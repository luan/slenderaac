import type { Player } from '$lib/players';

import type { PageLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const search = url.searchParams.get('search');
	if (!search || search.length < 1) {
		return { results: [] };
	}

	const response = await fetch(`/api/search/characters?q=${search}&guild=0`);
	const data = (await response.json()) as { results: Player[] };

	return {
		...data,
	};
}) satisfies PageLoad;
