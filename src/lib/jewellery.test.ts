import { expect, test } from "bun:test";
import { jewelleryCategories, jewelleryNewArrivals } from "./jewellery";
import { products, productsForCategoryPage } from "./products";

test("Jewellery has five distinct category pages without reassignment of existing products", () => {
  expect(jewelleryCategories.map((c) => c.slug)).toEqual(["earrings", "jewellery-sets", "bracelets", "ethnic-jewellery", "wedding-occasion-jewellery"]);
  expect(products.filter((p) => p.categorySlug === "jewellery").map((p) => p.id)).toEqual(["na-1", "na-2"]);
  expect(products.filter((p) => jewelleryCategories.some((c) => c.slug !== "jewellery-sets" && c.slug !== "earrings" && c.slug === p.categorySlug))).toEqual([]);
});

test("Jewellery collection arrivals remain empty after the old arrivals were cleared", () => {
  expect(jewelleryNewArrivals.map((p) => p.id)).toEqual([]);
});

const sets: Array<[string, string, string, string?]> = [
  ["Navy Blue & Silver Crystal Necklace Set", "navy-silver", "png"],
  ["Pink & Gold Statement Necklace Set", "pink-gold", "png"],
  ["Gold & Ruby Red Necklace Set", "gold-ruby", "png"],
  ["Pearl, Pink & Green Ethnic Necklace Set", "pearl-pink-green", "png"],
  ["Gold Multi-Layer Ruby Necklace Set", "ruby-multilayer", "png"],
  ["Green & Pink Peacock Designer Necklace Set", "peacock-green-pink", "png"],
  ["Gold, White & Pink Kundan Necklace Set", "kundan-white-pink", "png"],
  ["Maroon Deer Pendant Statement Necklace Set", "maroon-deer", "png"],
  ["Antique Gold Temple Elephant Necklace Set", "temple-elephant", "png"],
  ["Gold, Black & Pink Beaded Statement Necklace Set", "black-pink-beaded", "png"],
  ["Green & White Pearl Long Necklace Set", "green-white-pearl", "png"],
  ["Green & Gold Traditional Long Necklace Set", "green-gold-long", "png"],
  ["Antique Silver Oxidised Floral Necklace Set", "oxidised-floral", "jpg"],
  ["Maroon Thread & Green Stone Oxidised Necklace Set", "maroon-thread-oxidised", "jpg"],
  ["Golden Green Medallion Necklace Set", "golden-green-medallion", "jpg"],
  ["Black Krishna Face Pendant Necklace Set", "black-krishna", "png"],
  ["Antique Silver Oxidised Cascade Necklace Set", "oxidised-cascade", "jpg"],
  ["Silver Floral Pearl Pendant Necklace Set", "silver-floral-pearl", "jpg"],
  ["Antique Silver Elephant Motif Necklace Set", "elephant-motif", "jpg"],
  ["Antique Silver Gold Coin Pendant Necklace Set", "gold-coin-pendant", "jpg"],
  ["Multicolor Kundan Stone Pearl Necklace Set", "multicolor-kundan", "png"],
  ["Traditional Green Meenakari Gold Necklace Set", "green-meenakari", "png"],
  ["Green Stone Butterfly Pendant Necklace Set", "green-butterfly", "jpg"],
  ["Royal Purple Beaded Statement Necklace Set", "royal-purple", "png"],
  ["Multicolor Geometric Pendant Necklace Set", "multicolor-geometric", "png"],
  ["Navy Blue Floral Statement Necklace Set", "navy-floral", "png"],
  ["Multicolor Gemstone Necklace Set", "multicolor-gemstone", "webp", "webp"],
  ["Green Deer Motif Necklace Set", "green-deer", "webp", "webp"],
  ["Multicolor Stone Statement Necklace Set", "multicolor-statement", "webp", "webp"],
];

test("Jewellery Sets lists exactly twenty-nine distinct sets in requested order", () => {
  const listed = productsForCategoryPage("jewellery-sets");
  expect(listed.map((p) => p.name)).toEqual(sets.map(([name]) => name));
  expect(new Set(listed.map((p) => p.id)).size).toBe(29);
});

for (const [name, prefix, displayExt, modelExt = "png"] of sets) {
  test(`${name} keeps its own display photo first and model photo second, with details pending`, () => {
    const product = products.find((p) => p.name === name);
    expect(product?.gallery?.map((photo) => photo.src.split("/").pop())).toEqual([`${prefix}-display.${displayExt}`, `${prefix}-model.${modelExt}`]);
    expect(product?.image).toBe(product?.gallery?.[0]?.src);
    expect(product?.categorySlug).toBe("jewellery-sets");
    expect(product?.description).toBeUndefined();
    expect(product).not.toHaveProperty("price");
    expect(product).not.toHaveProperty("materials");
    expect(product).not.toHaveProperty("discount");
  });
}