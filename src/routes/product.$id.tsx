import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { productPhotos } from "@/lib/product-card-photos";
import { ProductGallery } from "@/components/ProductGallery";
import { CollectionBreadcrumb } from "@/components/CollectionBreadcrumb";
import { EnquiryButton } from "@/components/EnquiryButton";
import { productPrice } from "@/lib/product-price";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.product.name ?? "Product";
    const desc = loaderData?.product.description ?? `${name} from NEHA Lifestyle.`;
    return {
      meta: [
        { title: `${name} — NEHA Lifestyle` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — NEHA Lifestyle` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-foreground">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-wine">← Back to home</Link>
      </div>
    </main>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const title = p.colour ? `${p.name} — ${p.colour}` : p.name;
  return (
    <main className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-16">
        <div className="rounded-sm bg-card ring-1 ring-gold/20">
          <ProductGallery title={title} photos={productPhotos(p)} />
        </div>
        <div className="text-center lg:text-left">
          <CollectionBreadcrumb current={p.name} />
          <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-deep">{p.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">{p.name}</h1>
          {p.colour && <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">{p.colour}</p>}
          <p className="mt-4 text-lg font-medium text-wine">{productPrice(p)}</p>
          {p.description && <p className="mt-5 text-sm leading-relaxed text-foreground/75">{p.description}</p>}
          <EnquiryButton />
        </div>
      </div>
    </main>
  );
}
