import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import blue1 from "@/assets/travel/blue-1.jpg.asset.json";
import blue2 from "@/assets/travel/blue-2.jpg.asset.json";
import blue3 from "@/assets/travel/blue-3.jpg.asset.json";
import black1 from "@/assets/travel/black-1.jpg.asset.json";
import black2 from "@/assets/travel/black-2.jpg.asset.json";
import black3 from "@/assets/travel/black-3.jpg.asset.json";
import brown1 from "@/assets/travel/brown-1.jpg.asset.json";
import brown2 from "@/assets/travel/brown-2.jpg.asset.json";
import brown3 from "@/assets/travel/brown-3.jpg.asset.json";

import { deliveryEstimateLabel, formatPrice, travelGymBagInfo, type BagSpecs, type TravelGymBagInfo } from "@/lib/travel-gym-bags";

type Product = TravelGymBagInfo & { images: string[] };

// Travel & Gym Bags only — real product photos, grouped by colour (cover image first).
const imagesById: Record<string, string[]> = {
  "tg-blue": [blue3.url, blue1.url, blue2.url],
  "tg-black": [black1.url, black2.url, black3.url],
  "tg-brown": [brown1.url, brown2.url, brown3.url],
};
const products: Product[] = travelGymBagInfo.map((info) => ({ ...info, images: imagesById[info.id] ?? [] }));

const specRows = (s: BagSpecs): [string, string][] => [
  ["Material", s.material],
  ["Dimensions", s.dimensions],
  ["Weight", s.weight],
  ["Compartments", String(s.compartments)],
  ["Waterproof", s.waterproof],
  ["Manufacturing", s.manufacturing],
  ["Suitable for", s.suitableFor],
  ["Intended use", s.recommendedUse],
];

function Gallery({ product }: { product: Product }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + product.images.length) % product.images.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };
  const arrow = "absolute top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-wine shadow-sm backdrop-blur-sm transition-colors hover:bg-background";
  return (
    <div className="relative overflow-hidden rounded-sm bg-card shadow-sm ring-1 ring-gold/15 transition-shadow duration-500 group-hover:shadow-lg">
      <div
        ref={track}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {product.images.map((src, i) => (
          <img key={src} src={src} alt={`${product.name}, view ${i + 1} of ${product.images.length}`} loading="lazy" className="aspect-[4/5] w-full shrink-0 snap-center bg-card object-contain" />
        ))}
      </div>
      <button type="button" aria-label="Previous photo" onClick={() => go(index - 1)} className={`${arrow} left-3`}><ChevronLeft className="h-4 w-4" /></button>
      <button type="button" aria-label="Next photo" onClick={() => go(index + 1)} className={`${arrow} right-3`}><ChevronRight className="h-4 w-4" /></button>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {product.images.map((_, i) => (
          <button key={i} type="button" aria-label={`Show photo ${i + 1}`} aria-current={i === index} onClick={() => go(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-wine" : "w-1.5 bg-wine/30"}`} />
        ))}
      </div>
    </div>
  );
}

export function TravelGymBags() {
  const [open, setOpen] = useState<Product | null>(null);
  return (
    <section aria-label="Travel & Gym Bags products" className="mx-auto mt-14 w-full max-w-7xl">
      <ul className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
        {products.map((p) => (
          <li key={p.id} className="group flex flex-col">
            <Gallery product={p} />
            <div className="flex flex-1 flex-col pt-4 text-center">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">Travel & Gym Bags</p>
              <h3 className="mt-2 font-display text-lg leading-snug text-foreground sm:text-xl">{p.name}</h3>
              <p className="mt-1 text-sm text-foreground/65">Colour: {p.color}</p>
              <p className="mt-2 font-display text-xl text-wine">{formatPrice(p.price)}</p>
              <button type="button" onClick={() => setOpen(p)} className="mx-auto mt-4 inline-flex min-h-11 w-full max-w-60 items-center justify-center bg-wine px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground ring-1 ring-gold/40 transition-colors hover:bg-rose">
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(o) => { if (!o) setOpen(null); }}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto border-gold/25">
          {open && (
            <>
              <Gallery product={open} />
              <DialogTitle className="font-display text-2xl font-normal text-wine">{open.name}</DialogTitle>
              <p className="-mt-2 font-display text-xl text-foreground">{formatPrice(open.price)}</p>
              <DialogDescription className="leading-7 text-foreground/75">{open.description}</DialogDescription>
              {open.specs ? (
                <dl className="divide-y divide-gold/15 border-y border-gold/20 text-sm">
                  {specRows(open.specs).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 py-2">
                      <dt className="text-foreground/60">{label}</dt>
                      <dd className="text-right text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-foreground/60">Colour: {open.color}</p>
              )}
              <p className="text-sm text-foreground/70">{deliveryEstimateLabel}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
