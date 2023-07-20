import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const params = await request.json();
	console.log(params);
};
