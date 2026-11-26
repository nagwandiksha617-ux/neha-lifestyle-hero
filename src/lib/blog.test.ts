import { expect, test } from "bun:test";
import { articleJsonLd, blogBreadcrumb, blogPosts, type BlogPost } from "./blog";

const sample: BlogPost = { slug: "how-to-style-a-potli", title: "T", excerpt: "E", category: "bags", image: { src: "/x.jpg", alt: "x" }, publishedAt: "2026-01-01", body: [] };

test("only the owner-supplied article is published", () => {
  expect(blogPosts.map((post) => post.slug)).toEqual(["artificial-jewellery-for-women"]);
});

test("article breadcrumb is Home > Blog > article with /blog/<slug> URL", () => {
  expect(blogBreadcrumb(sample).map((c) => c.path)).toEqual(["/", "/blog", "/blog/how-to-style-a-potli"]);
});

test("requested article uses its short breadcrumb label and individual URL", () => {
  const post = blogPosts[0]!;
  expect(blogBreadcrumb(post)).toEqual([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Artificial Jewellery for Women", path: "/blog/artificial-jewellery-for-women" },
  ]);
});

test("article schema omits author when none is confirmed", () => {
  const a = articleJsonLd(sample);
  expect(a["@type"]).toBe("Article");
  expect("author" in a).toBe(false);
  expect(a.mainEntityOfPage).toBe("https://nehalifestyle.com/blog/how-to-style-a-potli");
});

test("requested article schema omits unconfirmed dates, authorship and images", () => {
  const a = articleJsonLd(blogPosts[0]!);
  expect("datePublished" in a).toBe(false);
  expect("author" in a).toBe(false);
  expect("image" in a).toBe(false);
  expect(a.mainEntityOfPage).toBe("https://nehalifestyle.com/blog/artificial-jewellery-for-women");
});
