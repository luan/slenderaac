import type { AccountType } from '$lib/accounts';

declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			email?: string;
			type?: AccountType;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
