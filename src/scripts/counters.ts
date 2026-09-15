const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
if (
	'IntersectionObserver' in window &&
	!matchMedia('(prefers-reduced-motion: reduce)').matches
) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				observer.unobserve(entry.target);
				const counter = entry.target as HTMLElement;
				const number = counter.querySelector<HTMLElement>(
					'[data-counter-value]',
				);
				if (!number) continue;
				const value = Number(counter.dataset.counter);
				const decimals = Number(counter.dataset.decimals);
				const start = performance.now();
				const tick = (now: number) => {
					const progress = Math.min(1, (now - start) / 1500);
					number.textContent = (
						value *
						(1 - Math.pow(1 - progress, 4))
					).toLocaleString('en-US', {
						minimumFractionDigits: decimals,
						maximumFractionDigits: decimals,
					});
					if (progress < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}
		},
		{ threshold: 0.4 },
	);
	for (const counter of counters) observer.observe(counter);
}
export {};
