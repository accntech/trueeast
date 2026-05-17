<script lang="ts">
	import { inview } from '$lib/inview';
	import { pic } from '$lib/img';
	import { company } from '$data/site';
	import Seo from '$components/seo.svelte';
	import SunField from '$components/sun-field.svelte';
	import Cta from '$components/cta.svelte';

	const credentials = [
		{ k: 'Registered name', v: company.name },
		{ k: 'SEC registration', v: company.sec },
		{ k: 'Company type', v: 'Stock Corporation' },
		{ k: 'Scope', v: 'Generation · Transmission · Distribution' },
		{ k: 'Procurement', v: 'PhilGEPS-registered' },
		{ k: 'Head office', v: `${company.office.city}, ${company.office.province}` }
	];
</script>

<Seo
	title="About"
	description="True East Energy Corp. — an engineer-led solar company born from a rice mill in Bongabong, Oriental Mindoro. SEC-registered, PhilGEPS-eligible."
	image="/og/about.jpg"
/>

<header class="isolate relative flex flex-col justify-center py-32 min-h-svh overflow-hidden">
	<SunField />
	<div class="relative wrap page-head">
		<span class="eyebrow">The company</span>
		<h1 class="mt-[1.6rem] font-extrabold text-d-lg uppercase leading-[0.86]">
			Built by an engineer,<br />from a rice&nbsp;mill.
		</h1>
		<p class="mt-8 max-w-[30ch] text-ink-soft text-xl">
			True East Energy Corp. is a Philippine stock corporation in power generation, transmission
			and distribution — founded where the electricity bill hurt most, and run by the engineer
			who solved it.
		</p>
	</div>
</header>

<section class="pb-[clamp(4rem,2.5rem+7vw,9rem)]">
	<div
		class="items-start gap-[clamp(2rem,6vw,6rem)] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] pt-14 border-line border-t wrap"
	>
		<div data-reveal {@attach inview()}>
			<p class="text-ink-soft text-lg">
				The company grew out of ricemill operations, where high electricity costs made reliable,
				sustainable energy a daily necessity rather than an ambition. Recognising that challenge,
				True East began offering solar solutions that not only lower expenses but also support
				environmental sustainability.
			</p>
			<p class="mt-[1.6rem] text-ink-soft text-lg">
				What started as a fix for one operation became a discipline: design the system to the
				building, install it properly, and stand behind it. Today True East delivers that same
				rigour to mills, schools, clinics, parishes, government buildings and homes across
				Oriental Mindoro and beyond.
			</p>
		</div>
		<blockquote class="m-0" data-reveal {@attach inview()}>
			<p
				class="font-display font-semibold text-[clamp(1.6rem,1.1rem+2vw,2.6rem)] text-ink text-balance leading-[1.1]"
			>
				&ldquo;The savings case isn&rsquo;t a pitch here. We lived it on our own electricity bill
				first.&rdquo;
			</p>
		</blockquote>
	</div>
</section>

<section class="pb-[clamp(4rem,2.5rem+7vw,9rem)]">
	<div
		class="items-center gap-[clamp(2rem,5vw,4.5rem)] grid grid-cols-1 lg:grid-cols-2 wrap"
	>
		<div
			class="order-first rounded-md aspect-5/4 overflow-hidden"
			data-reveal="clip"
			{@attach inview()}
		>
			<enhanced:img
				src={pic('/projects/agro-ricemill/hero.jpeg')}
				alt="A True East solar installation at golden hour, Oriental Mindoro"
				loading="lazy"
				decoding="async"
				sizes="(min-width: 1024px) 50vw, 100vw"
				class="size-full object-cover"
			/>
		</div>
		<div data-reveal {@attach inview()}>
			<span class="eyebrow">Leadership</span>
			<h2 class="mt-[1.2rem] text-d-sm uppercase">{company.leader.name}</h2>
			<p
				class="mt-4 font-display font-semibold text-[1.2rem] text-amber-deep uppercase tracking-[0.06em]"
			>
				{company.leader.role}
			</p>
			<p class="mt-[0.4rem] text-ink-faint text-sm tracking-[0.04em]">
				{company.leader.credential}
			</p>
			<p class="mt-[1.6rem] max-w-[48ch] text-ink-soft text-lg">
				A graduate of Mapúa University with {company.leader.experience} years of experience as a
				plant engineer, he ensures every project is carefully designed, engineered and managed
				for maximum efficiency and reliability — the reason True East is engineer-led, not
				sales-led.
			</p>
		</div>
	</div>
</section>

<section class="isolate relative overflow-hidden text-on-night">
	<div class="-z-10 absolute inset-0" aria-hidden="true">
		<enhanced:img
			src={pic('/projects/agro-ricemill/2.jpeg')}
			alt=""
			loading="lazy"
			decoding="async"
			sizes="100vw"
			class="size-full object-cover"
		/>
		<div
			class="absolute inset-0 [background:linear-gradient(95deg,oklch(0.2_0.025_150/0.93)_40%,oklch(0.2_0.025_150/0.6)),radial-gradient(70%_90%_at_88%_12%,oklch(0.62_0.16_58/0.32),transparent_58%)]"
		></div>
	</div>
	<div class="py-[clamp(4.5rem,9vw,8rem)] wrap" data-reveal {@attach inview()}>
		<span class="eyebrow eyebrow-night">The commitment</span>
		<p
			class="mt-[1.6rem] max-w-[24ch] font-display font-semibold text-[clamp(1.8rem,1.1rem+3vw,3.6rem)] text-on-night text-balance leading-[1.06]"
		>
			Help clients cut electricity costs and carbon footprints, and support the global shift to
			renewable energy — with systems that are innovative, sustainable and dependable.
		</p>
	</div>
</section>

<section class="section-y">
	<div class="wrap">
		<header data-reveal {@attach inview()}>
			<span class="eyebrow">On the record</span>
			<h2 class="mt-[1.2rem] text-d-sm uppercase">Registered, compliant, accountable</h2>
		</header>
		<dl class="mt-12 border-line border-t">
			{#each credentials as c (c.k)}
				<div
					class="gap-2 sm:gap-8 grid grid-cols-1 sm:grid-cols-[16rem_1fr] py-6 border-line border-b"
					data-reveal
					{@attach inview()}
				>
					<dt
						class="font-display font-semibold text-[0.9rem] text-ink-faint uppercase tracking-[0.18em]"
					>
						{c.k}
					</dt>
					<dd class="m-0 text-ink text-lg">{c.v}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<Cta
	title="Work with the engineer."
	body="Every system True East installs is designed and managed by a Registered Electrical Engineer. Bring us your building."
/>
