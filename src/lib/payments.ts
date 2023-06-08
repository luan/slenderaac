export const allSteps = ['selection', 'payment', 'confirmation'] as const;
export type Steps = (typeof allSteps)[number];

export function isStep(value: string): value is Steps {
	return ['selection', 'payment', 'confirmation'].includes(value);
}

export function stepIsAtOrAfter(step: Steps, other: Steps) {
	return allSteps.indexOf(step) >= allSteps.indexOf(other);
}
