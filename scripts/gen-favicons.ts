import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync('static/favicon.svg', 'utf8');

const targets = [
	{ file: 'static/favicon-48.png', size: 48 },
	{ file: 'static/favicon-96.png', size: 96 },
	{ file: 'static/favicon-192.png', size: 192 },
	{ file: 'static/favicon-512.png', size: 512 },
	{ file: 'static/apple-touch-icon.png', size: 180 }
];

for (const { file, size } of targets) {
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
	writeFileSync(file, png);
	console.log(`${file} (${size}x${size})`);
}
