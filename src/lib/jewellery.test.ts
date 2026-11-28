import { expect, test } from "bun:test";
import { jewelleryCategories, jewelleryNewArrivals } from "./jewellery";
import { products, productsForCategoryPage } from "./products";

test("Jewellery has five distinct category pages without reassignment of existing products", () => {
  expect(jewelleryCategories.map((c) => c.slug)).toEqual(["earrings", "jewellery-sets", "bracelets", "ethnic-jewellery", "wedding-occasion-jewellery"]);
  expect(products.filter((p) => p.categorySlug === "jewellery").map((p) => p.id)).toEqual([]);
  expect(products.filter((p) => p.categorySlug === "bracelets")).toEqual([]);
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

const approvedMoves: Record<string, string> = {
  "Pink & Gold Statement Necklace Set": "wedding-occasion-jewellery",
  "Gold & Ruby Red Necklace Set": "wedding-occasion-jewellery",
  "Pearl, Pink & Green Ethnic Necklace Set": "wedding-occasion-jewellery",
  "Gold, White & Pink Kundan Necklace Set": "wedding-occasion-jewellery",
  "Antique Silver Oxidised Floral Necklace Set": "ethnic-jewellery",
  "Maroon Thread & Green Stone Oxidised Necklace Set": "ethnic-jewellery",
  "Antique Silver Oxidised Cascade Necklace Set": "ethnic-jewellery",
  "Silver Floral Pearl Pendant Necklace Set": "ethnic-jewellery",
  "Antique Silver Elephant Motif Necklace Set": "ethnic-jewellery",
  "Antique Silver Gold Coin Pendant Necklace Set": "ethnic-jewellery",
  "Multicolor Kundan Stone Pearl Necklace Set": "wedding-occasion-jewellery",
  "Green Stone Butterfly Pendant Necklace Set": "ethnic-jewellery",
  "Royal Purple Beaded Statement Necklace Set": "wedding-occasion-jewellery",
  "Multicolor Gemstone Necklace Set": "wedding-occasion-jewellery"
};

test("jewellery-sets lists exactly 15 approved products without duplicates", () => {
  const listed = productsForCategoryPage("jewellery-sets");
  expect(listed.map((product) => product.name)).toEqual([
  "Navy Blue & Silver Crystal Necklace Set",
  "Gold Multi-Layer Ruby Necklace Set",
  "Green & Pink Peacock Designer Necklace Set",
  "Maroon Deer Pendant Statement Necklace Set",
  "Antique Gold Temple Elephant Necklace Set",
  "Gold, Black & Pink Beaded Statement Necklace Set",
  "Green & White Pearl Long Necklace Set",
  "Green & Gold Traditional Long Necklace Set",
  "Golden Green Medallion Necklace Set",
  "Black Krishna Face Pendant Necklace Set",
  "Traditional Green Meenakari Gold Necklace Set",
  "Multicolor Geometric Pendant Necklace Set",
  "Navy Blue Floral Statement Necklace Set",
  "Green Deer Motif Necklace Set",
  "Multicolor Stone Statement Necklace Set"
]);
  expect(new Set(listed.map((product) => product.id)).size).toBe(15);
});

test("ethnic-jewellery lists exactly 7 approved products without duplicates", () => {
  const listed = productsForCategoryPage("ethnic-jewellery");
  expect(listed.map((product) => product.name)).toEqual([
  "Antique Silver Oxidised Floral Necklace Set",
  "Maroon Thread & Green Stone Oxidised Necklace Set",
  "Antique Silver Oxidised Cascade Necklace Set",
  "Silver Floral Pearl Pendant Necklace Set",
  "Antique Silver Elephant Motif Necklace Set",
  "Antique Silver Gold Coin Pendant Necklace Set",
  "Green Stone Butterfly Pendant Necklace Set"
]);
  expect(new Set(listed.map((product) => product.id)).size).toBe(7);
});

test("wedding-occasion-jewellery lists exactly 7 approved products without duplicates", () => {
  const listed = productsForCategoryPage("wedding-occasion-jewellery");
  expect(listed.map((product) => product.name)).toEqual([
  "Pink & Gold Statement Necklace Set",
  "Gold & Ruby Red Necklace Set",
  "Pearl, Pink & Green Ethnic Necklace Set",
  "Gold, White & Pink Kundan Necklace Set",
  "Multicolor Kundan Stone Pearl Necklace Set",
  "Royal Purple Beaded Statement Necklace Set",
  "Multicolor Gemstone Necklace Set"
]);
  expect(new Set(listed.map((product) => product.id)).size).toBe(7);
});

test("earrings lists exactly 7 approved products without duplicates", () => {
  const listed = productsForCategoryPage("earrings");
  expect(listed.map((product) => product.name)).toEqual([
  "Blue Stone Oxidised Silver Jhumka Earrings",
  "Antique Silver Gold-Tone Chain Jhumka Earrings",
  "Ruby Red Oxidised Silver Long Jhumka Earrings",
  "Emerald Green Oxidised Silver Long Jhumka Earrings",
  "Emerald Green Stone Gold Pearl Jhumka Earrings",
  "Traditional Green Red Stone Gold Pearl Long Earrings",
  "Peacock Design Pink Green Gold Jhumka Earrings"
]);
  expect(new Set(listed.map((product) => product.id)).size).toBe(7);
});

for (const [name, prefix, displayExt, modelExt = "png"] of sets) {
  test(`${name} keeps its own display photo first and model photo second, with details pending`, () => {
    const product = products.find((p) => p.name === name);
    expect(product?.gallery?.map((photo) => photo.src.split("/").pop())).toEqual([`${prefix}-display.${displayExt}`, `${prefix}-model.${modelExt}`]);
    expect(product?.image).toBe(product?.gallery?.[0]?.src);
    expect(product?.categorySlug).toBe(approvedMoves[name] ?? "jewellery-sets");
    expect(product?.description).toBeUndefined();
    expect(product).not.toHaveProperty("price");
    expect(product).not.toHaveProperty("materials");
    expect(product).not.toHaveProperty("discount");
  });
}