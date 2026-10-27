// Shop products. Only real product names, photos and prices belong here.
// To add a product: append an entry with its `categorySlug` (see src/lib/categories.ts)
// and its uploaded photo. It then appears automatically on that category's page
// when the category's listing is enabled below. Leave `image` null until a real photo exists.
import gold1 from "@/assets/elegant-waist-clutch/gold-1-front.jpg.asset.json";
import gold2 from "@/assets/elegant-waist-clutch/gold-2-open.jpg.asset.json";
import gold3 from "@/assets/elegant-waist-clutch/gold-3-worn.png.asset.json";
import silver1 from "@/assets/elegant-waist-clutch/silver-1-front.jpg.asset.json";
import silver2 from "@/assets/elegant-waist-clutch/silver-2-side.jpg.asset.json";
import silver3 from "@/assets/elegant-waist-clutch/silver-3-open.jpg.asset.json";
import silver4 from "@/assets/elegant-waist-clutch/silver-4-worn.png.asset.json";
import shell1 from "@/assets/silver-shell-clutch/shell-1-model.png.asset.json";
import shell2 from "@/assets/silver-shell-clutch/shell-2-open.jpg.asset.json";
import shell3 from "@/assets/silver-shell-clutch/shell-3-angled.jpg.asset.json";
import shell4 from "@/assets/silver-shell-clutch/shell-4-chain.jpg.asset.json";
import potli1 from "@/assets/silver-potli/silver-potli-1-model-pink.png.asset.json";
import potli2 from "@/assets/silver-potli/silver-potli-2-front.jpg.asset.json";
import potli3 from "@/assets/silver-potli/silver-potli-3-handle.jpg.asset.json";
import goldPotli1 from "@/assets/golden-potli/golden-potli-1-hand.png.asset.json";
import goldPotli2 from "@/assets/golden-potli/golden-potli-2-standalone.png.asset.json";
import goldPotli3 from "@/assets/golden-potli/golden-potli-3-jewellery.png.asset.json";
import crescent1 from "@/assets/golden-crescent/crescent-1-model.png.asset.json";
import crescent2 from "@/assets/golden-crescent/crescent-2-stones.jpg.asset.json";
import crescent3 from "@/assets/golden-crescent/crescent-3-side.jpg.asset.json";
import crescent4 from "@/assets/golden-crescent/crescent-4-top.jpg.asset.json";
import vp1 from "@/assets/velvet-potli/velvet-potli-1-model.png.asset.json";
import vp2 from "@/assets/velvet-potli/velvet-potli-2-green.png.asset.json";
import vp3 from "@/assets/velvet-potli/velvet-potli-3-green-maroon.jpg.asset.json";
import mp1 from "@/assets/maroon-potli/maroon-potli-1-model.png.asset.json";
import mp2 from "@/assets/maroon-potli/maroon-potli-2-white.png.asset.json";
import gtp1 from "@/assets/golden-traditional-potli/gtp-1-model.png.asset.json";
import gtp2 from "@/assets/golden-traditional-potli/gtp-2-front.jpg.asset.json";
import gtp3 from "@/assets/golden-traditional-potli/gtp-3-open.jpg.asset.json";
import gtp4 from "@/assets/golden-traditional-potli/gtp-4-front.jpg.asset.json";
import gpp1 from "@/assets/green-pearl-potli/gpp-1-light.png.asset.json";
import gpp2 from "@/assets/green-pearl-potli/gpp-2-side.png.asset.json";
import gpp3 from "@/assets/green-pearl-potli/gpp-3-back.png.asset.json";
import gpp4 from "@/assets/green-pearl-potli/gpp-4-dark.png.asset.json";

export type ProductPhoto = { src: string; alt: string };

export type Product = {
  id: string;
  name: string;
  category: string; // label shown on the card
  categorySlug?: string;
  image: string | null;
  newArrival?: boolean;
  colour?: string; // shown under the name when two listings share a name
  description?: string;
  gallery?: ProductPhoto[]; // first photo is the main image
  showLastOnCategoryPage?: boolean; // keeps existing category rows in place
};

export const products: Product[] = [
  { id: "na-1", name: "Peacock Pearl Jhumka Earrings", category: "Jewellery", categorySlug: "jewellery", image: null, newArrival: true },
  { id: "na-2", name: "Green Stone Jhumka Earrings", category: "Jewellery", categorySlug: "jewellery", image: null, newArrival: true },
  {
    id: "na-4",
    name: "Silver Shell Embellished Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: shell1.url,
    newArrival: true,
    gallery: [
      { src: shell1.url, alt: "Silver Shell Embellished Clutch held by a model" },
      { src: shell2.url, alt: "Silver Shell Embellished Clutch — open view" },
      { src: shell3.url, alt: "Silver Shell Embellished Clutch — front angled view" },
      { src: shell4.url, alt: "Silver Shell Embellished Clutch with chain handle" },
    ],
  },
  {
    id: "na-5",
    name: "Red & Green Velvet Potli Bag",
    category: "Potli Bags",
    categorySlug: "party-clutch-bags",
    showLastOnCategoryPage: true,
    image: vp1.url,
    newArrival: true,
    gallery: [
      { src: vp1.url, alt: "Green velvet potli bag with gold filigree held by a model in a traditional outfit" },
      { src: vp2.url, alt: "Green velvet potli bag — gold filigree, beaded handle and hanging beads" },
      { src: vp3.url, alt: "Green and maroon velvet potli bags shown together" },
    ],
  },
  {
    id: "na-6",
    name: "Green Pearl Embroidered Potli Bag",
    category: "Potli Bags",
    image: gpp1.url,
    newArrival: true,
    gallery: [
      { src: gpp1.url, alt: "Green pearl-embroidered potli bag on a soft light background" },
      { src: gpp2.url, alt: "Green pearl-embroidered potli bag — side view on white" },
      { src: gpp3.url, alt: "Green pearl-embroidered potli bag — back view on white" },
      { src: gpp4.url, alt: "Green pearl-embroidered potli bag on a dark luxurious background" },
    ],
  },
  {
    id: "elegant-waist-clutch-silver",
    name: "Elegant Waist Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    colour: "Silver",
    image: silver4.url,
    gallery: [
      { src: silver4.url, alt: "Elegant Waist Clutch in silver — worn at the waist" },
      { src: silver1.url, alt: "Elegant Waist Clutch in silver — front view" },
      { src: silver2.url, alt: "Elegant Waist Clutch in silver — side view" },
      { src: silver3.url, alt: "Elegant Waist Clutch in silver — open flap" },
    ],
  },
  {
    id: "elegant-waist-clutch-gold",
    name: "Elegant Waist Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    colour: "Gold",
    image: gold3.url,
    gallery: [
      { src: gold3.url, alt: "Elegant Waist Clutch in gold — worn at the waist" },
      { src: gold1.url, alt: "Elegant Waist Clutch in gold — front view" },
      { src: gold2.url, alt: "Elegant Waist Clutch in gold — open flap" },
    ],
  },
  {
    id: "golden-traditional-potli-bag",
    name: "Golden Traditional Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    description:
      "An elegant golden traditional potli bag featuring intricate gold-tone detailing, decorative beads, an ornate design, and hanging chain embellishments. Perfect for weddings, festive occasions, parties, and ethnic outfits.",
    image: gtp1.url,
    gallery: [
      { src: gtp1.url, alt: "Golden Traditional Potli Bag held by a model" },
      { src: gtp2.url, alt: "Golden Traditional Potli Bag — front view with beaded handle" },
      { src: gtp3.url, alt: "Golden Traditional Potli Bag — open view" },
      { src: gtp4.url, alt: "Golden Traditional Potli Bag — full view with hanging chains" },
    ],
  },
  {
    id: "silver-potli-bag",
    name: "Silver Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: potli1.url,
    gallery: [
      { src: potli1.url, alt: "Silver potli bag held by a model in a pink outfit" },
      { src: potli2.url, alt: "Silver potli bag — front view" },
      { src: potli3.url, alt: "Silver potli bag — full view with beaded handle" },
    ],
  },
  {
    id: "golden-traditional-designer-potli-bag",
    name: "Golden Traditional Designer Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: goldPotli1.url,
    gallery: [
      { src: goldPotli1.url, alt: "Golden Traditional Designer Potli Bag held in hand" },
      { src: goldPotli2.url, alt: "Golden Traditional Designer Potli Bag — standalone view" },
      { src: goldPotli3.url, alt: "Golden Traditional Designer Potli Bag shown with jewellery" },
    ],
  },
  {
    id: "golden-crescent-handbag",
    name: "Golden Crescent Handbag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: crescent1.url,
    gallery: [
      { src: crescent1.url, alt: "Golden Crescent Handbag held in hand by a model" },
      { src: crescent2.url, alt: "Golden Crescent Handbag — stone-studded front view" },
      { src: crescent3.url, alt: "Golden Crescent Handbag — side view" },
      { src: crescent4.url, alt: "Golden Crescent Handbag — open top view" },
    ],
  },
  {
    id: "maroon-potli-bag",
    name: "Maroon Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: mp1.url,
    gallery: [
      { src: mp1.url, alt: "Maroon velvet potli bag with gold filigree held by a model" },
      { src: mp2.url, alt: "Maroon velvet potli bag on a white background" },
    ],
  },
];

// Category pages that list their products. Others keep their "coming soon" note.
export const listedCategorySlugs = ["party-clutch-bags"];

export const newArrivals = () => products.filter((p) => p.newArrival);

export const productsForCategoryPage = (slug: string) =>
  listedCategorySlugs.includes(slug)
    ? products
        .filter((p) => p.categorySlug === slug)
        .sort((a, b) => Number(!!a.showLastOnCategoryPage) - Number(!!b.showLastOnCategoryPage))
    : [];
