import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { bagCategories } from "@/lib/categories";
import { products, type Product } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";
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

export function BagsCollection() {
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
                <Link to="/category/$slug" params={{ slug: c.slug }} className="group flex flex-col items-center text-center">
                  <span className="relative block h-32 w-32 overflow-hidden rounded-full bg-card ring-1 ring-gold/40 transition-shadow duration-500 group-hover:shadow-lg sm:h-40 sm:w-40 lg:h-44 lg:w-44">
                    <CatalogueImage src={img?.src ?? null} alt={img?.alt ?? c.name} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
                  </span>
                  <span className="mt-4 font-display text-lg text-foreground transition-colors group-hover:text-wine sm:text-xl">{c.name}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-wine">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
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

      {/* 4. Best sellers — existing bag products, existing data */}
      <section id="bags-collection" aria-labelledby="bag-products-heading" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">Most Loved</p>
          <h2 id="bag-products-heading" className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Best Sellers</h2>
        </div>
        <ProductGrid products={bagCollection} className="mt-12" />
      </section>
    </main>
  );
}
