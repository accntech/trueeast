# Deploy True East to Cloudflare Workers

## Deployment target

- Worker name: `trueeast`.
- Initial address: [trueeast.o-galicia-cpa.workers.dev](https://trueeast.o-galicia-cpa.workers.dev).
- Runtime: Cloudflare Workers, with prerendered pages and static images.
- Dynamic route: `POST /api/contact`.
- Build runtime: Node.js 24.12.0, pinned in `.node-version`; Bun 1.4.0.
- Production canonical domain: `https://trueeastenergy.com`.

`wrangler.jsonc` declares `trueeastenergy.com` as a Worker custom domain. The Worker is published and all 13 production browser checks pass on its workers.dev address; the custom-domain connection is pending removal of the old Vercel CNAME.

## 1. Authenticate and verify the account

```sh
bunx wrangler login
bunx wrangler whoami
```

Complete the Cloudflare authorization in your browser. This checkout is already authenticated and `wrangler.jsonc` pins the confirmed account with `account_id`. Update that field deliberately if deploying into another account. The Worker `trueeast` already exists in this account.

## 2. Run deployment checks

```sh
bun run deploy:check
```

This checks types, runs unit tests, builds Astro, and validates the Worker upload with `wrangler deploy --dry-run`. It does not publish the site.

Browser regression tests are also available with `bun run test:e2e`.

## 3. Deploy with the email secrets

The Worker requires `MAILEROO_API_KEY` and `MAILEROO_SENDER_EMAIL`. They are declared in `wrangler.jsonc` so a deployment cannot succeed without them. The sender must be a verified Maileroo address.

### This checkout

Both required secrets are already installed on the Worker. The temporary local upload file has been removed; the local development `.env` remains available and ignored by Git. Ordinary deployments retain the Worker secrets.

### A fresh checkout or CI

Create a private JSON or dotenv file containing only the two required secrets and pass its path with `--secrets-file`. Keep it outside version control. Do not pass secret values directly in shell arguments.

For an existing Worker, you can update individual secrets interactively:

```sh
bunx wrangler secret put MAILEROO_API_KEY
bunx wrangler secret put MAILEROO_SENDER_EMAIL
```

Once the Worker already has its secrets, subsequent releases can use:

```sh
bun run deploy
```

Wrangler retains existing secrets during ordinary deployments. Public settings (the Maileroo API URL, sender display name, and enquiry recipient) come from `wrangler.jsonc`.

## 4. Verify the workers.dev deployment

- Open the five pages and confirm navigation, images, mobile menu and project filters.
- Confirm the downloadable company profile opens.
- Check the contact form's validation. A real submission sends an email to the engineering team; use a deliberate test enquiry when ready to verify delivery.
- Check that `/services` remains `/services`, without a trailing-slash redirect.

## 5. Connect the production domain

The configured custom domain is `trueeastenergy.com`. Cloudflare currently rejects the connection because the apex still has the old Vercel CNAME (`a3b70bec6fa477a7.vercel-dns-017.com`, DNS only, TTL 600). A local record backup is saved in `.wrangler/trueeast-dns-before-worker.json`.

After removing that conflicting website record, apply the configured domain:

```sh
bunx wrangler triggers deploy
```

Verify HTTPS and all five pages on the production domain. Keep the existing MX, SPF, DKIM and other email-related records.

## Git-connected Workers builds

Connect **Workers & Pages → trueeast → Settings → Builds → Connect** to the GitHub repository, then use these settings:

| Setting | Value |
| --- | --- |
| Repository | `accntech/trueeast` |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | `bun install --frozen-lockfile && bun run check && bun run test && bun run build` |
| Deploy command | `bunx wrangler deploy` |
| Non-production branch deploy command | `bunx wrangler versions upload` |

Under **Build Variables and Secrets**, set:

```dotenv
BUN_VERSION=1.4.0
NODE_VERSION=24.12.0
SKIP_DEPENDENCY_INSTALL=true
```

The build command explicitly installs the versions in `bun.lock`, checks types, runs Vitest, and builds Astro. Cloudflare publishes only after those steps pass. Enable non-production branch builds to produce previews for pull requests.

Commit and push the source and `bun.lock` before enabling Git-connected builds. Set the two email secrets on the Worker under **Settings → Variables and Secrets**; build variables are separate from runtime settings. The CLI path above can perform the initial deployment with secrets before you connect automated builds.

## Official references

- [Astro on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [Cloudflare Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Workers build tools and version overrides](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)
