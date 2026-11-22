import { expect, test } from "bun:test";
import { products } from "./products";
import { productCardPhoto, productPhotos } from "./product-card-photos";

test("card shows the model photo first and the gallery keeps every original photo", () => {
  for (const [id, file] of [["brown-checkered-crossbody-bag", "bcc-1-model.png"], ["sky-blue-crossbody-bag", "sbc-1-model.png"]]) {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error("Missing product");
    expect(productCardPhoto(product)?.src.split("/").pop()).toBe(file);
  }
});

test("no product loses or borrows a photo", () => {
  for (const p of products) {
    const own = new Set([...(p.gallery ?? []).map((g) => g.src), ...(p.image ? [p.image] : [])]);
    const shown = productPhotos(p).map((g) => g.src);
    expect(new Set(shown)).toEqual(own);
    expect(shown.length).toBe(own.size);
  }
});
