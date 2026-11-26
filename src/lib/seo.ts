// Intended production domain; canonical/og:url are absolute so prerendered HTML on static hosting is self-describing.
export const SITE_URL = "https://nehalifestyle.com";

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute share URL for a page image; relative CDN pointers resolve against SITE_URL. */
export function shareImageUrl(src: string): string {
  return src.startsWith("http") ? src : absoluteUrl(src);
}

type PageSeo = { path: string; title: string; description: string; type?: string; image?: string | null | undefined };

/** Self-referencing canonical, Open Graph and Twitter Card tags for one page. */
export function pageSeo({ path, title, description, type = "website", image }: PageSeo) {
  const url = absoluteUrl(path);
  const img = image && image.startsWith("https://") ? image : null;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: img ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

// Owner-confirmed business details only (see project memory: official contact details).
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NEHA Lifestyle",
    url: absoluteUrl("/"),
    email: "Er.neha17071993@gmail.com",
    telephone: "+91-9664366547",
    address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    sameAs: ["https://www.instagram.com/nehalifestyle_93/"],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}
