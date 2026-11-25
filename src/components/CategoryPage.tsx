// CategoryPage.tsx — NEHA Lifestyle category layout (Bags, Jewellery, Party & Clutch, Watches)
// Drop into src/components/. React + Tailwind only; no router or data dependency.
// Fonts: Cormorant Garamond (headings) and Montserrat (body) must already be loaded on the site.
// If your navbar is sticky, change `top-0` on the filter bar to your navbar height (e.g. top-[96px]).
import { useMemo, useState, type ReactNode } from "react";

export type CatProduct = {
  id: string;
  name: string;
  price?: number | string | null;
  image?: string | null;
  image2?: string | null; // shown on hover
  href?: string;
};

export type CatSection = {
  id: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  products: CatProduct[];
};

export type CategoryPageProps = {
  breadcrumb: string[]; // e.g. ["Home", "Shop", "Bags"]
  label: string; // small gold label above the heading
  headingStart: string; // "Discover Your"
  headingAccent: string; // "Perfect Bag" (maroon italic)
  tagline: string;
  ctaLabel: string;
  ctaHref?: string;
  heroImage?: string | null; // shown inside the arch frame
  heroAlt?: string; // description of the hero photo
  sections: CatSection[];
  showSubIcons?: boolean; // default true
  showFilters?: boolean; // default true
  hideEmpty?: boolean; // hide sections with no products (turn on once photos are ready)
  whatsappNumber?: string; // e.g. "919999999999"
  onAddToCart?: (p: CatProduct) => void;
  extraCard?: ReactNode; // e.g. "More styles coming soon" card, rendered in the last section
  children?: ReactNode; // content under the grid (DetailBlocks, GiftBand)
};

const serif = "font-['Cormorant_Garamond',serif]";

const priceText = (v: CatProduct["price"]) =>
  v === null || v === undefined || v === ""
    ? "Price on request"
    : typeof v === "number"
      ? `₹${v.toLocaleString("en-IN")}`
      : v;

function Placeholder({ text = "Photo coming soon" }: { text?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F3DCCF] to-[#E9C8B8] text-[11px] text-[#7A5A55]">
      {text}
    </div>
  );
}

function ProductCard({
  p, category, onAdd, waNumber,
}: { p: CatProduct; category: string; onAdd?: ((p: CatProduct) => void) | undefined; waNumber?: string | undefined }) {
  const wa = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi, I want to enquire about: ${p.name}`)}`
    : undefined;
  return (
    <article className="group border border-[#F0DED3] bg-white p-3 pb-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F3DCCF]">
        {p.image ? (
          <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Placeholder />
        )}
        {p.image && p.image2 && (
          <img src={p.image2} alt={`${p.name} — second photo`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
        <button aria-label="Add to wishlist" className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FDF3EC] text-base text-[#6B2737]">♡</button>
      </div>
      <p className="mt-3.5 text-center text-[10px] uppercase tracking-[.18em] text-[#7D5F26]">{category}</p>
      <h3 className={`mt-1.5 line-clamp-2 h-[50px] text-center text-xl font-medium leading-tight text-[#2B1D20] ${serif}`}>
        {p.href ? <a href={p.href}>{p.name}</a> : p.name}
      </h3>
      <p className="my-2 text-center text-[13px] text-[#6B5B5E]">{priceText(p.price)}</p>
      <div className="flex gap-2">
        <button onClick={() => onAdd?.(p)} className="h-11 flex-1 bg-[#6B2737] text-xs font-semibold tracking-[.14em] text-[#FDF3EC] hover:bg-[#561F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B2737]">
          Add to Cart
        </button>
        <a href={wa} target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp" className="flex h-11 w-11 items-center justify-center border border-[#D9B8A8] bg-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B2737" strokeWidth="1.8" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.7 7L4 20l1.1-5A8 8 0 1 1 21 12z" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export function DetailBlocks({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="mx-auto mt-14 grid max-w-[1280px] gap-7 px-4 md:grid-cols-3">
      {items.map((i) => (
        <div key={i.title} className="border-t-2 border-[#B8935A] pt-4">
          <h3 className={`mb-1.5 text-2xl font-medium ${serif}`}>{i.title}</h3>
          <p className="text-sm text-[#6B5B5E]">{i.text}</p>
        </div>
      ))}
    </div>
  );
}

export function GiftBand({ title, text, href, label = "Enquire on WhatsApp" }: { title: string; text: string; href: string; label?: string }) {
  return (
    <div className="mx-auto mt-16 flex max-w-[1280px] flex-col items-start justify-between gap-5 bg-[#6B2737] px-8 py-10 text-[#FDF3EC] md:flex-row md:items-center md:px-14">
      <div>
        <h2 className={`text-4xl ${serif}`}>{title}</h2>
        <p className="mt-1.5 text-sm">{text}</p>
      </div>
      <a href={href} className="bg-[#FDF3EC] px-7 py-4 text-xs font-semibold uppercase tracking-[.16em] text-[#6B2737]">{label}</a>
    </div>
  );
}

export default function CategoryPage(props: CategoryPageProps) {
  const {
    breadcrumb, label, headingStart, headingAccent, tagline, ctaLabel, ctaHref = "#products",
    heroImage, heroAlt = "", sections, showSubIcons = true, showFilters = true, hideEmpty = false,
    whatsappNumber, onAddToCart, extraCard, children,
  } = props;

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("best");

  const shown = useMemo(() => {
    const list = sections.filter((s) => (hideEmpty ? s.products.length > 0 : true));
    return filter === "all" ? list : list.filter((s) => s.id === filter);
  }, [sections, filter, hideEmpty]);

  const sorted = (items: CatProduct[]) => {
    if (sort === "best") return items;
    const n = (v: CatProduct["price"]) => (typeof v === "number" ? v : Number.MAX_SAFE_INTEGER);
    return [...items].sort((a, b) => (sort === "low" ? n(a.price) - n(b.price) : n(b.price) - n(a.price)));
  };

  const goTo = (id: string) => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="bg-[#FDF3EC] font-['Montserrat',sans-serif] text-[#2B1D20]">
      {/* Hero */}
      <header className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-10 px-4 py-12 md:flex-row">
        <div className="max-w-[560px]">
          <p className="text-xs text-[#6B5B5E]">{breadcrumb.join(" / ")}</p>
          <p className="mb-2 mt-5 text-[11px] uppercase tracking-[.3em] text-[#7D5F26]">{label}</p>
          <h1 className={`text-5xl leading-[1.05] md:text-[64px] ${serif}`}>
            {headingStart} <i className="text-[#6B2737]">{headingAccent}</i>
          </h1>
          <p className="mb-7 mt-4 text-base text-[#6B5B5E]">{tagline}</p>
          <a href={ctaHref} className="inline-block bg-[#6B2737] px-9 py-4 text-xs font-semibold uppercase tracking-[.18em] text-[#FDF3EC]">{ctaLabel} →</a>
        </div>
        <div className="relative h-[420px] w-[340px] max-w-full overflow-hidden rounded-t-[999px] border border-[#E0C0B0] bg-[#F3DCCF]">
          {heroImage ? <img src={heroImage} alt={heroAlt} className="absolute inset-0 h-full w-full object-cover" /> : <Placeholder text="Hero photo" />}
        </div>
      </header>

      {/* Sub-category arch icons */}
      {showSubIcons && sections.length > 1 && (
        <nav aria-label="Sub-categories" className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-8 px-4 pb-10 md:gap-14">
          {sections.map((s) => {
            const first = s.products.find((p) => p.image);
            const img = first?.image;
            return (
              <button key={s.id} onClick={() => goTo(s.id)} className="w-[150px] text-center">
                <div className="relative mx-auto h-[190px] w-[150px] overflow-hidden rounded-t-[75px] border border-[#E0C0B0] bg-[#F3DCCF]">
                  {img ? <img src={img} alt={first ? `${s.title}: ${first.name}` : ""} className="absolute inset-0 h-full w-full object-cover" /> : <Placeholder text="Photo" />}
                </div>
                <span className={`mt-3.5 block text-xl font-medium ${serif}`}>{s.title}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Sticky filter bar */}
      {showFilters && (
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-y border-[#EBD3C6] bg-[#FDF3EC] px-4 py-4 md:px-16">
          <div className="flex flex-wrap gap-3">
            {[{ id: "all", title: "All" }, ...sections].map((s) => (
              <button key={s.id} onClick={() => setFilter(s.id)} aria-pressed={filter === s.id}
                className={`rounded-full border px-5 py-2 text-xs tracking-[.08em] ${filter === s.id ? "border-[#6B2737] bg-[#6B2737] text-[#FDF3EC]" : "border-[#D9B8A8] text-[#2B1D20]"}`}>
                {s.title}
              </button>
            ))}
          </div>
          <label className="text-xs tracking-[.06em] text-[#6B5B5E]">
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent text-[#2B1D20]">
              <option value="best">Best Sellers</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>
      )}

      {/* Sections */}
      <main id="products">
        {shown.map((s, idx) => (
          <section key={s.id} id={`sec-${s.id}`} className="mx-auto max-w-[1280px] scroll-mt-24 px-4 pb-2 pt-14">
            <div className="mb-6 flex items-end justify-between border-b border-[#EBD3C6] pb-4">
              <div>
                <h2 className={`text-4xl ${serif}`}>{s.title}</h2>
                {s.description && <p className="mt-1.5 text-sm text-[#6B5B5E]">{s.description}</p>}
              </div>
              {s.viewAllHref && <a href={s.viewAllHref} className="text-xs font-semibold tracking-[.12em] text-[#6B2737]">View all {s.title} →</a>}
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-7 lg:grid-cols-4">
              {sorted(s.products).map((p) => (
                <ProductCard key={p.id} p={p} category={s.title} onAdd={onAddToCart} waNumber={whatsappNumber} />
              ))}
              {idx === shown.length - 1 && extraCard}
            </div>
          </section>
        ))}
        {children}
      </main>

      {/* Trust strip */}
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-3 px-4 py-16 text-xs uppercase tracking-[.14em]">
        <span>Free delivery</span><span>Easy returns</span><span>Secure payment</span><span>Authentic quality</span>
      </div>
    </div>
  );
}
