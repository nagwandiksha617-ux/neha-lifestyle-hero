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

test("complete guide includes all supplied sections, tables and FAQs", () => {
  const post = blogPosts[0]!;
  expect(post.body).toHaveLength(3);
  expect(post.sections).toHaveLength(9);
  expect(post.faqs).toHaveLength(8);
  const tables = post.sections!.flatMap((section) => section.blocks).filter((block) => block.type === "table");
  expect(tables).toHaveLength(4);
  for (const table of tables) {
    for (const row of table.rows) expect(row).toHaveLength(table.headers.length);
  }
});

test("article hero shows the owner-supplied photo with the confirmed alt text", () => {
  const post = blogPosts[0]!;
  expect(post.image?.alt).toBe("Artificial jewellery for women by NEHA Lifestyle");
  expect(post.image?.src).toContain("blog-jewellery-hero.webp");
  expect(post.heroPlaceholder).toBeUndefined();
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

test("necklace collection photo sits in the Necklace Sets subsection with the confirmed alt and caption", () => {
  const post = blogPosts[0]!;
  const blocks = post.sections!.flatMap((section) => section.blocks);
  const index = blocks.findIndex((block) => block.type === "image" && block.src);
  expect(index).toBeGreaterThan(-1);
  const photo = blocks[index]!;
  expect(photo.type).toBe("image");
  if (photo.type !== "image") return;
  expect(photo.src).toContain("necklace-collection.webp");
  expect(photo.alt).toBe("Artificial necklace sets collection for women by NEHA Lifestyle");
  expect(photo.caption).toBe("Explore different necklace styles at NEHA Lifestyle.");
  expect(photo.width).toBe(1920);
  expect(photo.height).toBe(1080);
  const earrings = blocks.findIndex((block) => block.type === "subheading" && block.text === "B. Earrings");
  expect(index).toBeLessThan(earrings);
  const necklaceSets = blocks.findIndex((block) => block.type === "subheading" && block.text === "A. Necklace Sets");
  expect(necklaceSets).toBeLessThan(index);
});

test("both remaining image spots show owner-supplied photos and no placeholder is left", () => {
  const post = blogPosts[0]!;
  const images = post.sections!.flatMap((section) => section.blocks).filter((block) => block.type === "image");
  expect(images).toHaveLength(2);
  const pending = images.filter((block) => block.type === "image" && !block.src);
  expect(pending).toHaveLength(0);
  expect(images.map((block) => block.type === "image" && block.label)).toEqual([
    "Necklace collection image",
    "Occasion styling collage",
  ]);
});

test("occasion section shows the owner-supplied photo with the confirmed alt text", () => {
  const post = blogPosts[0]!;
  const sections = post.sections!.filter((section) => section.id === "jewellery-for-different-occasions");
  expect(sections).toHaveLength(1);
  const blocks = sections[0]!.blocks;
  const photos = blocks.filter((block) => block.type === "image" && block.src);
  expect(photos).toHaveLength(1);
  const photo = photos[0]!;
  if (photo.type !== "image") return;
  expect(photo.src).toContain("occasion-style-collection.webp");
  expect(photo.alt).toBe(
    "Artificial jewellery for women for wedding, festivals, Navratri, sangeet and party occasions",
  );
  expect(photo.width).toBe(1920);
  expect(photo.height).toBe(1080);
  const table = blocks.findIndex((block) => block.type === "table");
  const index = blocks.indexOf(photo);
  expect(table).toBeGreaterThan(-1);
  expect(index).toBeGreaterThan(table);
});
