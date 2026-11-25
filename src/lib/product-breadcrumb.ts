import { findCategory } from "./categories";
import type { Product } from "./products";
import type { Crumb } from "./seo";

/** Home › category (› bag type) › product, using only existing category pages. */
export function productBreadcrumb(product: Product): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }];
  const add = (slug: string | undefined) => {
    const c = slug ? findCategory(slug) : undefined;
    if (c && !crumbs.some((x) => x.path === `/category/${c.slug}`)) crumbs.push({ name: c.name, path: `/category/${c.slug}` });
  };
  if (product.bagCategorySlug) add("bags");
  add(product.categorySlug);
  add(product.bagCategorySlug);
  crumbs.push({ name: product.name, path: `/product/${encodeURIComponent(product.id)}` });
  return crumbs;
}
