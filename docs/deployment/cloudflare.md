# Deploy True East to Cloudflare Workers

## Deployment target

- Worker name: `trueeast`.
- Initial address: [trueeast.o-galicia-cpa.workers.dev](https://trueeast.o-galicia-cpa.workers.dev).
- Runtime: Cloudflare Workers, with prerendered pages and static images.
- Dynamic route: `POST /api/contact`.
- Build runtime: Node.js 24.12.0, pinned in `.node-version`; pnpm 11.19.0.
- Production canonical domain: `https://trueeastenergy.com`.

`wrangler.jsonc` declares `trueeastenergy.com` as a Worker custom domain. The Worker is published and all 13 production browser checks pass on its workers.dev address; the custom-domain connection is pending removal of the old Vercel CNAME.

## 1. Authenticate and verify the account

```sh
pnpm exec wrangler login
pnpm exec wrangler whoami
```

Complete the Cloudflare authorization in your browser. This checkout is already authenticated and `wrangler.jsonc` pins the confirmed account with `account_id`. Update that field deliberately if deploying into another account. The Worker `trueeast` already exists in this account.

## 2. Run deployment checks

```sh
pnpm run deploy:check
```

This checks types, runs unit tests, builds Astro, and validates the Worker upload with `wrangler deploy --dry-run`. It does not publish the site.

Browser regression tests are also available with `pnpm test:e2e`.

## 3. Deploy with the email secrets

The Worker requires `MAILEROO_API_KEY` and `MAILEROO_SENDER_EMAIL`. They are declared in `wrangler.jsonc` so a deployment cannot succeed without them. The sender must be a verified Maileroo address.

### This checkout

Both required secrets are already installed on the Worker. The temporary local upload file has been removed; the local development `.env` remains available and ignored by Git. Ordinary deployments retain the Worker secrets.

### A fresh checkout or CI

Create a private JSON or dotenv file containing only the two required secrets and pass its path with `--secrets-file`. Keep it outside version control. Do not pass secret values directly in shell arguments.

For an existing Worker, you can update individual secrets interactively:

```sh
pnpm exec wrangler secret put MAILEROO_API_KEY
pnpm exec wrangler secret put MAILEROO_SENDER_EMAIL
```

Once the Worker already has its secrets, subsequent releases can use:

```sh
pnpm run deploy
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
pnpm exec wrangler triggers deploy
```

Verify HTTPS and all five pages on the production domain. Keep the existing MX, SPF, DKIM and other email-related records.

## Git-connected Workers builds

Use these settings if deploying from the repository:

| Setting | Value |
| --- | --- |
| Repository | `accntech/trueeast` |
| Root directory | Repository root |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Deploy command | `pnpm exec wrangler deploy` |
| Node.js | `24.12.0` |

Commit and push the prepared source before enabling Git-connected builds. Set the two email secrets on the Worker, not just in the build environment. The CLI path above can perform the initial deployment with secrets before you connect automated builds.

## Official references

- [Astro on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [Cloudflare Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
