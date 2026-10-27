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

export type ProductPhoto = { src: string; alt: string };

export type Product = {
  id: string;
  name: string;
  category: string; // label shown on the card
  categorySlug?: string;
  image: string | null;
  newArrival?: boolean;
  colour?: string; // shown under the name when two listings share a name
  gallery?: ProductPhoto[]; // first photo is the main image
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
  { id: "na-5", name: "Red & Green Velvet Potli Bag", category: "Potli Bags", image: null, newArrival: true },
  { id: "na-6", name: "Green Pearl Embroidered Potli Bag", category: "Potli Bags", image: null, newArrival: true },
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
];

// Category pages that list their products. Others keep their "coming soon" note.
export const listedCategorySlugs = ["party-clutch-bags"];

export const newArrivals = () => products.filter((p) => p.newArrival);

export const productsForCategoryPage = (slug: string) =>
  listedCategorySlugs.includes(slug) ? products.filter((p) => p.categorySlug === slug) : [];
