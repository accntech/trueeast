export type SystemType = 'On-Grid' | 'Hybrid';
export type Sector =
	| 'Industrial'
	| 'Institutional'
	| 'Commercial'
	| 'Hospitality'
	| 'Residential'
	| 'Healthcare'
	| 'Government'
	| 'Faith';
export type Status = 'Completed' | 'Ongoing';

export interface Project {
	slug: string;
	name: string;
	location: string;
	sector: Sector;
	system: SystemType;
	status: Status;
	capacityKwp: number | null;
	battery?: string;
	/** static folder under /projects, photos numbered 1..n */
	folder?: string;
	photos?: number;
	/** 1-based photo to use as the card cover; defaults to 1. Set when
	   photo 1 is an interior/equipment shot so cards lead with the roof. */
	coverIndex?: number;
	note?: string;
}

/* Order mirrors the company profile's finished-projects list, then ongoing. */
export const projects: Project[] = [
	{
		slug: 'vm-agbayani-ricemill',
		name: 'VM Agbayani Ricemill',
		location: 'Oriental Mindoro',
		sector: 'Industrial',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 350,
		folder: 'agro-ricemill',
		photos: 2,
		note: 'The 350 kWp rooftop array that started it all, the rice-mill operation whose electricity bills first pushed True East toward solar.'
	},
	{
		slug: 'agbayani-agro-industrial',
		name: 'Agbayani Agro Industrial Corp.',
		location: 'Oriental Mindoro',
		sector: 'Industrial',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 12,
		folder: 'agro-office',
		photos: 3
	},
	{
		slug: 'clarendon-college',
		name: 'Clarendon College',
		location: 'Oriental Mindoro',
		sector: 'Institutional',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 60,
		folder: 'clarendon',
		photos: 2,
		coverIndex: 2
	},
	{
		slug: 'vgass-gasoline-station',
		name: 'VGASS Gasoline Station',
		location: 'Oriental Mindoro',
		sector: 'Commercial',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 10
	},
	{
		slug: 'mmm-clothing-shop',
		name: 'MMM Clothing Shop',
		location: 'Oriental Mindoro',
		sector: 'Commercial',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 10
	},
	{
		slug: 'randy-lolong-residence',
		name: 'Randy Lolong Residence',
		location: 'Oriental Mindoro',
		sector: 'Residential',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 10
	},
	{
		slug: 'nikki-miki-store',
		name: 'Nikki Miki Store',
		location: 'Romblon',
		sector: 'Commercial',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: null
	},
	{
		slug: 'dlee-bolinas-hotel',
		name: 'DLEE Bolinas Hotel',
		location: 'Oriental Mindoro',
		sector: 'Hospitality',
		system: 'Hybrid',
		status: 'Completed',
		capacityKwp: 20,
		battery: '560 Ah battery storage'
	},
	{
		slug: 'conthea-inn-restaurant',
		name: 'Conthea Inn & Restaurant',
		location: 'Oriental Mindoro',
		sector: 'Hospitality',
		system: 'Hybrid',
		status: 'Completed',
		capacityKwp: 10,
		battery: '2 × 280 Ah battery storage',
		folder: 'conthea-inn',
		photos: 5,
		coverIndex: 5
	},
	{
		slug: 'rancho-bernardo',
		name: 'Rancho Bernardo',
		location: 'Oriental Mindoro',
		sector: 'Hospitality',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 10
	},
	{
		slug: 'kayzelle-gutierrez-residence',
		name: 'Kayzelle Gutierrez Residence',
		location: 'Oriental Mindoro',
		sector: 'Residential',
		system: 'Hybrid',
		status: 'Completed',
		capacityKwp: 6,
		battery: '280 Ah battery storage',
		folder: 'kayzelle-gutierrez',
		photos: 4,
		coverIndex: 2
	},
	{
		slug: 'dr-fonte-medical-clinic',
		name: 'Dr. Fonte Medical Clinic & Pharmacy',
		location: 'Oriental Mindoro',
		sector: 'Healthcare',
		system: 'Hybrid',
		status: 'Completed',
		capacityKwp: 20,
		battery: '280 Ah battery storage',
		folder: 'dr-fonte',
		photos: 4,
		note: 'Round-the-clock resilience for a clinic and pharmacy: solar by day, stored power through every brownout.'
	},
	{
		slug: 'mdrrmo-roxas',
		name: 'MDRRMO, Roxas',
		location: 'Roxas, Oriental Mindoro',
		sector: 'Government',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: null
	},
	{
		slug: 'escala-canteen',
		name: 'Escala Canteen',
		location: 'Bongabong, Oriental Mindoro',
		sector: 'Commercial',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 6
	},
	{
		slug: 'gerry-mangante-residence',
		name: 'Gerry Mangante Residence',
		location: 'Oriental Mindoro',
		sector: 'Residential',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 8
	},
	{
		slug: 'st-catherine-parish',
		name: 'St. Catherine de Alexandria Parish',
		location: 'Oriental Mindoro',
		sector: 'Faith',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 11.16
	},
	{
		slug: 'renante-fetizanan-residence',
		name: 'Renante Fetizanan Residence',
		location: 'Oriental Mindoro',
		sector: 'Residential',
		system: 'On-Grid',
		status: 'Completed',
		capacityKwp: 8
	},
	{
		slug: 'lgu-roxas-municipal',
		name: 'Municipal Building, LGU Roxas',
		location: 'Roxas, Oriental Mindoro',
		sector: 'Government',
		system: 'On-Grid',
		status: 'Ongoing',
		capacityKwp: 100,
		note: 'A 100 kWp public-sector installation delivered under PhilGEPS procurement.'
	},
	{
		slug: 'pinamalayan-doctors-hospital',
		name: 'Pinamalayan Doctors Hospital',
		location: 'Pinamalayan, Oriental Mindoro',
		sector: 'Healthcare',
		system: 'On-Grid',
		status: 'Ongoing',
		capacityKwp: 150.04,
		note: 'True East&rsquo;s largest commission to date, 150.04 kWp keeping a hospital running on sunlight.'
	}
];

export const completed = projects.filter((p) => p.status === 'Completed');
export const ongoing = projects.filter((p) => p.status === 'Ongoing');
export const featured = projects.filter((p) => p.folder);

export function cover(p: Project): string | null {
	if (!p.folder) return null;
	return `/projects/${p.folder}/${p.coverIndex ?? 1}.jpeg`;
}

export function gallery(p: Project): string[] {
	if (!p.folder || !p.photos) return [];
	return Array.from({ length: p.photos }, (_, i) => `/projects/${p.folder}/${i + 1}.jpeg`);
}

export const sectors: Sector[] = [
	'Industrial',
	'Institutional',
	'Commercial',
	'Hospitality',
	'Healthcare',
	'Residential',
	'Government',
	'Faith'
];
