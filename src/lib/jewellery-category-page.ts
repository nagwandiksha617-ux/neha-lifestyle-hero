import type { CatProduct, CatSection } from "@/components/CategoryPage";
import { products, type Product } from "./products";
import { productPhotos } from "./product-card-photos";

export type JewelleryCardProduct = CatProduct & { images: string[] };
export type JewellerySection = Omit<CatSection, "products"> & { products: JewelleryCardProduct[] };

const groups = [
  { id: "earrings", title: "Earrings", slug: "earrings", description: "Explore jhumkas and statement earrings for every occasion." },
  { id: "necklace-sets", title: "Necklace Sets", slug: "jewellery-sets", description: "Discover necklace sets paired with their matching earrings." },
  { id: "ethnic", title: "Ethnic", slug: "ethnic-jewellery", description: "Discover jewellery for traditional and festive looks." },
  { id: "wedding", title: "Wedding & Occasion", slug: "wedding-occasion-jewellery", description: "Explore jewellery for weddings and special occasions." },
];

export function jewelleryCategorySections(catalogue: Product[] = products): JewellerySection[] {
  return groups.map(({ slug, ...group }) => ({
    ...group,
    viewAllHref: `/category/${slug}`,
    products: catalogue.filter((product) => product.categorySlug === slug).map((product) => {
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

// Use an original, already-matched necklace photo rather than a new promotional image.
export const jewelleryHeroImage = productPhotos(
  products.find((product) => product.id === "navy-blue-silver-crystal-necklace-set")
    ?? products.find((product) => product.categorySlug === "jewellery-sets")
    ?? { id: "", name: "", category: "", image: null },
)[0]?.src;