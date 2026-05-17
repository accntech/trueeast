import type { Attachment } from 'svelte/attachments';

/* Scroll-reveal attachment. Marks the node revealed once it enters the
   viewport, then stops observing. Without JS the element is already
   visible (the hidden state is scoped to html.js in app.css), so this is
   pure progressive enhancement. */
export function inview(options: { once?: boolean } = {}): Attachment<HTMLElement> {
	const { once = true } = options;
	return (node) => {
		if (typeof IntersectionObserver === 'undefined') {
			node.setAttribute('data-revealed', '');
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					// Reveal when in view, or when already scrolled past (anchor
					// jumps, End key, refresh scroll-restoration land mid-page;
					// content above the viewport must not stay hidden).
					if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
						node.setAttribute('data-revealed', '');
						if (once) io.unobserve(node);
					} else if (!once) {
						node.removeAttribute('data-revealed');
					}
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
		);
		io.observe(node);
		return () => io.disconnect();
	};
}
