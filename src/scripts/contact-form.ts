import { buildEnquiry, sendEnquiry } from '../lib/contact';
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
const success = document.querySelector<HTMLElement>('[data-form-success]');
const error = document.querySelector<HTMLElement>('[data-form-error]');
const status = document.querySelector<HTMLElement>('[data-form-status]');
const reset = document.querySelector<HTMLButtonElement>('[data-form-reset]');
if (form && success && error && status && reset) {
	const button = form.querySelector<HTMLButtonElement>(
		'button[type="submit"]',
	)!;
	const label = button.querySelector<HTMLElement>('[data-submit-label]')!;
	const fallback = form.querySelector<HTMLAnchorElement>('[data-form-mailto]')!;
	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (button.disabled) return;
		const data = new FormData(form);
		const fields = {
			name: String(data.get('name') ?? ''),
			email: String(data.get('email') ?? ''),
			phone: String(data.get('phone') ?? ''),
			kind: String(data.get('kind') ?? ''),
			message: String(data.get('message') ?? ''),
			botcheck: data.has('botcheck'),
		};
		const subject = `Solar enquiry: ${fields.kind} (${fields.name || 'Website'})`;
		const body = [
			`Name: ${fields.name}`,
			`Email: ${fields.email}`,
			`Phone: ${fields.phone}`,
			`Interested in: ${fields.kind}`,
			'',
			fields.message,
		].join('\n');
		fallback.href = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		error.hidden = true;
		button.disabled = true;
		button.setAttribute('aria-busy', 'true');
		label.textContent = 'Sending…';
		const { ok } = await sendEnquiry(buildEnquiry(fields));
		button.disabled = false;
		button.setAttribute('aria-busy', 'false');
		label.textContent = 'Send enquiry';
		if (ok) {
			form.hidden = true;
			success.hidden = false;
			status.textContent = 'Your enquiry has been sent.';
			success.focus();
		} else {
			error.hidden = false;
		}
	});
	reset.addEventListener('click', () => {
		form.reset();
		form.hidden = false;
		success.hidden = true;
		error.hidden = true;
		status.textContent = '';
		form.querySelector<HTMLInputElement>('[name="name"]')?.focus();
	});
}
export {};
