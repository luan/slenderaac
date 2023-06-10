import { error } from '@sveltejs/kit';

import { redirectWithFlash } from '$lib/server/flash';
import { prisma } from '$lib/server/prisma';
import { performLogin } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load = (async ({ url, cookies }) => {
	const email = url.searchParams.get('email');
	const token = url.searchParams.get('token');
	if (!email || !token) {
		throw error(422, 'Invalid email or token');
	}

	const verification = await prisma.emailVerification.findUnique({
		where: { token },
		include: { account: true },
	});
	if (!verification || !verification.account) {
		throw error(422, 'Invalid email or token');
	}
	if (verification.expires < new Date()) {
		throw error(422, 'Token expired');
	}
	const newEmail = verification.new_email;
	const account = verification.account;

	await prisma.$transaction([
		prisma.accounts.update({
			where: { id: account.id },
			data: {
				...(newEmail && newEmail !== account.email ? { email: newEmail } : {}),
				is_verified: true,
			},
		}),
		prisma.emailVerification.delete({
			where: { token },
		}),
	]);
	const sessionEmail = newEmail || account.email;

	await performLogin(cookies, sessionEmail);

	redirectWithFlash('/account', cookies, {
		type: 'success',
		message: 'Your email has been verified.',
	});
}) satisfies PageServerLoad;
