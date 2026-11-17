// Shop products. Only real product names, photos and prices belong here.
// To add a product: append an entry with its `categorySlug` (see src/lib/categories.ts)
// and its uploaded photo. It then appears automatically on that category's page
// when the category's listing is enabled below. Leave `image` null until a real photo exists.
import gold1 from "@/assets/elegant-waist-clutch/gold-1-front.jpg";
import gold2 from "@/assets/elegant-waist-clutch/gold-2-open.jpg";
import gold3 from "@/assets/elegant-waist-clutch/gold-3-worn.png";
import silver1 from "@/assets/elegant-waist-clutch/silver-1-front.jpg";
import silver2 from "@/assets/elegant-waist-clutch/silver-2-side.jpg";
import silver3 from "@/assets/elegant-waist-clutch/silver-3-open.jpg";
import silver4 from "@/assets/elegant-waist-clutch/silver-4-worn.png";
import shell1 from "@/assets/silver-shell-clutch/shell-1-model.png";
import shell2 from "@/assets/silver-shell-clutch/shell-2-open.jpg";
import shell3 from "@/assets/silver-shell-clutch/shell-3-angled.jpg";
import shell4 from "@/assets/silver-shell-clutch/shell-4-chain.jpg";
import potli1 from "@/assets/silver-potli/silver-potli-1-model-pink.png";
import potli2 from "@/assets/silver-potli/silver-potli-2-front.jpg";
import potli3 from "@/assets/silver-potli/silver-potli-3-handle.jpg";
import goldPotli1 from "@/assets/golden-potli/golden-potli-1-hand.png";
import goldPotli2 from "@/assets/golden-potli/golden-potli-2-standalone.png";
import goldPotli3 from "@/assets/golden-potli/golden-potli-3-jewellery.png";
import crescent1 from "@/assets/golden-crescent/crescent-1-cream.png";
import crescent2 from "@/assets/golden-crescent/crescent-2-stones.jpg";
import crescent3 from "@/assets/golden-crescent/crescent-3-side.jpg";
import crescent4 from "@/assets/golden-crescent/crescent-4-top.jpg";
import vp1 from "@/assets/velvet-potli/velvet-potli-1-model.png";
import vp2 from "@/assets/velvet-potli/velvet-potli-2-green.png";
import vp3 from "@/assets/velvet-potli/velvet-potli-3-green-maroon.jpg";
import mp1 from "@/assets/maroon-potli/maroon-potli-1-model.png";
import mp2 from "@/assets/maroon-potli/maroon-potli-2-white.png";
import gtp1 from "@/assets/golden-traditional-potli/gtp-1-model.png";
import gtp2 from "@/assets/golden-traditional-potli/gtp-2-front.jpg";
import gtp3 from "@/assets/golden-traditional-potli/gtp-3-open.jpg";
import gtp4 from "@/assets/golden-traditional-potli/gtp-4-front.jpg";
import gpp1 from "@/assets/green-pearl-potli/gpp-1-light.png";
import gpp2 from "@/assets/green-pearl-potli/gpp-2-side.png";
import gpp3 from "@/assets/green-pearl-potli/gpp-3-back.png";
import gpp4 from "@/assets/green-pearl-potli/gpp-4-dark.png";
import bcc1 from "@/assets/brown-checkered-crossbody/bcc-1-model.png";
import bcc2 from "@/assets/brown-checkered-crossbody/bcc-2-front.png";
import bcc3 from "@/assets/brown-checkered-crossbody/bcc-3-back.png";
import bpc1 from "@/assets/blue-printed-crossbody/bpc-1-model.png";
import bpc2 from "@/assets/blue-printed-crossbody/bpc-2-front.png";
import bpc3 from "@/assets/blue-printed-crossbody/bpc-3-back.png";
import bpc4 from "@/assets/blue-printed-crossbody/bpc-4-side.png";
import wcc1 from "@/assets/white-checkered-crossbody/wcc-1-model.png";
import wcc2 from "@/assets/white-checkered-crossbody/wcc-2-front.png";
import wcc3 from "@/assets/white-checkered-crossbody/wcc-3-back.png";
import obs1 from "@/assets/olive-beige-shoulder/obs-1-model.png";
import obs2 from "@/assets/olive-beige-shoulder/obs-2-front.png";
import obs3 from "@/assets/olive-beige-shoulder/obs-3-back.png";
import obs4 from "@/assets/olive-beige-shoulder/obs-4-bottom.png";
import bbs1 from "@/assets/brown-beige-shoulder/bbs-1-model.png";
import bbs2 from "@/assets/brown-beige-shoulder/bbs-2-front.png";
import bbs3 from "@/assets/brown-beige-shoulder/bbs-3-back.png";
import sbc1 from "@/assets/sky-blue-crossbody/sbc-1-model.png";
import sbc2 from "@/assets/sky-blue-crossbody/sbc-2-front.png";
import sbc3 from "@/assets/sky-blue-crossbody/sbc-3-back.png";
import cbt1 from "@/assets/cream-beige-tote/cbt-1-lifestyle.png";
import cbt2 from "@/assets/cream-beige-tote/cbt-2-back.png";
import cbt3 from "@/assets/cream-beige-tote/cbt-3-side.png";
import bbt1 from "@/assets/beige-black-tote/bbt-d1-front.png";
import bbt2 from "@/assets/beige-black-tote/bbt-d2-side.png";
import bbt4 from "@/assets/beige-black-tote/bbt-d4-model.png";
import bbt5 from "@/assets/beige-black-tote/bbt-d5-model.png";
import bbm1 from "@/assets/beige-black-monogram-tote/bbm-1-front.png";
import bbm2 from "@/assets/beige-black-monogram-tote/bbm-2-bottom.png";
import bbm3 from "@/assets/beige-black-monogram-tote/bbm-3-model.png";

export type ProductPhoto = { src: string; alt: string };

export type Product = {
  id: string;
  name: string;
  category: string; // label shown on the card
  categorySlug?: string;
  bagCategorySlug?: "tote-bags" | "handbags" | "clutch-bags" | "potli-bags"; // page under the header's Bags menu
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
    bagCategorySlug: "clutch-bags",
    name: "Silver Shell Embellished Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: shell1,
    newArrival: true,
    gallery: [
      { src: shell1, alt: "Silver Shell Embellished Clutch held by a model" },
      { src: shell2, alt: "Silver Shell Embellished Clutch — open view" },
      { src: shell3, alt: "Silver Shell Embellished Clutch — front angled view" },
      { src: shell4, alt: "Silver Shell Embellished Clutch with chain handle" },
    ],
  },
  {
    id: "na-5",
    bagCategorySlug: "potli-bags",
    name: "Red & Green Velvet Potli Bag",
    category: "Potli Bags",
    categorySlug: "party-clutch-bags",
    showLastOnCategoryPage: true,
    image: vp1,
    newArrival: true,
    gallery: [
      { src: vp1, alt: "Green velvet potli bag with gold filigree held by a model in a traditional outfit" },
      { src: vp2, alt: "Green velvet potli bag — gold filigree, beaded handle and hanging beads" },
      { src: vp3, alt: "Green and maroon velvet potli bags shown together" },
    ],
  },
  {
    id: "na-6",
    bagCategorySlug: "potli-bags",
    name: "Green Pearl Embroidered Potli Bag",
    category: "Potli Bags",
    image: gpp4,
    newArrival: true,
    gallery: [
      { src: gpp4, alt: "Green pearl-embroidered potli bag on a dark luxurious background" },
      { src: gpp1, alt: "Green pearl-embroidered potli bag on a soft light background" },
      { src: gpp2, alt: "Green pearl-embroidered potli bag — side view on white" },
      { src: gpp3, alt: "Green pearl-embroidered potli bag — back view on white" },
    ],
  },
  {
    id: "elegant-waist-clutch-silver",
    bagCategorySlug: "clutch-bags",
    name: "Elegant Waist Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    colour: "Silver",
    image: silver4,
    gallery: [
      { src: silver4, alt: "Elegant Waist Clutch in silver — worn at the waist" },
      { src: silver1, alt: "Elegant Waist Clutch in silver — front view" },
      { src: silver2, alt: "Elegant Waist Clutch in silver — side view" },
      { src: silver3, alt: "Elegant Waist Clutch in silver — open flap" },
    ],
  },
  {
    id: "elegant-waist-clutch-gold",
    bagCategorySlug: "clutch-bags",
    name: "Elegant Waist Clutch",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    colour: "Gold",
    image: gold3,
    gallery: [
      { src: gold3, alt: "Elegant Waist Clutch in gold — worn at the waist" },
      { src: gold1, alt: "Elegant Waist Clutch in gold — front view" },
      { src: gold2, alt: "Elegant Waist Clutch in gold — open flap" },
    ],
  },
  {
    id: "golden-traditional-potli-bag",
    bagCategorySlug: "potli-bags",
    name: "Golden Traditional Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    description:
      "An elegant golden traditional potli bag featuring intricate gold-tone detailing, decorative beads, an ornate design, and hanging chain embellishments. Perfect for weddings, festive occasions, parties, and ethnic outfits.",
    image: gtp1,
    gallery: [
      { src: gtp1, alt: "Golden Traditional Potli Bag held by a model" },
      { src: gtp2, alt: "Golden Traditional Potli Bag — front view with beaded handle" },
      { src: gtp3, alt: "Golden Traditional Potli Bag — open view" },
      { src: gtp4, alt: "Golden Traditional Potli Bag — full view with hanging chains" },
    ],
  },
  {
    id: "silver-potli-bag",
    bagCategorySlug: "potli-bags",
    name: "Silver Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: potli1,
    gallery: [
      { src: potli1, alt: "Silver potli bag held by a model in a pink outfit" },
      { src: potli2, alt: "Silver potli bag — front view" },
      { src: potli3, alt: "Silver potli bag — full view with beaded handle" },
    ],
  },
  {
    id: "golden-traditional-designer-potli-bag",
    bagCategorySlug: "potli-bags",
    name: "Golden Traditional Designer Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: goldPotli1,
    gallery: [
      { src: goldPotli1, alt: "Golden Traditional Designer Potli Bag held in hand" },
      { src: goldPotli2, alt: "Golden Traditional Designer Potli Bag — standalone view" },
      { src: goldPotli3, alt: "Golden Traditional Designer Potli Bag shown with jewellery" },
    ],
  },
  {
    id: "golden-crescent-handbag",
    name: "Golden Crescent Handbag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: crescent1,
    gallery: [
      { src: crescent1, alt: "Golden Crescent Handbag held by a model in a cream outfit" },
      { src: crescent2, alt: "Golden Crescent Handbag — stone-studded front view" },
      { src: crescent3, alt: "Golden Crescent Handbag — side view" },
      { src: crescent4, alt: "Golden Crescent Handbag — open top view" },
    ],
  },
  {
    id: "maroon-potli-bag",
    bagCategorySlug: "potli-bags",
    name: "Maroon Potli Bag",
    category: "Party & Clutch Bags",
    categorySlug: "party-clutch-bags",
    image: mp1,
    gallery: [
      { src: mp1, alt: "Maroon velvet potli bag with gold filigree held by a model" },
      { src: mp2, alt: "Maroon velvet potli bag on a white background" },
    ],
  },
  {
    id: "brown-checkered-crossbody-bag",
    bagCategorySlug: "handbags",
    name: "Brown Checkered Crossbody Bag with Mini Pouch",
    category: "Handbags",
    image: bcc1,
    gallery: [
      { src: bcc1, alt: "Brown checkered crossbody bag with mini pouch worn by a model" },
      { src: bcc2, alt: "Brown checkered crossbody bag with mini pouch — front view" },
      { src: bcc3, alt: "Brown checkered crossbody bag with mini pouch — back view" },
    ],
  },
  {
    id: "blue-printed-crossbody-bag",
    bagCategorySlug: "handbags",
    name: "Blue Printed Crossbody Bag with Mini Pouch",
    category: "Handbags",
    image: bpc1,
    gallery: [
      { src: bpc1, alt: "Blue printed crossbody bag with mini pouch worn by a model" },
      { src: bpc2, alt: "Blue printed crossbody bag with mini pouch — front view" },
      { src: bpc3, alt: "Blue printed crossbody bag with mini pouch — back view" },
      { src: bpc4, alt: "Blue printed crossbody bag with mini pouch — side view" },
    ],
  },
  {
    id: "white-checkered-crossbody-bag",
    bagCategorySlug: "handbags",
    name: "White Checkered Crossbody Bag with Mini Pouch",
    category: "Handbags",
    image: wcc1,
    gallery: [
      { src: wcc1, alt: "White checkered crossbody bag with mini pouch worn by a model" },
      { src: wcc2, alt: "White checkered crossbody bag with mini pouch — front view" },
      { src: wcc3, alt: "White checkered crossbody bag with mini pouch — back view" },
    ],
  },
  {
    id: "olive-green-beige-printed-shoulder-bag",
    bagCategorySlug: "handbags",
    name: "Olive Green Beige Printed Shoulder Bag",
    category: "Handbags",
    image: obs1,
    gallery: [
      { src: obs1, alt: "Olive green and beige printed shoulder bag worn by a model" },
      { src: obs2, alt: "Olive green and beige printed shoulder bag — front view" },
      { src: obs3, alt: "Olive green and beige printed shoulder bag — back view" },
      { src: obs4, alt: "Olive green and beige printed shoulder bag — bottom view" },
    ],
  },
  {
    id: "brown-beige-printed-shoulder-bag",
    bagCategorySlug: "handbags",
    name: "Brown Beige Printed Shoulder Bag",
    category: "Handbags",
    image: bbs1,
    gallery: [
      { src: bbs1, alt: "Brown and beige printed shoulder bag worn by a model" },
      { src: bbs2, alt: "Brown and beige printed shoulder bag — front view" },
      { src: bbs3, alt: "Brown and beige printed shoulder bag — back view" },
    ],
  },
  {
    id: "sky-blue-crossbody-bag",
    bagCategorySlug: "handbags",
    name: "Sky Blue Crossbody Bag with Mini Pouch",
    category: "Handbags",
    image: sbc1,
    gallery: [
      { src: sbc1, alt: "Sky blue crossbody bag with mini pouch worn by a model" },
      { src: sbc2, alt: "Sky blue crossbody bag with mini pouch — front view" },
      { src: sbc3, alt: "Sky blue crossbody bag with mini pouch — back view" },
    ],
  },
  {
    id: "cream-beige-tote-bag-gold-chain",
    bagCategorySlug: "tote-bags",
    name: "Cream Beige Tote Bag with Gold Chain Handles",
    category: "Tote Bags",
    image: cbt1,
    gallery: [
      { src: cbt1, alt: "Cream beige tote bag with gold chain handles styled on satin" },
      { src: cbt2, alt: "Cream beige tote bag with gold chain handles — back view" },
      { src: cbt3, alt: "Cream beige tote bag with gold chain handles — side view" },
    ],
  },
  {
    id: "beige-black-printed-tote-bag",
    bagCategorySlug: "tote-bags",
    name: "Beige & Black Printed Tote Bag",
    category: "Tote Bags",
    image: bbt1,
    gallery: [
      { src: bbt1, alt: "Beige and black printed tote bag with black handles — front view" },
      { src: bbt2, alt: "Beige and black printed tote bag — side view" },
      { src: bbt4, alt: "Model in a white dress carrying the beige and black printed tote bag" },
      { src: bbt5, alt: "Beige and black printed tote bag held in hand — close-up" },
    ],
  },
  {
    id: "beige-black-monogram-tote-bag",
    bagCategorySlug: "tote-bags",
    name: "Beige & Black Monogram Tote Bag",
    category: "Tote Bags",
    image: bbm3,
    gallery: [
      { src: bbm3, alt: "Model in a black blazer and white trousers carrying the beige and black monogram tote bag" },
      { src: bbm1, alt: "Beige and black monogram tote bag with black straps — front view" },
      { src: bbm2, alt: "Beige and black monogram tote bag — bottom view with gold studs" },
    ],
  },
];

// Category pages that list their products. Others keep their "coming soon" note.
export const listedCategorySlugs = ["party-clutch-bags", "tote-bags", "handbags", "clutch-bags", "potli-bags"];

export const newArrivals = () => products.filter((p) => p.newArrival);

export const productsForCategoryPage = (slug: string) =>
  listedCategorySlugs.includes(slug)
    ? products
        .filter((p) => p.categorySlug === slug || p.bagCategorySlug === slug)
        .sort((a, b) => Number(!!a.showLastOnCategoryPage) - Number(!!b.showLastOnCategoryPage))
    : [];
