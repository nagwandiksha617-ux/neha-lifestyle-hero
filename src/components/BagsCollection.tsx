import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { bagCategories } from "@/lib/categories";
import { products, type Product } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

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
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero-blush)]" aria-label="Bags collection hero">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12 lg:pb-24 lg:pt-16">
          <div className="text-center lg:text-left">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">NEHA Lifestyle</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-foreground sm:text-6xl">
              Discover Your <em className="text-wine">Perfect Bag</em>
            </h1>
            <p className="mt-4 text-base text-foreground/75 sm:text-lg">Timeless Style. Everyday Elegance.</p>
            <a
              href="#bags-collection"
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-wine px-8 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-wine-foreground ring-1 ring-gold/40 transition-colors hover:bg-rose"
            >
              Shop Bags <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm border border-gold/40" aria-hidden="true" />
            <img src={heroBag} alt="Model in a white dress carrying an elegant beige tote bag" className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-lg" />
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
                    {img && <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
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
                <img src={b.image} alt={b.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <span className="absolute inset-0 bg-[image:var(--gradient-banner-veil)]" aria-hidden="true" />
                <span className="relative font-display text-2xl text-foreground sm:text-3xl">{b.title}</span>
                <span className="relative mt-1 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-wine">
                  {b.note} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </>
            );
            const cardClass = "group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-sm p-6 ring-1 ring-gold/30 sm:min-h-64";
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
