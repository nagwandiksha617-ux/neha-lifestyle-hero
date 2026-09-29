import { useState } from "react";
import { Heart, ImageIcon, ShoppingBag } from "lucide-react";
import clutch from "@/assets/neha-golden-clutch.png";

// Temporary placeholders — replace with real product names, prices and photos.
const products = [
  { id: "na-1", name: "Golden Ornate Clutch", category: "Party & Clutch", image: clutch as string | null },
  { id: "na-2", name: "Product Name", category: "Bags", image: null },
  { id: "na-3", name: "Product Name", category: "Jewellery", image: null },
  { id: "na-4", name: "Product Name", category: "Bags", image: null },
  { id: "na-5", name: "Product Name", category: "Jewellery", image: null },
  { id: "na-6", name: "Product Name", category: "Travel & Gym", image: null },
];

export function NewArrivals() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section id="new-arrivals" aria-labelledby="new-arrivals-title" className="border-t border-gold/20 bg-background px-6 py-20 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">Just In</p>
          <h2 id="new-arrivals-title" className="mt-4 font-display text-4xl font-normal text-foreground sm:text-5xl">New Arrivals</h2>
          <span className="mx-auto mt-5 block h-px w-14 bg-gold" aria-hidden="true" />
          <p className="mt-5 text-sm leading-7 text-foreground/75 sm:text-base">Discover the latest pieces designed to elevate your everyday style.</p>
        </header>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {products.map((p) => {
            const saved = wishlist.has(p.id);
            return (
              <li key={p.id} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-sm bg-card shadow-sm ring-1 ring-gold/15 transition-shadow duration-500 group-hover:shadow-lg">
                  {p.image ? (
                    <img src={p.image} alt={p.name} width={768} height={960} loading="lazy" className="aspect-[4/5] w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  ) : (
                    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,var(--hero-veil-strong),var(--hero-veil))] text-foreground/45">
                      <ImageIcon className="h-8 w-8" strokeWidth={1} aria-hidden="true" />
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em]">Product photo coming soon</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 bg-wine px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground">New</span>
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
                  <h3 className="mt-2 font-display text-lg text-foreground sm:text-xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-foreground/60">₹ Price coming soon</p>
                  <button
                    type="button"
                    className="mx-auto mt-4 inline-flex min-h-11 w-full max-w-60 items-center justify-center gap-2 bg-wine px-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground ring-1 ring-gold/40 transition-colors hover:bg-rose sm:text-[0.68rem]"
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> Add to Cart
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
