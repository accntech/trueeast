<script lang="ts">
	import { inview } from '$lib/inview';
	import { services, process, advantages } from '$data/services';
	import Seo from '$components/seo.svelte';
	import SunField from '$components/sun-field.svelte';
	import Cta from '$components/cta.svelte';
</script>

<Seo
	title="Services"
	description="On-Grid and Hybrid solar with battery storage — delivered as a true turn-key package: engineering, design, procurement, installation and after-sales support."
	image="/og/services.jpg"
/>

<header class="isolate relative flex min-h-svh flex-col justify-center overflow-hidden py-32">
	<SunField />
	<div class="relative wrap page-head">
		<span class="eyebrow">What we do</span>
		<h1 class="mt-[1.6rem] font-extrabold text-d-lg uppercase leading-[0.86]">
			Solar, sized to<br />your building.
		</h1>
		<p class="mt-8 max-w-[42ch] text-ink-soft text-xl">
			Two systems, one engineering standard. We model the array to your structure and your load —
			never to a catalogue — and carry it from first site visit to after-sales support.
		</p>
	</div>
</header>

{#each services as s, i (s.id)}
	<article id={s.id} class={['section-y border-t border-line', i % 2 === 1 && 'bg-paper-2']}>
		<div class="items-center gap-[clamp(2rem,6vw,5rem)] grid grid-cols-1 lg:grid-cols-2 wrap">
			<div
				class={[
					'relative aspect-4/3 overflow-hidden rounded-md',
					i % 2 === 1 ? 'lg:order-2' : 'order-first',
					'order-first'
				]}
				data-reveal="clip"
				{@attach inview()}
			>
				<img
					src={s.image}
					alt="{s.name} by True East Energy"
					loading="lazy"
					decoding="async"
					class="size-full object-cover"
				/>
				<span
					class="bottom-4 left-4 absolute bg-amber px-[0.7rem] py-[0.4rem] rounded-sm font-display font-semibold text-[0.8rem] text-[oklch(0.2_0.02_150)] uppercase tracking-[0.18em]"
				>
					{s.index} / {s.id === 'on-grid' ? 'On-Grid' : 'Hybrid'}
				</span>
			</div>
			<div data-reveal {@attach inview()}>
				<span class="eyebrow">{s.index} — {s.bestFor}</span>
				<h2 class="mt-[1.2rem] text-d-sm uppercase">{s.name}</h2>
				<p class="mt-[1.4rem] max-w-[52ch] text-ink-soft text-lg">{s.body}</p>
				<ul class="gap-[0.9rem] grid mt-8 mb-[2.4rem]">
					{#each s.points as pt (pt)}
						<li class="relative pl-[1.8rem] text-ink">
							<span
								class="top-[0.62em] left-0 absolute bg-amber size-[0.7rem] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
							></span>
							{pt}
						</li>
					{/each}
				</ul>
				<a href="/contact" class="text-ink tlink">
					Enquire about {s.id === 'on-grid' ? 'on-grid' : 'hybrid'}
					<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
						<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
					</svg>
				</a>
			</div>
		</div>
	</article>
{/each}

<section class="bg-night text-on-night section-y">
	<div class="wrap">
		<header data-reveal {@attach inview()}>
			<span class="eyebrow eyebrow-night">The turn-key package</span>
			<h2 class="mt-[1.2rem] text-d-sm text-on-night uppercase">
				Engineering, design, procurement,<br />installation, after-sales.
			</h2>
			<p class="mt-[1.6rem] text-on-night-soft lede">
				One accountable team from the first measurement to long after switch-on. Cost-effective,
				reliable, and tailored to what the client actually needs.
			</p>
		</header>
		<ol class="mt-14 border-line-night border-t">
			{#each process as step (step.n)}
				<li
					class="gap-[clamp(1rem,4vw,3.5rem)] grid grid-cols-1 sm:grid-cols-[6rem_1fr] py-[2.4rem] border-line-night border-b"
					data-reveal
					{@attach inview()}
				>
					<span class="font-display font-bold text-[2.6rem] text-amber leading-none tabular">
						{step.n}
					</span>
					<div
						class="items-baseline gap-[clamp(0.6rem,4vw,4rem)] grid grid-cols-1 lg:grid-cols-[16rem_1fr]"
					>
						<h3 class="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] text-on-night uppercase">
							{step.title}
						</h3>
						<p class="max-w-[54ch] text-on-night-soft">{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="section-y">
	<div class="wrap">
		<header data-reveal {@attach inview()}>
			<span class="eyebrow">Why True East</span>
			<h2 class="mt-[1.2rem] text-d-sm uppercase">Reasons clients stay</h2>
		</header>
		<div
			class="gap-px grid grid-cols-1 sm:grid-cols-2 bg-line mt-14 border border-line rounded-md overflow-hidden"
		>
			{#each advantages as a (a.title)}
				<div class="bg-surface p-[clamp(1.8rem,4vw,3rem)]" data-reveal {@attach inview()}>
					<h3 class="text-[clamp(1.4rem,1.1rem+1vw,2rem)] uppercase">{a.title}</h3>
					<p class="mt-4 text-ink-soft">{a.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<Cta
	title="Which system fits your roof?"
	body="Send your building details and recent bills. We will tell you straight whether on-grid or hybrid pays off faster."
/>
