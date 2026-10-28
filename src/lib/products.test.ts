/// <reference types="bun" />
import { describe, expect, test } from "bun:test";

import { newArrivals, products, productsForCategoryPage } from "./products";

describe("Party & Clutch Bags listing", () => {
  test("lists every product assigned to the Party & Clutch Bags category", () => {
    expect(productsForCategoryPage("party-clutch-bags").map((p) => [p.name, p.colour])).toEqual([
      ["Silver Shell Embellished Clutch", undefined],
      ["Elegant Waist Clutch", "Silver"],
      ["Elegant Waist Clutch", "Gold"],
      ["Golden Traditional Potli Bag", undefined],
      ["Silver Potli Bag", undefined],
      ["Golden Traditional Designer Potli Bag", undefined],
      ["Golden Crescent Handbag", undefined],
      ["Maroon Potli Bag", undefined],
      ["Red & Green Velvet Potli Bag", undefined],
    ]);
  });

  test("Golden Traditional Potli Bag has its 4 photos, model photo first, price pending", () => {
    const bag = products.find((p) => p.id === "golden-traditional-potli-bag");
    expect(bag?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["gtp-1-model.png", "gtp-2-front.jpg", "gtp-3-open.jpg", "gtp-4-front.jpg"]);
    expect(bag?.image).toBe(bag?.gallery?.[0]?.src);
    expect(bag?.newArrival).toBeUndefined();
  });

  test("Golden Crescent Handbag has its 4 photos, model photo first", () => {
    const bag = products.find((p) => p.id === "golden-crescent-handbag");
    expect(bag?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["crescent-1-cream.png", "crescent-2-stones.jpg", "crescent-3-side.jpg", "crescent-4-top.jpg"]);
    expect(bag?.image).toBe(bag?.gallery?.[0]?.src);
  });

  test("Golden Potli Bag has its 3 golden photos, hand-held photo first", () => {
    const potli = products.find((p) => p.id === "golden-traditional-designer-potli-bag");
    const files = potli?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["golden-potli-1-hand.png", "golden-potli-2-standalone.png", "golden-potli-3-jewellery.png"]);
    expect(potli?.image).toBe(potli?.gallery?.[0]?.src);
  });

  test("Silver Potli Bag is separate with its 3 silver photos, model photo first", () => {
    const potli = products.find((p) => p.id === "silver-potli-bag");
    const files = potli?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["silver-potli-1-model-pink.png", "silver-potli-2-front.jpg", "silver-potli-3-handle.jpg"]);
    expect(potli?.image).toBe(potli?.gallery?.[0]?.src);
  });

  test("Silver Shell Embellished Clutch has its 4 photos in order, model photo first", () => {
    const shell = products.find((p) => p.id === "na-4");
    expect(shell?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["shell-1-model.png", "shell-2-open.jpg", "shell-3-angled.jpg", "shell-4-chain.jpg"]);
    expect(shell?.image).toBe(shell?.gallery?.[0]?.src);
    expect(shell?.categorySlug).toBe("party-clutch-bags");
  });

  test("Silver Elegant Waist Clutch has only its 4 silver photos, model photo first", () => {
    const silver = products.find((p) => p.id === "elegant-waist-clutch-silver");
    const files = silver?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["silver-4-worn.png", "silver-1-front.jpg", "silver-2-side.jpg", "silver-3-open.jpg"]);
    expect(silver?.image).toBe(silver?.gallery?.[0]?.src);
  });

  test("Gold Elegant Waist Clutch has only its 3 gold photos, model photo first", () => {
    const gold = products.find((p) => p.id === "elegant-waist-clutch-gold");
    const files = gold?.gallery?.map((g) => g.src.split("/").pop());
    expect(files).toEqual(["gold-3-worn.png", "gold-1-front.jpg", "gold-2-open.jpg"]);
    expect(gold?.image).toBe(gold?.gallery?.[0]?.src);
  });

  test("Elegant Waist Clutch listings are not added to New Arrivals", () => {
    expect(newArrivals().map((p) => p.name)).not.toContain("Elegant Waist Clutch");
  });

  test("a newly added clutch appears automatically", () => {
    products.push({ id: "test-clutch", name: "Test Clutch", category: "Party & Clutch Bags", categorySlug: "party-clutch-bags", image: null });
    try {
      expect(productsForCategoryPage("party-clutch-bags").map((p) => p.id)).toContain("test-clutch");
    } finally {
      products.pop();
    }
  });

  test("Jewellery and Bags pages are not given a product listing", () => {
    expect(productsForCategoryPage("jewellery")).toEqual([]);
    expect(productsForCategoryPage("bags")).toEqual([]);
  });

  test("Red & Green Velvet Potli Bag has its 3 photos, model photo first", () => {
    const bag = products.find((p) => p.id === "na-5");
    expect(bag?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["velvet-potli-1-model.png", "velvet-potli-2-green.png", "velvet-potli-3-green-maroon.jpg"]);
    expect(bag?.image).toBe(bag?.gallery?.[0]?.src);
  });

  test("Maroon Potli Bag has its 2 photos, model photo first, not in New Arrivals", () => {
    const bag = products.find((p) => p.id === "maroon-potli-bag");
    expect(bag?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["maroon-potli-1-model.png", "maroon-potli-2-white.png"]);
    expect(bag?.image).toBe(bag?.gallery?.[0]?.src);
    expect(bag?.newArrival).toBeUndefined();
  });

  test("Green Pearl Embroidered Potli Bag has its 4 photos, dark background first", () => {
    const bag = products.find((p) => p.id === "na-6");
    expect(bag?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["gpp-4-dark.png", "gpp-1-light.png", "gpp-2-side.png", "gpp-3-back.png"]);
    expect(bag?.image).toBe(bag?.gallery?.[0]?.src);
  });

  test("New Arrivals keeps its five products in order", () => {
    expect(newArrivals().map((p) => p.name)).toEqual([
      "Peacock Pearl Jhumka Earrings",
      "Green Stone Jhumka Earrings",
      "Silver Shell Embellished Clutch",
      "Red & Green Velvet Potli Bag",
      "Green Pearl Embroidered Potli Bag",
    ]);
  });
});

describe("Bags menu categories", () => {
  const names = (slug: string) => productsForCategoryPage(slug).map((p) => [p.name, p.colour]);

  test("Clutch Bags lists only the clutch products", () => {
    expect(names("clutch-bags")).toEqual([
      ["Silver Shell Embellished Clutch", undefined],
      ["Elegant Waist Clutch", "Silver"],
      ["Elegant Waist Clutch", "Gold"],
    ]);
  });

  test("Potli Bags lists only the potli products", () => {
    expect(names("potli-bags")).toEqual([
      ["Green Pearl Embroidered Potli Bag", undefined],
      ["Golden Traditional Potli Bag", undefined],
      ["Silver Potli Bag", undefined],
      ["Golden Traditional Designer Potli Bag", undefined],
      ["Maroon Potli Bag", undefined],
      ["Red & Green Velvet Potli Bag", undefined],
    ]);
  });

  test("Tote Bags has no products yet; Handbags lists the brown crossbody", () => {
    expect(names("tote-bags")).toEqual([["Cream Beige Tote Bag with Gold Chain Handles", undefined], ["Beige & Black Printed Tote Bag", undefined]]);
    expect(products.find((p) => p.id === "cream-beige-tote-bag-gold-chain")?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["cbt-1-lifestyle.png", "cbt-2-back.png", "cbt-3-side.png"]);
    expect(products.find((p) => p.id === "beige-black-printed-tote-bag")?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["bbt-1-model.png", "bbt-2-front.png", "bbt-3-back.png", "bbt-4-bottom.png"]);
    expect(names("handbags")).toEqual([
      ["Brown Checkered Crossbody Bag with Mini Pouch", undefined],
      ["Blue Printed Crossbody Bag with Mini Pouch", undefined],
      ["White Checkered Crossbody Bag with Mini Pouch", undefined],
      ["Olive Green Beige Printed Shoulder Bag", undefined],
      ["Brown Beige Printed Shoulder Bag", undefined],
      ["Sky Blue Crossbody Bag with Mini Pouch", undefined],
    ]);
  });

  test("Blue and White crossbody bags keep only their own photos", () => {
    const files = (id: string) => products.find((p) => p.id === id)?.gallery?.map((g) => g.src.split("/").pop());
    expect(files("blue-printed-crossbody-bag")).toEqual(["bpc-1-model.png", "bpc-2-front.png", "bpc-3-back.png", "bpc-4-side.png"]);
    expect(files("white-checkered-crossbody-bag")).toEqual(["wcc-1-model.png", "wcc-2-front.png", "wcc-3-back.png"]);
    expect(files("olive-green-beige-printed-shoulder-bag")).toEqual(["obs-1-model.png", "obs-2-front.png", "obs-3-back.png", "obs-4-bottom.png"]);
    expect(files("brown-beige-printed-shoulder-bag")).toEqual(["bbs-1-model.png", "bbs-2-front.png", "bbs-3-back.png"]);
    expect(files("sky-blue-crossbody-bag")).toEqual(["sbc-1-model.png", "sbc-2-front.png", "sbc-3-back.png"]);
  });

  test("Brown Checkered Crossbody has its 3 photos, model collage first, price pending", () => {
    const bag = products.find((p) => p.id === "brown-checkered-crossbody-bag");
    expect(bag?.gallery?.map((g) => g.src.split("/").pop())).toEqual(["bcc-1-model.png", "bcc-2-front.png", "bcc-3-back.png"]);
    expect(bag?.image).toBe(bag?.gallery?.[0]?.src);
    expect(bag?.newArrival).toBeUndefined();
  });

  test("no product is duplicated", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
