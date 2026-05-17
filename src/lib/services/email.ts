import { env } from '$env/dynamic/private';
import { generate as generateContactBody } from './email-templates/contact';
import type { ContactForm } from '$lib/schemas/contact';

type EmailContact = {
	address: string;
	display_name?: string;
};

type EmailPayload = {
	from: EmailContact;
	to: EmailContact[];
	reply_to: EmailContact;
	subject: string;
	html: string;
};

export const sendContactEmail = async (
	data: ContactForm
): Promise<{ success: boolean; error?: string }> => {
	const html = generateContactBody(data);

	const {
		MAILEROO_BASE_URL,
		MAILEROO_API_KEY,
		MAILEROO_SENDER_EMAIL,
		MAILEROO_SENDER_NAME,
		CONTACT_RECIPIENT_EMAIL
	} = env;

	if (!MAILEROO_BASE_URL || !MAILEROO_API_KEY || !MAILEROO_SENDER_EMAIL || !CONTACT_RECIPIENT_EMAIL) {
		console.error('Email environment variables:', {
			MAILEROO_BASE_URL,
			MAILEROO_API_KEY: MAILEROO_API_KEY ? '***' : undefined,
			MAILEROO_SENDER_EMAIL,
			CONTACT_RECIPIENT_EMAIL
		});
		console.error('Missing required email environment variables');
		return { success: false, error: 'Email service not configured' };
	}

	const payload: EmailPayload = {
		from: {
			address: MAILEROO_SENDER_EMAIL,
			display_name: MAILEROO_SENDER_NAME || 'True East Energy Corp.'
		},
		to: [
			{
				address: CONTACT_RECIPIENT_EMAIL,
				display_name: 'True East Energy Corp.'
			}
		],
		reply_to: {
			address: data.email,
			display_name: data.name
		},
		subject: `Solar enquiry — ${data.kind} — ${data.name}`,
		html
	};

	try {
		const response = await fetch(MAILEROO_BASE_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${MAILEROO_API_KEY}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

		if (!response.ok || result?.success !== true) {
			console.error('Email send failed:', response.status, result);
			return {
				success: false,
				error: result?.message || `Email service error: ${response.status}`
			};
		}

		return { success: true };
	} catch (e) {
		console.error('Email send error:', e);
		return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
	}
};
