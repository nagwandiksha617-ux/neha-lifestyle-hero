# NEHA Lifestyle — Static Shared-Hosting Migration Plan (Revised)

Status: plan only. Nothing will be implemented until you approve this plan.

Decisions locked in: cart stays as-is (no cart/checkout/payments/COD/ordering);
Option B for existing catalogue images, Option A for future admin uploads; Apache/cPanel
hosting for nehalifestyle.com with no Node at runtime; GitHub Actions build + FTP
deploy; your existing external Supabase project (no Lovable Cloud); full secure admin
suite; prerendered HTML + sitemap with automatic redeploy on catalogue change.

## 1. Audit findings (what actually exists today)

| Requirement in your brief | Current reality in this project |
|---|---|
| Supabase database integration | **Not present.** No Supabase client, no env vars, no DB in the code. |
| Product management backend | **Not present.** All products live in `src/lib/products.ts` (plain data) with bun tests; adding a product = editing that file. |
| Admin authentication / admin-only upload | **Not present.** No auth routes, no login page, no role logic. |
| `product-images` bucket | **Not present.** Photos are uploaded files served through Lovable's managed asset CDN (`/__l5e/assets-v1/...` paths). |
| "Node.js API route" | **Not present.** No server functions and no `/api` server routes exist. Nothing server-only needs replacing. |
| Cart | **Not present.** Header cart/account icons surface a "not connected" dialog. Per your decision this stays as-is. |
| Hosting | TanStack Start v1 with SSR on Lovable's Cloudflare Workers edge. |

The site is already ~95% static-capable. The work is (a) turning SSR into prerendered
static HTML, (b) self-hosting the images that today come from Lovable's CDN, and
(c) building the Supabase + admin features — designed for static hosting from day one.

## 2. Target architecture

```
nehalifestyle.com (Apache/cPanel, FTP only)     Your external Supabase project
  / (index.html) + one HTML file per URL          - products table; RLS: anon SELECT
  hashed JS/CSS/image assets                        only, admin-only writes
  .htaccess (fallback, caching, 404)              - auth users + user_roles table
  robots.txt / sitemap.xml                        - PRIVATE product-images bucket
  /admin  (static SPA, same upload)               - Edge Function signs image URLs
        |  talks to Supabase with the                (runs on Supabase, not the host)
        |  publishable key only; writes
        +  guarded by RLS admin checks
```

- Node runs only in **GitHub Actions** (build) — never on cPanel.
- The admin panel ships inside the static site: browser sign-in via Supabase Auth,
  all reads/writes with the **publishable** key. RLS is the security boundary — a
  leaked publishable key still cannot write. The **service role key never enters
  frontend code**; it lives only in the Supabase Edge Function secret that signs URLs.

## 3. Product images without a Node.js API route

- **Option B (existing catalogue photos):** download every Lovable-CDN asset into
  `src/assets/<product>/` as real files and switch imports from `.asset.json` pointers
  to the actual images, so the build bundles them into the site. Galleries keep their
  exact per-product assignment and ordering. Best speed, zero runtime dependency.
- **Option A (future admin-uploaded / protected assets):** private
  `product-images` bucket; a Supabase Edge Function `product-image` verifies the
  requested path is a whitelisted catalogue image and returns a short-lived signed URL.
  Bucket never public; no service key in the bundle.

## 4. SEO preservation

- **URLs unchanged**: `/`, `/category/bags`, `/category/tote-bags`,
  `/category/handbags`, `/category/clutch-bags`, `/category/potli-bags`,
  `/category/party-clutch-bags`. Each is **prerendered to a real HTML file** at build
  time — crawlers get complete markup, equivalent to today's SSR since page content is
  build-time data. Per-route `head()` metadata is already in the code and is baked in.
- Admin-created categories get their own URLs: the build enumerates active categories
  from the database and prerenders one page each — no code edits for new categories.
- Added at migration: `sitemap.xml` generated at build from the route/category list;
  `robots.txt` already present; canonical tags confirmed; custom 404.
- **Snapshot risk managed**: prerendered HTML is a build-time snapshot of the catalogue.
  Per your decision, a GitHub Actions job **rebuilds and re-deploys automatically
  whenever the catalogue changes** (below), so new products get their SEO pages without
  manual steps. Client-side-only product fetching is explicitly *not* used.
- `.htaccess` handles gzip/brotli, long-lived caching for hashed assets, and HTTPS.

## 5. Supabase changes required (your existing project; you connect it yourself via
Settings → General → External Supabase — OAuth in the browser, it cannot be linked
from chat)

1. Migrations:
   - `products` table (slug, name, colour, category slugs, description, specs,
     gallery paths, price nullable, is_listed, timestamps) mirroring the current
     `src/lib/products.ts` model; `categories` table for admin category management.
   - RLS: `SELECT` for `anon` on listed products/categories; `INSERT/UPDATE/DELETE`
     only for authenticated admins.
   - Roles: `user_roles` table + `app_role` enum + `has_role()` security-definer
     function (roles are never stored on a profile table — privilege-escalation risk).
2. Auth: email/password sign-in enabled for admins; your admin account created; the
   `/admin` route is client-gated for UX, RLS is the real boundary.
3. Storage: **private** `product-images` bucket; `storage.objects` RLS giving
   admin-only writes; reads only via signed URLs (Option A).
4. Edge Function `product-image` for signed URLs (service-role key in Supabase
   secrets only).
5. Optional Edge Function `rebuild-webhook` that calls the GitHub repository-dispatch
   API with a stored token when the admin changes the catalogue (below).

## 6. Step-by-step implementation plan

**Phase 1 — Static export of the current site (no design/data changes)**
1. Enable TanStack Start prerendering in `vite.config.ts` (`pages` listing every URL
   above; `autoStaticPathsDiscovery: false`), and verify the build writes one
   `index.html` per route and exits cleanly.
2. Self-host all images per Option B (script + review that every gallery stays
   correctly matched and ordered; no photo regenerated or substituted).
3. Add `.htaccess`: history/SPA fallback rewriting unknown paths to prerendered
   files, custom 404, long-lived caching for hashed assets, gzip/brotli, HTTPS.
4. Generate `sitemap.xml` at build; keep `robots.txt`.
5. Test the built output with a plain static server simulating cPanel: all routes,
  mobile menu, category pages, New Arrivals, 404 behavior.
6. Run the existing bun product-data tests, typecheck, and build.

**Phase 2 — External Supabase + secure admin**
7. You connect your Supabase project in Lovable Settings; migrations from §5 run.
8. Seed the `products` and `categories` tables with the exact current catalogue —
   same rows, same gallery order, no invented prices/specs/facts.
9. Create your admin account + admin role; build `/admin`: sign-in, product list,
   create/update/delete, category management, gallery management (reorder,
   add/remove), image upload to the private bucket.
10. Ship the `product-image` Edge Function; image rendering uses signed URLs for
    admin-uploaded images.
11. Verify permissions: anonymous users cannot write, non-admin authenticated users
    cannot write, admins can; admin-uploaded images never resolve without a signed URL;
    bucket stays private.

**Phase 3 — GitHub Actions build + FTP deploy + catalogue automation**
12. Workflow: on push to the connected branch → install Node, build (including
    prerender + sitemap), then FTP-deploy `dist/` to nehalifestyle.com via
    `SamKirkland/FTP-Deploy` (host/user/password stored as GitHub secrets; never in
    the repo). Alternative: the build is produced here and handed to you as a ZIP if
    you prefer manual FTP once.
13. Catalogue-change automation: when an admin changes products, the `rebuild-webhook`
    Edge Function triggers a GitHub `repository_dispatch`; Actions rebuilds from the
    latest database state and re-deploys — newly added products get their SEO pages
    automatically. (Safety net: a scheduled weekly rebuild catches any missed webhook.)

**Phase 4 — Cutover**
14. Checklist for you: connect the domain, first deploy verification, rollback via
    FTP (keep the previous release in a dated directory).
15. Post-cutover: resubmit the sitemap in Search Console; verify all URLs and layouts.

## 7. What will NOT change

All existing page designs, the responsive layout, header/footer navigation, homepage
sections, and — confirmed — **every product fact, photo, gallery assignment and
ordering stays exactly as it is**. No cart, checkout, payments, COD, or ordering is
added (your decision). The Lovable preview keeps working during the transition;
publishing to Lovable hosting can continue until you cut over.
