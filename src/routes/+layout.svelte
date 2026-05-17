<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';

	let { children } = $props();
	let overHero = $derived(page.url.pathname === '/');
</script>

<a href="#main" class="skip-link">Skip to content</a>
<Header {overHero} />
<main id="main">
	{@render children()}
</main>
<Footer />
