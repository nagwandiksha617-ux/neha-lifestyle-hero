# NEHA Lifestyle — Static Shared-Hosting Migration Plan

Status: plan only. No files will be changed until this plan is approved.

## 1. Audit findings (what actually exists today)

Audited: routes, build config, server entry, middleware, env usage, data layer, tests.

| Requirement in your brief | Current reality in this project |
|---|---|
| Supabase database integration | **Not present.** No Supabase client, no env vars, no DB anywhere in the code. |
| Product management backend | **Not present.** All products live in `src/lib/products.ts` (plain TypeScript data) with bun tests in `src/lib/products.test.ts`. Adding a product = editing that file. |
| Admin authentication / admin-only upload | **Not present.** No auth routes, no `_authenticated` route tree, no login page, no role logic. |
| `product-images` bucket | **Not present.** No storage bucket; product photos are uploaded files served through Lovable's managed asset CDN (`/__l5e/assets-v1/...` paths). |
| "Node.js API route" | **Not present.** There are no `createServerFn` server functions and no `src/routes/api/*` server routes. Nothing server-only exists to replace. |
| Cart | **Not present.** Header cart/account icons currently surface a "not connected" dialog. No cart state, no checkout. |
| Hosting | TanStack Start v1 with SSR on Lovable's Cloudflare Workers edge. |

Why this matters: the site is already ~95% static-capable. The real migration work is
(a) turning SSR into prerendered static HTML, (b) self-hosting the images that today
come from Lovable's CDN, and (c) — separately — building the Supabase + admin features
you listed, which do not exist yet and therefore must be *designed* for static hosting
rather than "preserved".

## 2. Target architecture on shared hosting (Apache, FTP, no Node at runtime)

```
Shared host (FTP upload)          Supabase (remote, no hosting cost to you)
  dist/  prerendered HTML           - products table, RLS: anon can SELECT,
  assets (JS/CSS/images)              only admins can INSERT/UPDATE/DELETE
  .htaccess (SPA fallback,          - auth users + admin role table
    caching, 404)                   - storage bucket stays PRIVATE
                                    - Edge Function mints short-lived signed
  Admin page = static SPA             image URLs (runs on Supabase's servers,
  calls Supabase directly             NOT on your shared host)
```

- **Node is still needed** — but only on the *build machine* (your PC or a CI run),
  never on the hosting server. `bun run build` produces a plain `dist/` folder.
- The admin panel is part of the same static site: it authenticates with Supabase Auth
  in the browser and talks to PostgREST/Storage with the **publishable** key only.
  Writes are guarded by RLS policies that check an admin role — so a leaked publishable
  key still cannot write. The **service role key never enters frontend code**; it is
  used only inside the Supabase Edge Function that signs image URLs.

## 3. Secure product-image display without a Node.js API route

The bucket stays private. Two compliant options:

- **Option A (recommended): Supabase Edge Function for signed URLs.** A small function
  `GET /functions/v1/product-image?path=...` runs on Supabase's infrastructure (not your
  shared host), verifies the path is a whitelisted catalogue image, and returns a
  short-lived signed URL (e.g. 1 hour, cacheable). The frontend fetches this URL per
  image. No service key in the browser; bucket never public. Trade-off: one extra
  request per image and URLs expire (mitigated with browser caching headers).
- **Option B: keep catalogue photos as bundled static files.** Product photos are not
  confidential data; shipping them as ordinary images in `dist/` is what the site does
  today via Lovable's CDN. Private bucket can still be used for *any future
  non-public* assets via Option A. Zero extra requests, best page speed.

I recommend B for catalogue photos + A as the mechanism when you genuinely need
private/protected media (e.g. wholesale price sheets later).

## 4. SEO impact and preservation

- **URLs unchanged**: `/`, `/category/bags`, `/category/tote-bags`, `/category/handbags`,
  `/category/clutch-bags`, `/category/potli-bags`, `/category/party-clutch-bags`.
  Every route is **prerendered to a real HTML file**, so crawlers get complete markup —
  equivalent SEO to today's SSR, since page content is build-time data.
- Per-route `head()` metadata (title/description/OG/twitter) is already in the code and
  is baked into the prerendered HTML.
- Add at migration: `sitemap.xml` (generated at build from the category list),
  `robots.txt` already present, canonical tags confirmed, `404.html` fallback.
- **Real risk to manage**: once products come from the database, prerendered HTML is a
  snapshot. Mitigation: the build script pulls the catalogue from Supabase at build
  time (with a publishable-key read + anon SELECT policy) so each rebuild re-bakes
  current products; when you add a product you run the rebuild + FTP upload (or a small
  CI/GitHub-Actions job can do it automatically). Alternative — client-side product
  fetching — is *not* recommended for SEO.
- Shared-hosting performance factors (gzip/brotli, cache headers, HTTPS) are part of
  the `.htaccess` work below.

## 5. Supabase changes required (to be built — nothing exists yet)

1. Enable Lovable Cloud (or connect your own Supabase project — you'd do that in
   Settings → External Supabase yourself).
2. Migrations:
   - `products` table (slug, name, category slugs, description, specs, gallery paths,
     price nullable, is_listed, timestamps) mirroring the current data model in
     `src/lib/products.ts`.
   - RLS: `SELECT` for `anon` on listed products; `INSERT/UPDATE/DELETE` only for
     authenticated users with role `admin`.
   - `admin_users` table or role column + `is_admin()` security-definer helper.
3. Auth: enable email/password sign-in (only, unless you ask for more); create your
   admin account; gate `/admin` route client-side *and* rely on RLS server-side
   (client gating is UX, RLS is the security boundary).
4. Storage: create **private** `product-images` bucket; RLS on `storage.objects`
   giving admin-only writes; reads happen exclusively via signed URLs from the Edge
   Function (Option A).
5. Edge Function `product-image` for signed URLs (service-role key stays in Supabase
   secrets, never in the bundle).

## 6. Step-by-step implementation plan

**Phase 1 — Static export of the current site (no feature changes)**
1. Configure TanStack Start/nitro for a static build: static preset + prerender the
   home page, all seven category routes, and an error page; verify the `dist/` output
   contains one HTML file per URL.
2. Self-host all images: download every Lovable-CDN asset into `src/assets/<product>/`
   as real files and switch imports from `.asset.json` pointers to the actual images,
   so the build copies them into `dist/`. (This is the largest mechanical change; done
   with a script + review that every gallery stays correctly matched and ordered.)
3. Add `.htaccess`: SPA/history fallback rewriting unknown paths to prerendered files,
   custom 404 page, long-lived caching for hashed assets, gzip/brotli, HTTPS redirect.
4. Add `sitemap.xml` generation at build; keep `robots.txt`.
5. Test the built output locally with a plain static server (simulating shared host),
   checking all routes, mobile menu, category pages, New Arrivals, and 404 behavior.
6. Build test: run existing bun product-data tests + typecheck + build clean.

**Phase 2 — Supabase + admin (only after Phase 1 is approved/verified)**
7. Enable Lovable Cloud; run migrations from §5; seed the `products` table with the
   exact current catalogue (same rows, same gallery order, no invented facts).
8. Create your admin account and the admin role; build the `/admin` static SPA:
   sign-in, product list, create/update/delete, image upload to the private bucket.
9. Ship the signed-URL Edge Function and switch image rendering to it (Option A).
10. Re-verify admin permissions: anonymous users cannot write, non-admin authenticated
    users cannot write, admins can; images never resolve without a signed URL.

**Phase 3 — Cutover**
11. You upload `dist/` + `.htaccess` via FTP to your host; I give you the exact
    checklist (what to upload, where, and how to roll back).
12. Post-cutover checks: all URLs, search-console resubmission of the sitemap.

## 7. What will NOT change

Design, pages, responsive layout, product data facts and galleries, header/footer
navigation, and the current no-ordering/no-payment state (no COD, WhatsApp ordering,
payments, or shipping setup — per your standing instruction).

## 8. Open questions for your approval

1. **Cart**: there is no cart today. Should the static site include a client-side cart
   (browser-local, no checkout), or stay as-is?
2. **Images**: Option A, Option B, or the recommended B+A combination?
3. **Hosting specifics**: Apache (cPanel-style) hosting? Any existing domain/subdomain
   to target, and can you run a build on your own computer (or should the export be
   produced here and handed to you as a ZIP for FTP upload)?
4. **Supabase**: enable Lovable Cloud, or connect your own external Supabase project?
