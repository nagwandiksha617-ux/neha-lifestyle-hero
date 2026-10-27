/// <reference types="bun" />
import { describe, expect, test } from "bun:test";

import { newArrivals, products, productsForCategoryPage } from "./products";

describe("Party & Clutch Bags listing", () => {
  test("lists every product assigned to the Party & Clutch Bags category", () => {
    expect(productsForCategoryPage("party-clutch-bags").map((p) => [p.name, p.colour])).toEqual([
      ["Silver Shell Embellished Clutch", undefined],
      ["Elegant Waist Clutch", "Silver"],
      ["Elegant Waist Clutch", "Gold"],
      ["Golden Traditional Designer Potli Bag", undefined],
      ["Silver Potli Bag", undefined],
    ]);
  });

  test("Golden Potli Bag has its 3 golden photos, hand-held photo first", () => {
    const potli = products.find((p) => p.id === "golden-traditional-designer-potli-bag");
    const files = potli?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["golden-potli-1-hand.png", "golden-potli-2-standalone.png", "golden-potli-3-jewellery.png"]);
    expect(potli?.image).toBe(potli?.gallery?.[0]?.src);
  });

  test("Silver Potli Bag is separate with its 3 silver photos, model photo first", () => {
    const potli = products.find((p) => p.id === "silver-potli-bag");
    const files = potli?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["silver-potli-1-model.png", "silver-potli-2-front.jpg", "silver-potli-3-handle.jpg"]);
    expect(potli?.image).toBe(potli?.gallery?.[0]?.src);
  });

  test("Silver Elegant Waist Clutch has only its 4 silver photos, model photo first", () => {
    const silver = products.find((p) => p.id === "elegant-waist-clutch-silver");
    const files = silver?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["silver-4-worn.png", "silver-1-front.jpg", "silver-2-side.jpg", "silver-3-open.jpg"]);
    expect(silver?.image).toBe(silver?.gallery?.[0]?.src);
  });

  test("Gold Elegant Waist Clutch has only its 3 gold photos, model photo first", () => {
    const gold = products.find((p) => p.id === "elegant-waist-clutch-gold");
    const files = gold?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["gold-3-worn.png", "gold-1-front.jpg", "gold-2-open.jpg"]);
    expect(gold?.image).toBe(gold?.gallery?.[0]?.src);
  });

  test("Elegant Waist Clutch listings are not added to New Arrivals", () => {
    expect(newArrivals().map((p) => p.name)).not.toContain("Elegant Waist Clutch");
  });

  test("a newly added clutch appears automatically", () => {
    products.push({ id: "test-clutch", name: "Test Clutch", category: "Party & Clutch Bags", categorySlug: "party-clutch-bags", image: null });
    try {
      expect(productsForCategoryPage("party-clutch-bags").map((p) => p.id)).toContain("test-clutch");
    } finally {
      products.pop();
    }
  });

  test("Jewellery and Bags pages are not given a product listing", () => {
    expect(productsForCategoryPage("jewellery")).toEqual([]);
    expect(productsForCategoryPage("bags")).toEqual([]);
  });

  test("New Arrivals keeps its five products in order", () => {
    expect(newArrivals().map((p) => p.name)).toEqual([
      "Peacock Pearl Jhumka Earrings",
      "Green Stone Jhumka Earrings",
      "Silver Shell Embellished Clutch",
      "Red & Green Velvet Potli Bag",
      "Green Pearl Embroidered Potli Bag",
    ]);
  });
});
