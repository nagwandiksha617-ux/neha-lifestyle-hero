import { expect, test } from "bun:test";
import { jewelleryCategories, jewelleryNewArrivals } from "./jewellery";
import { products, productsForCategoryPage } from "./products";

test("Jewellery has five distinct category pages without reassignment of existing products", () => {
  expect(jewelleryCategories.map((c) => c.slug)).toEqual(["earrings", "jewellery-sets", "bracelets", "ethnic-jewellery", "wedding-occasion-jewellery"]);
  expect(products.filter((p) => p.categorySlug === "jewellery").map((p) => p.id)).toEqual(["na-1", "na-2"]);
  expect(products.filter((p) => jewelleryCategories.some((c) => c.slug !== "jewellery-sets" && c.slug === p.categorySlug))).toEqual([]);
});

test("Jewellery New Arrivals uses only the two existing jewellery arrivals", () => {
  expect(jewelleryNewArrivals.map((p) => p.id)).toEqual(["na-1", "na-2"]);
});

const sets: Array<[string, string]> = [
  ["Navy Blue & Silver Crystal Necklace Set", "navy-silver"],
  ["Pink & Gold Statement Necklace Set", "pink-gold"],
  ["Gold & Ruby Red Necklace Set", "gold-ruby"],
  ["Pearl, Pink & Green Ethnic Necklace Set", "pearl-pink-green"],
];

test("Jewellery Sets lists exactly four distinct new sets in requested order", () => {
  const listed = productsForCategoryPage("jewellery-sets");
  expect(listed.map((p) => p.name)).toEqual(sets.map(([name]) => name));
  expect(new Set(listed.map((p) => p.id)).size).toBe(4);
});

for (const [name, prefix] of sets) {
  test(`${name} keeps its own display photo first and model photo second, with details pending`, () => {
    const product = products.find((p) => p.name === name);
    expect(product?.gallery?.map((photo) => photo.src.split("/").pop())).toEqual([`${prefix}-display.png`, `${prefix}-model.png`]);
    expect(product?.image).toBe(product?.gallery?.[0]?.src);
    expect(product?.categorySlug).toBe("jewellery-sets");
    expect(product?.description).toBeUndefined();
    expect(product).not.toHaveProperty("price");
    expect(product).not.toHaveProperty("materials");
    expect(product).not.toHaveProperty("discount");
  });
}