import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import clutchImage from "../assets/neha-golden-clutch.png";
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
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(270deg,var(--hero-veil-strong)_0%,var(--hero-veil)_40%,var(--hero-veil-soft)_72%,var(--hero-veil-clear)_100%)] max-lg:bg-[linear-gradient(180deg,var(--hero-veil-strong)_0%,var(--hero-veil)_55%,var(--hero-veil-soft)_100%)]" />

        <div className="mx-auto grid w-[min(92%,88rem)] flex-1 grid-cols-1 items-center gap-6 py-8 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:py-10">
          {/* Clutch — left on desktop, below text on mobile */}
          <div className="relative order-2 flex items-end justify-center lg:order-1 lg:h-full">
            <div className="relative flex items-end justify-center">
              <img
                src={clutchImage}
                alt="NEHA Lifestyle golden ornate clutch with pearls and gemstones"
                className="relative z-10 max-h-[42vh] w-auto object-contain drop-shadow-[0_18px_22px_var(--product-shadow)] sm:max-h-[52vh] lg:max-h-[72vh]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 h-5 w-[70%] -translate-x-1/2 rounded-[50%] bg-foreground/25 blur-xl"
              />
            </div>
          </div>

          {/* Logo + text — right */}
          <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            <img
              src={logoAsset.url}
              alt="NEHA Lifestyle"
              width={220}
              height={130}
              className="h-24 w-40 rounded-sm object-cover shadow-sm sm:h-28 sm:w-48 lg:h-32 lg:w-56"
            />
            <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-foreground/70 sm:text-xs">
              Bags <span className="mx-2 text-gold">|</span> Jewellery{" "}
              <span className="mx-2 text-gold">|</span> Your Style, Always
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,5.2rem)] font-normal leading-[1.02] text-foreground sm:mt-8">
              Where Elegance Meets
              <br />
              <span className="italic text-rose">Everyday Luxury</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-foreground/75 sm:mt-6 sm:text-lg">
              Discover Bags &amp; Jewellery Made to Make You Shine
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4 lg:justify-start">
              <a
                href="#shop"
                className="inline-flex min-h-12 items-center gap-2 bg-wine px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-foreground shadow-[0_10px_24px_-12px_var(--wine)] ring-1 ring-gold/40 transition-colors hover:bg-rose"
              >
                Shop Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#collection"
                className="inline-flex min-h-12 items-center border border-foreground/30 bg-background/60 px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              >
                Explore Collection
              </a>
            </div>
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
    </main>
  );
}
