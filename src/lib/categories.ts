import bags from "@/assets/category-bags.jpg";
import jewellery from "@/assets/category-jewellery.jpg";
import potli from "@/assets/category-potli.jpg";
import { jewelleryCategories } from "@/lib/jewellery";
import { watchCategories } from "@/lib/watches";

// Homepage "Shop by Category" cards.
export const categories = [
  { slug: "bags", name: "Bags", description: "Elegant bags designed for everyday style.", image: bags, alt: "Cream and gold chain-strap handbag on a polished marble vanity with white flowers" },
  { slug: "jewellery", name: "Jewellery", description: "Timeless pieces made to elevate your look.", image: jewellery, alt: "Gold and ruby-red beaded necklace set with matching earrings on champagne silk" },
  { slug: "party-clutch-bags", name: "Party & Clutch Bags", description: "Statement pieces for celebrations and special occasions.", image: potli, alt: "Golden embroidered potli bag with pearl trim and beaded fringe on champagne satin" },
];

// Bag types shown in the header's Bags menu and on the Bags page. Each has its own listing page.
export const bagCategories = [
  { slug: "tote-bags", name: "Tote Bags", description: "Discover our collection of tote bags." },
  { slug: "handbags", name: "Handbags", description: "Discover our collection of handbags." },
  { slug: "clutch-bags", name: "Clutch Bags", description: "Discover our collection of clutch bags." },
  { slug: "potli-bags", name: "Potli Bags", description: "Discover our collection of potli bags." },
];

export const findCategory = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? bagCategories.find((c) => c.slug === slug) ?? jewelleryCategories.find((c) => c.slug === slug) ?? watchCategories.find((c) => c.slug === slug);
