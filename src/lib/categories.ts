import bags from "@/assets/category-bags.jpg";
import jewellery from "@/assets/category-jewellery.jpg";
import party from "@/assets/category-party.jpg";

// Homepage "Shop by Category" cards.
export const categories = [
  { slug: "bags", name: "Bags", description: "Elegant bags designed for everyday style.", image: bags, alt: "Blush leather handbag resting on an ivory marble ledge in soft window light" },
  { slug: "jewellery", name: "Jewellery", description: "Timeless pieces made to elevate your look.", image: jewellery, alt: "Gold jhumka earrings and a delicate necklace on ivory silk" },
  { slug: "party-clutch-bags", name: "Party & Clutch Bags", description: "Statement pieces for celebrations and special occasions.", image: party, alt: "Embellished gold evening clutch on burgundy velvet" },
];

// Bag types shown in the header's Bags menu and on the Bags page. Each has its own listing page.
export const bagCategories = [
  { slug: "tote-bags", name: "Tote Bags", description: "Discover our collection of tote bags." },
  { slug: "handbags", name: "Handbags", description: "Discover our collection of handbags." },
  { slug: "clutch-bags", name: "Clutch Bags", description: "Discover our collection of clutch bags." },
  { slug: "potli-bags", name: "Potli Bags", description: "Discover our collection of potli bags." },
];

export const findCategory = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? bagCategories.find((c) => c.slug === slug);
