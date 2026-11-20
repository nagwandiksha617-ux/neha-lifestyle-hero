import type { Product, ProductPhoto } from "./products";

// Card-only alternatives for uploaded collages; original galleries remain intact.
const singlePhotoIndex: Record<string, number> = {
  "brown-checkered-crossbody-bag": 1,
  "brown-beige-printed-shoulder-bag": 1,
  "olive-green-beige-printed-shoulder-bag": 1,
  "sky-blue-crossbody-bag": 1,
};

export function productCardPhoto(product: Product): ProductPhoto | undefined {
  return product.gallery?.[singlePhotoIndex[product.id] ?? 0];
}