import { PUBLIC_TITLE } from '$env/static/public';

/**
 * Converts a string to proper case with spaces between words.
 * @param str The string to convert.
 * @returns The converted string.
 */
export function toProperCase(str: string) {
	return str
		.replace(/([A-Z])/g, (c) => ` ${c.toLowerCase()}`)
		.replace(/^./, (str) => str.toUpperCase());
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function toTitleCase(str: string) {
	return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

/**
 * Generates a browser title from a page title.
 * @param pageTitle The page title.
 * @returns The browser title.
 */
export function browserTitle(pageTitle: string): string {
	return `${PUBLIC_TITLE} | ${toTitleCase(pageTitle)}`;
}
