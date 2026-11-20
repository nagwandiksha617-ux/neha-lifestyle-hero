import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { bagCategories } from "@/lib/categories";
import { products, type Product } from "@/lib/products";
import { BagProductCard, bagCardPhotos } from "@/components/BagProductCard";
import { InformationDialog } from "@/components/SiteChrome";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CatalogueImage } from "@/components/CatalogueImage";
import { CollectionBreadcrumb } from "@/components/CollectionBreadcrumb";

// Hero visual and section imagery reuse existing uploaded product photos only.
import heroBag from "@/assets/beige-black-tote/bbt-d4-model.png";
import toteCard from "@/assets/cream-beige-tote/cbt-1-lifestyle.png";
import handbagCard from "@/assets/brown-checkered-crossbody/bcc-1-model.png";
import clutchCard from "@/assets/silver-shell-clutch/shell-1-model.png";
import potliCard from "@/assets/golden-traditional-potli/gtp-1-model.png";
import bannerEveryday from "@/assets/olive-beige-shoulder/obs-1-model.png";
import bannerNew from "@/assets/green-pearl-potli/gpp-4-dark.png";
import bannerParty from "@/assets/golden-crescent/crescent-1-cream.png";

const categoryCardImages: Record<string, { src: string; alt: string }> = {
  "tote-bags": { src: toteCard, alt: "Cream beige tote bag with gold chain handles styled on satin" },
  handbags: { src: handbagCard, alt: "Brown checkered crossbody bag with mini pouch worn by a model" },
  "clutch-bags": { src: clutchCard, alt: "Silver Shell Embellished Clutch held by a model" },
  "potli-bags": { src: potliCard, alt: "Golden Traditional Potli Bag held by a model" },
};

const banners = [
  { title: "Everyday Elegance", note: "Bags made for daily grace", slug: "handbags", image: bannerEveryday, alt: "Olive green and beige printed shoulder bag worn by a model" },
  { title: "New Arrivals", note: "Fresh pieces just landed", slug: null, hash: "/#new-arrivals", image: bannerNew, alt: "Green pearl-embroidered potli bag on a dark luxurious background" },
  { title: "Party & Occasion Bags", note: "Statement pieces for celebrations", slug: "party-clutch-bags", image: bannerParty, alt: "Golden Crescent Handbag held by a model in a cream outfit" },
];

// Every existing bag product: items under a Bags-menu category plus the Party & Clutch Bags pieces.
export const bagCollection: Product[] = products.filter(
  (p) => p.bagCategorySlug !== undefined || p.categorySlug === "party-clutch-bags",
);

const sectionLines: Record<string, string> = {
  "tote-bags": "Roomy, structured carry-alls for every day.",
  handbags: "Polished shoulder and crossbody styles.",
  "clutch-bags": "Compact statement pieces for evenings out.",
  "potli-bags": "Traditional drawstring potlis for festive moments.",
};
const filters = [
  { slug: "all", label: "All" },
  { slug: "tote-bags", label: "Tote" },
  { slug: "handbags", label: "Handbags" },
  { slug: "clutch-bags", label: "Clutch" },
  { slug: "potli-bags", label: "Potli" },
];
type SortKey = "featured" | "az" | "za";

export function BagsCollection() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [topic, setTopic] = useState<string | null>(null);
  const sections = useMemo(() => bagCategories.map((c) => {
    // Catalogue order is kept for "Featured"; no products are marked as best sellers yet.
    const items = products.filter((p) => p.bagCategorySlug === c.slug && bagCardPhotos(p).main);
    if (sort !== "featured") items.sort((a, b) => a.name.localeCompare(b.name) * (sort === "az" ? 1 : -1));
    return { ...c, items };
  }), [sort]);
  const goTo = (slug: string) => {
    setFilter(slug);
    requestAnimationFrame(() => document.getElementById(slug === "all" ? "bags-collection" : `section-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <main className="bg-background">
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden border-b border-gold/20 bg-background" aria-label="Bags collection hero">
        <img src={heroBag} alt="Model in a white dress carrying the Beige & Black Printed Tote Bag" width={768} height={1152} fetchPriority="high" className="absolute bottom-0 right-0 -z-10 h-[380px] w-full object-contain sm:h-[440px] lg:h-full lg:w-3/5" />
        <div className="mx-auto flex min-h-[700px] max-w-7xl items-start px-6 pt-9 sm:min-h-[750px] sm:px-8 lg:min-h-[560px] lg:items-center lg:px-12 lg:py-16">
          <div className="w-full text-center lg:max-w-[44%] lg:text-left">
            <CollectionBreadcrumb current="Bags" />
            <p className="text-[0.65rem] font-semibold uppercase text-wine">NEHA Lifestyle · Bags Collection</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Discover Your <em className="block text-wine">Perfect Bag</em>
            </h1>
            <span className="mx-auto mt-5 block h-px w-14 bg-gold lg:mx-0" aria-hidden="true" />
            <p className="mt-4 text-sm text-foreground/75 sm:text-base">Timeless Style. Everyday Elegance.</p>
            <Button asChild className="mt-6 min-h-12 rounded-sm bg-wine px-8 text-xs font-semibold uppercase text-wine-foreground ring-1 ring-gold/40 hover:bg-rose">
              <a href="#bags-collection">Shop Bags <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Bag categories */}
      <section aria-labelledby="bag-categories-heading" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">Shop by Style</p>
          <h2 id="bag-categories-heading" className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Bag Categories</h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {bagCategories.map((c) => {
            const img = categoryCardImages[c.slug];
            return (
              <li key={c.slug}>
                <a href={`#section-${c.slug}`} onClick={(e) => { e.preventDefault(); setFilter("all"); requestAnimationFrame(() => document.getElementById(`section-${c.slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" })); }} className="group flex flex-col items-center text-center">
                  <span className="relative block h-32 w-32 overflow-hidden rounded-full bg-card ring-1 ring-gold/40 transition-shadow duration-500 group-hover:shadow-lg sm:h-40 sm:w-40 lg:h-44 lg:w-44">
                    <CatalogueImage src={img?.src ?? null} alt={img?.alt ?? c.name} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
                  </span>
                  <span className="mt-4 font-display text-lg text-foreground transition-colors group-hover:text-wine sm:text-xl">{c.name}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-wine">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 3. Featured collection banners */}
      <section aria-labelledby="bag-banners-heading" className="mx-auto max-w-7xl px-6 pb-4 sm:px-8 lg:px-12">
        <h2 id="bag-banners-heading" className="sr-only">Featured collections</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {banners.map((b) => {
            const inner = (
              <>
                <span className="block overflow-hidden rounded-sm bg-card ring-1 ring-gold/20">
                  <img src={b.image} alt={b.alt} loading="lazy" className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
                </span>
                <span className="mt-5 block font-display text-2xl text-foreground sm:text-3xl">{b.title}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-xs text-wine">
                  {b.note} <ArrowUpRight className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </>
            );
            const cardClass = "group flex min-w-0 flex-col pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine";
            return b.slug ? (
              <Link key={b.title} to="/category/$slug" params={{ slug: b.slug }} className={cardClass}>{inner}</Link>
            ) : (
              <a key={b.title} href={b.hash} className={cardClass}>{inner}</a>
            );
          })}
        </div>
      </section>

      {/* 4. Bags by type, with sticky filter bar */}
      <section id="bags-collection" aria-labelledby="bag-products-heading" className="pb-20 pt-12">
        <h2 id="bag-products-heading" className="sr-only">Shop bags by type</h2>
        <div className="sticky top-[79px] z-30 border-y border-gold/20 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-8 lg:px-12">
            <div role="group" aria-label="Filter bags" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f.slug} type="button" onClick={() => goTo(f.slug)} aria-pressed={filter === f.slug}
                  className={`min-h-9 rounded-full border px-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${filter === f.slug ? "border-wine bg-wine text-wine-foreground" : "border-gold/40 text-wine hover:bg-wine/5"}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger aria-label="Sort bags" className="h-9 w-44 border-gold/40 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Sort: Featured</SelectItem>
                <SelectItem value="az">Name: A to Z</SelectItem>
                <SelectItem value="za">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {sections.filter((sec) => filter === "all" || sec.slug === filter).map((sec) => (
            <section key={sec.slug} id={`section-${sec.slug}`} aria-labelledby={`h-${sec.slug}`} className="scroll-mt-40 pt-14">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-gold/20 pb-4">
                <div>
                  <h3 id={`h-${sec.slug}`} className="font-display text-3xl text-foreground sm:text-4xl">{sec.name}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{sectionLines[sec.slug]}</p>
                </div>
                <Link to="/category/$slug" params={{ slug: sec.slug }} className="inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-wine hover:text-rose">
                  View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {sec.items.length ? (
                <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
                  {sec.items.map((p) => <BagProductCard key={p.id} product={p} label={sec.name} onCart={() => setTopic("Cart")} />)}
                </ul>
              ) : <p className="mt-8 text-sm text-foreground/60">Our collection is coming soon.</p>}
            </section>
          ))}
        </div>
      </section>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </main>
  );
}
