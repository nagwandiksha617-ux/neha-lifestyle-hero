import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { collectionPages, collectionSections, cardPhotos, type SortKey } from "@/lib/category-collections";
import { BagProductCard } from "@/components/BagProductCard";
import { InformationDialog } from "@/components/SiteChrome";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CatalogueImage } from "@/components/CatalogueImage";

const trust = [
  { icon: Truck, label: "Free Delivery" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: BadgeCheck, label: "Authentic Quality" },
];
const scrollTo = (id: string) => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));

export function CategoryCollection({ slug }: { slug: string }) {
  const page = collectionPages[slug];
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("best");
  const [topic, setTopic] = useState<string | null>(null);
  const sections = useMemo(() => collectionSections(slug, sort), [slug, sort]);
  if (!page) return null;
  const first = sections[0]?.items[0];
  const hero = first ? cardPhotos(first).main : undefined;
  const go = (s: string) => { setFilter(s); scrollTo(s === "all" ? "collection-products" : `section-${s}`); };

  return (
    <main className="bg-background">
      <section aria-label={`${page.label} collection`} className="border-b border-gold/20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-12 lg:py-16">
          <div className="text-center lg:text-left">
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground/75 lg:justify-start">
              <Link to="/" className="hover:text-wine">Home</Link><span aria-hidden="true">/</span>
              <a href="/#shop-by-category" className="hover:text-wine">Shop</a><span aria-hidden="true">/</span>
              <span aria-current="page" className="font-medium text-wine">{page.crumb}</span>
            </nav>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-deep">{page.eyebrow ?? `NEHA Lifestyle · ${page.label} Collection`}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">{page.title} <em className={page.eyebrow ? "text-wine" : "block text-wine"}>{page.accent}</em></h1>
            <p className="mt-5 text-sm text-foreground/75 sm:text-base">{page.tagline}</p>
            <Button asChild className="mt-7 min-h-12 rounded-sm bg-wine px-8 text-xs font-semibold uppercase tracking-[0.2em] text-wine-foreground hover:bg-rose">
              <a href="#collection-products" onClick={(e) => { e.preventDefault(); go("all"); }}>{page.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            </Button>
          </div>
          {hero && (
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-sm bg-card shadow-lg ring-1 ring-gold/40">
                <CatalogueImage src={hero.src} alt={hero.alt} loading="eager" className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      {sections.length > 1 && (
        <section aria-label={`${page.label} categories`} className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {sections.map((s) => {
              const img = cardPhotos(s.items[0]!).main!;
              return (
                <li key={s.slug}>
                  <button type="button" onClick={() => go(s.slug)} className="group flex flex-col items-center text-center">
                    <span className="block h-36 w-28 overflow-hidden rounded-t-[999px] rounded-b-sm bg-card ring-1 ring-gold/40 sm:h-44 sm:w-36">
                      <CatalogueImage src={img.src} alt={img.alt} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
                    </span>
                    <span className="mt-3 font-display text-lg text-foreground group-hover:text-wine">{s.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section id="collection-products" aria-label={`Shop ${page.label}`} className="scroll-mt-24 pb-16">
        <div className="sticky top-[79px] z-30 border-y border-gold/20 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-8 lg:px-12">
            <div role="group" aria-label={`Filter ${page.label}`} className="flex flex-wrap gap-2">
              {[{ slug: "all", name: "All" }, ...sections].map((f) => (
                <button key={f.slug} type="button" onClick={() => go(f.slug)} aria-pressed={filter === f.slug}
                  className={`min-h-9 rounded-full border px-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${filter === f.slug ? "border-wine bg-wine text-wine-foreground" : "border-gold/40 text-wine hover:bg-wine/5"}`}>
                  {f.name}
                </button>
              ))}
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger aria-label="Sort by" className="h-9 w-48 border-gold/40 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Sort by: Best Sellers</SelectItem>
                <SelectItem value="newest">Sort by: Newest</SelectItem>
                <SelectItem value="price" disabled>Price (coming soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {sections.filter((s) => filter === "all" || s.slug === filter).map((s) => (
            <section key={s.slug} id={`section-${s.slug}`} aria-labelledby={`h-${s.slug}`} className="scroll-mt-40 pt-14">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-gold/20 pb-4">
                <div>
                  <h2 id={`h-${s.slug}`} className="font-display text-3xl text-foreground sm:text-4xl">{s.name}</h2>
                  <p className="mt-1 text-sm text-foreground/70">{s.line}</p>
                </div>
                <Link to="/category/$slug" params={{ slug: s.viewAll }} className="inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-wine hover:text-rose">
                  View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {s.items.map((p) => <BagProductCard key={p.id} product={p} label={s.name} onCart={() => setTopic("Cart")} />)}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section aria-label="Why shop with us" className="border-t border-gold/20 bg-card">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:px-8 lg:grid-cols-4 lg:px-12">
          {trust.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-6 w-6 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-wine">{label}</span>
            </li>
          ))}
        </ul>
      </section>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </main>
  );
}
