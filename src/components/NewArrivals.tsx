import { ProductGrid } from "@/components/ProductGrid";
import { newArrivals } from "@/lib/products";

export function NewArrivals() {
  return (
    <section id="new-arrivals" aria-labelledby="new-arrivals-title" className="border-t border-gold/20 bg-background px-6 py-20 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">Just In</p>
          <h2 id="new-arrivals-title" className="mt-4 font-display text-4xl font-normal text-foreground sm:text-5xl">New Arrivals</h2>
          <span className="mx-auto mt-5 block h-px w-14 bg-gold" aria-hidden="true" />
          <p className="mt-5 text-sm leading-7 text-foreground/75 sm:text-base">Discover the latest pieces designed to elevate your everyday style.</p>
        </header>
        <ProductGrid products={newArrivals()} showNewBadge />
      </div>
    </section>
  );
}
