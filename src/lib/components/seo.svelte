<script lang="ts">
	import { page } from '$app/state';
	import { company, ORIGIN } from '$data/site';

	interface Props {
		title: string;
		description: string;
		image?: string;
	}
	let { title, description, image = '/projects/agro-ricemill/1.jpeg' }: Props = $props();

	let full = $derived(`${title} — ${company.name}`);
	let url = $derived(`${ORIGIN}${page.url.pathname}`);
	let img = $derived(`${ORIGIN}${image}`);
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={company.name} />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={img} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={full} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
</svelte:head>
