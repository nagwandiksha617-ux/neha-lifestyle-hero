import { expect, test } from "bun:test";
import { jewelleryCategories, jewelleryNewArrivals } from "./jewellery";
import { products } from "./products";

test("Jewellery has five distinct category pages without reassignment of existing products", () => {
  expect(jewelleryCategories.map((c) => c.slug)).toEqual(["earrings", "jewellery-sets", "bracelets", "ethnic-jewellery", "wedding-occasion-jewellery"]);
  expect(products.filter((p) => p.categorySlug === "jewellery").map((p) => p.id)).toEqual(["na-1", "na-2"]);
  expect(products.filter((p) => jewelleryCategories.some((c) => c.slug === p.categorySlug))).toEqual([]);
});

test("Jewellery New Arrivals uses only the two existing jewellery arrivals", () => {
  expect(jewelleryNewArrivals.map((p) => p.id)).toEqual(["na-1", "na-2"]);
});