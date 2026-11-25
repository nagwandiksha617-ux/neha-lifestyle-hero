import { pageSeo } from "@/lib/seo";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { bagCategories, findCategory } from "@/lib/categories";
import { productsForCategoryPage } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryCollection } from "@/components/CategoryCollection";
import { collectionPages } from "@/lib/category-collections";
import { CollectionBreadcrumb } from "@/components/CollectionBreadcrumb";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = findCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Category";
    const desc = loaderData?.category.description ?? "Shop NEHA Lifestyle.";
    const slug = loaderData?.category.slug;
    const seo = pageSeo({ path: slug ? `/category/${slug}` : "/", title: `${name} — NEHA Lifestyle`, description: desc });
    return slug ? seo : { meta: [...seo.meta.filter((m) => !("property" in m && m.property === "og:url")), { name: "robots", content: "noindex" }] };
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
  // Main collections share one reusable layout.
  if (collectionPages[category.slug]) return <CategoryCollection slug={category.slug} />;
  const listed = productsForCategoryPage(category.slug);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <div className="max-w-xl">
        <CollectionBreadcrumb current={category.name} centered />
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">NEHA Lifestyle</p>
        <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">{category.name}</h1>
        <p className="mt-4 text-foreground/75">{category.description}</p>
        {category.slug === "bags" && (
          <nav aria-label="Bag categories" className="mt-8 flex flex-wrap justify-center gap-3">
            {bagCategories.map((c) => (
              <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="inline-flex min-h-11 items-center border border-gold/40 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-wine transition-colors hover:bg-wine/5 hover:text-rose">
                {c.name}
              </Link>
            ))}
          </nav>
        )}
        {listed.length === 0 && category.slug !== "bags" && <p className="mt-8 text-sm text-foreground/60">Our collection is coming soon.</p>}
        <Link to="/" className="mt-8 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-wine hover:text-rose">
          ← Back to home
        </Link>
      </div>
      {listed.length > 0 && (
        <section aria-label={`${category.name} products`} className="mx-auto w-full max-w-7xl">
          <ProductGrid products={listed} />
        </section>
      )}
    </main>
  );
}
