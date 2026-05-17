<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$components/seo.svelte';
	import SunField from '$components/sun-field.svelte';

	let notFound = $derived(page.status === 404);

	let heading = $derived(notFound ? 'This page is off the grid.' : 'Something tripped the breaker.');
	let body = $derived(
		notFound
			? "The page you're looking for has moved, or it never existed. Let's get you back to something that works."
			: 'An unexpected error occurred on our end. Try again in a moment, or head back to firmer ground.'
	);
</script>

<Seo
	title={notFound ? 'Page not found' : 'Something went wrong'}
	description="The page could not be found. Return to True East Energy Corp., engineer-led solar in Oriental Mindoro."
	noindex
/>

<header
	class="isolate relative flex flex-col justify-center py-32 min-h-svh overflow-hidden"
>
	<SunField />
	<div class="relative wrap page-head">
		<span class="eyebrow">Error {page.status}</span>
		<h1 class="mt-[1.6rem] font-extrabold text-d-lg uppercase leading-[0.86]">
			{heading}
		</h1>
		<p class="mt-8 max-w-[34ch] text-ink-soft text-xl">
			{body}
		</p>
		<div class="flex flex-wrap gap-4 mt-[2.6rem]">
			<a href="/" class="btn">
				Back to home
				<svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
				</svg>
			</a>
			<a href="/contact" class="btn btn-ghost">Contact us</a>
		</div>
	</div>
</header>
