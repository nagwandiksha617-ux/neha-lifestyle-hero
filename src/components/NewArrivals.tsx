import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homepageArrivals } from "@/lib/homepage-arrivals";
import { CatalogueImage } from "@/components/CatalogueImage";
import { EnquiryButton } from "@/components/EnquiryButton";

export function NewArrivals() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const toggleWishlist = (id: string) => setWishlist((previous) => {
    const next = new Set(previous);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  return (
    <section id="new-arrivals" aria-labelledby="new-arrivals-title" className="border-t border-gold/20 bg-background px-6 py-20 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">TRENDING NOW</p>
          <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-6 sm:gap-10">
            <h2 id="new-arrivals-title" className="font-display text-4xl font-normal text-foreground sm:text-5xl">New Arrivals</h2>
            <span className="h-px bg-gold/35" aria-hidden="true" />
          </div>
        </header>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-5">
          {homepageArrivals.map((product) => {
            const saved = wishlist.has(product.id);
            return (
              <li key={product.id} className="group flex min-w-0 flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-card">
                  <Link to="/category/$slug" params={{ slug: product.categorySlug ?? "bags" }} aria-label={`View ${product.name}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-inset">
                    <CatalogueImage src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
                  </Link>
                  <Button type="button" variant="ghost" size="icon" onClick={() => toggleWishlist(product.id)} aria-pressed={saved} aria-label={`${saved ? "Remove" : "Add"} ${product.name} ${saved ? "from" : "to"} wishlist`} title={saved ? "Remove from wishlist" : "Add to wishlist"} className="absolute right-2 top-2 rounded-full bg-background/90 text-wine hover:bg-background">
                    <Heart fill={saved ? "currentColor" : "none"} strokeWidth={1.7} aria-hidden="true" />
                  </Button>
                </div>
                <Link to="/category/$slug" params={{ slug: product.categorySlug ?? "bags" }} className="mt-4 flex-1 font-display text-xl leading-snug text-foreground hover:text-rose sm:text-2xl">{product.name}</Link>
                <EnquiryButton />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
