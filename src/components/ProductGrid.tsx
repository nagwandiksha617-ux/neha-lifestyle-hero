import { useState } from "react";
import { Heart, ImageIcon, ShoppingBag } from "lucide-react";
import { InformationDialog } from "@/components/SiteChrome";
import { ProductGallery } from "@/components/ProductGallery";
import type { Product } from "@/lib/products";

export function ProductGrid({ products, showNewBadge = false, className = "mt-14" }: { products: Product[]; showNewBadge?: boolean; className?: string }) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [topic, setTopic] = useState<string | null>(null);
  const toggle = (id: string) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      <ul className={`${className} grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14`}>
        {products.map((p) => {
          const saved = wishlist.has(p.id);
          return (
            <li key={p.id} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-sm bg-card shadow-sm ring-1 ring-gold/15 transition-shadow duration-500 group-hover:shadow-lg">
                {p.colours ? (
                  <ProductGallery name={p.name} colours={p.colours} />
                ) : p.image ? (
                  <img src={p.image} alt={p.name} width={768} height={960} loading="lazy" className="aspect-[4/5] w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                ) : (
                  <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,var(--hero-veil-strong),var(--hero-veil))] text-foreground/45">
                    <ImageIcon className="h-8 w-8" strokeWidth={1} aria-hidden="true" />
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em]">Photo awaited</span>
                  </div>
                )}
                {showNewBadge && <span className="absolute left-3 top-3 bg-wine px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground">New</span>}
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={saved}
                  aria-label={saved ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-wine shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-1 flex-col pt-4 text-center">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">{p.category}</p>
                <h3 className="mt-2 font-display min-h-[3.5rem] text-lg leading-snug text-foreground sm:text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-foreground/60">Price to be updated</p>
                <button
                  type="button"
                  onClick={() => setTopic("Cart")}
                  className="mx-auto mt-4 inline-flex min-h-11 w-full max-w-60 items-center justify-center gap-2 bg-wine px-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground ring-1 ring-gold/40 transition-colors hover:bg-rose sm:text-[0.68rem]"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> Add to Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </>
  );
}
