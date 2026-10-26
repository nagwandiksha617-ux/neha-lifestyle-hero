import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories } from "@/lib/categories";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Category";
    const desc = loaderData?.category.description ?? "Shop NEHA Lifestyle.";
    return {
      meta: [
        { title: `${name} — NEHA Lifestyle` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — NEHA Lifestyle` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-foreground">Category not found</h1>
        <Link to="/" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-wine">
          ← Back to home
        </Link>
      </div>
    </main>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <div className="max-w-xl">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">NEHA Lifestyle</p>
        <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">{category.name}</h1>
        <p className="mt-4 text-foreground/75">{category.description}</p>
        <p className="mt-8 text-sm text-foreground/60">Our collection is coming soon.</p>
        <Link to="/" className="mt-8 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-wine hover:text-rose">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
