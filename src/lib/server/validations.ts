import type { MaybePromise } from '@sveltejs/kit';
import invariant from 'tiny-invariant';

import { prisma } from '$lib/server/prisma';
import { $_, toProperCase, toTitleCase } from '$lib/utils';

import { PUBLIC_TITLE } from '$env/static/public';

export type ValidationRules = Record<
	string,
	Array<(value: unknown) => MaybePromise<string | null>>
>;

export async function validate(rules: ValidationRules, data: FormData) {
	const errors: Record<string, string[]> = {};
	for (const [key, validators] of Object.entries(rules)) {
		const value = data.get(key);
		for (const validator of validators) {
			const error = await validator(value);
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

export function numberValidator(value: unknown) {
	if (value && typeof Number(value) !== 'number') {
		return $_('validations.number');
	}
	return null;
}

export function emailValidator(value: unknown) {
	if (typeof value !== 'string') {
		return $_('validations.string');
	}
	if (!/^.*@.*$/.test(value)) {
		return $_('validations.email');
	}
	return null;
}

export function lengthValidator(min: number, max: number) {
	return (value: unknown) => {
		if (typeof value !== 'string') {
			return $_('validations.string');
		}
		if (value.length < min) {
			return $_('validations.min-length', { values: { min } });
		}
		if (value.length > max) {
			return $_('validations.max-length', { values: { max } });
		}
		return null;
	};
}

export function slugValidator(value: unknown) {
	invariant(typeof value === 'string', 'Slug must be a string');
	const lengthError = lengthValidator(3, 20)(value);
	if (lengthError) {
		return lengthError;
	}
	if (value !== value.toLowerCase()) {
		return $_('validations.lower-case');
	}
	if (!/^[a-z0-9-]+$/.test(value)) {
		return $_('validations.slug');
	}

	return null;
}

const BLOCKD_PREFIXES = [
	'gm ',
	'dm ',
	'god ',
	'cm ',
	'tutor ',
	'senior ',
	"'",
	'-',
];

const BLOCKED_WORDS = [
	'admin',
	'administrator',
	'gamemaster',
	'game master',
	'game-master',
	"game'master",
	'--',
	"''",
	"' ",
	" '",
	'- ',
	' -',
	"-'",
	"'-",
	PUBLIC_TITLE.toLowerCase(),
];

export function guildRankValidator(value: unknown) {
	if (typeof value !== 'string') {
		return $_('validations.string');
	}
	const lengthError = lengthValidator(3, 20)(value);
	if (lengthError) {
		return lengthError;
	}
	if (value.trim() !== value) {
		return $_('validations.blocked-words');
	}
	if (!/^\(?[a-z- ']+\)?$/.test(value.toLowerCase())) {
		return $_('validations.name');
	}
	return null;
}

export function guildNickValidator(value: unknown) {
	if (typeof value !== 'string') {
		return $_('validations.string');
	}
	if (value.length > 20) {
		return $_('validations.max-length', { values: { max: 20 } });
	}
	if (value.trim() !== value) {
		return $_('validations.blocked-words');
	}
	if (toTitleCase(value) !== value) {
		return $_('validations.title-case');
	}
	return null;
}

export async function characterNameValidator(value: unknown) {
	if (typeof value !== 'string') {
		return $_('validations.string');
	}
	const lengthError = lengthValidator(3, 20)(value);
	if (lengthError) {
		return lengthError;
	}
	if (toTitleCase(value) !== value) {
		return $_('validations.title-case');
	}
	for (const prefix of BLOCKD_PREFIXES) {
		if (value.toLowerCase().startsWith(prefix)) {
			return $_('validations.blocked-words');
		}
	}
	for (const blockedName of BLOCKED_WORDS) {
		if (value.toLowerCase().includes(blockedName)) {
			return $_('validations.blocked-words');
		}
	}
	if (value.trim() !== value) {
		return $_('validations.blocked-words');
	}
	if (!/^[a-z- ']+$/.test(value.toLowerCase())) {
		return $_('validations.name');
	}
	if ((await prisma.monsters.count({ where: { name: value } })) > 0) {
		return $_('validations.name-monster');
	}

	return null;
}
