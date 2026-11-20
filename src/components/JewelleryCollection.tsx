import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { jewelleryCategories, jewelleryNewArrivals } from "@/lib/jewellery";
import jewelleryImage from "@/assets/category-jewellery.jpg";
import { CatalogueImage } from "@/components/CatalogueImage";
import { CollectionBreadcrumb } from "@/components/CollectionBreadcrumb";

const imageAlt = "Ruby-red and gold necklace set with matching earrings on champagne silk";
const picturedCategories = new Set(["jewellery-sets", "ethnic-jewellery", "wedding-occasion-jewellery"]);

export function JewelleryCollection() {
  return (
    <main className="bg-background">
      <section aria-label="Jewellery collection hero" className="relative isolate overflow-hidden border-b border-gold/20">
        <img src={jewelleryImage} alt={imageAlt} width={768} height={960} fetchPriority="high" className="absolute bottom-0 right-0 -z-10 h-[340px] w-full object-contain sm:h-[420px] lg:h-full lg:w-[55%]" />
        <div className="mx-auto flex min-h-[740px] max-w-7xl items-start px-6 pt-9 sm:min-h-[800px] sm:px-8 lg:min-h-[580px] lg:items-center lg:px-12 lg:py-16">
          <div className="w-full text-center lg:max-w-[44%] lg:text-left">
            <CollectionBreadcrumb current="Jewellery" />
            <p className="text-[0.65rem] font-semibold uppercase text-wine">NEHA Lifestyle · Jewellery Collection</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">Jewellery That Makes <em className="text-wine">Every Moment Special</em></h1>
            <span className="mx-auto mt-5 block h-px w-14 bg-gold lg:mx-0" aria-hidden="true" />
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-foreground/75 lg:mx-0">Discover Timeless Elegance, Designed to Make You Shine.</p>
            <Button asChild className="mt-6 min-h-12 rounded-sm bg-wine px-7 text-xs font-semibold uppercase text-wine-foreground ring-1 ring-gold/40 hover:bg-rose">
              <a href="#jewellery-new-arrivals">Shop Jewellery <ArrowRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="jewellery-categories-title" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase text-gold">Shop by Style</p>
          <h2 id="jewellery-categories-title" className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Shop by Category</h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {jewelleryCategories.map((category) => (
            <li key={category.slug}>
              <Link to="/category/$slug" params={{ slug: category.slug }} className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine">
                <span className="grid size-32 place-items-center overflow-hidden rounded-full bg-card ring-1 ring-gold/40 sm:size-36">
                  {picturedCategories.has(category.slug) ? (
                    <CatalogueImage src={jewelleryImage} alt={imageAlt} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
                  ) : (
                    <span className="flex flex-col items-center gap-2 text-foreground/50"><ImageIcon className="size-7" strokeWidth={1} aria-hidden="true" /><span className="text-xs">Photo awaited</span></span>
                  )}
                </span>
                <span className="mt-4 min-h-12 font-display text-lg leading-snug text-foreground group-hover:text-wine">{category.name}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-wine">Explore <ArrowUpRight className="size-3.5" aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Featured jewellery collections" className="mx-auto max-w-7xl px-6 pb-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-5">
          {[
            { title: "Everyday Elegance", href: "#jewellery-new-arrivals" },
            { title: "New Arrivals", href: "#jewellery-new-arrivals" },
            { title: "Wedding & Occasion Collection", slug: "wedding-occasion-jewellery" },
          ].map((banner) => {
            const content = <><span className="block overflow-hidden rounded-sm bg-card ring-1 ring-gold/20"><img src={jewelleryImage} alt={imageAlt} loading="lazy" className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" /></span><span className="mt-5 flex items-start justify-between gap-3 font-display text-2xl leading-snug text-foreground">{banner.title}<ArrowUpRight className="mt-1 size-4 shrink-0 text-wine" aria-hidden="true" /></span></>;
            const className = "group block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine";
            return banner.slug ? <Link key={banner.title} to="/category/$slug" params={{ slug: banner.slug }} className={className}>{content}</Link> : <a key={banner.title} href={banner.href} className={className}>{content}</a>;
          })}
        </div>
      </section>

      <section aria-labelledby="jewellery-best-sellers-title" className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 lg:px-12">
        <h2 id="jewellery-best-sellers-title" className="font-display text-3xl text-foreground sm:text-4xl">Best Sellers</h2>
        <p className="mt-5 text-sm text-foreground/60">Our best-seller selection is coming soon.</p>
      </section>

      <section id="jewellery-new-arrivals" aria-labelledby="jewellery-new-arrivals-title" className="border-t border-gold/20 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 id="jewellery-new-arrivals-title" className="text-center font-display text-3xl text-foreground sm:text-4xl">New Arrivals</h2>
          <ProductGrid products={jewelleryNewArrivals} showNewBadge className="mt-10" />
        </div>
      </section>
    </main>
  );
}