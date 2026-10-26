// Shop products. Only real product names, photos and prices belong here.
// To add a product: append an entry with its `categorySlug` (see src/lib/categories.ts)
// and its uploaded photo. It then appears automatically on that category's page
// when the category's listing is enabled below. Leave `image` null until a real photo exists.

export type Product = {
  id: string;
  name: string;
  category: string; // label shown on the card
  categorySlug?: string;
  image: string | null;
  newArrival?: boolean;
};

export const products: Product[] = [
  { id: "na-1", name: "Peacock Pearl Jhumka Earrings", category: "Jewellery", categorySlug: "jewellery", image: null, newArrival: true },
  { id: "na-2", name: "Green Stone Jhumka Earrings", category: "Jewellery", categorySlug: "jewellery", image: null, newArrival: true },
  { id: "na-4", name: "Silver Shell Embellished Clutch", category: "Party & Clutch Bags", categorySlug: "party-clutch-bags", image: null, newArrival: true },
  { id: "na-5", name: "Red & Green Velvet Potli Bag", category: "Potli Bags", image: null, newArrival: true },
  { id: "na-6", name: "Green Pearl Embroidered Potli Bag", category: "Potli Bags", image: null, newArrival: true },
];

// Category pages that list their products. Others keep their "coming soon" note.
export const listedCategorySlugs = ["party-clutch-bags"];

export const newArrivals = () => products.filter((p) => p.newArrival);

export const productsForCategoryPage = (slug: string) =>
  listedCategorySlugs.includes(slug) ? products.filter((p) => p.categorySlug === slug) : [];
