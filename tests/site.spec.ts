import { expect, test } from '@playwright/test';

for (const path of ['/', '/about', '/services', '/projects', '/contact']) {
	test(`${path} renders its content and metadata`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.locator('main h1')).toBeVisible();
		await expect(page).toHaveTitle(/True East Energy Corp\./);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			`https://trueeastenergy.com${path}`,
		);
		expect(
			JSON.parse(
				(await page
					.locator('script[type="application/ld+json"]')
					.textContent())!,
			)['@graph'],
		).toHaveLength(3);
		const images = page.locator('main img');
		for (const img of await images.all()) {
			await img.evaluate((element) =>
				element.scrollIntoView({ block: 'center', behavior: 'instant' }),
			);
			await expect
				.poll(() =>
					img.evaluate(
						(el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
					),
				)
				.toBe(true);
		}
		expect(errors).toEqual([]);
	});
}

test('filters the completed project portfolio', async ({ page }) => {
	await page.goto('/projects');
	const cards = page.locator('[data-project-system]:visible');
	await expect(cards).toHaveCount(17);
	await page
		.getByRole('button', { name: 'Hybrid + Battery', exact: true })
		.click();
	expect(await cards.count()).toBeGreaterThan(0);
	expect(
		await cards.evaluateAll((els) =>
			els.every((el) => el.getAttribute('data-project-system') === 'Hybrid'),
		),
	).toBe(true);
	await page.getByRole('button', { name: 'On-Grid', exact: true }).click();
	expect(
		await cards.evaluateAll((els) =>
			els.every((el) => el.getAttribute('data-project-system') === 'On-Grid'),
		),
	).toBe(true);
	await page.getByRole('button', { name: 'All work', exact: true }).click();
	await expect(cards).toHaveCount(17);
});

test('mobile menu closes on Escape and navigates', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const open = page.getByRole('button', { name: 'Open menu', exact: true });
	await open.click();
	await expect(page.getByRole('dialog', { name: 'Site menu' })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(open).toBeFocused();
	await open.click();
	await page
		.getByRole('navigation', { name: 'Mobile', exact: true })
		.getByRole('link', { name: 'Services' })
		.click();
	await expect(page).toHaveURL('/services');
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
});

test('contact form supports errors, retry, success and reset', async ({
	page,
}) => {
	let success = false;
	let sent: Record<string, unknown> = {};
	await page.route('**/api/contact', async (route) => {
		sent = route.request().postDataJSON();
		await route.fulfill({ status: success ? 200 : 500, json: { success } });
	});
	await page.goto('/contact');
	await page
		.getByRole('textbox', { name: 'Name', exact: true })
		.fill('Maria Santos');
	await page
		.getByRole('textbox', { name: 'Email', exact: true })
		.fill('maria@example.com');
	await page
		.getByRole('combobox', { name: 'What are you considering?' })
		.click();
	await page.getByRole('option', { name: 'Hybrid + battery storage' }).click();
	await page
		.getByRole('textbox', { name: 'Tell us about the building' })
		.fill('Rice mill, 300 sqm roof.');
	await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
	await expect(page.getByRole('alert')).toBeVisible();
	await expect(page.getByRole('alert').getByRole('link')).toHaveAttribute(
		'href',
		/mailto:.*Maria%20Santos/,
	);
	success = true;
	await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
	await expect(page.getByRole('heading', { name: /Thank you/ })).toBeVisible();
	expect(sent).toMatchObject({
		name: 'Maria Santos',
		kind: 'Hybrid + battery storage',
		botcheck: false,
	});
	await page.getByRole('button', { name: 'Send another enquiry' }).click();
	await expect(
		page.getByRole('textbox', { name: 'Name', exact: true }),
	).toHaveValue('');
	await expect(page.getByRole('combobox', { name: 'What are you considering?' })).toHaveText(
		'Not sure yet',
	);
});

test('contact form shows inline required and email errors before sending', async ({ page }) => {
	let requests = 0;
	await page.route('**/api/contact', async (route) => {
		requests++;
		await route.fulfill({ json: { success: true } });
	});
	await page.goto('/contact');
	const name = page.getByRole('textbox', { name: 'Name', exact: true });
	const email = page.getByRole('textbox', { name: 'Email', exact: true });
	const message = page.getByRole('textbox', { name: 'Tell us about the building' });
	await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
	await expect(name).toBeFocused();
	for (const field of [name, email, message]) {
		await expect(field).toHaveAttribute('aria-invalid', 'true');
		await expect(field).toHaveAccessibleDescription(/Please/);
	}
	await name.fill('   ');
	await expect(name).toHaveAttribute('aria-invalid', 'true');
	await name.fill('Maria');
	await expect(name).not.toHaveAttribute('aria-invalid', 'true');
	await email.fill('invalid');
	await expect(email).toHaveAccessibleDescription('Please enter a valid email address.');
	await message.fill('A rice mill in Mindoro.');
	await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
	await expect(email).toBeFocused();
	expect(requests).toBe(0);
	await email.fill('maria@example.com');
	await expect(email).not.toHaveAttribute('aria-invalid', 'true');
	await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
	await expect(page.getByRole('heading', { name: /Thank you/ })).toBeVisible();
	expect(requests).toBe(1);
});

test('custom enquiry select supports keyboard selection and dismissal on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/contact');
	const select = page.getByRole('combobox', { name: 'What are you considering?' });
	await expect(select).toHaveText('Not sure yet');
	await select.focus();
	await select.press('Enter');
	await expect(page.getByRole('listbox')).toBeVisible();
	await select.press('Home');
	await select.press('ArrowDown');
	await select.press('Enter');
	await expect(select).toHaveText('Off-Grid system');
	await expect(select).toBeFocused();
	await select.press('Space');
	await select.press('End');
	await select.press('Escape');
	await expect(select).toHaveText('Off-Grid system');
	await expect(page.getByRole('listbox')).toBeHidden();
	await select.press('h');
	await select.press('Tab');
	await expect(select).toHaveText('Hybrid + battery storage');
	await expect(page.getByRole('textbox', { name: 'Tell us about the building' })).toBeFocused();
	await select.click();
	await page.getByRole('option', { name: 'Micro-grid System' }).click();
	await expect(select).toHaveText('Micro-grid System');
	await select.click();
	await page.getByRole('textbox', { name: 'Email', exact: true }).click();
	await expect(select).toHaveAttribute('aria-expanded', 'false');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('missing pages return a branded 404', async ({ page }) => {
	const response = await page.goto('/does-not-exist');
	expect(response?.status()).toBe(404);
	await expect(
		page.getByRole('heading', { name: 'This page is off the grid.' }),
	).toBeVisible();
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
		'content',
		'noindex,nofollow',
	);
});

test('content and headline statistics work without JavaScript', async ({
	browser,
}) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto('/');
	await expect(page.getByText('550', { exact: true })).toBeVisible();
	await expect(page.getByText('Why we exist', { exact: true })).toBeVisible();
	await page.goto('/projects');
	await expect(page.locator('[data-project-system]')).toHaveCount(17);
	await context.close();
});

test('contact API validates requests in the Cloudflare runtime', async ({
	request,
}) => {
	const malformed = await request.post('/api/contact', {
		headers: { 'Content-Type': 'application/json' },
		data: Buffer.from('{'),
	});
	expect(malformed.status()).toBe(400);
	expect(await malformed.json()).toEqual({
		success: false,
		error: 'Invalid JSON',
	});
	const invalid = await request.post('/api/contact', {
		data: { email: 'invalid' },
	});
	expect(invalid.status()).toBe(400);
	// A honeypot submission exercises the Worker route without delivering email.
	const honeypot = await request.post('/api/contact', {
		data: {
			name: 'Browser test',
			email: 'test@example.com',
			kind: 'Not sure yet',
			message: 'Automated honeypot test',
			botcheck: true,
		},
	});
	expect(honeypot.status()).toBe(200);
	expect(await honeypot.json()).toEqual({ success: true });
});

test('public assets remain available at the existing URLs', async ({
	request,
}) => {
	for (const path of [
		'/favicon.svg',
		'/robots.txt',
		'/sitemap.xml',
		'/site.webmanifest',
		'/og/home.jpg',
		'/true-east-energy-company-profile.pdf',
	]) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(200);
		if (path.endsWith('.pdf'))
			expect(response.headers()['content-type']).toContain('application/pdf');
	}
});

test('every page fits a narrow mobile viewport', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	for (const path of ['/', '/about', '/services', '/projects', '/contact']) {
		await page.goto(path);
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= innerWidth,
			),
			path,
		).toBe(true);
	}
});
