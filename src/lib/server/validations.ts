import { _, unwrapFunctionStore } from 'svelte-i18n';

const $_ = unwrapFunctionStore(_);

import invariant from 'tiny-invariant';

import { toProperCase, toTitleCase } from '$lib/utils';

export type ValidationRules = Record<
	string,
	Array<(value: unknown) => string | null>
>;

export function validate(rules: ValidationRules, data: FormData) {
	const errors: Record<string, string[]> = {};
	for (const [key, validators] of Object.entries(rules)) {
		const value = data.get(key);
		for (const validator of validators) {
			const error = validator(value);
			if (error) {
				errors[key] ||= [];
				errors[key].push(error.replace(':field', toProperCase(key)));
			}
		}
	}
	return errors;
}

export function presenceValidator(value: unknown) {
	if (!value) {
		return $_('validations.required');
	}
	return null;
}

export function stringValidator(value: unknown) {
	if (value && typeof value !== 'string') {
		return $_('validations.string');
	}
	return null;
}

export function emailValidator(value: unknown) {
	if (typeof value !== 'string') {
		return $_('validations.string');
	}
	if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
		return $_('validations.email');
	}
	return null;
}

export function slugValidator(value: unknown) {
	invariant(typeof value === 'string', 'Slug must be a string');
	if (value.length < 3) {
		return $_('validations.min-length', { values: { min: 3 } });
	}
	if (value.length > 20) {
		return $_('validations.max-length', { values: { max: 20 } });
	}
	if (value !== value.toLowerCase()) {
		return $_('validations.lower-case');
	}
	if (!/^[a-z0-9-]+$/.test(value)) {
		return $_('validations.slug');
	}

	return null;
}

const BLOCKED_NAMES = [
	'admin',
	'administrator',
	'gm',
	'cm',
	'god',
	'tutor',
	'mod',
	'moderator',
	'moderators',
	'player',
	'players',
	'character',
	'characters',
	'charactername',
	'character-name',
];

export function characterNameValidator(value: unknown) {
	if (typeof value !== 'string') {
		return $_('validations.string');
	}
	if (value.length < 3) {
		return $_('validations.min-length', { values: { min: 3 } });
	}
	if (value.length > 20) {
		return $_('validations.max-length', { values: { max: 20 } });
	}
	if (toTitleCase(value) !== value) {
		return $_('validations.title-case');
	}

	for (const blockedName of BLOCKED_NAMES) {
		if (value.toLowerCase().includes(blockedName)) {
			return $_('validations.blocked-words');
		}
	}

	return null;
}
