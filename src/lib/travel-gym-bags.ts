// Confirmed product information for the Travel & Gym Bags category.
// Only supplier-verified details belong here; leave `specs` undefined until confirmed.

export type BagSpecs = {
  material: string;
  dimensions: string;
  weight: string;
  compartments: number;
  waterproof: string;
  manufacturing: string;
  suitableFor: string;
  recommendedUse: string;
};

export type TravelGymBagInfo = {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
  specs?: BagSpecs;
};

const confirmedGymBagSpecs: BagSpecs = {
  material: "Synthetic Leather",
  dimensions: "18 × 9 × 8 inches (L × W × H)",
  weight: "450 g",
  compartments: 3,
  waterproof: "Yes, as stated by the supplier",
  manufacturing: "Handmade",
  suitableFor: "Men and Women",
  recommendedUse: "Gym and travel",
};

const confirmedDescription = (color: string) =>
  `A ${color.toLowerCase()} synthetic leather duffel bag for gym sessions and travel. It features three compartments, a handmade finish, and dimensions of 18 × 9 × 8 inches. Weight: 450 g. Waterproofing is stated by the supplier.`;

export const travelGymBagInfo: TravelGymBagInfo[] = [
  {
    id: "tg-blue",
    name: "Travel & Gym Duffel Bag – Blue",
    color: "Blue",
    price: 799,
    description:
      "A blue duffel bag from the NEHA Lifestyle Travel & Gym Bags collection, designed for carrying everyday essentials to the gym or on your travels. Product specifications will be added once confirmed.",
  },
  {
    id: "tg-black",
    name: "Travel & Gym Duffel Bag – Black",
    color: "Black",
    price: 799,
    description: confirmedDescription("Black"),
    specs: confirmedGymBagSpecs,
  },
  {
    id: "tg-brown",
    name: "Travel & Gym Duffel Bag – Brown",
    color: "Brown",
    price: 799,
    description: confirmedDescription("Brown"),
    specs: confirmedGymBagSpecs,
  },
];

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

// Intended delivery estimate (not a guarantee). Shipping charges are not decided yet — keep unset.
export const deliveryEstimate = { minDays: 5, maxDays: 7 };
export const deliveryEstimateLabel = `Estimated delivery: ${deliveryEstimate.minDays}–${deliveryEstimate.maxDays} days. This is an estimate, not a guaranteed delivery date.`;
