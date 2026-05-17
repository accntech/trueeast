<script lang="ts">
	import { inview } from '$lib/inview';
	import { completed, ongoing, type SystemType } from '$data/projects';
	import Seo from '$components/seo.svelte';
	import SunField from '$components/sun-field.svelte';
	import ProjectCard from '$components/project-card.svelte';
	import Counter from '$components/counter.svelte';
	import Cta from '$components/cta.svelte';

	type Filter = 'all' | SystemType;
	let filter = $state<Filter>('all');

	const filters: { id: Filter; label: string }[] = [
		{ id: 'all', label: 'All work' },
		{ id: 'On-Grid', label: 'On-Grid' },
		{ id: 'Hybrid', label: 'Hybrid + Battery' }
	];

	let shown = $derived(
		filter === 'all' ? completed : completed.filter((p) => p.system === filter)
	);
	const flagship = completed.find((p) => p.slug === 'vm-agbayani-ricemill');
	let rest = $derived(shown.filter((p) => p.slug !== 'vm-agbayani-ricemill'));
	let flagshipVisible = $derived(filter === 'all' || flagship?.system === filter);
</script>

<Seo
	title="Projects"
	description="From a 350 kWp rice-mill array to hospitals, schools, parishes and homes: 17 completed solar installations and 250 kWp under construction across Oriental Mindoro."
	image="/og/projects.jpg"
/>

<header class="isolate relative flex min-h-svh flex-col justify-center overflow-hidden py-32">
	<SunField />
	<div class="relative wrap page-head">
		<span class="eyebrow">The portfolio</span>
		<h1 class="mt-[1.6rem] font-extrabold text-d-lg uppercase leading-[0.86]">
			Seventeen roofs,<br />and counting.
		</h1>
		<p class="mt-8 max-w-[44ch] text-ink-soft text-xl">
			Every installation below is a real building with a real meter: mills, schools, clinics,
			parishes, government offices and homes across Oriental Mindoro and beyond.
		</p>
		<div
			class="gap-x-6 gap-y-10 grid grid-cols-2 sm:grid-cols-3 mt-14 pt-12 border-line border-t"
		>
			<Counter value={550} suffix="+" unit="kWp" label="Commissioned to date" />
			<Counter value={17} unit="projects" label="Completed installations" />
			<Counter value={250} unit="kWp" label="Under construction" />
		</div>
	</div>
</header>

<section class="pb-[clamp(4rem,2.5rem+7vw,9rem)]">
	<div class="wrap">
		<header class="mb-12" data-reveal {@attach inview()}>
			<span class="eyebrow">In construction</span>
			<h2 class="mt-[1.2rem] text-d-sm uppercase">Public-sector flagships</h2>
		</header>
		<div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
			{#each ongoing as p (p.slug)}
				<div data-reveal {@attach inview()}>
					<ProjectCard project={p} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="pb-[clamp(4rem,2.5rem+7vw,9rem)]">
	<div class="wrap">
		<div
			class="flex flex-wrap justify-between items-end gap-6 pt-12 border-line border-t"
			data-reveal
			{@attach inview()}
		>
			<div>
				<span class="eyebrow">Completed</span>
				<h2 class="mt-[1.2rem] text-d-sm uppercase">The track record</h2>
			</div>
			<div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by system">
				{#each filters as f (f.id)}
					<button
						onclick={() => (filter = f.id)}
						aria-pressed={filter === f.id}
						class={[
							'rounded-full border px-[1.1rem] py-[0.55rem] font-display text-[0.9rem] font-semibold uppercase tracking-widest outline-none transition-[color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_22%,transparent)]',
							filter === f.id
								? 'border-ink bg-ink text-paper'
								: 'border-line-strong text-ink-soft hover:border-ink hover:text-ink focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))]'
						]}
					>
						{f.label}
					</button>
				{/each}
			</div>
		</div>

		{#if flagship && flagshipVisible}
			<div class="mt-12" data-reveal="clip" {@attach inview()}>
				<ProjectCard project={flagship} feature />
			</div>
		{/if}

		{#if rest.length}
			<div
				class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6"
			>
				{#each rest as p (p.slug)}
					<div data-reveal {@attach inview()}>
						<ProjectCard project={p} />
					</div>
				{/each}
			</div>
		{:else if !flagshipVisible}
			<p class="mt-12 text-ink-soft text-lg">No projects match this filter yet.</p>
		{/if}
	</div>
</section>

<Cta
	title="Your building could be next."
	body="Tell us the roof, the load and the bills. We will show you the system and the savings."
/>
