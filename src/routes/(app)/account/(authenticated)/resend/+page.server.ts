import { redirect } from 'sveltekit-flash-message/server';

import { sendVerificationEmail } from '$lib/server/email';
import { prisma } from '$lib/server/prisma';
import { requireLogin } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { locals } = event;
	requireLogin(locals);

	const account = await prisma.accounts.findUniqueOrThrow({
		where: { id: locals.session?.accountId },
	});
	const oldVerification = await prisma.emailVerification.findFirst({
		where: { account_id: account.id },
	});
	if (account.is_verified && !oldVerification) {
		throw redirect(302, '/account');
	}
	await prisma.emailVerification.deleteMany({
		where: { account_id: account.id },
	});
	const verification = await prisma.emailVerification.create({
		data: {
			account_id: account.id,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
			new_email: oldVerification?.new_email,
		},
	});

	await sendVerificationEmail(account.email, verification.token);
	throw redirect(
		`/account`,
		{
			type: 'success',
			message:
				'Verification re-sent. Check your email to confirm your account.',
		},
		event,
	);
}) satisfies PageServerLoad;
