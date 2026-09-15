# True East Energy

Company website built with Astro, TypeScript and Tailwind CSS. Pages are prerendered; the contact API runs on Cloudflare Workers.

## Local development

Requires Node.js 22.12 or newer and pnpm 11.19.

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Open http://localhost:4321. Set your Maileroo API key and verified sender address in `.env` to test real delivery. Cloudflare also supports `.dev.vars` for local secrets; neither file should be committed.

## Checks

```sh
pnpm check
pnpm test
pnpm exec playwright install chromium
pnpm test:e2e
pnpm build
pnpm preview
```

Unit tests cover the enquiry payload and API validation/delivery responses. Browser tests cover all pages, metadata, images, project filters, mobile navigation, enquiry success/retry/reset, 404s and content without JavaScript. Tests mock delivery and do not send real emails.

## Cloudflare Workers

The official `@astrojs/cloudflare` adapter builds a Worker and static assets. `wrangler.jsonc` defines the Worker name and public email settings. Images are optimized at build time into AVIF/WebP; Cloudflare Images and KV are not required.

Before deployment, configure these secrets through Cloudflare or Wrangler:

```sh
pnpm exec wrangler secret put MAILEROO_API_KEY
pnpm exec wrangler secret put MAILEROO_SENDER_EMAIL
```

Then deploy when ready:

```sh
pnpm run deploy
```

`pnpm run deploy` builds the site and runs `wrangler deploy`. For Cloudflare's Git-connected Workers builds, use `pnpm build` as the build command and `pnpm exec wrangler deploy` as the deploy command. Use the existing custom domain `trueeastenergy.com` for canonical URLs, or change `site` in `astro.config.mjs` and `ORIGIN` in `src/lib/data/site.ts` together when moving domains.

The JSON endpoint remains `POST /api/contact`. Runtime settings retain their names: `MAILEROO_BASE_URL`, `MAILEROO_API_KEY`, `MAILEROO_SENDER_EMAIL`, `MAILEROO_SENDER_NAME`, and `CONTACT_RECIPIENT_EMAIL`.

## Source layout

- `src/pages/`: the five public pages, error pages and contact API.
- `src/layouts/site.astro`: document shell and shared navigation/footer.
- `src/lib/components/`: native Astro components.
- `src/scripts/`: browser behavior for the menu, filters, counters, reveals and contact form.
- `src/lib/data/`: company, project and service content.
- `src/lib/assets/projects/`: original photographs optimized by Astro.
- `static/`: icons, social images, robots/sitemap and downloadable company profile (configured as Astro's public directory).
- `profile/`: existing company-profile generation scripts.
