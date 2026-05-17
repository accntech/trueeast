import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contactSchema } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/services/email';

export const prerender = false;

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}

	const result = contactSchema.safeParse(body);
	if (!result.success) {
		return json({ success: false, error: 'Validation failed' }, { status: 400 });
	}

	if (result.data.botcheck) {
		return json({ success: true });
	}

	const emailResult = await sendContactEmail(result.data);

	if (!emailResult.success) {
		return json({ success: false, error: 'Failed to send message' }, { status: 500 });
	}

	return json({ success: true });
};
