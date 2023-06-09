import { type Cookies, redirect } from '@sveltejs/kit';

export type Flash = {
	type: 'error' | 'success';
	message: string;
};

export function redirectWithFlash(
	path: string,
	cookies: Cookies,
	flash: Flash,
) {
	const maxAge = 1000 * 60;
	cookies.set('flashMessage', JSON.stringify(flash), { maxAge });
	throw redirect(302, path);
}
