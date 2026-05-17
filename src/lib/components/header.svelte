<script lang="ts">
	import { page } from '$app/state';
	import { nav } from '$data/site';
	import Logo from './logo.svelte';

	interface Props {
		overHero?: boolean;
	}
	let { overHero = false }: Props = $props();

	let scrollY = $state(0);
	let menuOpen = $state(false);

	let solid = $derived(!overHero || scrollY > 64);
	let tone = $derived<'ink' | 'night'>(solid || menuOpen ? 'ink' : 'night');
	let linkColor = $derived(solid ? 'text-ink-soft' : 'text-on-night-soft');

	function open() {
		menuOpen = true;
		document.body.style.overflow = 'hidden';
	}
	function close() {
		menuOpen = false;
		document.body.style.overflow = '';
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) close();
	}
</script>

<svelte:window bind:scrollY onkeydown={onKey} />

<header
	class={[
		'fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color] duration-200 ease-out',
		solid
			? 'border-line bg-paper/85 [backdrop-filter:blur(14px)_saturate(1.4)]'
			: 'border-transparent bg-transparent'
	]}
>
	<div class="wrap flex h-20 items-center justify-between">
		<Logo {tone} compact />

		<nav class="hidden items-center gap-[clamp(1.2rem,2.2vw,2.4rem)] nav:flex" aria-label="Primary">
			{#each nav as item (item.href)}
				{@const active =
					item.href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(item.href)}
				<a
					href={item.href}
					aria-current={active ? 'page' : undefined}
					class={[
						'group relative rounded-sm border border-transparent py-[0.3rem] font-display text-[1.05rem] font-semibold uppercase tracking-[0.12em] outline-none transition-[color,border-color,box-shadow] duration-200 ease-out focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]',
						active ? (solid ? 'text-ink' : 'text-on-night') : linkColor,
						solid ? 'hover:text-ink' : 'hover:text-on-night'
					]}
				>
					{item.label}
					<span
						class={[
							'absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-amber transition-transform duration-200 ease-out',
							active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
						]}
					></span>
				</a>
			{/each}
			<a href="/contact" class="btn px-[1.15rem] py-[0.7rem] text-[0.92rem]">
				Get a quote
				<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" fill="none" />
				</svg>
			</a>
		</nav>

		<button
			onclick={() => (menuOpen ? close() : open())}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			aria-controls="site-menu"
			class="flex flex-col gap-1.5 rounded-sm border border-transparent p-2.5 outline-none transition-[border-color,box-shadow] nav:hidden focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]"
		>
			<span class={['block h-0.5 w-[26px]', solid ? 'bg-ink' : 'bg-on-night']}></span>
			<span class={['block h-0.5 w-[26px]', solid ? 'bg-ink' : 'bg-on-night']}></span>
		</button>
	</div>
</header>

<div
	id="site-menu"
	role="dialog"
	aria-modal="true"
	aria-label="Site menu"
	aria-hidden={!menuOpen}
	class={[
		'fixed inset-0 z-[110] flex flex-col bg-paper transition-[clip-path] duration-[460ms]',
		'[transition-timing-function:var(--ease-drawer)]',
		menuOpen ? 'pointer-events-auto [clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
	]}
>
	<div class="wrap flex h-20 flex-none items-center justify-between">
		<Logo compact />
		<button onclick={close} aria-label="Close menu" class="rounded-sm border border-transparent p-1.5 text-ink outline-none transition-[border-color,box-shadow] focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]">
			<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
				<path d="M6 6l14 14M20 6L6 20" stroke="currentColor" stroke-width="2" />
			</svg>
		</button>
	</div>
	<nav class="wrap flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Mobile">
		{#each nav as item, i (item.href)}
			<a
				href={item.href}
				onclick={close}
				style="--i:{i}"
				class={[
					'flex items-baseline gap-[1.1rem] rounded-sm border border-transparent font-display text-[clamp(2.6rem,13vw,4.6rem)] font-bold uppercase leading-[1.02] text-ink outline-none transition-[border-color,box-shadow] focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]',
					menuOpen
						? 'translate-y-4 opacity-0 animate-[menu-in_0.5s_var(--ease-out)_forwards] [animation-delay:calc(120ms+var(--i)*55ms)]'
						: 'opacity-0'
				]}
			>
				<span class="text-[0.9rem] font-semibold tracking-[0.2em] text-amber-deep">0{i + 1}</span>
				{item.label}
			</a>
		{/each}
	</nav>
	<div class="wrap flex-none pb-10">
		<a href="/contact" onclick={close} class="btn w-full justify-center">Start your project</a>
	</div>
</div>
