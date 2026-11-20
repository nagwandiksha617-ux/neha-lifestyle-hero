import { products } from "./products";
import crescent from "@/assets/new-arrivals/golden-crescent.png.asset.json";
import peacock from "@/assets/new-arrivals/peacock-earrings.png.asset.json";
import greenRed from "@/assets/new-arrivals/green-red-earrings.png.asset.json";
import emerald from "@/assets/new-arrivals/emerald-earrings.png.asset.json";
import rubyWatch from "@/assets/new-arrivals/ruby-watch.png.asset.json";
import templeWatch from "@/assets/new-arrivals/temple-watch.png.asset.json";
import kundanWatch from "@/assets/new-arrivals/kundan-watch.png.asset.json";
import navy from "@/assets/new-arrivals/navy-necklace.png.asset.json";
import geometric from "@/assets/new-arrivals/geometric-necklace.png.asset.json";
import medallion from "@/assets/new-arrivals/medallion-necklace.png.asset.json";

// Homepage-only photo selection: never overwrite catalogue images or galleries.
const selection = [
  ["golden-crescent-handbag", crescent.url],
  ["peacock-design-pink-green-gold-jhumka-earrings", peacock.url],
  ["traditional-green-red-stone-gold-pearl-long-earrings", greenRed.url],
  ["emerald-green-stone-gold-pearl-jhumka-earrings", emerald.url],
  ["royal-ruby-green-stone-gold-bracelet-watch", rubyWatch.url],
  ["antique-gold-temple-design-bracelet-watch", templeWatch.url],
  ["traditional-gold-kundan-floral-bracelet-watch", kundanWatch.url],
  ["navy-blue-floral-statement-necklace-set", navy.url],
  ["multicolor-geometric-pendant-necklace-set", geometric.url],
  ["golden-green-medallion-necklace-set", medallion.url],
] as const;

export const homepageArrivals = selection.flatMap(([id, image]) => {
  const product = products.find((item) => item.id === id);
  return product ? [{ ...product, image }] : [];
});