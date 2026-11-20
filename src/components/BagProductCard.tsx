import { useState } from "react";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogueImage } from "@/components/CatalogueImage";
import type { Product } from "@/lib/products";
import { productCardPhoto } from "@/lib/product-card-photos";

export const bagCardPhotos = (p: Product) => {
  const main = productCardPhoto(p) ?? (p.image ? { src: p.image, alt: p.name } : undefined);
  const hover = p.gallery?.find((g) => g.src !== main?.src);
  return { main, hover };
};

export function BagProductCard({ product: p, label, onCart }: { product: Product; label: string; onCart: () => void }) {
  const [saved, setSaved] = useState(false);
  const { main, hover } = bagCardPhotos(p);
  if (!main) return null;
  const name = p.colour ? `${p.name} (${p.colour})` : p.name;
  return (
    <li className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-sm bg-secondary ring-1 ring-gold/20">
        <CatalogueImage src={main.src} alt={main.alt} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
        {hover && (
          <img src={hover.src} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
        <Button variant="ghost" size="icon" type="button" onClick={() => setSaved((s) => !s)} aria-pressed={saved}
          aria-label={saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          className="absolute right-3 top-[18%] h-9 w-9 rounded-full bg-background/85 text-wine shadow-sm hover:bg-background">
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} strokeWidth={1.5} />
        </Button>
      </div>
      <div className="flex flex-1 flex-col pt-4 text-center">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">{label}</p>
        <h3 className="mt-2 line-clamp-2 h-[3.25rem] font-display text-lg leading-[1.625rem] text-foreground sm:text-xl">{p.name}</h3>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <Button type="button" onClick={onCart} className="min-h-11 flex-1 bg-wine px-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-wine-foreground ring-1 ring-gold/40 hover:bg-rose">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> Add to Cart
          </Button>
          <Button type="button" variant="outline" size="icon" disabled title="WhatsApp contact awaiting confirmation" aria-label={`Enquire about ${name} on WhatsApp`} className="h-11 w-11 shrink-0 border-rose/30 text-wine disabled:opacity-80">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </li>
  );
}
