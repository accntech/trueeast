export interface Service {
	id: string;
	index: string;
	name: string;
	summary: string;
	body: string;
	points: string[];
	bestFor: string;
	image?: string;
}

export const services: Service[] = [
	{
		id: 'on-grid',
		index: '01',
		name: 'On-Grid Solar Systems',
		summary: 'Roof-mounted arrays tied to the utility grid that cut the monthly bill from day one.',
		body: 'Roof-mounted solar installations connected directly to the power grid. The array carries your daytime load and the grid covers the rest, so businesses and households see a lower electricity bill and a lighter dependence on the utility, with no batteries to maintain.',
		points: [
			'Lowest cost per installed kilowatt-peak',
			'Offsets daytime consumption immediately',
			'Reduced dependence on rising utility rates',
			'Minimal maintenance, decades of generation'
		],
		bestFor: 'Mills, schools, shops & homes with strong daytime usage',
		image: '/projects/agro-ricemill/2.jpeg'
	},
	{
		id: 'hybrid',
		index: '02',
		name: 'Hybrid Systems with Battery Storage',
		summary: 'Solar paired with battery storage for energy security through every brownout.',
		body: 'Solar panels combined with batteries that store excess energy for use at night or during outages. Hybrid systems maximise self-consumption and provide backup supply, built for hotels, clinics and homes in areas with frequent brownouts or an unstable grid.',
		points: [
			'Stored power for night use and outages',
			'Continuity through brownouts and grid instability',
			'Maximised solar self-consumption',
			'Energy security where it matters most'
		],
		bestFor: 'Hospitals, hotels & residences needing uninterrupted power',
		image: '/projects/dr-fonte/1.jpeg'
	}
];

export interface ProcessStep {
	n: string;
	title: string;
	body: string;
}

/* The company's stated "Turn-Key" package. */
export const process: ProcessStep[] = [
	{
		n: '01',
		title: 'Engineering',
		body: 'A registered electrical engineer assesses the site, the load profile and the structure, so every system is sized to the building, not a catalogue.'
	},
	{
		n: '02',
		title: 'Design',
		body: 'Array layout, electrical design and yield modelling are drawn up for maximum efficiency and a clean, code-compliant install.'
	},
	{
		n: '03',
		title: 'Procurement',
		body: 'Panels, inverters and storage are sourced and specified. The equipment that carries decades of generation is chosen, not improvised.'
	},
	{
		n: '04',
		title: 'Installation',
		body: 'A controlled, engineer-supervised build. Mounting, wiring and commissioning handled end to end by the team that designed it.'
	},
	{
		n: '05',
		title: 'After-Sales Support',
		body: 'Monitoring, maintenance and a direct line back to the people who built the system. The relationship does not end at switch-on.'
	}
];

export const advantages = [
	{
		title: 'Engineer-led, not sales-led',
		body: 'Every project is designed, engineered and managed by a Registered Electrical Engineer with 14 years of plant experience.'
	},
	{
		title: 'A genuine turn-key package',
		body: 'Engineering, design, procurement, installation and after-sales support under one accountable roof.'
	},
	{
		title: 'Built from real operating pain',
		body: 'Founded out of a rice-mill fighting its own electricity costs, so the savings case is lived, not pitched.'
	},
	{
		title: 'PhilGEPS-registered',
		body: 'Eligible for government and public-sector procurement, in full compliance with national standards.'
	}
];
