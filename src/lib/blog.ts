import { absoluteUrl, breadcrumbJsonLd, type Crumb } from "./seo";

export type BlogCategorySlug = "bags" | "jewellery" | "fashion" | "styling-tips";

export const blogCategories: { slug: BlogCategorySlug; name: string; description: string }[] = [
  { slug: "bags", name: "Bags", description: "Totes, handbags, clutches and potlis." },
  { slug: "jewellery", name: "Jewellery", description: "Necklace sets, earrings and occasion pieces." },
  { slug: "fashion", name: "Fashion", description: "Trends and seasonal edits." },
  { slug: "styling-tips", name: "Styling Tips", description: "How to pair and wear your pieces." },
];

export type BlogPost = {
  /** URL segment: /blog/<slug>. Lowercase words joined by hyphens. */
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  image: { src: string; alt: string };
  /** ISO date, only once the owner confirms publication. */
  publishedAt: string;
  author?: string;
  featured?: boolean;
  body: string[];
};

// Owner-supplied articles only — no placeholder posts, authors or dates.
export const blogPosts: BlogPost[] = [];

export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}

export function blogCategoryName(slug: BlogCategorySlug) {
  return blogCategories.find((c) => c.slug === slug)?.name ?? slug;
}

export function blogBreadcrumb(post: BlogPost): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: blogPostPath(post.slug) },
  ];
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    mainEntityOfPage: absoluteUrl(blogPostPath(post.slug)),
    articleSection: blogCategoryName(post.category),
    publisher: { "@type": "Organization", name: "NEHA Lifestyle", url: absoluteUrl("/") },
    ...(post.image.src.startsWith("https://") ? { image: post.image.src } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
  };
}

export { breadcrumbJsonLd };
