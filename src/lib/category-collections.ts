import { products, type Product, type ProductPhoto } from "./products";
import { productCardPhoto } from "./product-card-photos";
import { bagCategories } from "./categories";
import { jewelleryCategories } from "./jewellery";

export type CollectionCopy = {
  slug: string; label: string; crumb: string; title: string; accent: string; tagline: string; cta: string;
  sections: { slug: string; name: string; line: string; viewAll: string }[];
  match: (p: Product, sectionSlug: string) => boolean;
};

const bagLines: Record<string, string> = {
  "tote-bags": "Roomy, structured carry-alls for every day.",
  handbags: "Polished shoulder and crossbody styles.",
  "clutch-bags": "Compact statement pieces for evenings out.",
  "potli-bags": "Traditional drawstring potlis for festive moments.",
};
const jewelleryLines: Record<string, string> = {
  earrings: "Jhumkas and statement earrings for every occasion.",
  "jewellery-sets": "Necklace sets paired with matching earrings.",
};

export const collectionPages: Record<string, CollectionCopy> = {
  bags: {
    slug: "bags", label: "Bags", crumb: "Bags", title: "Discover Your", accent: "Perfect Bag", tagline: "Timeless Style. Everyday Elegance.", cta: "Shop Bags",
    sections: bagCategories.map((c) => ({ slug: c.slug, name: c.name, line: bagLines[c.slug] ?? c.description, viewAll: c.slug })),
    match: (p, s) => p.bagCategorySlug === s,
  },
  jewellery: {
    slug: "jewellery", label: "Jewellery", crumb: "Jewellery", title: "Jewellery That Makes", accent: "Every Moment Special", tagline: "Discover timeless elegance, designed to make you shine.", cta: "Shop Jewellery",
    sections: jewelleryCategories.map((c) => ({ slug: c.slug, name: c.name, line: jewelleryLines[c.slug] ?? c.description, viewAll: c.slug })),
    match: (p, s) => p.categorySlug === s,
  },
  "party-clutch-bags": {
    slug: "party-clutch-bags", label: "Party & Clutch Bags", crumb: "Party & Clutch Bags", title: "Statement Pieces for", accent: "Every Celebration", tagline: "Statement pieces for celebrations and special occasions.", cta: "Shop Party Bags",
    sections: [{ slug: "party-clutch-bags", name: "Party & Clutch Bags", line: "Embellished clutches and potlis for festive evenings.", viewAll: "party-clutch-bags" }],
    match: (p, s) => p.categorySlug === s,
  },
  watches: {
    slug: "watches", label: "Watches", crumb: "Watches", title: "Traditional Watches,", accent: "Timeless Grace", tagline: "Traditional bracelet watches with timeless detailing.", cta: "Shop Watches",
    sections: [{ slug: "watches", name: "Watches", line: "Traditional bracelet watches with timeless detailing.", viewAll: "watches" }],
    match: (p, s) => p.categorySlug === s,
  },
};

export const cardPhotos = (p: Product): { main: ProductPhoto | undefined; hover: ProductPhoto | undefined } => {
  const main = productCardPhoto(p) ?? (p.image ? { src: p.image, alt: p.name } : undefined);
  return { main, hover: p.gallery?.find((g) => g.src !== main?.src) };
};

export type SortKey = "best" | "newest";

// Groups shop products by sub-category; products without a photo and empty sub-categories are dropped.
export function collectionSections(slug: string, sort: SortKey = "best") {
  const page = collectionPages[slug];
  if (!page) return [];
  return page.sections
    .map((s) => {
      const items = products.map((p, i) => ({ p, i })).filter(({ p }) => page.match(p, s.slug) && cardPhotos(p).main);
      if (sort === "newest") items.sort((a, b) => Number(!!b.p.newArrival) - Number(!!a.p.newArrival) || b.i - a.i);
      return { ...s, items: items.map(({ p }) => p) };
    })
    .filter((s) => s.items.length > 0);
}
