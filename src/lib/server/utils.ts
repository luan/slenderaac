import { compareSync, hashSync } from 'bcrypt';

const BCRYPT_ROUNDS = 12;

/**
 * Hashes a password.
 * @param password The password to hash.
 * @returns The hashed password.
 */
export function hashPassword(password: string) {
	return hashSync(password, BCRYPT_ROUNDS);
}

/**
 * Compares a password with a hash.
 * @param password The password to compare.
 * @param hash The hash to compare.
 * @returns Whether the password matches the hash.
 */
export function comparePassword(password: string, hash: string) {
	return compareSync(password, hash);
}
