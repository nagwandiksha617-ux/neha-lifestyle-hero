import { describe, expect, test } from "bun:test";
import { absoluteUrl, pageSeo, shareImageUrl } from "./seo";

describe("seo", () => {
  test("canonical is self-referencing on the production domain", () => {
    expect(absoluteUrl("/")).toBe("https://nehalifestyle.com/");
    const s = pageSeo({ path: "/category/watches", title: "t", description: "d" });
    expect(s.links).toEqual([{ rel: "canonical", href: "https://nehalifestyle.com/category/watches" }]);
    expect(s.meta).toContainEqual({ property: "og:url", content: "https://nehalifestyle.com/category/watches" });
  });
  test("relative images are not used as share images", () => {
    const s = pageSeo({ path: "/", title: "t", description: "d", image: "/assets/x.jpg" });
    expect(s.meta.some((m) => "property" in m && m.property === "og:image")).toBe(false);
  });
  test("share image URLs resolve relative CDN pointers against the production domain", () => {
    expect(shareImageUrl("/__l5e/assets-v1/abc/hero.webp")).toBe("https://nehalifestyle.com/__l5e/assets-v1/abc/hero.webp");
    expect(shareImageUrl("https://cdn.example.com/hero.webp")).toBe("https://cdn.example.com/hero.webp");
  });
});
