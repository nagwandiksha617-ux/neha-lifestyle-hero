import { Link } from "@tanstack/react-router";

export function CollectionBreadcrumb({ current, centered = false }: { current: string; centered?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-5 flex flex-wrap items-center gap-2 text-xs text-foreground/75 ${centered ? "justify-center" : ""}`}>
      <Link to="/" className="transition-colors hover:text-wine">Home</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="font-medium text-wine">{current}</span>
    </nav>
  );
}