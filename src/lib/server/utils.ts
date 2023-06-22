import { compareSync, hashSync } from 'bcrypt';
import { createHash } from 'crypto';
import { authenticator } from 'otplib';

import { prisma } from '$lib/server/prisma';

import {
	ALLOW_LEGACY_SHA1_PASSWORDS,
	DEPRECATED_USE_SHA1_PASSWORDS,
} from '$env/static/private';

const BCRYPT_ROUNDS = 12;

/**
 * Hashes a password.
 * @param password The password to hash.
 * @returns The hashed password.
 */
export function hashPassword(password: string) {
	if (DEPRECATED_USE_SHA1_PASSWORDS) {
		return hashPasswordSHA1(password);
	}
	return hashSync(password, BCRYPT_ROUNDS);
}

/**
 * Hashes a password with SHA1.
 * @param password The password to hash.
 * @returns The hashed password.
 * @deprecated SHA1 is insecure, use bcrypt instead.
 * @see hashPassword
 */
function hashPasswordSHA1(password: string) {
	return createHash('sha1').update(password).digest('hex');
}

/**
 * Compares a password with a hash.
 * @param password The password to compare.
 * @param hash The hash to compare.
 * @returns Whether the password matches the hash.
 */
export function comparePassword(password: string, hash: string) {
	if (
		(DEPRECATED_USE_SHA1_PASSWORDS || ALLOW_LEGACY_SHA1_PASSWORDS) &&
		hash === hashPasswordSHA1(password)
	) {
		return true;
	}
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
