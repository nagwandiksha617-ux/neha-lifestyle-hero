import { expect, test } from "bun:test";
import { articleJsonLd, blogBreadcrumb, blogPosts, type BlogPost } from "./blog";

const sample: BlogPost = { slug: "how-to-style-a-potli", title: "T", excerpt: "E", category: "bags", image: { src: "/x.jpg", alt: "x" }, publishedAt: "2026-01-01", body: [] };

test("no invented blog articles are published", () => {
  expect(blogPosts).toEqual([]);
});

test("article breadcrumb is Home > Blog > article with /blog/<slug> URL", () => {
  expect(blogBreadcrumb(sample).map((c) => c.path)).toEqual(["/", "/blog", "/blog/how-to-style-a-potli"]);
});

test("article schema omits author when none is confirmed", () => {
  const a = articleJsonLd(sample);
  expect(a["@type"]).toBe("Article");
  expect("author" in a).toBe(false);
  expect(a.mainEntityOfPage).toBe("https://nehalifestyle.com/blog/how-to-style-a-potli");
});
