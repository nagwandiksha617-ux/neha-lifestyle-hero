import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import heroImage from "../assets/hawa-mahal-hero.jpg";
import logoAsset from "../assets/neha-lifestyle-logo.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEHA Lifestyle — Everyday Luxury" },
      {
        name: "description",
        content: "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
      },
      { property: "og:title", content: "NEHA Lifestyle — Everyday Luxury" },
      {
        property: "og:description",
        content: "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Truck, label: "Pan India Delivery" },
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: Headphones, label: "24/7 Customer Support" },
];

function Index() {
  return (
    <main className="bg-background">
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden">
        <img
          src={heroImage}
          alt="Hawa Mahal in Jaipur at golden hour"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center] blur-[2px] scale-[1.03]"
        />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,var(--hero-veil-strong)_0%,var(--hero-veil)_45%,var(--hero-veil-soft)_100%)]" />

        <div className="mx-auto flex w-[min(92%,60rem)] flex-1 flex-col items-center justify-center py-14 text-center sm:py-20">
          <img
            src={logoAsset.url}
            alt="NEHA Lifestyle"
            width={240}
            height={140}
            className="h-24 w-40 rounded-sm object-cover shadow-sm sm:h-32 sm:w-56"
          />
          <p className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-foreground/70 sm:text-xs">
            Bags <span className="mx-2 text-gold">|</span> Jewellery{" "}
            <span className="mx-2 text-gold">|</span> Your Style, Always
          </p>
          <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.8rem)] font-normal leading-[1.02] text-foreground sm:mt-10">
            Where Elegance Meets
            <br />
            <span className="italic text-rose">Everyday Luxury</span>
          </h1>
          <span className="mt-6 h-px w-16 bg-gold" aria-hidden="true" />
          <p className="mt-6 max-w-md text-sm leading-7 text-foreground/75 sm:text-lg">
            Discover Bags &amp; Jewellery Made to Make You Shine
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            <a
              href="#new-collection"
              className="inline-flex min-h-12 items-center gap-2 bg-wine px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground shadow-[0_10px_24px_-12px_var(--wine)] ring-1 ring-gold/40 transition-colors hover:bg-rose"
            >
              Shop Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#bags"
              className="inline-flex min-h-12 items-center border border-foreground/30 bg-background/60 px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              Explore Collection
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-y-4 bg-wine/90 px-4 py-5 backdrop-blur-sm lg:grid-cols-4 lg:py-6">
          {services.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-wine-foreground sm:text-xs"
            >
              <Icon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.3} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </section>
      {/* Upcoming homepage sections — built separately */}
      {[
        "new-collection",
        "best-sellers",
        "new-arrivals",
        "bags",
        "jewellery",
        "brand-story",
        "reviews",
        "newsletter",
      ].map((id) => (
        <section key={id} id={id} aria-hidden="true" />
      ))}
      <footer id="footer" />
    </main>
  );
}
