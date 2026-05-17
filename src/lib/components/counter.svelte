<script lang="ts">
	interface Props {
		value: number;
		suffix?: string;
		unit?: string;
		label: string;
		decimals?: number;
	}
	let { value, suffix = '', unit = '', label, decimals = 0 }: Props = $props();

	/* Word units (projects, years) read as caps by design; the kWp unit
	   symbol must keep its mixed case and sits tighter. */
	let unitCls = $derived(
		unit.toLowerCase() === 'kwp' ? 'normal-case tracking-[0.02em]' : 'uppercase tracking-[0.16em]'
	);

	let shown = $state(0);

	const fmt = (n: number) =>
		n.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		});

	function count(node: HTMLElement) {
		const reduced =
			typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced || typeof IntersectionObserver === 'undefined') {
			shown = value;
			return;
		}
		let raf = 0;
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				io.disconnect();
				const start = performance.now();
				const dur = 1500;
				const tick = (now: number) => {
					const t = Math.min(1, (now - start) / dur);
					const eased = 1 - Math.pow(1 - t, 4);
					shown = value * eased;
					if (t < 1) raf = requestAnimationFrame(tick);
					else shown = value;
				};
				raf = requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		io.observe(node);
		return () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		};
	}
</script>

<div class="flex flex-col gap-[0.6rem]" {@attach count}>
	<div class="tabular flex items-baseline gap-[0.18em] font-display font-bold leading-[0.9] text-ink">
		<span class="text-[clamp(3rem,2rem+5vw,5.5rem)] tracking-[-0.02em]">{fmt(shown)}</span><span
			class="text-[clamp(2rem,1.4rem+3vw,3.4rem)] text-amber-deep">{suffix}</span
		>
		{#if unit}
			<span class="ml-[0.3rem] text-base font-semibold {unitCls} text-ink-faint">
				{unit}
			</span>
		{/if}
	</div>
	<div class="max-w-[22ch] text-sm leading-[1.45] text-ink-soft">{label}</div>
</div>
