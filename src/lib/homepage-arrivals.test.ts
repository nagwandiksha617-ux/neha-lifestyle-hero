/// <reference types="bun" />
import { expect, test } from "bun:test";
import { homepageArrivals } from "./homepage-arrivals";
import { products } from "./products";

test("New Arrivals preserves the previous ten products and appends the two uploaded clutches", () => {
  expect(homepageArrivals.map((p) => p.id)).toEqual([
    "golden-crescent-handbag",
    "peacock-design-pink-green-gold-jhumka-earrings",
    "traditional-green-red-stone-gold-pearl-long-earrings",
    "emerald-green-stone-gold-pearl-jhumka-earrings",
    "royal-ruby-green-stone-gold-bracelet-watch",
    "antique-gold-temple-design-bracelet-watch",
    "traditional-gold-kundan-floral-bracelet-watch",
    "navy-blue-floral-statement-necklace-set",
    "multicolor-geometric-pendant-necklace-set",
    "golden-green-medallion-necklace-set",
    "na-4",
    "elegant-waist-clutch-gold",
  ]);
  expect(new Set(homepageArrivals.map((p) => p.image)).size).toBe(12);
  expect(new Set(homepageArrivals.map((p) => p.id)).size).toBe(12);
});

test("homepage photos do not replace any catalogue image, name or gallery", () => {
  for (const arrival of homepageArrivals) {
    const original = products.find((p) => p.id === arrival.id);
    expect(original).toBeDefined();
    if (!original) throw new Error(`Missing catalogue product: ${arrival.id}`);
    expect(arrival.name).toBe(original?.name);
    expect(arrival.gallery).toBe(original?.gallery);
    expect(arrival.image === original.image).toBe(false);
    expect(original.image === original.gallery?.[0]?.src).toBe(true);
  }
});