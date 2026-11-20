<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the homepage as a single full-viewport editorial hero using imported photographic assets and semantic design tokens, because NEHA Lifestyle's first impression depends on a consistent luxury composition.
- Render shared header and footer around Outlet in the root layout; keep homepage sections and product data independent so site navigation stays consistent without altering merchandise.
- Header action artwork uses original-image asset pointers inside existing controls, so artwork changes preserve accessible labels, spacing and click behavior.
- Link collection navigation to existing category routes and homepage section anchors; show unavailable service details explicitly rather than invent policies, contact information, social URLs, or checkout behavior.
- Keep confirmed product facts (prices, specs, descriptions) in plain data modules under src/lib with bun tests beside them, because merchandise rules must be checkable without rendering the UI.
- Keep every shop product in one shared product list tagged with its category slug, and render category pages and New Arrivals from it, so newly added products appear on their category page without page edits.
- Keep homepage-only arrivals selections and uploaded photo overrides separate from catalogue galleries, deriving names and details from the shared product list, so section-specific photo changes cannot alter category merchandise.
- Bag-type pages (Tote, Handbags, Clutch, Potli) live in `bagCategories` and products join them via `bagCategorySlug`, separate from homepage `categories`, so bag-type pages can grow without changing the homepage category cards or a product's existing category.
- Keep jewellery collection presentation isolated and jewellery subcategories separate from homepage categories; do not infer product assignments or best-seller status, so catalogue facts remain unchanged.
- Use the shared CatalogueImage for category and main product photos with fixed-ratio wrappers, skeleton loading and a branded unavailable-photo fallback, so failed images never leave empty cards or substitute merchandise.
- Keep enquiry controls disabled until the owner confirms a WhatsApp destination, so no invented contact or ordering flow is exposed.
