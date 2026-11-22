import type { Product, ProductPhoto } from "./products";

// Photos showing the product worn or carried by a person (detected from the photo description).
const modelPhoto = /\b(model|worn|wearing|wrist|held|holding|hand|lifestyle|carried|carrying)\b/i;

// Every original photo of one product, model/worn photo first, then the rest in their saved order.
// The product's own gallery data is never changed.
export function productPhotos(product: Product): ProductPhoto[] {
  const list = [...(product.gallery ?? [])];
  if (product.image && !list.some((p) => p.src === product.image)) list.push({ src: product.image, alt: product.name });
  return [...list.filter((p) => modelPhoto.test(p.alt)), ...list.filter((p) => !modelPhoto.test(p.alt))];
}

export function productCardPhoto(product: Product): ProductPhoto | undefined {
  return productPhotos(product)[0];
}
