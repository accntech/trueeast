<script lang="ts">
	import { page } from '$app/state';
	import { company, nav, ORIGIN } from '$data/site';

	interface Props {
		title: string;
		description: string;
		image?: string;
		imageAlt?: string;
		ogType?: string;
		noindex?: boolean;
	}
	let {
		title,
		description,
		image = '/og/home.jpg',
		imageAlt = 'True East Energy Corp., engineer-led solar in Oriental Mindoro',
		ogType = 'website',
		noindex = false
	}: Props = $props();

	let full = $derived(`${title} | ${company.name}`);
	let url = $derived(`${ORIGIN}${page.url.pathname}`);
	let img = $derived(`${ORIGIN}${image}`);

	let breadcrumb = $derived.by(() => {
		const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` }];
		const match = nav.find((n) => n.href !== '/' && n.href === page.url.pathname);
		if (match) {
			items.push({
				'@type': 'ListItem',
				position: 2,
				name: match.label,
				item: `${ORIGIN}${match.href}`
			});
		}
		return items;
	});

	let jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['Organization', 'LocalBusiness'],
				'@id': `${ORIGIN}/#organization`,
				name: company.name,
				alternateName: company.shortName,
				url: ORIGIN,
				logo: `${ORIGIN}/favicon.svg`,
				image: `${ORIGIN}/og/home.jpg`,
				description:
					'Engineer-led turn-key On-Grid and Hybrid solar in Bongabong, Oriental Mindoro. 550+ kWp commissioned across 17 installations.',
				foundingDate: String(company.founded),
				email: company.email,
				telephone: company.phone,
				founder: {
					'@type': 'Person',
					name: company.leader.name,
					jobTitle: company.leader.role
				},
				address: {
					'@type': 'PostalAddress',
					streetAddress: `${company.office.line1}, ${company.office.line2}`,
					addressLocality: company.office.city,
					addressRegion: company.office.province,
					addressCountry: 'PH'
				},
				geo: {
					'@type': 'GeoCoordinates',
					latitude: company.office.geo.lat,
					longitude: company.office.geo.lng
				},
				areaServed: { '@type': 'AdministrativeArea', name: 'Oriental Mindoro, Philippines' },
				knowsAbout: [
					'Solar power systems',
					'On-grid solar',
					'Hybrid solar with battery storage',
					'Solar engineering'
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Solar energy services',
					itemListElement: [
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'On-Grid solar system',
								serviceType: 'Solar power installation'
							}
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Hybrid solar + battery storage',
								serviceType: 'Solar power installation'
							}
						}
					]
				}
			},
			{
				'@type': 'WebSite',
				'@id': `${ORIGIN}/#website`,
				url: ORIGIN,
				name: company.name,
				inLanguage: 'en-PH',
				publisher: { '@id': `${ORIGIN}/#organization` }
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumb
			}
		]
	});
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#if noindex}
		<meta name="robots" content="noindex,nofollow" />
	{/if}
	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content={company.name} />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={img} />
	<meta property="og:image:secure_url" content={img} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:locale" content="en_PH" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={full} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:image:alt" content={imageAlt} />
	<meta name="geo.region" content={company.office.region} />
	<meta name="geo.placename" content="Bongabong, Oriental Mindoro" />
	<meta name="geo.position" content={`${company.office.geo.lat};${company.office.geo.lng}`} />
	<meta name="ICBM" content={`${company.office.geo.lat}, ${company.office.geo.lng}`} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
</svelte:head>
