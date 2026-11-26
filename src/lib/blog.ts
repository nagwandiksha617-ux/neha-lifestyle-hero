import heroImage from "@/assets/blog-jewellery-hero.webp.asset.json";
import necklaceCollectionImage from "@/assets/necklace-collection.webp.asset.json";
import occasionStyleImage from "@/assets/occasion-style-collection.webp.asset.json";
import { absoluteUrl, breadcrumbJsonLd, type Crumb } from "./seo";

export type BlogCategorySlug = "bags" | "jewellery" | "fashion" | "styling-tips";

export const blogCategories: { slug: BlogCategorySlug; name: string; description: string }[] = [
  { slug: "bags", name: "Bags", description: "Totes, handbags, clutches and potlis." },
  { slug: "jewellery", name: "Jewellery", description: "Necklace sets, earrings and occasion pieces." },
  { slug: "fashion", name: "Fashion", description: "Trends and seasonal edits." },
  { slug: "styling-tips", name: "Styling Tips", description: "How to pair and wear your pieces." },
];

export type BlogInternalLink = {
  label: string;
  slug: "jewellery" | "jewellery-sets" | "earrings";
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "image"; label: string; alt: string; src?: string; caption?: string; width?: number; height?: number }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] }
  | { type: "links"; links: BlogInternalLink[] };

export type BlogSection = { id: string; title: string; blocks: BlogBlock[] };

export type BlogPost = {
  /** URL segment: /blog/<slug>. Lowercase words joined by hyphens. */
  slug: string;
  title: string;
  /** Optional shorter label for breadcrumbs. */
  breadcrumbTitle?: string;
  excerpt: string;
  category: BlogCategorySlug;
  image?: { src: string; alt: string; width?: number; height?: number };
  /** Shown only while an article has no supplied hero photo. */
  heroPlaceholder?: { label: string; alt: string };
  /** ISO date, only once the owner confirms publication. */
  publishedAt?: string;
  author?: string;
  featured?: boolean;
  body: string[];
  sections?: BlogSection[];
  faqs?: { question: string; answer: string }[];
};

// Owner-supplied articles only — no invented articles, authors or dates.
export const blogPosts: BlogPost[] = [
  {
    slug: "artificial-jewellery-for-women",
    title: "Artificial Jewellery for Women: A Complete Guide to Types, Styling and Buying",
    breadcrumbTitle: "Artificial Jewellery for Women",
    excerpt: "Explore artificial jewellery for women, including popular types, outfit styling, online buying tips and simple jewellery care practices.",
    category: "jewellery",
    featured: true,
    image: {
      src: heroImage.url,
      alt: "Artificial jewellery for women by NEHA Lifestyle",
      width: 1920,
      height: 1080,
    },
    body: [
      "Artificial jewellery for women has become a popular choice for creating beautiful looks without depending only on precious jewellery. From elegant necklace sets to stylish earrings, women can explore a wide variety of designs for everyday wear, festivals, parties and special occasions.",
      "Whether you prefer traditional Indian jewellery or modern fashion accessories, the right jewellery can complement your outfit and express your personal style.",
      "In this complete guide, we will explore different types of artificial jewellery, outfit combinations, buying tips, styling ideas and simple jewellery care practices.",
    ],
    sections: [
      {
        id: "what-is-artificial-jewellery",
        title: "What Is Artificial Jewellery?",
        blocks: [
          { type: "paragraph", text: "Artificial jewellery, also commonly called imitation jewellery or fashion jewellery, is decorative jewellery made using non-precious base materials and decorative elements." },
          { type: "paragraph", text: "Depending on the design, these pieces may include metal alloys, beads, glass elements, decorative stones, pearl-style accents and plated finishes." },
          { type: "paragraph", text: "They are available in different colours, shapes and styles, making it easier to choose jewellery for different outfits and occasions." },
          { type: "subheading", text: "Why Do Women Choose Artificial Jewellery?" },
          {
            type: "list",
            items: [
              "Wide variety of traditional and modern designs.",
              "Different styles for everyday and occasional wear.",
              "Options for different fashion preferences and budgets.",
              "Easy to experiment with different outfit combinations.",
              "Decorative designs suitable for festive and party looks.",
            ],
          },
        ],
      },
      {
        id: "popular-types-of-artificial-jewellery",
        title: "Popular Types of Artificial Jewellery for Women",
        blocks: [
          { type: "paragraph", text: "Artificial jewellery comes in many designs. Knowing the popular types can help you choose pieces that suit your wardrobe and personal style." },
          {
            type: "table",
            caption: "Popular jewellery types and styling ideas",
            headers: ["Jewellery Type", "Best For", "Styling Idea"],
            rows: [
              ["Necklace Sets", "Weddings and festivals", "Pair with sarees and ethnic suits"],
              ["Earrings", "Everyday and party wear", "Choose studs or statement designs"],
              ["Chokers", "Parties and traditional outfits", "Wear with suitable necklines"],
              ["Long Necklaces", "Ethnic and festive looks", "Style with sarees and anarkalis"],
              ["Oxidised Jewellery", "Casual and ethnic styling", "Pair with kurtis and cotton outfits"],
              ["Bracelets and Rings", "Everyday accessories", "Combine with simple outfits"],
            ],
          },
          { type: "subheading", text: "A. Necklace Sets" },
          { type: "paragraph", text: "Necklace sets are a popular choice for traditional and festive styling. They may come with matching earrings or decorative necklace designs." },
          { type: "paragraph", text: "Some popular styles include:" },
          {
            type: "list",
            items: [
              "Kundan-inspired necklace sets.",
              "Pearl-style necklace sets.",
              "Oxidised necklace sets.",
              "Long necklace sets.",
              "Multicolour statement necklace sets.",
              "Traditional ethnic necklace sets.",
            ],
          },
          { type: "paragraph", text: "Styling Tip: Choose a statement necklace set with a simple outfit. If your outfit already has heavy embroidery, consider a more balanced jewellery design." },
          { type: "links", links: [{ label: "Explore the Necklace Sets collection", slug: "jewellery-sets" }] },
          {
            type: "image",
            label: "Necklace collection image",
            alt: "Artificial necklace sets collection for women by NEHA Lifestyle",
            src: necklaceCollectionImage.url,
            caption: "Explore different necklace styles at NEHA Lifestyle.",
            width: 1920,
            height: 1080,
          },
          { type: "subheading", text: "B. Earrings" },
          { type: "paragraph", text: "Earrings can add an attractive detail to both simple and elaborate outfits." },
          { type: "paragraph", text: "Popular artificial earring styles include:" },
          { type: "list", items: ["Jhumkas", "Stud earrings", "Chandbalis", "Drop earrings", "Hoop earrings", "Statement earrings"] },
          { type: "paragraph", text: "For everyday wear, simple studs or small earrings may be suitable. For festive occasions, decorative jhumkas and statement earrings can complement traditional outfits." },
          { type: "subheading", text: "C. Chokers and Layered Necklaces" },
          { type: "paragraph", text: "Chokers are necklaces designed to sit close to the neck. They can work well with outfits that have suitable necklines." },
          { type: "paragraph", text: "Layered necklaces combine multiple necklace lengths to create a more detailed appearance." },
          { type: "paragraph", text: "Styling Tip: When wearing a detailed choker or layered necklace, keep the earrings simple to avoid an overcrowded look." },
          { type: "subheading", text: "D. Oxidised Jewellery" },
          { type: "paragraph", text: "Oxidised jewellery features a darker, antique-style finish. It is often chosen for ethnic, bohemian and Indo-Western outfits." },
          { type: "paragraph", text: "You can style oxidised jewellery with:" },
          { type: "list", items: ["Cotton kurtis.", "Handloom sarees.", "Solid-colour dresses.", "Indo-Western outfits.", "Casual ethnic wear."] },
          { type: "subheading", text: "E. Bracelets and Rings" },
          { type: "paragraph", text: "Bracelets and rings are versatile accessories that can add smaller details to your overall look." },
          { type: "paragraph", text: "Choose delicate designs for simple everyday styling or decorative pieces when you want a more noticeable accessory." },
        ],
      },
      {
        id: "jewellery-for-different-occasions",
        title: "How to Choose Artificial Jewellery for Different Occasions",
        blocks: [
          { type: "paragraph", text: "Different occasions call for different jewellery styles. The best choice depends on your outfit, comfort and the look you want to create." },
          {
            type: "table",
            caption: "Jewellery suggestions for different occasions",
            headers: ["Occasion", "Recommended Jewellery", "Styling Suggestion"],
            rows: [
              ["Everyday Wear", "Small earrings, simple pendants", "Choose comfortable designs"],
              ["Office Wear", "Studs, delicate necklaces", "Keep the look subtle"],
              ["College Outings", "Hoops, small pendants", "Try simple modern combinations"],
              ["Festivals", "Traditional necklace sets, jhumkas", "Coordinate with ethnic outfits"],
              ["Weddings", "Statement necklace sets", "Choose designs that complement your outfit"],
              ["Parties", "Chokers, statement earrings", "Focus on one statement accessory"],
            ],
          },
          { type: "paragraph", text: "For a balanced look, avoid wearing too many heavy accessories together. Select one main jewellery piece and keep the remaining accessories simple." },
          {
            type: "image",
            label: "Occasion styling collage",
            alt: "Artificial jewellery for women for wedding, festivals, Navratri, sangeet and party occasions",
            src: occasionStyleImage.url,
            width: 1920,
            height: 1080,
          },
        ],
      },
      {
        id: "match-jewellery-with-your-outfit",
        title: "How to Match Artificial Jewellery with Your Outfit",
        blocks: [
          { type: "paragraph", text: "Choosing jewellery according to your outfit can make your overall appearance more coordinated." },
          { type: "paragraph", text: "Use these suggestions as a starting point:" },
          {
            type: "table",
            caption: "Outfit and jewellery combinations",
            headers: ["Outfit", "Jewellery Recommendation"],
            rows: [
              ["Saree", "Traditional necklace set or statement earrings"],
              ["Kurti", "Jhumkas or oxidised jewellery"],
              ["Lehenga", "Kundan-inspired necklace set"],
              ["Western Dress", "Delicate necklace or statement earrings"],
              ["Shirt and Jeans", "Hoops or a simple pendant"],
              ["Anarkali Suit", "Traditional earrings or a coordinated necklace"],
            ],
          },
          { type: "subheading", text: "Three Easy Styling Rules" },
          {
            type: "list",
            items: [
              "Balance the look: Pair heavily detailed outfits with simpler jewellery.",
              "Consider the neckline: Choose a necklace that works with your outfit's neckline.",
              "Coordinate colours: Select jewellery colours that complement your outfit without matching every detail exactly.",
            ],
          },
        ],
      },
      {
        id: "buying-artificial-jewellery-online",
        title: "What to Check Before Buying Artificial Jewellery Online",
        blocks: [
          { type: "paragraph", text: "Online shopping offers many jewellery choices, but checking product information before ordering is important." },
          { type: "paragraph", text: "Here are six things to consider:" },
          { type: "subheading", text: "1. Product Images" },
          { type: "paragraph", text: "Check product photographs carefully. Look for close-up images that show the design and visible detailing." },
          { type: "subheading", text: "2. Product Description" },
          { type: "paragraph", text: "Read the description to understand the material, finish, dimensions and other details provided by the seller." },
          { type: "subheading", text: "3. Size and Measurements" },
          { type: "paragraph", text: "Check necklace length, earring dimensions and other available measurements to understand the product size." },
          { type: "subheading", text: "4. Price and Product Details" },
          { type: "paragraph", text: "Compare the listed price with the design and product information. Check whether the price shown is the final product price." },
          { type: "subheading", text: "5. Shipping and Return Policy" },
          { type: "paragraph", text: "Read delivery, cancellation, exchange and return conditions before placing your order." },
          { type: "subheading", text: "6. Customer Support" },
          { type: "paragraph", text: "Check whether the seller provides a contact option for product-related questions and order assistance." },
        ],
      },
      {
        id: "artificial-jewellery-care",
        title: "How to Take Care of Artificial Jewellery",
        blocks: [
          { type: "paragraph", text: "Proper care can help maintain the appearance of artificial jewellery and reduce unnecessary damage." },
          { type: "paragraph", text: "Follow these simple tips:" },
          {
            type: "list",
            items: [
              "Keep jewellery away from water and excessive moisture.",
              "Apply perfume and hairspray before wearing jewellery.",
              "Remove jewellery before bathing, swimming or exercising.",
              "Wipe pieces gently with a soft, dry cloth after use.",
              "Store different jewellery pieces separately.",
              "Use a clean and dry jewellery box.",
              "Avoid harsh chemicals and abrasive cleaning products.",
            ],
          },
          { type: "paragraph", text: "Important: Jewellery materials and finishes vary. Always follow the care instructions provided for the specific product." },
        ],
      },
      {
        id: "build-a-versatile-jewellery-collection",
        title: "How to Build a Versatile Artificial Jewellery Collection",
        blocks: [
          { type: "paragraph", text: "You do not need a large collection to create different looks. Start with a few versatile pieces that complement the clothes you already own." },
          {
            type: "table",
            caption: "Essential pieces for a versatile jewellery collection",
            headers: ["Essential Piece", "Why Include It?"],
            rows: [
              ["Everyday Earrings", "Useful for simple daily outfits"],
              ["Statement Earrings", "Suitable for parties and special occasions"],
              ["Simple Necklace", "Easy to style with different outfits"],
              ["Traditional Necklace Set", "Complements ethnic clothing"],
              ["Bracelet", "Adds a subtle accessory detail"],
              ["Rings", "Helps complete different looks"],
            ],
          },
          { type: "paragraph", text: "Gradually add new styles according to your preferences, wardrobe and occasions." },
        ],
      },
      {
        id: "explore-jewellery-at-neha-lifestyle",
        title: "Explore Artificial Jewellery at NEHA Lifestyle",
        blocks: [
          { type: "paragraph", text: "At NEHA Lifestyle, accessories are an important part of personal style. Discover jewellery designs that complement your everyday outfits, traditional looks and special occasions." },
          { type: "paragraph", text: "Explore different designs and choose pieces that reflect your personality." },
          {
            type: "links",
            links: [
              { label: "Shop Jewellery", slug: "jewellery" },
              { label: "Explore Necklace Sets", slug: "jewellery-sets" },
              { label: "Explore Earrings", slug: "earrings" },
            ],
          },
          { type: "paragraph", text: "Choose your favourite designs and create a look that feels uniquely yours." },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        blocks: [
          { type: "paragraph", text: "Artificial jewellery for women offers many ways to explore personal style, from simple everyday accessories to decorative pieces for special occasions." },
          { type: "paragraph", text: "Choose jewellery that complements your outfit, suits the occasion and feels comfortable to wear. Check product information before buying and follow suitable care practices to maintain your favourite pieces." },
          { type: "paragraph", text: "Discover jewellery that complements your style with NEHA Lifestyle." },
        ],
      },
    ],
    faqs: [
      {
        question: "What is artificial jewellery for women?",
        answer: "Artificial jewellery is decorative jewellery made using non-precious base materials and design elements. It is available in many styles for casual, traditional and party wear.",
      },
      {
        question: "What are the most popular types of artificial jewellery?",
        answer: "Popular types include necklace sets, jhumkas, studs, chokers, layered necklaces, oxidised jewellery, bracelets and rings.",
      },
      {
        question: "Which artificial jewellery is suitable for everyday wear?",
        answer: "Small earrings, simple pendants, delicate necklaces and lightweight bracelets can be suitable for everyday styling. Choose pieces that feel comfortable for your routine.",
      },
      {
        question: "How can I style artificial jewellery with traditional outfits?",
        answer: "You can pair traditional necklace sets with sarees and lehengas, jhumkas with kurtis and statement earrings with simpler ethnic outfits.",
      },
      {
        question: "How should I store artificial jewellery?",
        answer: "Store jewellery in a clean, dry box and keep different pieces separately. Avoid moisture and direct contact with perfumes or harsh chemicals.",
      },
      {
        question: "Is artificial jewellery suitable for parties and weddings?",
        answer: "Yes. Decorative necklace sets, statement earrings, chokers and traditional-inspired designs can complement party and wedding guest outfits.",
      },
      {
        question: "What should I check before buying artificial jewellery online?",
        answer: "Check the product photographs, material details, dimensions, price, delivery information and the seller's return or exchange policy.",
      },
      {
        question: "Is artificial jewellery the same as imitation jewellery?",
        answer: "The terms are commonly used for similar categories of non-fine jewellery. However, the materials, finishes and designs can vary between products.",
      },
    ],
  },
];

export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}

export function blogCategoryName(slug: BlogCategorySlug) {
  return blogCategories.find((c) => c.slug === slug)?.name ?? slug;
}

export function blogBreadcrumb(post: BlogPost): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.breadcrumbTitle ?? post.title, path: blogPostPath(post.slug) },
  ];
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: absoluteUrl(blogPostPath(post.slug)),
    articleSection: blogCategoryName(post.category),
    publisher: { "@type": "Organization", name: "NEHA Lifestyle", url: absoluteUrl("/") },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.image?.src.startsWith("https://") ? { image: post.image.src } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
  };
}

export { breadcrumbJsonLd };
