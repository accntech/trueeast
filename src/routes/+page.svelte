<script lang="ts">
	import { inview } from '$lib/inview';
	import { stats } from '$data/site';
	import { services, process } from '$data/services';
	import { featured } from '$data/projects';
	import Seo from '$components/seo.svelte';
	import Counter from '$components/counter.svelte';
	import ProjectCard from '$components/project-card.svelte';
	import Cta from '$components/cta.svelte';

	const grid = featured.slice(0, 5);
	const sectorsServed = [
		'Industrial',
		'Healthcare',
		'Government',
		'Hospitality',
		'Institutional',
		'Residential'
	];
	const loadCls = 'rise';
</script>

<Seo
	title="Solar power, engineered"
	description="True East Energy Corp. — engineer-led turn-key On-Grid and Hybrid solar across Oriental Mindoro. 550+ kWp commissioned, from rice mills to hospitals."
	image="/og/home.jpg"
/>

<!-- ───────── hero ───────── -->
<section class="isolate relative flex flex-col justify-end pb-8 min-h-svh text-on-night">
	<div class="-z-10 absolute inset-0 overflow-hidden">
		<img
			src="/projects/agro-ricemill/hero.jpeg"
			alt="Aerial view of the 350 kWp rooftop solar array on the VM Agbayani Ricemill, Oriental Mindoro"
			fetchpriority="high"
			decoding="async"
			class="size-full object-cover animate-kenburns"
		/>
		<div
			class="absolute inset-0 [background:linear-gradient(90deg,oklch(0.14_0.02_150/0.64)_0%,oklch(0.14_0.02_150/0.32)_46%,transparent_74%),linear-gradient(183deg,oklch(0.15_0.02_150/0.5)_0%,oklch(0.15_0.02_150/0.44)_38%,oklch(0.14_0.02_150/0.64)_70%,oklch(0.11_0.018_150/0.95)_100%),radial-gradient(70%_60%_at_85%_8%,oklch(0.7_0.16_62/0.28),transparent_60%)]"
		></div>
	</div>

	<div class="pt-24 wrap">
		<p
			class="{loadCls} inline-flex items-center gap-3 font-display text-[clamp(0.85rem,0.78rem+0.3vw,1rem)] font-semibold uppercase tracking-[0.28em] text-on-night-soft"
			style="--d:0ms"
		>
			<span class="bg-amber w-[2.2rem] h-0.5"></span>Solar power &middot; Oriental Mindoro
		</p>
		<h1
			class="mt-[1.6rem] font-display font-extrabold text-d-xl text-on-night uppercase leading-[0.84] tracking-[-0.015em]"
		>
			<span class="{loadCls} block" style="--d:90ms">Power that</span>
			<span class="{loadCls} block" style="--d:190ms">rises in</span>
			<span class="{loadCls} block text-amber" style="--d:290ms">the East</span>
		</h1>
		<p class="{loadCls} mt-6 max-w-[52ch] text-lg text-on-night-soft" style="--d:430ms">
			Engineer-led, turn-key solar — designed, built and supported by a Registered Electrical
			Engineer. From the rice mill that started it all to hospitals running on sunlight.
		</p>
		<div class="{loadCls} mt-8 flex flex-wrap gap-4" style="--d:560ms">
			<a href="/contact" class="btn btn-on-night">
				Get a proposal
				<svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
				</svg>
			</a>
			<a href="/projects" class="btn btn-ghost btn-on-night">View 17 projects</a>
		</div>
	</div>

	<div
		class="{loadCls} wrap mt-8 flex flex-col items-start gap-[0.8rem] border-t border-[oklch(0.9_0.02_90/0.18)] pt-[1.4rem] font-display text-[0.85rem] font-medium uppercase tracking-[0.16em] text-on-night-soft sm:flex-row sm:items-center sm:justify-between sm:gap-0"
		style="--d:760ms"
	>
		<span>SEC 202406015446-02</span>
		<span class="inline-flex items-center gap-[0.7rem]">
			Scroll
			<span class="block relative bg-on-night-soft w-12 h-px overflow-hidden">
				<span
					class="absolute inset-0 bg-amber w-2/5 animate-scrollcue"
				></span>
			</span>
		</span>
		<span>PhilGEPS-registered</span>
	</div>
</section>

<!-- ───────── intro ───────── -->
<section class="section-y">
	<div class="items-start gap-[clamp(2rem,6vw,6rem)] grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] wrap">
		<div data-reveal {@attach inview()}>
			<span class="eyebrow">Why we exist</span>
			<p
				class="mt-[1.6rem] font-display font-semibold text-[clamp(1.7rem,1.1rem+2.6vw,3.2rem)] text-ink text-balance leading-[1.08] tracking-[-0.01em]"
			>
				True East began inside a working rice mill, where electricity was the bill that never
				stopped growing. The fix became the business: solar that lowers cost and carries on
				through the next brownout.
			</p>
		</div>
		<div class="pt-[0.6rem]" data-reveal {@attach inview()}>
			<p class="text-ink-soft text-lg">
				We deliver a genuine turn-key package — engineering, design, procurement, installation
				and after-sales support — under one accountable roof, led by
				<strong class="font-semibold text-ink">Engr. Vincent Vir M. Agbayani</strong>,
				Registered Electrical Engineer with 14 years of plant experience.
			</p>
			<ul class="flex flex-wrap gap-2 mt-8">
				{#each sectorsServed as s (s)}
					<li
						class="px-[0.9rem] py-[0.4rem] border border-line-strong rounded-full font-display font-semibold text-[0.85rem] text-ink-soft uppercase tracking-[0.12em]"
					>
						{s}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- ───────── stats ───────── -->
<section class="pb-[clamp(4rem,2.5rem+7vw,9rem)]">
	<div class="wrap">
		<hr class="rule-sunrise" />
		<div
			class="gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-12"
			data-reveal
			{@attach inview()}
		>
			{#each stats as s (s.label)}
				<Counter value={s.value} suffix={s.suffix} unit={s.unit} label={s.label} decimals={0} />
			{/each}
		</div>
	</div>
</section>

<!-- ───────── services preview ───────── -->
<section class="bg-paper-2 section-y">
	<div class="wrap">
		<header data-reveal {@attach inview()}>
			<span class="eyebrow">What we build</span>
			<h2 class="mt-[1.2rem] text-d-sm uppercase">Two ways to own your power</h2>
		</header>
		<div class="gap-6 grid grid-cols-1 lg:grid-cols-2 mt-14">
			{#each services as s (s.id)}
				<a
					href="/services#{s.id}"
					class="group flex flex-col bg-surface border border-line focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] rounded-md outline-none overflow-hidden transition-[transform,border-color,box-shadow] hover:-translate-y-1 duration-200 ease-out hover:[box-shadow:0_1px_0_var(--color-line-strong),0_18px_40px_-28px_oklch(0.3_0.05_90/0.55)] focus-visible:[box-shadow:0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]"
					data-reveal
					{@attach inview()}
				>
					<div class="aspect-16/10 overflow-hidden">
						<img
							src={s.image}
							alt=""
							loading="lazy"
							decoding="async"
							class="size-full object-cover scale-[1.02] group-hover:scale-[1.07] transition-transform duration-900 ease-out"
						/>
					</div>
					<div class="flex flex-col flex-1 gap-[0.7rem] p-[clamp(1.5rem,3.5vw,2.6rem)]">
						<span class="font-display font-bold text-[0.95rem] text-amber-deep tracking-[0.2em]">
							{s.index}
						</span>
						<h3 class="text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] uppercase">{s.name}</h3>
						<p class="text-ink-soft">{s.summary}</p>
						<span class="mt-auto pt-[1.2rem] text-[0.95rem] text-ink tlink">
							Explore
							<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
								<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
							</svg>
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ───────── selected work ───────── -->
<section class="section-y">
	<div class="wrap">
		<header
			class="flex flex-wrap justify-between items-end gap-8"
			data-reveal
			{@attach inview()}
		>
			<div>
				<span class="eyebrow">Selected work</span>
				<h2 class="mt-[1.2rem] text-d-sm uppercase">Real roofs. Real meters.</h2>
			</div>
			<a class="text-ink tlink" href="/projects">
				All projects
				<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
				</svg>
			</a>
		</header>
		<div class="gap-6 grid grid-cols-2 lg:grid-cols-6 mt-14">
			{#each grid as p, i (p.slug)}
				<div
					class={[i === 0 ? 'col-span-2 lg:col-span-6' : 'col-span-2 lg:col-span-3']}
					data-reveal="clip"
					{@attach inview()}
				>
					<ProjectCard project={p} feature={i === 0} />
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ───────── process ───────── -->
<section class="bg-paper-2 section-y">
	<div class="wrap">
		<header data-reveal {@attach inview()}>
			<span class="eyebrow">The turn-key package</span>
			<h2 class="mt-[1.2rem] max-w-[16ch] text-d-sm uppercase">Five steps, one accountable team</h2>
		</header>
		<ol class="mt-12 border-line border-t">
			{#each process as step (step.n)}
				<li
					class="gap-[clamp(1rem,4vw,4rem)] grid grid-cols-1 sm:grid-cols-[7rem_1fr] py-[2.2rem] border-line border-b"
					data-reveal
					{@attach inview()}
				>
					<span class="font-display font-bold text-[2.4rem] text-amber-deep leading-none tabular">
						{step.n}
					</span>
					<div
						class="items-baseline gap-[clamp(0.6rem,4vw,4rem)] grid grid-cols-1 lg:grid-cols-[14rem_1fr]"
					>
						<h3 class="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] uppercase">{step.title}</h3>
						<p class="max-w-[52ch] text-ink-soft">{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<Cta />
