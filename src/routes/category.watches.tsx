import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "@/components/CategoryPage";
import { InformationDialog } from "@/components/SiteChrome";
import { watchCategorySections, watchHeroImage } from "@/lib/watches-category-page";

const description = "Bracelet watches with traditional kundan and stone work.";

export const Route = createFileRoute("/category/watches")({
  head: () => ({
    meta: [
      { title: "Watches — NEHA Lifestyle" },
      { name: "description", content: description },
      { property: "og:title", content: "Watches — NEHA Lifestyle" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WatchesPage,
});

function WatchesPage() {
  const [topic, setTopic] = useState<string | null>(null);
  const sections = watchCategorySections();
  const count = sections[0]?.products.length ?? 0;

  function openProductPhoto(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof HTMLImageElement)) return;
    const link = event.target.closest("article")?.querySelector<HTMLAnchorElement>("h3 a");
    if (link) window.location.assign(link.href);
  }

  return (
    <div onClick={openProductPhoto}>
      <CategoryPage
        breadcrumb={["Home", "Shop", "Watches"]}
        label="NEHA LIFESTYLE · WATCHES"
        headingStart="Time,"
        headingAccent="Worn as Jewellery"
        tagline={description}
        ctaLabel="SHOP WATCHES"
        heroImage={watchHeroImage ?? null}
        sections={sections}
        showSubIcons={false}
        showFilters={false}
        hideEmpty={false}
        onAddToCart={() => setTopic("Cart")}
        extraCard={
          count < 4 ? (
            <div className="flex aspect-[3/4] items-center justify-center border-2 border-dashed border-[#B8935A]/50 p-6 text-center text-sm uppercase tracking-[.16em] text-[#6B5B5E]">
              More styles coming soon
            </div>
          ) : undefined
        }
      >
        {/* DetailBlocks and GiftBand wait for the owner's real care/warranty text and WhatsApp number. */}
      </CategoryPage>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </div>
  );
}
