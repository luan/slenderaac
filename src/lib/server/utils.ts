import type { Algorithm } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt';
import { authenticator } from 'otplib';

import { prisma } from '$lib/server/prisma';

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

/**
 * Checks 2fa token or backup code against an account.
 * @param token The token to check.
 * @param account The account to check against.
 * @param allowBackupCodes Whether to allow backup codes.
 * @returns Whether the token is valid.
 */
export async function check2faToken(
	token: string,
	accountId: number,
	allowBackupCodes = true,
	consumeBackupCode = true,
) {
	const account = await prisma.accounts.findUnique({
		where: { id: accountId },
		include: { backupCodes: { where: { used: false } } },
	});
	if (!account) {
		return false;
	}
	if (!account.token_secret) {
		return true;
	}

	if (allowBackupCodes) {
		const backupCode = account.backupCodes.find((code) => code.code === token);
		if (backupCode) {
			account.backupCodes = account.backupCodes.filter(
				(code) => code.code !== token,
			);
			if (consumeBackupCode) {
				if (account.backupCodes.length > 1) {
					await prisma.accountBackupCodes.update({
						where: { id: backupCode.id },
						data: { used: true },
					});
				} else {
					// all backup codes used, disable 2fa
					await prisma.accounts.update({
						where: { id: accountId },
						data: {
							token_secret: null,
							backupCodes: { deleteMany: { account_id: accountId } },
						},
					});
				}
			}
			return true;
		}
	}
	return authenticator.check(token, account.token_secret);
}

/**
 * Type checks if a string is a valid JWT signing algorithm.
 * @param algorithm The algorithm to check.
 * @returns Whether the algorithm is valid.
 */
export function isJWTSigningAlgorithm(
	algorithm: string,
): algorithm is Algorithm {
	return ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'].includes(
		algorithm,
	);
}
