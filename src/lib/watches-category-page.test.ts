import { expect, test } from "bun:test";
import { watchCategorySections } from "./watches-category-page";
import { products } from "./products";

test("one Bracelet Watches section holds every watch product", () => {
  const [first, ...rest] = watchCategorySections();
  const section = first!;
  expect(rest.length).toBe(0);
  expect(section.id).toBe("watches");
  expect(section.products.map((p) => p.id).sort()).toEqual(
    products.filter((p) => p.categorySlug === "watches").map((p) => p.id).sort(),
  );
});
