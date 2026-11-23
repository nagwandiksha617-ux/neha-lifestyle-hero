# Static shared-hosting migration (FTP, no Node at runtime)

- [x] Jewellery page only — unchanged CategoryPage integrated with five existing sub-category groups, full model-first photo data, product links, and existing cart information action; 34 checks and desktop/mobile flows passed.

- [x] Product pages with full model-first photo galleries, linked from every product card.

- [x] Card refinements — separate category captions, lifestyle watch photo, shared breadcrumbs, 100px scroll offset, image fallbacks/loaders and gallery thumbnail visibility; hero preserved.

- [x] Category/product presentation — four desktop/two mobile overlay category cards, larger product names, photo skeletons and branded fallback.
- [ ] Activate WhatsApp enquiry buttons — awaiting owner's confirmed number including country code.

- [x] New Arrivals — twelve confirmed uploaded photos, preserving the first ten and appending two existing clutch products; five desktop/two mobile columns; catalogue preserved.

- [x] Jewellery redesign — isolated collection page, five category destinations, existing arrivals only; no product reassignment or invented best sellers.

- [ ] Phase 1 — Static export: prerender all routes, self-host catalogue images (Option B), .htaccess, sitemap.xml, local static-server verification
- [ ] Phase 2 — External Supabase integration: products table + RLS, admin roles, email/password admin login, /admin panel (product CRUD, category management, gallery management, admin-only image uploads to private bucket via Option A Edge Function)
- [ ] Phase 3 — GitHub Actions build + FTP deploy to nehalifestyle.com, automatic rebuild when the catalogue changes
- [ ] Cutover checklist and post-deploy verification

Standing constraints: preserve existing design, product data and galleries exactly; no cart, checkout, payments, COD, or ordering; never make the storage bucket public; never expose the service role key in frontend code; user connects their own external Supabase project (Settings → External Supabase) — do not enable Lovable Cloud.
