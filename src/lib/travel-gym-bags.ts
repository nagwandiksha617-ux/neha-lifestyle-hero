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
  `A handmade ${color.toLowerCase()} duffel bag crafted in synthetic leather. It measures 18 × 9 × 8 inches (L × W × H), weighs 450 g and offers three compartments to keep your essentials organised. The supplier states that the bag is waterproof. Suitable for men and women, for the gym and for travel.`;

export const travelGymBagInfo: TravelGymBagInfo[] = [
  {
    id: "tg-blue",
    name: "Travel & Gym Duffel Bag – Blue",
    color: "Blue",
    price: 799,
    description:
      "A blue duffel bag from the NEHA Lifestyle Travel & Gym Bags collection, made for carrying your everyday essentials to the gym or on your travels.",
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
