import { expect, test } from "bun:test";
import { findCategory } from "./categories";
import { products, productsForCategoryPage } from "./products";
import { watchCategories } from "./watches";

const watches: Array<[string, string, string]> = [
  ["Traditional Gold Kundan Floral Bracelet Watch", "kundan-floral-watch", "jpg"],
  ["Antique Gold Temple Design Bracelet Watch", "temple-watch", "jpg"],
  ["Royal Ruby Green Stone Gold Bracelet Watch", "ruby-green-watch", "png"],
];

test("Watches is a distinct category page", () => {
  expect(watchCategories.map((c) => c.slug)).toEqual(["watches"]);
  expect(findCategory("watches")?.name).toBe("Watches");
});

test("Watches lists exactly the three bracelet watches in requested order", () => {
  const listed = productsForCategoryPage("watches");
  expect(listed.map((p) => p.name)).toEqual(watches.map(([name]) => name));
  expect(new Set(listed.map((p) => p.id)).size).toBe(3);
});

for (const [name, prefix, displayExt] of watches) {
  test(`${name} keeps its own display photo first and worn photo second, with details pending`, () => {
    const product = products.find((p) => p.name === name);
    expect(product?.gallery?.map((photo) => photo.src.split("/").pop())).toEqual([`${prefix}-display.${displayExt}`, `${prefix}-model.png`]);
    expect(product?.image).toBe(product?.gallery?.[0]?.src);
    expect(product?.categorySlug).toBe("watches");
    expect(product?.description).toBeUndefined();
    expect(product).not.toHaveProperty("price");
    expect(product).not.toHaveProperty("materials");
    expect(product).not.toHaveProperty("discount");
  });
}
