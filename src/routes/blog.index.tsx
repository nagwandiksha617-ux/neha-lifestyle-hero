import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { blogCategories, blogCategoryName, blogPosts, type BlogCategorySlug, type BlogPost } from "@/lib/blog";

const description = "The NEHA Lifestyle journal: styling tips, bag and jewellery guides and fashion notes from Jaipur.";

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): { category?: string } =>
    typeof search["category"] === "string" ? { category: search["category"] } : {},
  head: () => pageSeo({ path: "/blog", title: "Blog — Styling Tips, Bags & Jewellery | NEHA Lifestyle", description }),
  component: BlogPage,
});

function PostCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  return (
    <article className={`group flex flex-col overflow-hidden border border-gold/25 bg-card ${large ? "md:grid md:grid-cols-2" : ""}`}>
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block aspect-[4/3] overflow-hidden bg-muted">
        {post.image ? (
          <img src={post.image.src} alt={post.image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center border border-dashed border-gold/40 bg-card px-6 text-center">
            <ImageIcon className="h-7 w-7 text-gold-deep" aria-hidden="true" />
            <span className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-wine">Article image to be added</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">{blogCategoryName(post.category)}</p>
        <h3 className={`mt-3 font-display text-wine ${large ? "text-3xl" : "text-2xl"}`}>{post.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-foreground/75">{post.excerpt}</p>
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-wine hover:text-rose">Read More <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

function BlogPage() {
  const { category } = Route.useSearch();
  const active = blogCategories.find((c) => c.slug === category)?.slug as BlogCategorySlug | undefined;
  const posts = active ? blogPosts.filter((p) => p.category === active) : blogPosts;
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const chip = "border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors";

  return (
    <main className="bg-background">
      <section className="border-b border-gold/25 px-6 py-16 text-center sm:py-20">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">The NEHA Journal</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl text-wine sm:text-5xl">NEHA Lifestyle Blog: Bags, Jewellery &amp; Styling Tips</h1>
        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-foreground/75">Ideas for wearing and pairing your favourite bags and jewellery, plus fashion notes inspired by Jaipur.</p>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <nav aria-label="Blog categories" className="flex flex-wrap justify-center gap-3">
          <Link to="/blog" className={`${chip} ${!active ? "border-wine bg-wine text-wine-foreground" : "border-gold/40 text-foreground hover:border-wine hover:text-wine"}`}>All</Link>
          {blogCategories.map((c) => (
            <Link key={c.slug} to="/blog" search={{ category: c.slug }} className={`${chip} ${active === c.slug ? "border-wine bg-wine text-wine-foreground" : "border-gold/40 text-foreground hover:border-wine hover:text-wine"}`}>{c.name}</Link>
          ))}
        </nav>

        <section aria-labelledby="featured-heading" className="mt-14">
          <h2 id="featured-heading" className="font-display text-3xl text-wine">Featured Story</h2>
          <div className="mt-6">
            {featured ? <PostCard post={featured} large /> : (
              <div className="border border-dashed border-gold/50 px-6 py-14 text-center">
                <p className="font-display text-2xl text-wine">Our first story is coming soon</p>
                <p className="mt-2 text-sm text-foreground/70">New articles will appear here as soon as they are published.</p>
              </div>
            )}
          </div>
        </section>

        {(rest.length > 0 || !featured) && (
          <section aria-labelledby="latest-heading" className="mt-16">
            <h2 id="latest-heading" className="font-display text-3xl text-wine">{active ? `${blogCategoryName(active)} Articles` : "Latest Articles"}</h2>
            {rest.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
            ) : (
              <p className="mt-4 text-sm text-foreground/70">No articles here yet.</p>
            )}
          </section>
        )}

        <section aria-labelledby="topics-heading" className="mt-16">
          <h2 id="topics-heading" className="font-display text-3xl text-wine">Explore Topics</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {blogCategories.map((c) => (
              <Link key={c.slug} to="/blog" search={{ category: c.slug }} className="border border-gold/25 bg-card p-6 transition-colors hover:border-wine">
                <h3 className="font-display text-2xl text-wine">{c.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">{c.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
