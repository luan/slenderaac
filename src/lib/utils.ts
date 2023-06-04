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
export function browserTitle(
	pageTitle: string,
	{ admin }: { admin: boolean } = { admin: false },
): string {
	return `${PUBLIC_TITLE}${admin ? ' | Admin' : ''}${
		pageTitle.length > 0 ? ' | ' : ''
	}${toTitleCase(pageTitle)}`;
}

/**
 * Deep merges two objects.
 * @param target The target object.
 * @param source The source object.
 * @returns The merged object.
 */
export function deepMerge<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	U extends Record<string, any>,
>(target: T, source: U): T & U {
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object)
			Object.assign(source[key], deepMerge(target[key], source[key]));
	}

	Object.assign(target || {}, source);
	return target as T & U;
}
