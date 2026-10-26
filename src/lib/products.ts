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

export type ProductPhoto = { src: string; alt: string };
// A colour option with its own photos. The first photo is the main (front-view) image.
export type ProductColour = { name: string; photos: ProductPhoto[] };

export type Product = {
  id: string;
  name: string;
  category: string; // label shown on the card
  categorySlug?: string;
  image: string | null;
  newArrival?: boolean;
  colours?: ProductColour[];
};

const elegantWaistClutchColours: ProductColour[] = [
  {
    name: "Gold",
    photos: [
      { src: gold1.url, alt: "Elegant Waist Clutch in gold — front view" },
      { src: gold2.url, alt: "Elegant Waist Clutch in gold — open flap" },
      { src: gold3.url, alt: "Elegant Waist Clutch in gold — worn at the waist" },
    ],
  },
  {
    name: "Silver",
    photos: [
      { src: silver1.url, alt: "Elegant Waist Clutch in silver — front view" },
      { src: silver2.url, alt: "Elegant Waist Clutch in silver — side view" },
      { src: silver3.url, alt: "Elegant Waist Clutch in silver — open flap" },
      { src: silver4.url, alt: "Elegant Waist Clutch in silver — worn at the waist" },
    ],
  },
];

export const products: Product[] = [
  { id: "na-1", name: "Peacock Pearl Jhumka Earrings", category: "Jewellery", categorySlug: "jewellery", image: null, newArrival: true },
  { id: "na-2", name: "Green Stone Jhumka Earrings", category: "Jewellery", categorySlug: "jewellery", image: null, newArrival: true },
  { id: "na-4", name: "Silver Shell Embellished Clutch", category: "Party & Clutch Bags", categorySlug: "party-clutch-bags", image: null, newArrival: true },
  { id: "na-5", name: "Red & Green Velvet Potli Bag", category: "Potli Bags", image: null, newArrival: true },
  { id: "na-6", name: "Green Pearl Embroidered Potli Bag", category: "Potli Bags", image: null, newArrival: true },
  {
    id: "elegant-waist-clutch",
    name: "Elegant Waist Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: elegantWaistClutchColours[0].photos[0].src,
    colours: elegantWaistClutchColours,
  },
];

// Category pages that list their products. Others keep their "coming soon" note.
export const listedCategorySlugs = ["party-clutch-bags"];

export const newArrivals = () => products.filter((p) => p.newArrival);

export const productsForCategoryPage = (slug: string) =>
  listedCategorySlugs.includes(slug) ? products.filter((p) => p.categorySlug === slug) : [];
