import { expect, test } from "bun:test";
import { products, productsForCategoryPage } from "./products";

const earrings: Array<[string, string]> = [
  ["Blue Stone Oxidised Silver Jhumka Earrings", "blue-stone-jhumka"],
  ["Antique Silver Gold-Tone Chain Jhumka Earrings", "gold-chain-jhumka"],
  ["Ruby Red Oxidised Silver Long Jhumka Earrings", "ruby-red-jhumka"],
  ["Emerald Green Oxidised Silver Long Jhumka Earrings", "emerald-green-jhumka"],
];

test("Earrings lists exactly the four requested sets in requested order", () => {
  const listed = productsForCategoryPage("earrings");
  expect(listed.map((p) => p.name)).toEqual(earrings.map(([name]) => name));
  expect(new Set(listed.map((p) => p.id)).size).toBe(4);
});

for (const [name, prefix] of earrings) {
  test(`${name} keeps its own display photo first and model photo second, with details pending`, () => {
    const product = products.find((p) => p.name === name);
    expect(product?.gallery?.map((photo) => photo.src.split("/").pop())).toEqual([`${prefix}-display.jpg`, `${prefix}-model.png`]);
    expect(product?.image).toBe(product?.gallery?.[0]?.src);
    expect(product?.categorySlug).toBe("earrings");
    expect(product?.description).toBeUndefined();
    expect(product).not.toHaveProperty("price");
    expect(product).not.toHaveProperty("materials");
    expect(product).not.toHaveProperty("discount");
  });
}

test("Earrings listings are not added to New Arrivals", () => {
  expect(products.filter((p) => p.newArrival).map((p) => p.name)).not.toContain("Blue Stone Oxidised Silver Jhumka Earrings");
});
