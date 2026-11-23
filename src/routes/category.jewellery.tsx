import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "@/components/CategoryPage";
import { InformationDialog } from "@/components/SiteChrome";
import { jewelleryCategorySections, jewelleryHeroImage } from "@/lib/jewellery-category-page";

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

  // Delegate photo clicks on this page only; the original template stays untouched.
  function openProductPhoto(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof HTMLImageElement)) return;
    const link = event.target.closest("article")?.querySelector<HTMLAnchorElement>("h3 a");
    if (link) window.location.assign(link.href);
  }

  return (
    <div onClick={openProductPhoto}>
      <CategoryPage
        breadcrumb={["Home", "Shop", "Jewellery"]}
        label="NEHA LIFESTYLE · JEWELLERY"
        headingStart="Jewellery"
        headingAccent="Collections"
        tagline={description}
        ctaLabel="SHOP JEWELLERY"
        heroImage={jewelleryHeroImage ?? null}
        sections={jewelleryCategorySections()}
        hideEmpty={false}
        onAddToCart={() => setTopic("Cart")}
      />
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </div>
  );
}