<script lang="ts">
	const uid = $props.id();
	const sun = `${uid}-sun`;
	const fade = `${uid}-fade`;
	const mask = `${uid}-mask`;
</script>

<svg
	class="pointer-events-none absolute top-1/2 right-[-6%] -z-10 h-[150%] -translate-y-1/2 text-amber"
	viewBox="0 0 600 600"
	fill="none"
	aria-hidden="true"
	preserveAspectRatio="xMidYMid meet"
>
	<defs>
		<radialGradient id={sun} cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="currentColor" stop-opacity="0.16" />
			<stop offset="55%" stop-color="currentColor" stop-opacity="0.06" />
			<stop offset="100%" stop-color="currentColor" stop-opacity="0" />
		</radialGradient>
		<linearGradient id={fade} x1="0" y1="0" x2="1" y2="0">
			<stop offset="0%" stop-color="white" stop-opacity="0" />
			<stop offset="60%" stop-color="white" stop-opacity="0.45" />
			<stop offset="100%" stop-color="white" stop-opacity="1" />
		</linearGradient>
		<mask id={mask}>
			<rect width="600" height="600" fill="url(#{fade})" />
		</mask>
	</defs>
	<g mask="url(#{mask})">
		<circle cx="300" cy="300" r="300" fill="url(#{sun})" />
		<g stroke="currentColor" stroke-width="1.4" fill="none" opacity="0.2">
			<circle cx="300" cy="300" r="118" />
			<circle cx="300" cy="300" r="182" />
			<circle cx="300" cy="300" r="248" />
		</g>
		<g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.22">
			<line x1="300" y1="40" x2="300" y2="94" />
			<line x1="476" y1="124" x2="438" y2="162" />
			<line x1="560" y1="300" x2="506" y2="300" />
			<line x1="476" y1="476" x2="438" y2="438" />
			<line x1="300" y1="560" x2="300" y2="506" />
			<line x1="124" y1="476" x2="162" y2="438" />
			<line x1="40" y1="300" x2="94" y2="300" />
			<line x1="124" y1="124" x2="162" y2="162" />
		</g>
	</g>
</svg>
