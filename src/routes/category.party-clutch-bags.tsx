import { pageSeo } from "@/lib/seo";
import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "@/components/CategoryPage";
import { InformationDialog } from "@/components/SiteChrome";
import { partyClutchCategorySections, partyClutchHeroImage, partyClutchHeroAlt } from "@/lib/party-clutch-category-page";

const description = "Potlis, clutches and waist clutches for weddings, sangeets and festive evenings.";

export const Route = createFileRoute("/category/party-clutch-bags")({
  head: () => pageSeo({ path: "/category/party-clutch-bags", title: "Party & Clutch Bags — NEHA Lifestyle", description }),
  component: PartyClutchBagsPage,
});

function PartyClutchBagsPage() {
  const [topic, setTopic] = useState<string | null>(null);
  const sections = partyClutchCategorySections();

  // Delegate photo clicks on this page only; the original template stays untouched.
  function openProductPhoto(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof HTMLImageElement)) return;
    const link = event.target.closest("article")?.querySelector<HTMLAnchorElement>("h3 a");
    if (link) window.location.assign(link.href);
  }

  return (
    <div onClick={openProductPhoto}>
      <CategoryPage
        breadcrumb={["Home", "Shop", "Party & Clutch Bags"]}
        label="NEHA LIFESTYLE · PARTY & CLUTCH BAGS"
        headingStart="Made for"
        headingAccent="Celebrations"
        tagline={description}
        ctaLabel="SHOP CLUTCHES"
        heroImage={partyClutchHeroImage ?? null}
        heroAlt={partyClutchHeroAlt ?? ""}
        sections={sections}
        hideEmpty={false}
        onAddToCart={() => setTopic("Cart")}
      />
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </div>
  );
}
