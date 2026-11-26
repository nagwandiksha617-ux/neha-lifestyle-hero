import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { blogPosts } from "./blog";
import { products } from "./products";
import { productBreadcrumb } from "./product-breadcrumb";
import { organizationJsonLd } from "./seo";

test("sitemap lists every product page exactly once", () => {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  for (const p of products) {
    const loc = `<loc>https://nehalifestyle.com/product/${encodeURIComponent(p.id)}</loc>`;
    expect(xml.split(loc).length - 1).toBe(1);
  }
  expect(xml).not.toContain("<lastmod>");
});

test("sitemap lists every owner-supplied blog article exactly once", () => {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  for (const post of blogPosts) {
    const loc = `<loc>https://nehalifestyle.com/blog/${post.slug}</loc>`;
    expect(xml.split(loc).length - 1).toBe(1);
  }
});

test("tote bag breadcrumb follows Home > Bags > Tote Bags > product", () => {
  const p = products.find((x) => x.id === "cream-beige-tote-bag-gold-chain")!;
  expect(productBreadcrumb(p).map((c) => c.path)).toEqual(["/", "/category/bags", "/category/tote-bags", "/product/cream-beige-tote-bag-gold-chain"]);
});

test("watch breadcrumb follows Home > Watches > product", () => {
  const p = products.find((x) => x.id === "royal-ruby-green-stone-gold-bracelet-watch")!;
  expect(productBreadcrumb(p).map((c) => c.name)).toEqual(["Home", "Watches", p.name]);
});

test("organization uses only confirmed details", () => {
  const o = organizationJsonLd();
  expect(o.telephone).toBe("+91-9664366547");
  expect(o.sameAs).toEqual(["https://www.instagram.com/nehalifestyle_93/"]);
});
