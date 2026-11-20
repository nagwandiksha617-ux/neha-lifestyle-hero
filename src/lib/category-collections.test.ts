import { describe, expect, test } from "bun:test";
import { collectionSections, cardPhotos } from "./category-collections";

describe("category collections", () => {
  test("bags sections follow Tote, Handbags, Clutch, Potli order", () => {
    const order = ["tote-bags", "handbags", "clutch-bags", "potli-bags"];
    const got = collectionSections("bags").map((s) => s.slug);
    expect(got).toEqual(order.filter((s) => got.includes(s)));
    expect(got.length).toBeGreaterThan(0);
  });
  test("every listed product has a photo and no section is empty", () => {
    for (const slug of ["bags", "jewellery", "watches", "party-clutch-bags"]) {
      for (const s of collectionSections(slug)) {
        expect(s.items.length).toBeGreaterThan(0);
        for (const p of s.items) expect(cardPhotos(p).main).toBeDefined();
      }
    }
  });
  test("jewellery hides sub-categories without products", () => {
    expect(collectionSections("jewellery").map((s) => s.slug)).not.toContain("bracelets");
  });
});
