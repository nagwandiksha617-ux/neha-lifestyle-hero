import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/categories";
import { NewArrivals } from "@/components/NewArrivals";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/hawa-mahal-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEHA Lifestyle — Everyday Luxury" },
      {
        name: "description",
        content: "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
      },
      { property: "og:title", content: "NEHA Lifestyle — Everyday Luxury" },
      {
        property: "og:description",
        content: "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <main className="bg-background">
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden">
        <img
          src={heroImage}
          alt="Hawa Mahal in Jaipur at golden hour"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center] blur-[0.5px] scale-[1.02]"
        />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,var(--hero-veil-strong)_0%,var(--hero-veil)_45%,var(--hero-veil-soft)_100%)]" />

        <div className="mx-auto flex w-[min(92%,60rem)] flex-1 flex-col items-center justify-center py-10 text-center sm:py-14">
          <span aria-hidden="true" className="hidden sm:block sm:h-[6.6rem]" />
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.8rem)] font-normal leading-[1.02] text-foreground sm:mt-8">
            Where Elegance Meets
            <br />
            <span className="italic text-rose">Everyday Luxury</span>
          </h1>
          <span className="mt-6 h-px w-16 bg-gold" aria-hidden="true" />
          <p className="mt-6 max-w-md text-sm leading-7 text-foreground/95 sm:text-lg">
            Discover Bags &amp; Jewellery Made to Make You Shine
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#shop-by-category"
              className="inline-flex min-h-12 items-center gap-2 bg-wine px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground shadow-[0_10px_24px_-12px_var(--wine)] ring-1 ring-gold/40 transition-colors hover:bg-rose"
            >
              Shop Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#new-arrivals"
              className="inline-flex min-h-12 items-center border border-foreground/30 bg-background/60 px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              Explore Collection
            </a>
          </div>
        </div>

      </section>
      <section aria-labelledby="shop-by-category" className="shop-category-section bg-background px-6 py-20 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">Explore NEHA Lifestyle</p>
            <h2 id="shop-by-category" className="mt-3 font-display text-4xl font-normal text-foreground sm:text-5xl">Shop by Category</h2>
            <span className="mx-auto mt-5 block h-px w-24 bg-gold/35" aria-hidden="true" />
            <p className="mt-4 text-sm leading-7 text-foreground/60">Discover bags and jewellery designed to add elegance to every occasion.</p>
          </header>
          <ul className="shop-category-grid mx-auto mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug} className="min-w-0">
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="shop-category-card group flex h-full flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div className="shop-category-image relative aspect-[4/5] overflow-hidden rounded-sm bg-card">
                    <img src={c.image} alt={c.alt} width={768} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="shop-category-name mt-4 font-display text-lg leading-snug text-foreground transition-colors group-hover:text-rose">{c.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NewArrivals />
      {/* Upcoming homepage sections — built separately */}
      {[
        "new-collection",
        "best-sellers",
        "bags",
        "jewellery",
        "brand-story",
        "reviews",
        "newsletter",
      ].map((id) => (
        <section key={id} id={id} aria-hidden="true" />
      ))}
    </main>
  );
}
