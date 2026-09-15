const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduced) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
					entry.target.setAttribute('data-revealed', '');
					observer.unobserve(entry.target);
				}
			}
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
	);
	for (const node of nodes) observer.observe(node);
	// Enable hidden reveal states only once their observer is installed.
	document.documentElement.classList.add('js');
} else {
	for (const node of nodes) node.setAttribute('data-revealed', '');
}
export {};
