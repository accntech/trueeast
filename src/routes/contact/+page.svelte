<script lang="ts">
	import { company } from '$data/site';
	import Seo from '$components/seo.svelte';
	import SunField from '$components/sun-field.svelte';
	import Select from '$components/select.svelte';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let kind = $state('Not sure yet');
	let message = $state('');
	let sent = $state(false);

	const kinds = [
		'On-Grid system',
		'Hybrid + battery storage',
		'Not sure yet'
	];

	const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${company.office.line1}, ${company.office.line2}, ${company.office.city}, ${company.office.province}, ${company.office.country}`
	)}`;

	function submit(e: SubmitEvent) {
		e.preventDefault();
		const subject = `Solar enquiry — ${kind} — ${name || 'Website'}`;
		const body = [
			`Name: ${name}`,
			`Email: ${email}`,
			`Phone: ${phone}`,
			`Interested in: ${kind}`,
			'',
			message
		].join('\n');
		window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`;
		sent = true;
	}

	const fieldCls =
		'mt-2 w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-ink outline-none transition-[color,border-color,box-shadow] duration-200 ease-out focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]';
	const labelCls =
		'font-display text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-ink-faint';
</script>

<Seo
	title="Contact"
	description="Talk to True East Energy Corp. — engineer-led solar in Bongabong, Oriental Mindoro. Request a turn-key On-Grid or Hybrid proposal."
/>

<header class="isolate relative flex min-h-svh flex-col justify-center overflow-hidden py-32">
	<SunField />
	<div class="relative wrap">
		<span class="eyebrow">Get in touch</span>
		<h1 class="mt-[1.6rem] font-extrabold text-d-lg uppercase leading-[0.86]">
			Let&rsquo;s talk<br />about your roof.
		</h1>
		<p class="mt-8 max-w-[42ch] text-ink-soft text-xl">
			Send your building details and a recent electricity bill. The engineer who will design
			your system reads every enquiry.
		</p>
	</div>
</header>

<section class="section-y">
	<div
		class="gap-[clamp(2.5rem,6vw,5rem)] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] wrap"
	>
		<div class="pt-12 border-line border-t">
			{#if sent}
				<div class="flex flex-col justify-center min-h-96">
					<span class="eyebrow">Almost there</span>
					<h2 class="mt-[1.2rem] text-d-sm uppercase">Your email is ready</h2>
					<p class="mt-6 max-w-[44ch] text-ink-soft text-lg">
						We&rsquo;ve opened a pre-filled message in your email app addressed to
						<a class="text-ink decoration-2 decoration-amber underline underline-offset-4" href="mailto:{company.email}">{company.email}</a>.
						Hit send and we&rsquo;ll be in touch shortly.
					</p>
					<button
						onclick={() => (sent = false)}
						class="mt-8 text-ink tlink"
					>
						Edit the form again
					</button>
				</div>
			{:else}
				<form onsubmit={submit} class="gap-7 grid">
					<div class="gap-7 grid grid-cols-1 sm:grid-cols-2">
						<label class="block">
							<span class={labelCls}>Name</span>
							<input class={fieldCls} bind:value={name} required autocomplete="name" />
						</label>
						<label class="block">
							<span class={labelCls}>Phone</span>
							<input class={fieldCls} bind:value={phone} type="tel" autocomplete="tel" />
						</label>
					</div>
					<label class="block">
						<span class={labelCls}>Email</span>
						<input class={fieldCls} bind:value={email} type="email" required autocomplete="email" />
					</label>
					<div class="block">
						<span id="kind-label" class={labelCls}>What are you considering?</span>
						<Select
							bind:value={kind}
							options={kinds}
							labelledby="kind-label"
							triggerClass={fieldCls}
						/>
					</div>
					<label class="block">
						<span class={labelCls}>Tell us about the building</span>
						<textarea
							class="{fieldCls} min-h-32 resize-y"
							bind:value={message}
							rows="5"
							placeholder="Roof type, floor area, monthly bill, location…"
						></textarea>
					</label>
					<button type="submit" class="justify-center w-full sm:w-fit btn">
						Send enquiry
						<svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true">
							<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
						</svg>
					</button>
					<p class="text-ink-faint text-sm">
						This opens your email app with the details pre-filled — nothing is sent until you
						press send there.
					</p>
				</form>
			{/if}
		</div>

		<aside class="pt-12 border-line border-t">
			<span class="eyebrow">Head office</span>
			<address class="mt-6 font-display font-semibold text-ink text-2xl uppercase leading-[1.15]">
				{company.office.line1}<br />
				{company.office.line2}<br />
				{company.office.city}, {company.office.province}<br />
				{company.office.country}
			</address>
			<a href={mapsHref} target="_blank" rel="noopener" class="mt-6 text-ink tlink">
				Get directions
				<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
				</svg>
			</a>

			<dl class="gap-px grid bg-line mt-12 border border-line rounded-md overflow-hidden">
				<div class="bg-surface p-6">
					<dt class="{labelCls}">Email</dt>
					<dd class="mt-2 text-ink text-lg">
						<a class="focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)] border border-transparent focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] rounded-sm outline-none hover:text-amber-deep transition-[color,border-color,box-shadow]" href="mailto:{company.email}">{company.email}</a>
					</dd>
				</div>
				<div class="bg-surface p-6">
					<dt class="{labelCls}">Phone</dt>
					<dd class="mt-2 text-ink text-lg">
						<a class="focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)] border border-transparent focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] rounded-sm outline-none hover:text-amber-deep transition-[color,border-color,box-shadow]" href="tel:{company.phone.replace(/\s/g, '')}">
							{company.phone}
						</a>
					</dd>
				</div>
				<div class="bg-surface p-6">
					<dt class="{labelCls}">On the record</dt>
					<dd class="mt-2 text-ink text-lg">
						SEC {company.sec} · PhilGEPS-registered
					</dd>
				</div>
			</dl>
		</aside>
	</div>
</section>
