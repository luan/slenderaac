import { createHash } from 'crypto';

/**
 * Hashes a password.
 * @param password The password to hash.
 * @returns The hashed password.
 */
export function hashPassword(password: string) {
	return createHash('sha1').update(password).digest('hex');
}
