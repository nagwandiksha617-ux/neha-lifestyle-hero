import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/categories";
import { NewArrivals } from "@/components/NewArrivals";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/hawa-mahal-hero.jpg";
import { products } from "@/lib/products";
import { CatalogueImage } from "@/components/CatalogueImage";
import rubyRedJhumkaModel from "@/assets/earrings/ruby-red-jhumka-model.png.asset.json";
import rubyRedJhumkaDisplay from "@/assets/earrings/ruby-red-jhumka-display.jpg.asset.json";

function JaaliDivider() {
  return <div aria-hidden="true" className="jaali-divider mx-auto h-6 w-[min(90%,40rem)] text-gold/60" />;
}

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
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Hawa Mahal in Jaipur, the Pink City"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center] saturate-[1.15] contrast-[1.05]"
        />
        <div className="absolute inset-0 -z-20 bg-[image:var(--gradient-hero-text-mobile)] lg:bg-[image:var(--gradient-hero-text)]" />
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-[min(92%,80rem)] items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-xl text-left">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-deep">Designed in Jaipur · The Pink City</p>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-normal leading-[1.02] text-foreground">
              Where Elegance Meets <span className="italic text-wine">Everyday Luxury</span>
            </h1>
            <p className="mt-5 text-base text-foreground/85 sm:text-lg">Handcrafted bags &amp; jewellery, inspired by the Pink City</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/category/$slug" params={{ slug: "jewellery" }} className="inline-flex min-h-12 items-center gap-2 bg-wine px-7 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground transition-colors hover:bg-rose">
                Shop Jewellery <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/category/$slug" params={{ slug: "bags" }} className="inline-flex min-h-12 items-center border border-wine bg-card px-7 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine transition-colors hover:bg-background">
                Shop Bags
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-[min(78vw,22rem)] lg:mr-0 lg:w-[24rem]">
            <div className="aspect-[3/4] overflow-hidden rounded-t-full border-4 border-card shadow-2xl ring-1 ring-gold/60">
              <CatalogueImage src={rubyRedJhumkaModel.url} alt="Model wearing NEHA Lifestyle Ruby Red Oxidised Silver Long Jhumka Earrings" loading="eager" className="h-full w-full object-cover" />
            </div>
            <Link to="/category/$slug" params={{ slug: "earrings" }} className="absolute -bottom-6 -left-6 flex w-60 items-center gap-3 bg-card p-3 shadow-xl ring-1 ring-gold/30 sm:-left-12">
              <span className="block h-16 w-14 shrink-0 overflow-hidden rounded-t-full"><CatalogueImage src={rubyRedJhumkaDisplay.url} alt="Ruby Red Oxidised Silver Long Jhumka Earrings" className="h-full w-full object-cover" /></span>
              <span className="min-w-0">
                <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">Featured</span>
                <span className="mt-1 block font-display text-base leading-tight text-foreground">Ruby Red Oxidised Silver Long Jhumka</span>
              </span>
            </Link>
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
            <nav aria-label="Category breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-xs text-foreground/60">
              <Link to="/" className="hover:text-rose">Home</Link><span aria-hidden="true">/</span><span>Collections</span>
            </nav>
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
                  <div className="shop-category-image relative aspect-[4/5] overflow-hidden rounded-t-full bg-card ring-1 ring-gold/40">
                    <CatalogueImage src={c.image} alt={c.alt} className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]" />
                    <div className="category-card-caption absolute inset-x-0 bottom-0 px-4 pb-5 pt-16 sm:px-5 sm:pb-6">
                      <h3 className="font-display text-xl leading-tight text-category-foreground sm:text-2xl">{c.name}</h3>
                      <p className="mt-2 text-xs text-category-foreground/85">{products.filter((p) => c.slug === "bags" ? Boolean(p.bagCategorySlug) || p.categorySlug === "party-clutch-bags" : c.slug === "jewellery" ? p.categorySlug === "jewellery" || p.categorySlug === "jewellery-sets" || p.categorySlug === "earrings" : p.categorySlug === c.slug).length} products</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-category-foreground">Explore <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" /></span>
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
