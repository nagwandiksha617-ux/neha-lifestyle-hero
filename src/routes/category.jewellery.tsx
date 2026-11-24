import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "@/components/CategoryPage";
import { InformationDialog } from "@/components/SiteChrome";
import { jewelleryCategorySections, jewelleryHeroImage } from "@/lib/jewellery-category-page";
import earringsPhoto from "@/assets/jewellery-categories/earrings-peacock-jhumke.jpg.asset.json";
import ethnicPhoto from "@/assets/jewellery-categories/ethnic-silver-red-earrings.jpg.asset.json";
import weddingPhoto from "@/assets/jewellery-categories/wedding-necklace-set.png.asset.json";

const categoryPhotos: Record<string, string> = {
  Earrings: earringsPhoto.url,
  Ethnic: ethnicPhoto.url,
  "Wedding & Occasion": weddingPhoto.url,
};

const description = "Handcrafted jewellery inspired by the Pink City, made to make you shine.";

export const Route = createFileRoute("/category/jewellery")({
  head: () => ({
    meta: [
      { title: "Jewellery Collections — NEHA Lifestyle" },
      { name: "description", content: description },
      { property: "og:title", content: "Jewellery Collections — NEHA Lifestyle" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(jewelleryHeroImage?.startsWith("https://") ? [
        { property: "og:image", content: jewelleryHeroImage },
        { name: "twitter:image", content: jewelleryHeroImage },
      ] : []),
    ],
  }),
  component: JewelleryPage,
});

function JewelleryPage() {
  const [topic, setTopic] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const sections = jewelleryCategorySections();

  // Override only this page's category artwork without changing the frozen template
  // or using category photos as catalogue merchandise.
  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll<HTMLButtonElement>('nav[aria-label="Sub-categories"] button');
    cards?.forEach((card) => {
      const title = card.querySelector("span")?.textContent ?? "";
      const src = categoryPhotos[title];
      const frame = card.querySelector("div");
      if (!src || !frame) return;
      const image = frame.querySelector("img") ?? document.createElement("img");
      image.src = src;
      image.alt = title;
      image.className = "absolute inset-0 h-full w-full object-cover";
      if (!image.parentElement) frame.replaceChildren(image);
    });
  }, []);

  // Delegate photo clicks on this page only; the original template stays untouched.
  function openProductPhoto(event: MouseEvent<HTMLDivElement>) {
    // Sub-category cards open their own category page instead of scrolling.
    const card = (event.target as HTMLElement).closest('nav[aria-label="Sub-categories"] button');
    if (card) {
      const index = Array.from(card.parentElement?.children ?? []).indexOf(card);
      const href = sections[index]?.viewAllHref;
      if (href) { event.preventDefault(); window.location.assign(href); }
      return;
    }
    if (!(event.target instanceof HTMLImageElement)) return;
    const link = event.target.closest("article")?.querySelector<HTMLAnchorElement>("h3 a");
    if (link) window.location.assign(link.href);
  }

  return (
    <div ref={pageRef} onClick={openProductPhoto}>
      <CategoryPage
        breadcrumb={["Home", "Shop", "Jewellery"]}
        label="NEHA LIFESTYLE · JEWELLERY"
        headingStart="Jewellery"
        headingAccent="Collections"
        tagline={description}
        ctaLabel="SHOP JEWELLERY"
        heroImage={jewelleryHeroImage ?? null}
        sections={sections}
        hideEmpty={false}
        onAddToCart={() => setTopic("Cart")}
      />
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </div>
  );
}