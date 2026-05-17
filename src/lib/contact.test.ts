import { describe, it, expect, vi } from 'vitest';
import { buildEnquiry, sendEnquiry } from './contact';

const base = {
	name: 'Maria Santos',
	email: 'maria@example.com',
	phone: '+63 900 000 0000',
	kind: 'Hybrid + battery storage',
	message: 'Rice mill, 300 sqm roof.',
	botcheck: false
};

describe('buildEnquiry', () => {
	it('maps every form field straight through', () => {
		expect(buildEnquiry(base)).toEqual({
			name: 'Maria Santos',
			email: 'maria@example.com',
			phone: '+63 900 000 0000',
			kind: 'Hybrid + battery storage',
			message: 'Rice mill, 300 sqm roof.',
			botcheck: false
		});
	});

	it('forwards the honeypot value', () => {
		expect(buildEnquiry({ ...base, botcheck: true }).botcheck).toBe(true);
	});

	it('does not leak any provider-specific keys', () => {
		const payload = buildEnquiry(base);
		expect(payload).not.toHaveProperty('access_key');
		expect(payload).not.toHaveProperty('subject');
		expect(payload).not.toHaveProperty('replyto');
	});
});

describe('sendEnquiry', () => {
	const payload = { name: 'Maria' };
	const mockFetch = (fn: () => Promise<Response>) => vi.fn(fn) as unknown as typeof fetch;

	it('POSTs JSON to the same-origin /api/contact endpoint', async () => {
		const spy = vi.fn(
			async () => new Response(JSON.stringify({ success: true }), { status: 200 })
		);
		await sendEnquiry(payload, spy as unknown as typeof fetch);
		expect(spy).toHaveBeenCalledWith(
			'/api/contact',
			expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) })
		);
	});

	it('returns ok:true when the API reports success', async () => {
		const fetchImpl = mockFetch(
			async () => new Response(JSON.stringify({ success: true }), { status: 200 })
		);
		expect(await sendEnquiry(payload, fetchImpl)).toEqual({ ok: true });
	});

	it('returns ok:false on a non-2xx response', async () => {
		const fetchImpl = mockFetch(async () => new Response('nope', { status: 500 }));
		expect(await sendEnquiry(payload, fetchImpl)).toEqual({ ok: false });
	});

	it('returns ok:false when success is false', async () => {
		const fetchImpl = mockFetch(
			async () => new Response(JSON.stringify({ success: false }), { status: 200 })
		);
		expect(await sendEnquiry(payload, fetchImpl)).toEqual({ ok: false });
	});

	it('returns ok:false (no throw) when fetch rejects', async () => {
		const fetchImpl = mockFetch(async () => {
			throw new Error('network down');
		});
		expect(await sendEnquiry(payload, fetchImpl)).toEqual({ ok: false });
	});
});
