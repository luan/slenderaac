import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
	createTestAccount,
	createTransport,
	getTestMessageUrl,
	type Transporter,
} from 'nodemailer';

import {
	NO_REPLY_EMAIL,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_SERVER,
	SMTP_USER,
} from '$env/static/private';

const transporter: Record<
	string,
	Transporter<SMTPTransport.SentMessageInfo>
> = {};

async function getTransporter() {
	const env = process.env.NODE_ENV ?? 'development';
	if (transporter[env]) {
		return transporter[env];
	}
	if (env === 'production') {
		// Use a real mail service in production
		transporter[env] = createTransport({
			host: SMTP_SERVER,
			port: Number(SMTP_PORT),
			secure: false,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD,
			},
		});
	} else {
		// Use ethereal.email in development
		const testAccount = await createTestAccount();
		transporter[env] = createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		});
	}
	return transporter[env];
}

export type EmailTemplate = {
	subject: string;
	text: string;
	html: string;
};

export async function sendMail(to: string, template: EmailTemplate) {
	// send mail with defined transport object
	const transporter = await getTransporter();
	const info = await transporter.sendMail({
		from: NO_REPLY_EMAIL,
		to,
		...template,
	});

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', getTestMessageUrl(info));
}
