// Intended production domain; canonical/og:url are absolute so prerendered HTML on static hosting is self-describing.
export const SITE_URL = "https://nehalifestyle.com";

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
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
