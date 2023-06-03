import type { AccountType } from '$lib/accounts';

declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			accountId?: number;
			email?: string;
			type?: AccountType;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
