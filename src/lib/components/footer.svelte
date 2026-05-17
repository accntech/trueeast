<script lang="ts">
	import { company, nav } from '$data/site';
	import Logo from './logo.svelte';
	const year = new Date().getFullYear();
</script>

<footer class="relative bg-night overflow-hidden text-on-night">
	<div
		class="bottom-0 absolute inset-x-0 h-[70%] pointer-events-none [background:radial-gradient(120%_100%_at_22%_120%,oklch(0.62_0.16_58/0.32),transparent_62%)]"
		aria-hidden="true"
	></div>
	<div class="relative pt-[clamp(3.5rem,7vw,6rem)] pb-10 wrap">
		<div
			class="gap-x-8 gap-y-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] pb-14 border-line-night border-b"
		>
			<div class="sm:col-span-2 lg:col-span-1">
				<Logo tone="night" />
				<p
					class="mt-[1.4rem] max-w-[18ch] font-display font-semibold text-on-night text-2xl leading-[1.05]"
				>
					{company.tagline}
				</p>
				<p class="mt-4 text-on-night-soft text-sm tracking-[0.04em]">
					SEC Reg. No. {company.sec} · PhilGEPS-registered
				</p>
			</div>

			<nav class="flex flex-col gap-[0.7rem]" aria-label="Footer">
				<h2
					class="mb-[1.3rem] font-display font-semibold text-[0.85rem] text-amber uppercase tracking-[0.24em]"
				>
					Navigate
				</h2>
				{#each nav as item (item.href)}
					<a
						href={item.href}
						class="focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_26%,transparent)] border border-transparent focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_70%,var(--color-line-night))] rounded-sm outline-none w-fit text-on-night-soft hover:text-on-night transition-[color,border-color,box-shadow] duration-200 ease-out"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="flex flex-col gap-[0.7rem]">
				<h2
					class="mb-[1.3rem] font-display font-semibold text-[0.85rem] text-amber uppercase tracking-[0.24em]"
				>
					Office
				</h2>
				<address class="text-on-night-soft leading-[1.8]">
					{company.office.line1}<br />
					{company.office.line2}<br />
					{company.office.city}, {company.office.province}<br />
					{company.office.country}
				</address>
			</div>

			<div class="flex flex-col gap-[0.7rem]">
				<h2
					class="mb-[1.3rem] font-display font-semibold text-[0.85rem] text-amber uppercase tracking-[0.24em]"
				>
					Inquiries
				</h2>
				<a
					href="mailto:{company.email}"
					class="focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_26%,transparent)] border border-transparent focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_70%,var(--color-line-night))] rounded-sm outline-none w-fit text-on-night-soft hover:text-on-night transition-[color,border-color,box-shadow] duration-200 ease-out"
				>
					{company.email}
				</a>
				<a
					href="tel:{company.phone.replace(/\s/g, '')}"
					class="focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_26%,transparent)] border border-transparent focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_70%,var(--color-line-night))] rounded-sm outline-none w-fit text-on-night-soft hover:text-on-night transition-[color,border-color,box-shadow] duration-200 ease-out"
				>
					{company.phone}
				</a>
				<a class="[&::after]:bg-amber mt-[0.6rem] text-amber tlink" href="/contact">
					Start a project
					<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
						<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
					</svg>
				</a>
			</div>
		</div>

		<div
			class="flex flex-wrap justify-between gap-[0.6rem] pt-8 text-on-night-soft text-sm tracking-[0.04em]"
		>
			<span>&copy; {year} {company.name}</span>
			<span>Bongabong · Oriental Mindoro · Philippines</span>
		</div>
	</div>
</footer>
