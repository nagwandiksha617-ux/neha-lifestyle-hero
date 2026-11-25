import { organizationJsonLd, pageSeo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/categories";
import { NewArrivals } from "@/components/NewArrivals";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/hawa-mahal-hero.jpg";
import { products } from "@/lib/products";
import { CatalogueImage } from "@/components/CatalogueImage";
import { CollectionBreadcrumb } from "@/components/CollectionBreadcrumb";
import rubyRedJhumkaModel from "@/assets/earrings/ruby-red-jhumka-model.png.asset.json";
import rubyRedJhumkaDisplay from "@/assets/earrings/ruby-red-jhumka-display.jpg.asset.json";

function JaaliDivider() {
  return <div aria-hidden="true" className="jaali-divider mx-auto h-6 w-[min(90%,40rem)] text-gold/60" />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageSeo({
    path: "/",
    title: "NEHA Lifestyle — Everyday Luxury",
    description: "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(organizationJsonLd()) }],
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
          <p className="mt-6 max-w-md text-sm leading-7 lg:max-w-none lg:whitespace-nowrap text-foreground/95 sm:text-lg">
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
      <section aria-label="Why NEHA Lifestyle" className="border-y border-gold/25 bg-card">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-6 text-center md:grid-cols-4">
          {[["Designed in Jaipur", "Rooted in the Pink City"], ["Handcrafted details", "Stones, pearls & metalwork"], ["Original photos", "What you see is the piece"], ["Personal enquiries", "Ask us before you buy"]].map(([t, d]) => (
            <li key={t}><p className="font-display text-lg text-wine">{t}</p><p className="mt-1 text-xs text-foreground/65">{d}</p></li>
          ))}
        </ul>
      </section>
      <JaaliDivider />
      <section aria-labelledby="shop-by-category" className="shop-category-section bg-background px-6 py-20 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto max-w-2xl text-center">
            <CollectionBreadcrumb current="Collections" centered />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">Explore NEHA Lifestyle</p>
            <h2 id="shop-by-category" className="mt-3 font-display text-4xl font-normal text-foreground sm:text-5xl">Shop by Category</h2>
            <span className="mx-auto mt-5 block h-px w-24 bg-gold/35" aria-hidden="true" />
            <p className="mt-4 text-sm leading-7 text-foreground/60">Discover bags and jewellery designed to add elegance to every occasion.</p>
          </header>
          <ul className="shop-category-grid mx-auto mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.slug} className="min-w-0">
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="shop-category-card group flex h-full flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div className="shop-category-image grid min-h-[400px] grid-rows-[70%_30%] overflow-hidden rounded-t-full bg-card ring-1 ring-gold/40 sm:aspect-[4/5]">
                    <div className="min-h-0 overflow-hidden"><CatalogueImage src={c.image} alt={c.alt} className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]" /></div>
                    <div className="category-card-caption flex flex-col justify-center px-3 py-3 sm:px-5">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-category-foreground sm:text-3xl">{c.name}</h3>
                      <p className="mt-1 text-sm font-medium text-category-foreground">{products.filter((p) => c.slug === "bags" ? Boolean(p.bagCategorySlug) || p.categorySlug === "party-clutch-bags" : c.slug === "jewellery" ? p.categorySlug === "jewellery" || p.categorySlug === "jewellery-sets" || p.categorySlug === "earrings" : p.categorySlug === c.slug).length} products</p>
                      <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-category-foreground">Explore <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" /></span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JaaliDivider />
      <NewArrivals />
      <JaaliDivider />
      <section id="brand-story" aria-labelledby="our-story" className="bg-[image:var(--gradient-hero-blush)] px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="mx-auto aspect-[4/5] w-[min(80vw,22rem)] overflow-hidden rounded-t-full ring-1 ring-gold/50">
            <img src={heroImage} alt="Hawa Mahal facade in Jaipur" loading="lazy" className="h-full w-full object-cover object-[70%_center]" />
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">Our Story</p>
            <h2 id="our-story" className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Crafted in the <span className="italic text-wine">Pink City</span></h2>
            <p className="mt-5 leading-8 text-foreground/75">NEHA Lifestyle is a Jaipur brand. Our bags and jewellery draw on the colours, arches and craft traditions of the Pink City, made to bring a touch of everyday luxury to every occasion.</p>
          </div>
        </div>
      </section>
      <section id="reviews" aria-labelledby="reviews-heading" className="px-6 py-20 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">Testimonials</p>
        <h2 id="reviews-heading" className="mt-3 font-display text-4xl text-foreground">Loved Across India</h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-foreground/65">Customer reviews with their cities will appear here once they are shared with us.</p>
      </section>
      {/* Upcoming homepage sections — built separately */}
      {[
        "new-collection",
        "best-sellers",
        "bags",
        "jewellery",
        "newsletter",
      ].map((id) => (
        <section key={id} id={id} aria-hidden="true" />
      ))}
    </main>
  );
}
