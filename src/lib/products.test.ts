/// <reference types="bun" />
import { describe, expect, test } from "bun:test";

import { newArrivals, products, productsForCategoryPage } from "./products";

describe("Party & Clutch Bags listing", () => {
  test("lists every product assigned to the Party & Clutch Bags category", () => {
    expect(productsForCategoryPage("party-clutch-bags").map((p) => p.name)).toEqual(["Silver Shell Embellished Clutch"]);
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
