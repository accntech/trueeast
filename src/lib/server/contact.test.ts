import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../../pages/api/contact';
import { sendContactEmail } from '$lib/services/email';

vi.mock('$lib/services/email', () => ({ sendContactEmail: vi.fn() }));
const valid = {
	name: 'Maria',
	email: 'maria@example.com',
	kind: 'On-Grid system',
	message: 'A rice mill in Mindoro.',
};
const request = (body: string) => ({
	request: new Request('http://localhost/api/contact', {
		method: 'POST',
		body,
	}),
});
const post = (body: unknown) =>
	POST(request(JSON.stringify(body)) as Parameters<typeof POST>[0]);

beforeEach(() => vi.resetAllMocks());
describe('contact API', () => {
	it('rejects malformed JSON', async () => {
		const response = await POST(request('{') as Parameters<typeof POST>[0]);
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			success: false,
			error: 'Invalid JSON',
		});
		expect(sendContactEmail).not.toHaveBeenCalled();
	});
	it.each([
		{ ...valid, email: 'invalid' },
		{ ...valid, message: '' },
		{ ...valid, name: '' },
		{ ...valid, kind: '' },
	])('rejects invalid fields', async (body) => {
		expect((await post(body)).status).toBe(400);
		expect(sendContactEmail).not.toHaveBeenCalled();
	});
	it('accepts the honeypot without sending email', async () => {
		expect(await (await post({ ...valid, botcheck: true })).json()).toEqual({
			success: true,
		});
		expect(sendContactEmail).not.toHaveBeenCalled();
	});
	it('sends validated fields and reports success', async () => {
		vi.mocked(sendContactEmail).mockResolvedValue({ success: true });
		expect(await (await post(valid)).json()).toEqual({ success: true });
		expect(sendContactEmail).toHaveBeenCalledWith({
			...valid,
			phone: '',
			botcheck: false,
		});
	});
	it('reports delivery failure without exposing provider details', async () => {
		vi.mocked(sendContactEmail).mockResolvedValue({
			success: false,
			error: 'private provider detail',
		});
		const response = await post(valid);
		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			success: false,
			error: 'Failed to send message',
		});
	});
});
