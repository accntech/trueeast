const header = document.querySelector<HTMLElement>('[data-site-header]');
const menu = document.querySelector<HTMLElement>('#site-menu');
const trigger = document.querySelector<HTMLButtonElement>('[data-menu-open]');
if (header && menu && trigger) {
	const updateHeader = () => {
		header.dataset.solid = String(
			header.dataset.overHero !== 'true' || window.scrollY > 64,
		);
	};
	updateHeader();
	window.addEventListener('scroll', updateHeader, { passive: true });
	let previousOverflow = '';
	const close = (restoreFocus = true) => {
		menu.dataset.open = 'false';
		menu.inert = true;
		menu.setAttribute('aria-hidden', 'true');
		trigger.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = previousOverflow;
		if (restoreFocus) trigger.focus();
	};
	trigger.addEventListener('click', () => {
		previousOverflow = document.body.style.overflow;
		menu.dataset.open = 'true';
		menu.inert = false;
		menu.setAttribute('aria-hidden', 'false');
		trigger.setAttribute('aria-expanded', 'true');
		document.body.style.overflow = 'hidden';
		menu.querySelector<HTMLButtonElement>('button')?.focus();
	});
	for (const node of menu.querySelectorAll<HTMLElement>('[data-menu-close]')) {
		node.addEventListener('click', () => close(node.tagName !== 'A'));
	}
	window.addEventListener('keydown', (event) => {
		if (menu.inert) return;
		if (event.key === 'Escape') close();
		if (event.key === 'Tab') {
			const items = menu.querySelectorAll<HTMLElement>('a[href], button');
			const first = items[0];
			const last = items[items.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		}
	});
	matchMedia('(min-width: 55rem)').addEventListener('change', (event) => {
		if (event.matches && !menu.inert) close(false);
	});
}
export {};
