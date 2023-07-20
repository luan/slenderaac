import {
	PUBLIC_ENABLE_PRONOUNS,
	PUBLIC_TUTORIAL_ENABLED,
} from '$env/static/public';

export const pronounsEnabled = PUBLIC_ENABLE_PRONOUNS === 'true';
export const tutorialEnabled = PUBLIC_TUTORIAL_ENABLED === 'true';
