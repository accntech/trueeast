<script lang="ts">
	import { pic } from '$lib/img';
	import { cover, type Project } from '$data/projects';

	interface Props {
		project: Project;
		feature?: boolean;
	}
	let { project, feature = false }: Props = $props();

	let img = $derived(cover(project));
	let cap = $derived(
		project.capacityKwp != null
			? `${project.capacityKwp.toLocaleString('en-US')} kWp`
			: 'Turn-key install'
	);
</script>

{#if img}
	<article
		class={[
			'group relative isolate h-full overflow-hidden rounded-md bg-night-2',
			feature ? 'aspect-16/11' : 'aspect-4/3'
		]}
	>
		<enhanced:img
			src={pic(img)}
			alt="{project.name}, a {cap} solar installation in {project.location}"
			loading="lazy"
			decoding="async"
			sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
			class="absolute inset-0 size-full object-cover scale-[1.01] group-hover:scale-[1.06] transition-transform duration-900 ease-out"
		/>
		<div
			class="absolute inset-0 [background:linear-gradient(185deg,oklch(0.22_0.03_150/0.05)_30%,oklch(0.2_0.03_150/0.45)_62%,oklch(0.16_0.025_150/0.86))]"
		></div>
		{#if project.status === 'Ongoing'}
			<span
				class="top-4 left-4 absolute bg-amber px-[0.7rem] py-[0.4rem] rounded-sm font-display font-semibold text-[0.78rem] text-[oklch(0.2_0.02_150)] uppercase tracking-[0.16em]"
			>
				In construction
			</span>
		{/if}
		<div class="bottom-0 z-1 absolute inset-x-0 p-[clamp(1.2rem,3vw,2.2rem)] text-on-night">
			<span class="font-display font-semibold text-[0.82rem] text-amber uppercase tracking-[0.22em]">
				{project.sector} · {project.system}
			</span>
			<h3
				class={[
					'mt-2 font-bold uppercase leading-[0.98]',
					feature
						? 'text-[clamp(2rem,1.4rem+2.6vw,3.4rem)]'
						: 'text-[clamp(1.5rem,1.1rem+1.4vw,2.3rem)]'
				]}
			>
				{project.name}
			</h3>
			<div
				class="flex items-baseline gap-[1.1rem] mt-[0.8rem] font-display uppercase tracking-[0.08em] tabular"
			>
				<span class="font-bold text-[1.15rem] text-on-night">
					{#if project.capacityKwp != null}
						{project.capacityKwp.toLocaleString('en-US')} <span class="normal-case">kWp</span>
					{:else}
						{cap}
					{/if}
				</span>
				<span class="text-[0.92rem] text-on-night-soft tracking-[0.12em]">{project.location}</span>
			</div>
		</div>
	</article>
{:else}
	<article class="flex bg-surface border border-line rounded-md h-full overflow-hidden">
		<div class="flex flex-col gap-[1.4rem] p-[clamp(1.4rem,3vw,2rem)] w-full min-h-64">
			<div
				class="flex justify-between items-center font-display font-semibold text-[0.8rem] uppercase tracking-[0.18em]"
			>
				<span class="text-ink-soft">{project.sector}</span>
				<span class="text-green-deep">{project.system}</span>
			</div>
			<div
				class="mt-auto font-display font-bold text-[clamp(3.4rem,2.4rem+5vw,5.6rem)] text-ink leading-[0.8] tracking-[-0.02em] tabular"
			>
				{#if project.capacityKwp != null}
					{project.capacityKwp.toLocaleString('en-US')}<span
						class="ml-[0.4rem] font-semibold text-[0.3em] text-ink-faint tracking-[0.02em]"
						>kWp</span
					>
				{:else}
					<span class="text-[0.62em] text-amber-deep uppercase">Turn-key</span>
				{/if}
			</div>
			<div class="flex flex-col gap-[0.3rem] pt-[1.2rem] border-line border-t">
				<h3 class="font-bold text-ink text-2xl uppercase">{project.name}</h3>
				<span
					class="font-display text-[0.9rem] text-ink-faint uppercase tracking-widest"
				>
					{project.location}
				</span>
				{#if project.battery}
					<span class="mt-[0.3rem] text-green-deep text-sm">+ {project.battery}</span>
				{/if}
			</div>
		</div>
	</article>
{/if}
