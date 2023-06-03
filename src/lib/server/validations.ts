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
		return ':field is required';
	}
	return null;
}

export function stringValidator(value: unknown) {
	if (typeof value !== 'string') {
		return ':field must be a string';
	}
	return null;
}

export function nameValidator(value: unknown) {
	if (typeof value !== 'string') {
		return ':field must be a string';
	}
	if (value.length < 3) {
		return ':field must be at least 3 characters';
	}
	if (value.length > 20) {
		return ':field must be no more than 20 characters';
	}
	if (toTitleCase(value) !== value) {
		return ':field must be in title case';
	}
	return null;
}
