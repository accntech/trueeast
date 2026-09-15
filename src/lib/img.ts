import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
	'./assets/projects/**/*.jpeg',
	{
		eager: true,
	},
);
const images = new Map(
	Object.entries(files).map(([path, mod]) => [
		path.replace('./assets', ''),
		mod.default,
	]),
);

export function pic(src: string | null | undefined): ImageMetadata {
	const image = src ? images.get(src) : undefined;
	if (!image) throw new Error(`Missing project image: ${src}`);
	return image;
}
