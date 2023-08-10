import {
	ENABLE_STRIPE_CHECKOUT,
	ENABLE_STRIPE_CUSTOM,
} from '$env/static/private';

export const enableStripeCustom = ENABLE_STRIPE_CUSTOM === 'true';
export const enableStripeCheckout = ENABLE_STRIPE_CHECKOUT === 'true';
