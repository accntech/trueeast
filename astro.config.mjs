import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://trueeastenergy.com',
	trailingSlash: 'never',
	publicDir: './static',
	session: false,
	adapter: cloudflare({
		imageService: 'compile',
		prerenderEnvironment: 'node',
	}),
	vite: { plugins: [tailwindcss()] },
});
