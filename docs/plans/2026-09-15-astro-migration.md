# Astro Migration Implementation Plan

This is the historical migration record. Package-manager commands below describe the original validation; current Bun commands are in `README.md` and `docs/deployment/cloudflare.md`.

**Goal:** Replace SvelteKit with native Astro while retaining the five public pages, appearance, project data, assets, metadata, and enquiry flow.
**Approach:** Prerender Astro pages and shared components; implement menu, filter, counters, reveals and form behavior with browser TypeScript. Keep the existing Cloudflare Workers deployment target and JSON contact API, using runtime server secrets.
**Constraints:** Work in the existing checkout. Do not commit without explicit confirmation. Preserve business content and public URLs. Never send real email during tests.

### Task 1: Capture regression coverage
**Files:** Create `tests/site.spec.ts`, `playwright.config.ts`, `src/lib/server/contact.test.ts`; retain `src/lib/contact.test.ts`.
**Interfaces:** Existing five routes and JSON `/api/contact` contract; browser navigation, filters, enquiry states.
- Run existing tests, add endpoint tests and observe failure before the Astro route exists.
- Cover invalid JSON, invalid fields, honeypot, provider success and failure without delivering email.
- Add browser coverage for pages, metadata, mobile navigation, filtering, form success/failure and no-JavaScript content.

### Task 2: Convert framework and rendering
**Files:** Create `astro.config.mjs`, `src/layouts/site.astro`, `src/pages/{index,about,services,projects,contact,404,500}.astro`, `src/lib/components/*.astro`, `src/pages/api/contact.ts`, `src/scripts/*.ts`, `vitest.config.ts`; modify `package.json`, `tsconfig.json`, `src/lib/img.ts`, `src/lib/services/email.ts`, `src/app.css`.
**Interfaces:** Shared company/project data to static HTML; `/api/contact` to the existing email service.
- Convert markup and shared components, preserving typography, responsive layout and content.
- Replace enhanced images with Astro optimized responsive pictures.
- Reimplement browser behavior and ensure complete content without JavaScript.
- Preserve environment variable names and Cloudflare Workers server execution.
- Use build/type checks and browser assertions for the template/configuration conversion instead of unit tests mirroring markup.

### Task 3: Validate and clean up
**Files:** Modify `README.md`, `.gitignore`, `.vscode/extensions.json`, dependency lockfiles; remove obsolete Svelte routes, components and config.
**Interfaces:** Documented local build/test commands and Cloudflare Workers deployment output.
- Run `pnpm check`, `pnpm test`, `pnpm build` and `pnpm test:e2e`.
- Inspect desktop/mobile rendering and production output; verify PDFs, metadata and images.
- Review diff, remove obsolete framework files and document runtime requirements.
- Leave changes uncommitted for review. Migration and regression tests form one logical change; ask for confirmation only if a commit is requested.

## Completed validation

- `pnpm check`: no errors, warnings or hints.
- `pnpm test`: 16 tests passed.
- `pnpm build`: all five pages plus 404/500 prerendered, responsive images generated, Cloudflare Worker built.
- `pnpm test:e2e`: 13 tests passed against the built Worker served by `pnpm preview`, including runtime API validation and public assets.
- `pnpm exec wrangler deploy --dry-run`: passed without publishing.
- Desktop/mobile screenshots inspected; original URL format enforced through Cloudflare `assets.html_handling`.
- No email API key in deployable bundles or public assets. Wrangler's private local `.dev.vars` preview file is outside the static asset directory.
- Changes remain uncommitted and undeployed. Deployment setup is documented in `README.md`.
