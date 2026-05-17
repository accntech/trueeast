export type EnquiryFields = {
	name: string;
	email: string;
	phone: string;
	kind: string;
	message: string;
	botcheck: boolean;
};

export function buildEnquiry(fields: EnquiryFields): Record<string, unknown> {
	return {
		name: fields.name,
		email: fields.email,
		phone: fields.phone,
		kind: fields.kind,
		message: fields.message,
		botcheck: fields.botcheck
	};
}

export async function sendEnquiry(
	payload: Record<string, unknown>,
	fetchImpl: typeof fetch = fetch
): Promise<{ ok: boolean }> {
	try {
		const res = await fetchImpl('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(payload)
		});
		if (!res.ok) return { ok: false };
		const data = (await res.json()) as { success?: boolean };
		return { ok: data.success === true };
	} catch {
		return { ok: false };
	}
}
