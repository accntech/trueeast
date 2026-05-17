<script lang="ts">
	interface Props {
		value: string;
		options: string[];
		placeholder?: string;
		labelledby?: string;
		triggerClass?: string;
	}
	let {
		value = $bindable(),
		options,
		placeholder = 'Select an option',
		labelledby,
		triggerClass = ''
	}: Props = $props();

	const uid = $props.id();
	const listId = `${uid}-list`;
	const optId = (i: number) => `${uid}-opt-${i}`;

	let open = $state(false);
	let activeIndex = $state(-1);
	let typed = '';
	let typedTimer: ReturnType<typeof setTimeout>;

	let root: HTMLDivElement | undefined;
	let trigger: HTMLButtonElement | undefined;
	let list: HTMLUListElement | undefined;

	let selectedIndex = $derived(options.indexOf(value));

	function scrollActiveIntoView() {
		list?.querySelector(`#${CSS.escape(optId(activeIndex))}`)?.scrollIntoView({ block: 'nearest' });
	}

	function openList(index = selectedIndex >= 0 ? selectedIndex : 0) {
		open = true;
		activeIndex = index;
	}

	function close(refocus = true) {
		open = false;
		activeIndex = -1;
		if (refocus) trigger?.focus();
	}

	function choose(index: number) {
		if (index < 0 || index >= options.length) return;
		value = options[index];
		close();
	}

	function typeahead(char: string) {
		clearTimeout(typedTimer);
		typed += char.toLowerCase();
		typedTimer = setTimeout(() => (typed = ''), 600);
		const from = activeIndex < 0 ? 0 : activeIndex;
		for (let step = 1; step <= options.length; step++) {
			const i = (from + step) % options.length;
			if (options[i].toLowerCase().startsWith(typed)) {
				activeIndex = i;
				scrollActiveIntoView();
				return;
			}
		}
	}

	function onTriggerKey(e: KeyboardEvent) {
		if (['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'].includes(e.key)) {
			e.preventDefault();
			openList(e.key === 'End' ? options.length - 1 : e.key === 'Home' ? 0 : undefined);
		}
	}

	function onListKey(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = Math.min(options.length - 1, activeIndex + 1);
				scrollActiveIntoView();
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = Math.max(0, activeIndex - 1);
				scrollActiveIntoView();
				break;
			case 'Home':
				e.preventDefault();
				activeIndex = 0;
				scrollActiveIntoView();
				break;
			case 'End':
				e.preventDefault();
				activeIndex = options.length - 1;
				scrollActiveIntoView();
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				choose(activeIndex);
				break;
			case 'Escape':
				e.preventDefault();
				close();
				break;
			case 'Tab':
				close(true);
				break;
			default:
				if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
					e.preventDefault();
					typeahead(e.key);
				}
		}
	}

	function onWindowPointerDown(e: PointerEvent) {
		if (open && root && !root.contains(e.target as Node)) close(false);
	}

	function focusOnOpen(node: HTMLUListElement) {
		node.focus();
		node.querySelector(`#${CSS.escape(optId(activeIndex))}`)?.scrollIntoView({ block: 'nearest' });
	}
</script>

<svelte:window onpointerdown={onWindowPointerDown} />

<div class="relative" {@attach (n) => void (root = n)}>
	<button
		type="button"
		{@attach (n) => void (trigger = n)}
		onclick={() => (open ? close(false) : openList())}
		onkeydown={onTriggerKey}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls={listId}
		aria-labelledby={labelledby}
		class={[
			triggerClass,
			'flex items-center justify-between gap-3 text-left active:scale-[0.99]',
			'transition-transform duration-100 ease-out motion-reduce:transition-none'
		]}
	>
		<span class={value ? 'text-ink' : 'text-ink-faint'}>{value || placeholder}</span>
		<svg
			width="14"
			height="14"
			viewBox="0 0 16 16"
			aria-hidden="true"
			class={[
				'shrink-0 text-ink-soft transition-transform duration-200 ease-out motion-reduce:transition-none',
				open && '-rotate-180'
			]}
		>
			<path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.7" fill="none" />
		</svg>
	</button>

	<div
		aria-hidden={!open}
		class={[
			'absolute inset-x-0 top-full z-20 mt-2 origin-top overflow-hidden rounded-md',
			'border border-line-strong bg-surface',
			'[box-shadow:0_1px_0_var(--color-line),0_22px_44px_-26px_oklch(0.3_0.05_90/0.55)]',
			'transition-[opacity,transform] duration-[170ms] [transition-timing-function:var(--ease-out)]',
			'motion-reduce:transition-none',
			open
				? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
				: 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
		]}
	>
		<ul
			id={listId}
			role="listbox"
			tabindex="-1"
			aria-labelledby={labelledby}
			aria-activedescendant={open && activeIndex >= 0 ? optId(activeIndex) : undefined}
			onkeydown={onListKey}
			class="max-h-64 overflow-y-auto py-1.5 outline-none"
			{@attach (node) => {
				list = node;
				if (open) focusOnOpen(node);
			}}
		>
			{#each options as opt, i (opt)}
				<li
					id={optId(i)}
					role="option"
					aria-selected={opt === value}
					onpointerenter={() => (activeIndex = i)}
					onpointerdown={(e) => {
						e.preventDefault();
						choose(i);
					}}
					class={[
						'flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-[0.98rem]',
						i === activeIndex ? 'bg-paper-2' : 'bg-transparent',
						opt === value ? 'font-semibold text-ink' : 'text-ink-soft'
					]}
				>
					{opt}
					{#if opt === value}
						<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" class="shrink-0 text-amber-deep">
							<path d="M3 8.5l3.2 3.5L13 4.5" stroke="currentColor" stroke-width="1.8" fill="none" />
						</svg>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
