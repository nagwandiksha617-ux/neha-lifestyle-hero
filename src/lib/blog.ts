import { absoluteUrl, breadcrumbJsonLd, type Crumb } from "./seo";

export type BlogCategorySlug = "bags" | "jewellery" | "fashion" | "styling-tips";

export const blogCategories: { slug: BlogCategorySlug; name: string; description: string }[] = [
  { slug: "bags", name: "Bags", description: "Totes, handbags, clutches and potlis." },
  { slug: "jewellery", name: "Jewellery", description: "Necklace sets, earrings and occasion pieces." },
  { slug: "fashion", name: "Fashion", description: "Trends and seasonal edits." },
  { slug: "styling-tips", name: "Styling Tips", description: "How to pair and wear your pieces." },
];

export type BlogInternalLink = {
  label: string;
  slug: "jewellery" | "jewellery-sets" | "earrings";
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "image"; label: string }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] }
  | { type: "links"; links: BlogInternalLink[] };

export type BlogSection = { id: string; title: string; blocks: BlogBlock[] };

export type BlogPost = {
  /** URL segment: /blog/<slug>. Lowercase words joined by hyphens. */
  slug: string;
  title: string;
  /** Optional shorter label for breadcrumbs. */
  breadcrumbTitle?: string;
  excerpt: string;
  category: BlogCategorySlug;
  image?: { src: string; alt: string };
  /** ISO date, only once the owner confirms publication. */
  publishedAt?: string;
  author?: string;
  featured?: boolean;
  body: string[];
  sections?: BlogSection[];
  faqs?: { question: string; answer: string }[];
  /** Keeps unprovided owner copy visibly unpublished rather than inventing it. */
  contentPending?: boolean;
};

// Owner-supplied articles only — no invented articles, authors or dates.
export const blogPosts: BlogPost[] = [
  {
    slug: "artificial-jewellery-for-women",
    title: "Artificial Jewellery for Women: A Complete Guide to Types, Styling and Buying",
    breadcrumbTitle: "Artificial Jewellery for Women",
    excerpt: "A complete guide to artificial jewellery for women, covering types, styling and buying.",
    category: "jewellery",
    featured: true,
    body: [],
    contentPending: true,
    sections: [
      {
        id: "types-of-artificial-jewellery",
        title: "Types of Artificial Jewellery",
        blocks: [
          { type: "image", label: "Jewellery types image" },
          {
            type: "links",
            links: [
              { label: "Jewellery", slug: "jewellery" },
              { label: "Necklace Sets", slug: "jewellery-sets" },
              { label: "Earrings", slug: "earrings" },
            ],
          },
        ],
      },
      {
        id: "occasion-styling",
        title: "Occasion Styling",
        blocks: [{ type: "image", label: "Occasion styling image" }],
      },
      {
        id: "buying-artificial-jewellery",
        title: "Buying Artificial Jewellery",
        blocks: [{ type: "image", label: "Buying guide infographic" }],
      },
      {
        id: "jewellery-care",
        title: "Jewellery Care",
        blocks: [{ type: "image", label: "Jewellery care image" }],
      },
    ],
    faqs: [],
  },
];

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
    { name: post.breadcrumbTitle ?? post.title, path: blogPostPath(post.slug) },
  ];
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: absoluteUrl(blogPostPath(post.slug)),
    articleSection: blogCategoryName(post.category),
    publisher: { "@type": "Organization", name: "NEHA Lifestyle", url: absoluteUrl("/") },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.image?.src.startsWith("https://") ? { image: post.image.src } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
  };
}

export { breadcrumbJsonLd };
