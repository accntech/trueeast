import type { APIRoute } from 'astro';
import { contactSchema } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/services/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json(
			{ success: false, error: 'Invalid JSON' },
			{ status: 400 },
		);
	}

	const result = contactSchema.safeParse(body);
	if (!result.success) {
		return Response.json(
			{ success: false, error: 'Validation failed' },
			{ status: 400 },
		);
	}

	if (result.data.botcheck) {
		return Response.json({ success: true });
	}

	const emailResult = await sendContactEmail(result.data);

	if (!emailResult.success) {
		return Response.json(
			{ success: false, error: 'Failed to send message' },
			{ status: 500 },
		);
	}

	return Response.json({ success: true });
};
