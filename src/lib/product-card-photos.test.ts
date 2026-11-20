import { expect, test } from "bun:test";
import { products } from "./products";
import { productCardPhoto } from "./product-card-photos";

test("collage cards use their matching single front photos without altering galleries", () => {
  for (const [id, file] of [
    ["brown-checkered-crossbody-bag", "bcc-2-front.png"],
    ["brown-beige-printed-shoulder-bag", "bbs-2-front.png"],
    ["olive-green-beige-printed-shoulder-bag", "obs-2-front.png"],
    ["sky-blue-crossbody-bag", "sbc-2-front.png"],
  ]) {
    const product = products.find((p) => p.id === id);
    expect(product).toBeDefined();
    if (!product) throw new Error("Missing product");
    const gallery = product.gallery?.map((photo) => photo.src);
    expect(productCardPhoto(product)?.src.split("/").pop()).toBe(file);
    expect(product.gallery?.map((photo) => photo.src)).toEqual(gallery);
  }
});