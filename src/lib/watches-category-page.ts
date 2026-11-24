import type { CatProduct, CatSection } from "@/components/CategoryPage";
import { products, type Product } from "./products";
import { productPhotos } from "./product-card-photos";

export type WatchCardProduct = CatProduct & { images: string[] };
export type WatchSection = Omit<CatSection, "products"> & { products: WatchCardProduct[] };

export function watchCategorySections(catalogue: Product[] = products): WatchSection[] {
  return [
    {
      id: "watches",
      title: "Bracelet Watches",
      description: "Bracelet watches with traditional kundan and stone work.",
      products: catalogue
        .filter((product) => product.categorySlug === "watches")
        .map((product) => {
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
    },
  ];
}

// Original, already-matched watch photo; no new promotional image.
export const watchHeroImage = productPhotos(
  products.find((product) => product.id === "royal-ruby-green-stone-gold-bracelet-watch")
    ?? products.find((product) => product.categorySlug === "watches")
    ?? { id: "", name: "", category: "", image: null },
)[0]?.src;
