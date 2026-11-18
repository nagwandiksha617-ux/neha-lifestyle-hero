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
  ["Gold Multi-Layer Ruby Necklace Set", "ruby-multilayer"],
  ["Green & Pink Peacock Designer Necklace Set", "peacock-green-pink"],
  ["Gold, White & Pink Kundan Necklace Set", "kundan-white-pink"],
  ["Maroon Deer Pendant Statement Necklace Set", "maroon-deer"],
  ["Antique Gold Temple Elephant Necklace Set", "temple-elephant"],
  ["Gold, Black & Pink Beaded Statement Necklace Set", "black-pink-beaded"],
  ["Green & White Pearl Long Necklace Set", "green-white-pearl"],
  ["Green & Gold Traditional Long Necklace Set", "green-gold-long"],
];

test("Jewellery Sets lists exactly twelve distinct sets in requested order", () => {
  const listed = productsForCategoryPage("jewellery-sets");
  expect(listed.map((p) => p.name)).toEqual(sets.map(([name]) => name));
  expect(new Set(listed.map((p) => p.id)).size).toBe(12);
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