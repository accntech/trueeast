<script lang="ts">
	import { inview } from '$lib/inview';
	import { pic } from '$lib/img';

	interface Props {
		eyebrow?: string;
		title?: string;
		body?: string;
	}
	let {
		eyebrow = 'Start the conversation',
		title = 'Put your roof to work.',
		body = 'Tell us about your building and your bills. We will engineer the system that pays them down.'
	}: Props = $props();
</script>

<section class="relative isolate overflow-hidden bg-night text-on-night">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<enhanced:img
			src={pic('/projects/agro-ricemill/2.jpeg')}
			alt=""
			loading="lazy"
			decoding="async"
			sizes="100vw"
			class="size-full object-cover grayscale-[0.2]"
		/>
		<div
			class="absolute inset-0 [background:linear-gradient(100deg,oklch(0.2_0.025_150/0.94)_38%,oklch(0.2_0.025_150/0.62)),radial-gradient(80%_120%_at_90%_10%,oklch(0.62_0.16_58/0.34),transparent_55%)]"
		></div>
	</div>
	<div
		class="wrap py-[clamp(4.5rem,9vw,8.5rem)]"
		data-reveal
		{@attach inview()}
	>
		<span class="eyebrow eyebrow-night">{eyebrow}</span>
		<h2
			class="mt-[1.4rem] max-w-[16ch] font-display text-d-md font-extrabold uppercase text-on-night"
		>
			{title}
		</h2>
		<p class="mt-[1.4rem] max-w-[46ch] text-lg text-on-night-soft">{body}</p>
		<div class="mt-[2.6rem] flex flex-wrap gap-4">
			<a href="/contact" class="btn btn-on-night">
				Request a proposal
				<svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
				</svg>
			</a>
			<a href="/projects" class="btn btn-ghost btn-on-night">See the work</a>
		</div>
	</div>
</section>
