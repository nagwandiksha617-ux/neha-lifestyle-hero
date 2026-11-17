import { products } from "@/lib/products";

// Dedicated category pages do not infer or change existing product assignments.
export const jewelleryCategories = [
  { slug: "earrings", name: "Earrings", description: "Explore earrings at NEHA Lifestyle." },
  { slug: "jewellery-sets", name: "Jewellery Sets", description: "Explore jewellery sets at NEHA Lifestyle." },
  { slug: "bracelets", name: "Bracelets", description: "Explore bracelets at NEHA Lifestyle." },
  { slug: "ethnic-jewellery", name: "Ethnic Jewellery", description: "Explore ethnic jewellery at NEHA Lifestyle." },
  { slug: "wedding-occasion-jewellery", name: "Wedding & Occasion Jewellery", description: "Explore wedding and occasion jewellery at NEHA Lifestyle." },
];

export const jewelleryNewArrivals = products.filter((p) => p.categorySlug === "jewellery" && p.newArrival);