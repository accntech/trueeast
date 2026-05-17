<script lang="ts">
	interface Props {
		tone?: 'ink' | 'night';
		compact?: boolean;
		href?: string | null;
	}
	let { tone = 'ink', compact = false, href = '/' }: Props = $props();

	let word = $derived(tone === 'night' ? 'text-on-night' : 'text-ink');
	let sub = $derived(tone === 'night' ? 'text-on-night-soft' : 'text-ink-faint');
	let markSize = $derived(compact ? 'size-8' : 'size-10');
	let mainSize = $derived(compact ? 'text-xl' : 'text-2xl');
	let subSize = $derived(compact ? 'text-[0.62rem]' : 'text-[0.7rem]');
</script>

{#snippet lockup()}
	<span class="inline-flex items-center gap-3">
		<svg class="{markSize} flex-none" viewBox="0 0 64 64" aria-hidden="true">
			<g stroke="var(--color-amber)" stroke-width="3.6" stroke-linecap="round">
				<line x1="32" y1="6" x2="32" y2="13.5" />
				<line x1="14" y1="13" x2="18.6" y2="18.6" />
				<line x1="50" y1="13" x2="45.4" y2="18.6" />
				<line x1="6" y1="30.5" x2="13.5" y2="30.5" />
				<line x1="58" y1="30.5" x2="50.5" y2="30.5" />
			</g>
			<path d="M15 39a17 17 0 0 1 34 0Z" fill="var(--color-amber)" />
			<path d="M9 45h46l5 13H4Z" fill="var(--color-green)" />
			<g stroke="var(--color-paper)" stroke-width="2.2" opacity="0.85">
				<line x1="24" y1="45" x2="21" y2="58" />
				<line x1="40" y1="45" x2="43" y2="58" />
				<line x1="6.5" y1="51.5" x2="57.5" y2="51.5" />
			</g>
		</svg>
		<span class="flex flex-col font-display leading-[0.86] {word}">
			<span class="{mainSize} font-extrabold uppercase tracking-[0.005em]">True East</span>
			<span class="{subSize} mt-[0.28rem] font-semibold uppercase tracking-[0.34em] {sub}">
				Energy Corp.
			</span>
		</span>
	</span>
{/snippet}

{#if href}
	<a
		{href}
		class="inline-flex rounded-sm border border-transparent outline-none transition-[border-color,box-shadow] focus-visible:border-[color-mix(in_oklch,var(--color-amber-deep)_60%,var(--color-line-strong))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-amber-deep)_18%,transparent)]"
		aria-label="True East Energy Corp., home"
	>
		{@render lockup()}
	</a>
{:else}
	{@render lockup()}
{/if}
