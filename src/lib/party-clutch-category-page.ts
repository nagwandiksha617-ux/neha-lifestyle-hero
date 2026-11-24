import type { CatProduct, CatSection } from "@/components/CategoryPage";
import { products, type Product } from "./products";
import { productPhotos } from "./product-card-photos";

export type PartyClutchCardProduct = CatProduct & { images: string[] };
export type PartyClutchSection = Omit<CatSection, "products"> & { products: PartyClutchCardProduct[] };

const isWaistClutch = (product: Product) => product.id.includes("waist-clutch");

const groups = [
  {
    id: "potli",
    title: "Potli Bags",
    description: "Traditional drawstring potlis for weddings and festive moments.",
    viewAllHref: "/category/potli-bags",
    match: (product: Product) => product.bagCategorySlug === "potli-bags",
  },
  {
    id: "clutches",
    title: "Clutches",
    description: "Compact statement clutches for evenings out and celebrations.",
    viewAllHref: "/category/clutch-bags",
    match: (product: Product) =>
      product.categorySlug === "party-clutch-bags" && product.bagCategorySlug !== "potli-bags" && !isWaistClutch(product),
  },
  {
    id: "waist-clutches",
    title: "Waist Clutches",
    description: "Elegant waist-worn clutches with festive stone detailing.",
    viewAllHref: "#sec-waist-clutches",
    match: (product: Product) => product.categorySlug === "party-clutch-bags" && isWaistClutch(product),
  },
];

export function partyClutchCategorySections(catalogue: Product[] = products): PartyClutchSection[] {
  return groups.map(({ match, ...group }) => ({
    ...group,
    products: catalogue.filter(match).map((product) => {
      const images = productPhotos(product).map((photo) => photo.src);
      return {
        id: product.id,
        name: product.name,
        price: "Price to be updated",
        href: `/product/${encodeURIComponent(product.id)}`,
        images,
        image: images[0] ?? null,
        image2: images[1] ?? null,
      };
    }),
  }));
}

// Use an original, already-matched party clutch photo rather than a new promotional image.
export const partyClutchHeroImage = productPhotos(
  products.find((product) => product.id === "golden-traditional-potli-bag")
    ?? products.find((product) => product.categorySlug === "party-clutch-bags")
    ?? { id: "", name: "", category: "", image: null },
)[0]?.src;
