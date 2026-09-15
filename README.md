# True East Energy

Company website built with Astro, TypeScript and Tailwind CSS. Pages are prerendered; the contact API runs on Cloudflare Workers.

## Local development

Requires Node.js 22.12 or newer and Bun 1.4.0.

```sh
bun install --frozen-lockfile
cp .env.example .env
bun run dev
```

Open http://localhost:4321. Set your Maileroo API key and verified sender address in `.env` to test real delivery. Cloudflare also supports `.dev.vars` for local secrets; neither file should be committed.

## Checks

```sh
bun run check
bun run test
bunx playwright install chromium
bun run test:e2e
bun run build
bun run preview
```

Use `bun run test` to run the Vitest script; `bun test` invokes Bun's separate test runner. Commit `bun.lock` when dependencies change.

Unit tests cover the enquiry payload and API validation/delivery responses. Browser tests cover all pages, metadata, images, project filters, mobile navigation, enquiry success/retry/reset, 404s and content without JavaScript. Tests mock delivery and do not send real emails.

## Cloudflare Workers

The official `@astrojs/cloudflare` adapter builds a Worker and static assets. `wrangler.jsonc` defines the Worker name and public email settings. Images are optimized at build time into AVIF/WebP; Cloudflare Images and KV are not required.

Deployment and first-time setup are documented in [the Cloudflare deployment guide](docs/deployment/cloudflare.md).

```sh
bunx wrangler login
bun run deploy:check
```

The Worker is deployed at [trueeast.o-galicia-cpa.workers.dev](https://trueeast.o-galicia-cpa.workers.dev). Its two required email secrets are already configured in Cloudflare. Deploy subsequent releases with:

```sh
bun run deploy
```

`wrangler.jsonc` declares `trueeastenergy.com` as its custom domain. The initial domain connection requires removing the previous Vercel CNAME; see the deployment guide.

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
