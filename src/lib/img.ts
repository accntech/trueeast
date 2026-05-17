/* Maps an original `/projects/...` path to its build-time processed,
   responsive AVIF/WebP picture, so data modules keep plain string paths
   while components render <enhanced:img>. */

import type { Picture } from '@sveltejs/enhanced-img';

const files = import.meta.glob('./assets/projects/**/*.jpeg', {
	eager: true,
	query: { enhanced: true }
}) as Record<string, { default: Picture }>;

const map: Record<string, Picture> = {};
for (const [path, mod] of Object.entries(files)) {
	map[path.replace('./assets', '')] = mod.default;
}

export function pic(src: string | null | undefined): Picture {
	return (src ? map[src] : undefined) as Picture;
}
