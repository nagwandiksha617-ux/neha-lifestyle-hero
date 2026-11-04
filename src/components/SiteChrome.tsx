import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Facebook, Heart, Instagram, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { bagCategories, categories } from "@/lib/categories";
import logo from "@/assets/neha-lifestyle-logo.jpeg.asset.json";

// Bags menu temporarily hidden from header navigation only; category pages and data remain intact.
const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/#shop-by-category" },
  { label: "Jewellery", slug: "jewellery" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "About", href: "/#brand-story" },
  { label: "Contact", info: "Contact" },
];

export function InformationDialog({ topic, close }: { topic: string | null; close: () => void }) {
  const descriptions: Record<string, string> = {
    Contact: "Contact details have not been provided yet.",
    "Contact Us": "Contact details have not been provided yet.",
    FAQ: "Frequently asked questions have not been published yet.",
    Shipping: "Shipping information has not been published yet.",
    Returns: "The returns policy has not been published yet.",
    "Order Tracking": "Order tracking is not connected yet.",
    "Privacy Policy": "The privacy policy has not been published yet.",
    "Terms & Conditions": "Terms and conditions have not been published yet.",
    Instagram: "The official Instagram link has not been provided yet.",
    Facebook: "The official Facebook link has not been provided yet.",
    Account: "Account sign-in is not connected yet.",
    Cart: "Checkout and shopping cart are not connected yet.",
  };
  return (
    <Dialog open={topic !== null} onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent className="w-[calc(100%-2rem)] border-gold/25">
        <DialogTitle className="font-display text-3xl font-normal text-wine">{topic}</DialogTitle>
        <DialogDescription className="leading-7 text-foreground/75">{topic ? descriptions[topic] : ""}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const results = categories.filter((category) => `${category.name} ${category.description}`.toLowerCase().includes(query.toLowerCase().trim()));

  function navItems(mobile = false) {
    return navigation.map((item) => {
      const className = mobile
        ? "block border-b border-gold/15 py-4 font-footer text-sm tracking-[0.08em] text-foreground transition-colors hover:text-wine"
        : "relative whitespace-nowrap py-2 font-footer text-[11.5px] font-medium uppercase tracking-[0.14em] text-foreground transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-wine/70 after:transition-transform hover:text-wine hover:after:scale-x-100";
      if (item.slug === "bags") {
        if (mobile) return (
          <div key={item.label}>
            <Link to="/category/$slug" params={{ slug: "bags" }} className={className} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            <ul aria-label="Bag categories" className="border-b border-gold/15 py-2 pl-4">
              {bagCategories.map((c) => <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="block py-2.5 font-footer text-sm tracking-[0.06em] text-foreground/80 transition-colors hover:text-wine" onClick={() => setMenuOpen(false)}>{c.name}</Link></li>)}
            </ul>
          </div>
        );
        return (
          <DropdownMenu key={item.label} modal={false}>
            <DropdownMenuTrigger className={`${className} inline-flex items-center gap-1 outline-none focus-visible:text-wine`}>{item.label}<ChevronDown className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-48 rounded-none border-gold/25 bg-background p-1">
              <DropdownMenuItem asChild className="rounded-none font-footer text-[11.5px] uppercase tracking-[0.14em] text-foreground focus:bg-wine/5 focus:text-wine"><Link to="/category/$slug" params={{ slug: "bags" }}>All Bags</Link></DropdownMenuItem>
              {bagCategories.map((c) => <DropdownMenuItem key={c.slug} asChild className="rounded-none font-footer text-[11.5px] uppercase tracking-[0.14em] text-foreground focus:bg-wine/5 focus:text-wine"><Link to="/category/$slug" params={{ slug: c.slug }}>{c.name}</Link></DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      if (item.slug) return <Link key={item.label} to="/category/$slug" params={{ slug: item.slug }} className={className} onClick={() => setMenuOpen(false)}>{item.label}</Link>;
      if (item.info) return <Button key={item.label} variant="link" className={`${className} h-auto justify-start rounded-none px-0 no-underline hover:no-underline`} onClick={() => { setMenuOpen(false); setTopic(item.info ?? null); }}>{item.label}</Button>;
      return <a key={item.label} href={item.href} className={className} onClick={() => setMenuOpen(false)}>{item.label}</a>;
    });
  }

  const iconClass = "h-9 w-9 rounded-full text-foreground hover:bg-wine/5 hover:text-wine [&_svg]:size-[18px]";
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gold/30 bg-background/95 shadow-[0_1px_0_0_var(--color-blush,transparent)] backdrop-blur-md" aria-label="NEHA Lifestyle header">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 lg:h-[78px] px-4 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className={`${iconClass} min-[960px]:hidden`} aria-label="Open navigation" title="Navigation"><Menu strokeWidth={1.5} /></Button></SheetTrigger>
              <SheetContent side="left" className="w-[min(85vw,24rem)] overflow-y-auto border-gold/25">
                <SheetTitle className="font-display text-2xl font-normal text-wine">NEHA Lifestyle</SheetTitle>
                <SheetDescription className="mt-2 text-xs text-foreground/65">Your Style, Always</SheetDescription>
                <nav aria-label="Mobile navigation" className="mt-8 flex flex-col">{navItems(true)}</nav>
              </SheetContent>
            </Sheet>
            <Link to="/" aria-label="NEHA Lifestyle home" className="shrink-0">
              <img src={logo.url} alt="NEHA Lifestyle" width={108} height={63} className="h-12 w-20 object-contain sm:h-14 sm:w-24" />
            </Link>
          </div>
          <nav aria-label="Main navigation" className="hidden items-center gap-4 min-[960px]:flex xl:gap-7">{navItems()}</nav>
          <div className="flex shrink-0 items-center gap-0 sm:gap-1">
            <Button variant="ghost" size="icon" className={iconClass} aria-label="Search" title="Search" onClick={() => setSearchOpen(true)}><Search strokeWidth={1.5} /></Button>
            <Button variant="ghost" size="icon" asChild className={iconClass}><a href="/#new-arrivals" aria-label="Wishlist" title="Wishlist"><Heart strokeWidth={1.5} /></a></Button>
            <Button variant="ghost" size="icon" className={iconClass} aria-label="Account" title="Account" onClick={() => setTopic("Account")}><UserRound strokeWidth={1.5} /></Button>
            <Button variant="ghost" size="icon" className={iconClass} aria-label="Cart" title="Cart" onClick={() => setTopic("Cart")}><ShoppingBag strokeWidth={1.5} /></Button>
          </div>
        </div>
      </header>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="w-[calc(100%-2rem)] border-gold/25">
          <DialogTitle className="font-display text-3xl font-normal text-wine">Search collections</DialogTitle>
          <DialogDescription className="sr-only">Find bags and jewellery collections.</DialogDescription>
          <label className="relative block">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-wine" aria-hidden="true" />
            <input aria-label="Search collections" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search collections" className="h-11 w-full border border-gold/30 bg-card pl-10 pr-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-wine" />
          </label>
          <ul className="divide-y divide-gold/20">
            {results.map((category) => <li key={category.slug}><Link to="/category/$slug" params={{ slug: category.slug }} onClick={() => setSearchOpen(false)} className="flex items-center justify-between gap-4 py-4 text-sm text-foreground hover:text-rose">{category.name}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></li>)}
          </ul>
          {results.length === 0 && <p className="text-sm text-foreground/70">No collections found.</p>}
        </DialogContent>
      </Dialog>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </>
  );
}

export function SiteFooter() {
  const [topic, setTopic] = useState<string | null>(null);
  const linkClass = "text-sm font-medium leading-7 lg:whitespace-nowrap text-footer-foreground transition-colors hover:text-footer-accent focus-visible:outline focus-visible:outline-gold";
  return (
    <>
      <footer id="footer" className="relative overflow-hidden border-t border-gold/35 bg-[image:var(--gradient-footer)] font-footer text-footer-foreground">
        {["left-0", "right-0 -scale-x-100"].map((pos) => <svg key={pos} aria-hidden="true" viewBox="0 0 160 120" className={`pointer-events-none absolute bottom-0 ${pos} h-28 w-36 text-footer-accent/25 sm:h-36 sm:w-48`} fill="none" stroke="currentColor" strokeWidth="1"><path d="M0 118 C30 90 50 70 60 40 M60 40 C62 25 72 18 80 20 C74 30 68 36 60 40 M38 76 C28 66 26 54 32 46 C40 54 42 66 38 76 M38 76 C52 74 62 80 66 90 C54 92 44 86 38 76 M14 104 C8 92 10 82 16 76 C22 86 20 96 14 104 M14 104 C26 100 36 104 40 112 C30 116 20 112 14 104" /><circle cx="84" cy="14" r="3" /></svg>)}
        <div className="mx-auto grid max-w-7xl relative grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.45fr_1fr_1fr_0.95fr] lg:gap-0 lg:px-12 lg:[&>div+div]:border-l lg:[&>div+div]:border-gold/40 lg:[&>div+div]:pl-7 lg:[&>div]:pr-5">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block" aria-label="NEHA Lifestyle home"><img src={logo.url} alt="NEHA Lifestyle" width={108} height={63} loading="lazy" className="h-14 w-24 object-contain" /></Link>
            <p className="mt-4 font-display text-3xl font-semibold text-footer-accent">NEHA Lifestyle</p>
            <p className="mt-3 text-sm font-medium leading-6 text-footer-foreground">Bags &amp; Jewellery. Your Style, Always.</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-footer-foreground">Discover elegant bags and jewellery designed to add a touch of everyday luxury to your style.</p>
            <div className="mt-5 flex gap-2" aria-label="Social media">
              {[{ label: "Instagram", icon: Instagram }, { label: "Facebook", icon: Facebook }].map(({ label, icon: Icon }) => <Button key={label} variant="ghost" size="icon" aria-label={label} title={label} onClick={() => setTopic(label)} className="h-8 w-8 rounded-full border border-footer-accent/40 text-footer-accent hover:bg-footer-accent/10 hover:text-footer-accent [&_svg]:size-4"><Icon strokeWidth={1.5} /></Button>)}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold leading-none lg:whitespace-nowrap text-footer-accent after:mt-2 after:block after:h-px after:w-8 after:bg-gold">Shop</h2>
            <ul className="mt-4 space-y-1.5">
              {[{ label: "Bags", slug: "bags" }, { label: "Party & Clutch Bags", slug: "party-clutch-bags" }, { label: "Jewellery", slug: "jewellery" }].map((item) => <li key={item.label}><Link to="/category/$slug" params={{ slug: item.slug }} className={linkClass}>{item.label}</Link></li>)}
              <li><a href="/#new-arrivals" className={linkClass}>New Arrivals</a></li>
              <li><a href="/#best-sellers" className={linkClass}>Best Sellers</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold leading-none lg:whitespace-nowrap text-footer-accent after:mt-2 after:block after:h-px after:w-8 after:bg-gold">Customer Care</h2>
            <ul className="mt-4 space-y-1.5">{["Contact Us", "FAQ", "Shipping", "Returns", "Order Tracking"].map((label) => <li key={label}><Button variant="link" onClick={() => setTopic(label)} className={`${linkClass} h-auto whitespace-normal rounded-none p-0 text-left font-normal no-underline hover:no-underline`}>{label}</Button></li>)}</ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold leading-none lg:whitespace-nowrap text-footer-accent after:mt-2 after:block after:h-px after:w-8 after:bg-gold">Company</h2>
            <ul className="mt-4 space-y-1.5">
              <li><a href="/#brand-story" className={linkClass}>About Us</a></li>
              {["Privacy Policy", "Terms & Conditions"].map((label) => <li key={label}><Button variant="link" onClick={() => setTopic(label)} className={`${linkClass} h-auto whitespace-normal rounded-none p-0 text-left font-normal no-underline hover:no-underline`}>{label}</Button></li>)}
            </ul>
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" /></div>
        <div className="relative">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-4 text-center sm:flex-nowrap sm:justify-between sm:px-8 lg:px-12">
            <p className="text-xs font-medium leading-5 text-footer-foreground">© 2026 NEHA Lifestyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </>
  );
}