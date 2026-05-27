/* Generates company-profile.md for make-pdf. Project photos and the brand
   typefaces are embedded as base64 (make-pdf loads HTML inline into Chromium,
   so no file path resolves). A <style> block is injected at the top of the
   body — it survives make-pdf's HTML sanitizer (<style> is not a danger tag)
   and, coming after make-pdf's head CSS, overrides it. This mirrors the live
   site's editorial system: Big Shoulders display, Hanken Grotesk body, the
   sun-bleached paper / amber / deep-green palette from src/app.css. Every
   figure is drawn from src/lib/data/*. Nothing is invented. */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const here = import.meta.dir;
const root = join(here, '..');

const b64 = (p: string) => readFileSync(p).toString('base64');
const imgUri = (f: string) => `data:image/jpeg;base64,${b64(join(here, 'img', f))}`;
const fontUri = (p: string) => `data:font/woff2;base64,${b64(join(root, p))}`;

const bigShoulders = fontUri(
	'node_modules/@fontsource-variable/big-shoulders/files/big-shoulders-latin-wght-normal.woff2'
);
const hanken = fontUri(
	'node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2'
);

/* The favicon mark (deep-green badge, amber sun, panels) as the cover device. */
const mark = `data:image/svg+xml;base64,${Buffer.from(
	readFileSync(join(root, 'static/favicon.svg'), 'utf8')
).toString('base64')}`;

function figure(file: string, alt: string, caption: string): string {
	return `<figure>\n<img src="${imgUri(file)}" alt="${alt}">\n<figcaption>${caption}</figcaption>\n</figure>`;
}
function plate(file: string, alt: string, caption: string): string {
	return `<figure class="plate">\n<img src="${imgUri(file)}" alt="${alt}">\n<figcaption>${caption}</figcaption>\n</figure>`;
}

const completed = [
	['VM Agbayani Ricemill', 'Oriental Mindoro', 'Industrial', 'On-Grid', '350'],
	['Agbayani Agro Industrial Corp.', 'Oriental Mindoro', 'Industrial', 'On-Grid', '12'],
	['Clarendon College', 'Oriental Mindoro', 'Institutional', 'On-Grid', '60'],
	['VGASS Gasoline Station', 'Oriental Mindoro', 'Commercial', 'On-Grid', '10'],
	['MMM Clothing Shop', 'Oriental Mindoro', 'Commercial', 'On-Grid', '10'],
	['Randy Lolong Residence', 'Oriental Mindoro', 'Residential', 'On-Grid', '10'],
	['Nikki Miki Store', 'Romblon', 'Commercial', 'On-Grid', 'n/a'],
	['DLEE Bolinas Hotel', 'Oriental Mindoro', 'Hospitality', 'Hybrid', '20'],
	['Conthea Inn & Restaurant', 'Oriental Mindoro', 'Hospitality', 'Hybrid', '10'],
	['Rancho Bernardo', 'Oriental Mindoro', 'Hospitality', 'On-Grid', '10'],
	['Kayzelle Gutierrez Residence', 'Oriental Mindoro', 'Residential', 'Hybrid', '6'],
	['Dr. Fonte Medical Clinic & Pharmacy', 'Oriental Mindoro', 'Healthcare', 'Hybrid', '20'],
	['MDRRMO, Roxas', 'Roxas, Oriental Mindoro', 'Government', 'On-Grid', 'n/a'],
	['Escala Canteen', 'Bongabong, Oriental Mindoro', 'Commercial', 'On-Grid', '6'],
	['Gerry Mangante Residence', 'Oriental Mindoro', 'Residential', 'On-Grid', '8'],
	['St. Catherine de Alexandria Parish', 'Oriental Mindoro', 'Faith', 'On-Grid', '11.16'],
	['Renante Fetizanan Residence', 'Oriental Mindoro', 'Residential', 'On-Grid', '8']
];
const ongoing = [
	['Municipal Building, LGU Roxas', 'Roxas, Oriental Mindoro', 'Government', 'On-Grid', '100'],
	['Private Hospital', 'Pinamalayan, Oriental Mindoro', 'Healthcare', 'On-Grid', '150.04']
];
const row = (r: string[]) => `| ${r.join(' | ')} |`;
const head = '| Project | Location | Sector | System | kWp |\n| :-- | :-- | :-- | :-- | --: |';

const css = `<style>
@font-face{font-family:'Big Shoulders';src:url(${bigShoulders}) format('woff2');font-weight:300 800;font-display:block}
@font-face{font-family:'Hanken Grotesk';src:url(${hanken}) format('woff2');font-weight:300 700;font-display:block}

:root{
 --paper:#ffffff;--paper-2:#ffffff;
 --ink:oklch(0.243 0.024 150);--ink-soft:oklch(0.424 0.022 138);--ink-faint:oklch(0.566 0.02 120);
 --amber:oklch(0.756 0.162 64);--amber-deep:oklch(0.642 0.158 52);--green:oklch(0.52 0.118 152);
 --night:oklch(0.226 0.027 152);--line:oklch(0.876 0.016 82);--line-strong:oklch(0.79 0.02 80);
}
*{ -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
html,body,.pagedjs_sheet,.pagedjs_page{ background:var(--paper) !important; }

body{
 font-family:'Hanken Grotesk',system-ui,sans-serif !important;
 color:var(--ink) !important; font-size:10.5pt !important; line-height:1.62 !important;
 font-weight:420; font-feature-settings:'ss01','cv05';
}
p{ color:var(--ink-soft); margin:0 0 10pt; }
strong{ color:var(--ink); font-weight:650; }
a{ color:var(--amber-deep) !important; text-decoration:none; }

/* ── Display headings ───────────────────────────── */
h1,h2,h3,h4{ font-family:'Big Shoulders','Arial Narrow',sans-serif !important;
 text-transform:uppercase; color:var(--ink) !important; letter-spacing:.005em; }

.chapter h1{
 font-size:30pt !important; font-weight:800 !important; line-height:.92 !important;
 letter-spacing:-.005em; margin:34pt 0 14pt !important; padding-top:14pt;
 border-top:2px solid var(--ink); break-after:avoid;
}
.chapter h1:first-of-type{ margin-top:0 !important; }
h2{ font-size:18pt !important; font-weight:700 !important; line-height:1.05 !important;
 margin:26pt 0 8pt !important; color:var(--ink) !important; break-after:avoid; }
h3{ font-size:12.5pt !important; font-weight:700 !important; letter-spacing:.14em;
 color:var(--ink-faint) !important; margin:20pt 0 6pt !important; break-after:avoid; }

/* eyebrow label (raw <p class=eyebrow> in the markdown) */
.eyebrow{ font-family:'Big Shoulders',sans-serif; font-weight:700;
 font-size:9pt !important; letter-spacing:.28em; text-transform:uppercase;
 color:var(--amber-deep) !important; margin:0 0 2pt !important;
 display:flex; align-items:center; gap:10px; break-after:avoid; }
.eyebrow::before{ content:""; width:26px; height:2px; background:var(--amber); flex:none; }

.lede{ font-family:'Big Shoulders',sans-serif; font-weight:600;
 font-size:15.5pt !important; line-height:1.18 !important; color:var(--ink) !important;
 text-transform:none; margin:6pt 0 16pt !important; max-width:30em; }

/* ── Cover (make-pdf .cover markup, restyled) ────── */
.cover{ padding-top:6pt; }
.cover::before{
 content:""; display:block; width:62pt; height:62pt; margin:0 0 30pt;
 background:url(${mark}) center/contain no-repeat;
}
.cover .eyebrow,.cover .cover-subtitle{ display:none; }
.cover h1.cover-title{
 font-family:'Big Shoulders',sans-serif !important; font-size:62pt !important;
 font-weight:800 !important; line-height:.86 !important; letter-spacing:-.01em !important;
 text-transform:uppercase; color:var(--ink) !important; max-width:none !important;
 margin:0 0 4pt !important;
}
.cover h1.cover-title::after{
 content:"Power rising in the East."; display:block; font-size:17pt;
 font-weight:600; letter-spacing:0; text-transform:none; color:var(--amber-deep);
 margin-top:14pt;
}
.cover hr.rule{ width:100% !important; border-top:2px solid var(--line-strong) !important;
 margin:54pt 0 14pt 0 !important; }
.cover .cover-meta{ font-family:'Big Shoulders',sans-serif; text-transform:uppercase;
 letter-spacing:.18em; font-size:9.5pt !important; color:var(--ink-faint) !important; }
.cover .cover-meta strong{ color:var(--ink) !important; font-weight:700; }

/* ── Contents (make-pdf .toc) ────────────────────── */
.toc h2{ font-family:'Big Shoulders',sans-serif !important; color:var(--ink) !important;
 font-size:11pt !important; letter-spacing:.26em !important; border-bottom:2px solid var(--ink);
 padding-bottom:8pt; margin-bottom:14pt !important; }
.toc li{ margin:0 0 2pt; }
.toc li.level-1{ font-family:'Big Shoulders',sans-serif; text-transform:uppercase;
 font-weight:700; font-size:11.5pt; color:var(--ink); margin-top:11pt; letter-spacing:.04em; }
.toc li.level-2{ font-family:'Hanken Grotesk',sans-serif; font-size:9.5pt;
 color:var(--ink-soft); padding-left:18pt; text-transform:none; }
.toc .toc-page{ font-family:'Big Shoulders',sans-serif; color:var(--ink-faint); }
.toc a{ color:inherit !important; }

/* ── Figures: symmetrical, centred, rounded ──────── */
figure{ margin:18pt auto !important; text-align:center; break-inside:avoid; }
figure img{ display:block; width:auto; max-width:100%; height:auto;
 max-height:2.7in; margin:0 auto; border-radius:10px; }
figure.plate img{ max-height:2.5in; }
figcaption{ font-family:'Big Shoulders',sans-serif !important; font-style:normal !important;
 text-transform:uppercase; letter-spacing:.14em; font-size:8pt !important;
 color:var(--ink-faint) !important; margin:9pt auto 0 !important;
 padding-top:7pt; border-top:2px solid var(--amber);
 display:inline-block; }

/* ── Pull quote (blockquote) ─────────────────────── */
blockquote{ border:0 !important; margin:20pt 0 !important; padding:0 0 0 18pt !important;
 border-left:3px solid var(--amber) !important; }
blockquote p{ font-family:'Big Shoulders',sans-serif; font-weight:600;
 font-size:19pt !important; line-height:1.12; color:var(--ink) !important; }

/* ── Lists ───────────────────────────────────────── */
ul{ list-style:none; padding-left:0; margin:8pt 0 12pt; }
ul li{ position:relative; padding-left:18pt; margin:0 0 5pt; color:var(--ink); }
ul li::before{ content:""; position:absolute; left:0; top:.55em; width:7px; height:7px;
 background:var(--amber); clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%); }

/* ── Stats band (raw HTML) ───────────────────────── */
.stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:0;
 border-top:2px solid var(--ink); border-bottom:1px solid var(--line-strong);
 margin:18pt 0 6pt; break-inside:avoid; }
.stats div{ padding:12pt 14pt 12pt 0; }
.stats b{ display:block; font-family:'Big Shoulders',sans-serif; font-weight:800;
 font-size:30pt; line-height:1; color:var(--ink); letter-spacing:-.01em; }
.stats b i{ font-style:normal; color:var(--amber-deep); font-size:18pt; }
.stats span{ display:block; margin-top:6pt; font-size:8pt; color:var(--ink-soft);
 text-transform:uppercase; letter-spacing:.1em; font-family:'Big Shoulders',sans-serif;
 font-weight:600; }

/* ── Definition grid (At a glance / records) ─────── */
.facts{ margin:8pt 0 4pt; border-top:1px solid var(--line-strong); }
.facts div{ display:grid; grid-template-columns:11em 1fr; gap:14pt;
 padding:7pt 0; border-bottom:1px solid var(--line); break-inside:avoid; }
.facts dt{ font-family:'Big Shoulders',sans-serif; font-weight:700; font-size:8.5pt;
 letter-spacing:.16em; text-transform:uppercase; color:var(--ink-faint); }
.facts dd{ margin:0; color:var(--ink); font-size:10pt; }

/* ── Turn-key steps (raw HTML ol) ────────────────── */
.steps{ list-style:none; counter-reset:s; padding:0; margin:14pt 0;
 border-top:1px solid var(--line-strong); }
.steps li{ counter-increment:s; display:grid; grid-template-columns:3.4em 9em 1fr;
 gap:18pt; padding:13pt 0; border-bottom:1px solid var(--line);
 align-items:baseline; break-inside:avoid; }
.steps li::before{ content:"0" counter(s); font-family:'Big Shoulders',sans-serif;
 font-weight:800; font-size:20pt; color:var(--amber-deep); }
.steps b{ font-family:'Big Shoulders',sans-serif; text-transform:uppercase;
 font-weight:700; font-size:12pt; color:var(--ink); letter-spacing:.04em; }
.steps p{ margin:0; font-size:9.5pt; }

/* ── Advantage cards (raw HTML) ──────────────────── */
.adv{ display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line);
 border:1px solid var(--line); margin:14pt 0; break-inside:avoid; }
.adv div{ background:var(--paper); padding:16pt; }
.adv h4{ font-size:12pt !important; margin:0 0 5pt; color:var(--ink) !important; }
.adv p{ margin:0; font-size:9pt; }

/* ── Tables ──────────────────────────────────────── */
table{ width:100%; border-collapse:collapse; margin:12pt 0 !important; font-size:9pt !important; }
thead th{ font-family:'Big Shoulders',sans-serif !important; text-transform:uppercase;
 letter-spacing:.12em; font-size:8pt !important; color:var(--ink) !important;
 text-align:left; padding:7pt 10pt 7pt 0 !important;
 border-bottom:2px solid var(--ink) !important; }
tbody td{ padding:7pt 10pt 7pt 0 !important; border-bottom:1px solid var(--line) !important;
 color:var(--ink-soft) !important; vertical-align:top; }
tbody td:first-child{ color:var(--ink) !important; font-weight:600; }
table th:last-child,table td:last-child{ text-align:right; font-family:'Big Shoulders',sans-serif;
 font-weight:700; color:var(--ink) !important; }
/* let long tables flow across pages; keep rows whole, repeat the header */
table{ break-inside:auto !important; }
thead{ display:table-header-group; }
tr,td,th{ break-inside:avoid !important; }

hr{ border:0; border-top:1px solid var(--line-strong); margin:22pt 0; }

/* ── Selected-work gallery: 2-up, third centred ──── */
.gallery{ display:grid; grid-template-columns:1fr 1fr; gap:16pt 20pt;
 margin:16pt 0; break-inside:avoid; }
.gallery figure{ margin:0 !important; }
.gallery figure:nth-child(3){ grid-column:1 / -1; justify-self:center;
 width:calc(50% - 10pt); }
.gallery figure img{ width:100% !important; max-height:none !important; }

/* ── Closing colophon ────────────────────────────── */
.colophon{ margin:30pt 0 0 !important; padding-top:14pt;
 border-top:2px solid var(--ink); text-align:center;
 font-family:'Big Shoulders',sans-serif; text-transform:uppercase;
 letter-spacing:.22em; font-size:8.5pt; color:var(--ink-faint) !important;
 break-inside:avoid; }

/* deliberate breaks: clean gallery page, clean portfolio page */
#gallery-break,#portfolio-break{ break-before:page; }
</style>`;

const md = `${css}

<p class="eyebrow">The Company</p>

# Power Rising in the East

<p class="lede">Turn-key solar that an engineer designs, builds and stays accountable for. The same care that runs a rice mill now keeps hospitals working on sunlight.</p>

True East Energy Corp. is a Philippine stock corporation in power generation,
transmission and distribution. The company is engineer-led, not sales-led.
Every system is designed, built and supported by a Registered Electrical
Engineer.

${figure('hero.jpg', 'Aerial view of the 350 kWp rooftop solar array on the VM Agbayani Ricemill, Oriental Mindoro', 'The 350 kWp rooftop array that started it all, at the VM Agbayani Ricemill in Oriental Mindoro.')}

<div class="stats">
<div><b>550<i>+</i></b><span>kWp commissioned</span></div>
<div><b>17</b><span>installations completed</span></div>
<div><b>16</b><span>years engineering leadership</span></div>
<div><b>250</b><span>kWp in construction</span></div>
</div>

## Why we exist

True East began inside a working rice mill, where the electricity bill never
stopped growing. High running costs made reliable, affordable power a daily
problem, not a someday goal. So the company started fitting solar that cuts the
bill and keeps working through the next brownout.

What fixed one mill became the way we work: size the system to the building,
install it properly, and stay on the line afterwards. The same care now goes
into mills, schools, clinics, parishes, government buildings and homes across
Oriental Mindoro and beyond.

## At a glance

<dl class="facts">
<div><dt>Registered name</dt><dd>True East Energy Corp.</dd></div>
<div><dt>SEC registration</dt><dd>202406015446-02</dd></div>
<div><dt>Founded</dt><dd>2024</dd></div>
<div><dt>Company type</dt><dd>Stock Corporation in power generation, transmission and distribution</dd></div>
<div><dt>Procurement</dt><dd>PhilGEPS-registered</dd></div>
<div><dt>Sectors served</dt><dd>Industrial · Healthcare · Government · Hospitality · Institutional · Residential · Commercial · Faith</dd></div>
<div><dt>Head office</dt><dd>Bongabong, Oriental Mindoro, Philippines</dd></div>
<div><dt>Web</dt><dd>trueeastenergy.com</dd></div>
</dl>

> We help clients cut their electricity costs and their carbon footprint, and
> we back the wider shift to renewable energy with systems that are innovative,
> sustainable and dependable.

<p class="eyebrow">Leadership</p>

# Built by an Engineer, from a Rice Mill

## Engr. Vincent Vir M. Agbayani

<p><strong>Principal Electrical Engineer and Founder</strong><br>Registered Electrical Engineer · Mapúa University · 16 years of plant experience</p>

He trained at Mapúa University and spent 16 years as a plant engineer. Every
project is designed, engineered and managed by him, sized for efficiency and
built to last. That is why True East is engineer-led, not sales-led, and why
one accountable team carries each job from engineering and design through
procurement, installation and after-sales support.

> "The savings case isn't a pitch here. We lived it on our own electricity
> bill first."

<p class="eyebrow">What We Do</p>

# Solar, Sized to Your Building

<p class="lede">Two systems, one engineering standard. We size the array to your building and your load, never to a catalogue, and stay with it from the first site visit to long after switch-on.</p>

## On-Grid Solar Systems

Roof-mounted solar installations connected directly to the power grid. The
array carries your daytime load and the grid covers the rest, so businesses
and households see a lower electricity bill and a lighter dependence on the
utility, with no batteries to maintain.

- Lowest cost per installed kilowatt-peak
- Offsets daytime consumption immediately
- Reduced dependence on rising utility rates
- Minimal maintenance, decades of generation

<p><strong>Best for:</strong> mills, schools, shops and homes that use most of their power by day.</p>

${figure('ricemill.jpg', 'On-grid rooftop solar array at the VM Agbayani Ricemill', 'On-grid array carrying the daytime industrial load at the VM Agbayani Ricemill.')}

## Hybrid Systems with Battery Storage

Solar panels combined with batteries that store excess energy for use at night
or during outages. Hybrid systems maximise self-consumption and provide backup
supply, built for hotels, clinics and homes in areas with frequent brownouts or
an unstable grid.

- Stored power for night use and outages
- Continuity through brownouts and grid instability
- Maximised solar self-consumption
- Energy security where it matters most

<p><strong>Best for:</strong> hospitals, hotels and homes that cannot afford to lose power.</p>

${figure('drfonte.jpg', 'Hybrid solar with battery storage at Dr. Fonte Medical Clinic and Pharmacy', 'Round-the-clock resilience: hybrid solar and battery storage at Dr. Fonte Medical Clinic and Pharmacy.')}

<p class="eyebrow">The Turn-Key Package</p>

# Five Steps, One Accountable Team

<p class="lede">One team, accountable from the first measurement to long after switch-on. Cost-effective, reliable, and built around what the client actually needs.</p>

<ol class="steps">
<li><b>Engineering</b><p>A registered electrical engineer assesses the site, the load profile and the structure, so every system is sized to the building, not a catalogue.</p></li>
<li><b>Design</b><p>Array layout, electrical design and yield modelling are drawn up for maximum efficiency and a clean, code-compliant install.</p></li>
<li><b>Procurement</b><p>Panels, inverters and storage are sourced and specified. The equipment that carries decades of generation is chosen, not improvised.</p></li>
<li><b>Installation</b><p>A controlled, engineer-supervised build. Mounting, wiring and commissioning handled end to end by the team that designed it.</p></li>
<li><b>After-Sales Support</b><p>Monitoring, maintenance and a direct line back to the people who built the system. The relationship does not end at switch-on.</p></li>
</ol>

## Why True East

<div class="adv">
<div><h4>Engineer-led, not sales-led</h4><p>Every project is designed, engineered and managed by a Registered Electrical Engineer with 16 years of plant experience.</p></div>
<div><h4>A genuine turn-key package</h4><p>Engineering, design, procurement, installation and after-sales support under one accountable roof.</p></div>
<div><h4>Built from real operating pain</h4><p>Founded out of a rice mill fighting its own electricity costs, so the savings case is lived, not pitched.</p></div>
<div><h4>PhilGEPS-registered</h4><p>Eligible for government and public-sector procurement, in full compliance with national standards.</p></div>
</div>

<p class="eyebrow" id="gallery-break">Selected Work</p>

# Real Roofs, Real Meters

A spread of the work across institutions, hospitality and homes. On-grid and
hybrid, every system engineered to its building.

<div class="gallery">
${plate('clarendon.jpg', 'On-grid solar array at Clarendon College', 'Clarendon College. 60 kWp on-grid, institutional.')}
${plate('conthea.jpg', 'Hybrid solar and battery storage at Conthea Inn and Restaurant', 'Conthea Inn and Restaurant. 10 kWp hybrid, 2 × 280 Ah storage, hospitality.')}
${plate('kayzelle.jpg', 'Residential hybrid solar at the Kayzelle Gutierrez Residence', 'Kayzelle Gutierrez Residence. 6 kWp hybrid, 280 Ah storage, residential.')}
</div>

<p class="eyebrow" id="portfolio-break">Project Portfolio</p>

# Seventeen Roofs, Two Flagships

Seventeen installations are complete, and two flagship commissions are in
construction: a 100 kWp public-sector array for LGU Roxas under PhilGEPS
procurement, and 150.04 kWp keeping a private hospital running on sunlight.
That hospital is the largest job True East has taken on so far.

## Completed

${head}
${completed.map(row).join('\n')}

## In construction

${head}
${ongoing.map(row).join('\n')}

Hybrid systems include battery storage. DLEE Bolinas Hotel carries 560 Ah,
Conthea Inn and Restaurant 2 × 280 Ah, and Dr. Fonte Medical Clinic and the
Kayzelle Gutierrez Residence 280 Ah each.

<p class="eyebrow">On the Record</p>

# Registered, Compliant, Accountable

<dl class="facts">
<div><dt>Registered name</dt><dd>True East Energy Corp.</dd></div>
<div><dt>SEC registration</dt><dd>202406015446-02</dd></div>
<div><dt>Company type</dt><dd>Stock Corporation</dd></div>
<div><dt>Scope</dt><dd>Generation · Transmission · Distribution</dd></div>
<div><dt>Procurement</dt><dd>PhilGEPS-registered</dd></div>
<div><dt>Founded</dt><dd>2024</dd></div>
<div><dt>Head office</dt><dd>Bongabong, Oriental Mindoro</dd></div>
</dl>

## Contact

<p>The engineer who will design your system reads every enquiry. Send your
building details and a recent electricity bill.</p>

<dl class="facts">
<div><dt>Address</dt><dd>GF VMA Admin. Bldg, Strong Republic Nautical Highway, Bongabong, Oriental Mindoro, Philippines</dd></div>
<div><dt>Email</dt><dd>trueeastenergy@gmail.com</dd></div>
<div><dt>Phone</dt><dd>+63 917 586 9175</dd></div>
<div><dt>Web</dt><dd>trueeastenergy.com</dd></div>
<div><dt>On the record</dt><dd>SEC 202406015446-02 · PhilGEPS-registered</dd></div>
</dl>

<p class="colophon">True East Energy Corp. · Power rising in the East · trueeastenergy.com</p>
`;

const mdPath = join(here, 'company-profile.md');
writeFileSync(mdPath, md, 'utf8');
console.log(`company-profile.md written (${(md.length / 1024 / 1024).toFixed(2)} MB)`);

/* Render to A4 PDF via gstack make-pdf. The cover device, TOC styling and
   centred running header in this template depend on these exact flags. The
   PDF lands both at the repo root (the canonical artefact) and in static/
   (the downloadable served from the footer). */
const pdfBin = `${process.env.HOME}/.claude/skills/gstack/make-pdf/dist/pdf`;
const outputs = [
	join(root, 'True East Energy Corp - Company Profile.pdf'),
	join(root, 'static/true-east-energy-company-profile.pdf')
];
for (const out of outputs) {
	const res = spawnSync(
		pdfBin,
		[
			'generate',
			'--cover',
			'--toc',
			'--no-confidential',
			'--no-chapter-breaks',
			'--page-size',
			'a4',
			'--title',
			'True East Energy Corp.',
			'--author',
			'Company Profile · trueeastenergy.com',
			'--date',
			'2026',
			mdPath,
			out
		],
		{ stdio: 'inherit' }
	);
	if (res.status !== 0) {
		console.error(`make-pdf failed for ${out} (exit ${res.status}); skipping`);
		break;
	}
}
