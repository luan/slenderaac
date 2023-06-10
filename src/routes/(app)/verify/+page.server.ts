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

	const account = await prisma.accounts.findUnique({
		where: { email },
		include: { emailVerification: { where: { token } } },
	});
	if (!account || account.emailVerification.length === 0) {
		throw error(422, 'Invalid email or token');
	}

	await prisma.$transaction([
		prisma.accounts.update({
			where: { id: account.id },
			data: { is_verified: true },
		}),
		prisma.emailVerification.delete({
			where: { token },
		}),
	]);

	await performLogin(cookies, account.email);

	redirectWithFlash('/account', cookies, {
		type: 'success',
		message: 'Your email has been verified.',
	});
}) satisfies PageServerLoad;
