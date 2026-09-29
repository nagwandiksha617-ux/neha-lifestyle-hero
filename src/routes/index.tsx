import { createFileRoute } from "@tanstack/react-router";
import clutchImage from "../assets/neha-golden-clutch.png";
import jalMahalImage from "../assets/jal-mahal-hero.jpg";
import logoAsset from "../assets/neha-lifestyle-logo.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEHA Lifestyle — Everyday Luxury" },
      {
        name: "description",
        content:
          "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
      },
      { property: "og:title", content: "NEHA Lifestyle — Everyday Luxury" },
      {
        property: "og:description",
        content:
          "Discover premium bags and jewellery crafted to bring elegance to every occasion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <section className="relative isolate min-h-screen overflow-hidden">
        <img
          src={jalMahalImage}
          alt="Jal Mahal reflected in Man Sagar Lake, Jaipur"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-30 h-full w-full scale-[1.02] object-cover object-[61%_center] motion-safe:animate-[hero-breathe_18s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,var(--hero-veil-strong)_0%,var(--hero-veil)_42%,var(--hero-veil-soft)_70%,var(--hero-veil-clear)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--hero-top)_0%,transparent_32%,var(--hero-bottom)_100%)]" />

        <header className="mx-auto grid h-24 w-[min(92%,90rem)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-b border-foreground/10 sm:h-28">
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.26em] text-foreground/65 sm:block">
            Jaipur, India
          </span>
          <div className="flex justify-self-start sm:justify-self-center">
            <img
              src={logoAsset.url}
              alt="NEHA Lifestyle"
              width={140}
              height={82}
              className="h-16 w-28 rounded-sm object-cover object-center shadow-sm sm:h-[4.6rem] sm:w-32"
            />
          </div>
          <span className="justify-self-end text-[0.65rem] font-medium uppercase tracking-[0.26em] text-foreground/65">
            Bags · Jewellery
          </span>
        </header>

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] w-[min(92%,90rem)] grid-cols-1 items-center gap-2 pb-10 pt-8 sm:min-h-[calc(100vh-7rem)] sm:gap-8 sm:pb-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(22rem,0.74fr)] lg:pt-0">
          <div className="relative z-10 max-w-[46rem] self-start pt-2 sm:self-center sm:pt-0">
            <p className="mb-4 flex items-center gap-3 text-[0.67rem] font-semibold uppercase tracking-[0.32em] text-accent-foreground sm:mb-6 sm:text-xs">
              <span className="h-px w-9 bg-accent" aria-hidden="true" />
              NEHA Lifestyle
            </p>
            <h1 className="max-w-[13ch] font-display text-[clamp(2.7rem,6.1vw,6.2rem)] font-normal leading-[0.98] text-foreground">
              Where Elegance Meets Everyday Luxury
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/75 sm:mt-7 sm:text-lg sm:leading-8">
              Discover Bags &amp; Jewellery Made to Make You Shine
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
              <a
                href="#shop"
                className="inline-flex min-h-12 items-center justify-center bg-primary px-7 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:px-9"
              >
                Shop Now
              </a>
              <a
                href="#collection"
                className="inline-flex min-h-12 items-center justify-center border border-foreground/40 bg-background/20 px-7 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-background/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:px-9"
              >
                Explore Collection
              </a>
            </div>
          </div>

          <div className="absolute -bottom-3 right-0 flex h-[38vh] w-[50vw] items-center justify-center sm:relative sm:bottom-auto sm:right-auto sm:min-h-[52vh] sm:w-auto sm:self-start lg:min-h-[calc(100vh-9rem)] lg:self-center">
            <div className="absolute bottom-[8%] h-[8%] w-[46%] rounded-[50%] bg-foreground/20 blur-2xl" aria-hidden="true" />
            <img
              src={clutchImage}
              alt="Ornate golden NEHA Lifestyle clutch with emerald and ruby stones and pearl chains"
              width={768}
              height={1152}
              className="relative z-10 max-h-[38vh] w-auto max-w-[48vw] object-contain drop-shadow-[0_22px_24px_var(--product-shadow)] sm:max-h-[62vh] sm:max-w-[46vw] lg:max-h-[74vh] lg:max-w-full"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.6rem] uppercase tracking-[0.24em] text-foreground/55 sm:flex">
          <span className="h-px w-10 bg-foreground/30" />
          An Indian edit
          <span className="h-px w-10 bg-foreground/30" />
        </div>
      </section>
    </main>
  );
}
