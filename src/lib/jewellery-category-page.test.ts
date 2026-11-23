import { describe, expect, test } from "bun:test";
import { jewelleryCategorySections } from "./jewellery-category-page";
import { products } from "./products";
import { productPhotos } from "./product-card-photos";

describe("Jewellery CategoryPage data", () => {
  test("keeps all five sections in the requested order, without Bracelets", () => {
    const sections = jewelleryCategorySections();
    expect(sections.map((section) => section.id)).toEqual(["earrings", "necklace-sets", "ethnic", "wedding"]);
    expect(sections.find((section) => section.id === "bracelets")).toBeUndefined();
  });

  test("uses existing sub-category assignments without reassigning other products", () => {
    const sections = jewelleryCategorySections();
    const slugs = ["earrings", "jewellery-sets", "ethnic-jewellery", "wedding-occasion-jewellery"];
    sections.forEach((section, index) => {
      expect(section.products.map((product) => product.id)).toEqual(products.filter((product) => product.categorySlug === slugs[index]).map((product) => product.id));
      expect(section.viewAllHref).toBe(`/category/${slugs[index]}`);
    });
  });

  test("passes every original photo, model-first, and existing product detail URLs", () => {
    const cards = jewelleryCategorySections().flatMap((section) => section.products);
    expect(cards.length).toBe(33);
    for (const card of cards) {
      const product = products.find((item) => item.id === card.id);
      if (!product) throw new Error(`Missing original product ${card.id}`);
      expect(card.name).toBe(product.name);
      expect(card.href).toBe(`/product/${encodeURIComponent(product.id)}`);
      expect(card.images).toEqual(productPhotos(product).map((photo) => photo.src));
      expect(card.image).toBe(card.images[0] ?? null);
      expect(card.image2).toBe(card.images[1] ?? null);
      expect(card.price).toBe("Price to be updated");
    }
  });
});