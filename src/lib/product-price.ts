import type { Product } from "./products";

export function productPrice(product: Pick<Product, "price">): string {
  return product.price === undefined
    ? "Price to be updated"
    : `₹${product.price.toLocaleString("en-IN")}`;
}