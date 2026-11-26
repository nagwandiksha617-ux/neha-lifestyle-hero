import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { pageSeo, shareImageUrl } from "@/lib/seo";
import { articleJsonLd, blogBreadcrumb, blogPostPath, blogPosts, breadcrumbJsonLd } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found — NEHA Lifestyle" }, { name: "robots", content: "noindex" }] };
    const { post } = loaderData;
    const seo = pageSeo({
      path: blogPostPath(params.slug),
      title: `${post.title} | NEHA Lifestyle`,
      description: post.excerpt,
      type: "article",
      image: post.image ? shareImageUrl(post.image.src) : undefined,
    });
    return {
      ...seo,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd(post)) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd(blogBreadcrumb(post))) },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-wine">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-wine underline-offset-4 hover:underline">Back to Blog</Link>
    </main>
  ),
  errorComponent: () => <main className="px-6 py-24 text-center"><p className="text-foreground/70">This article could not be loaded.</p></main>,
  component: BlogArticle,
});

function BlogArticle() {
  const { post } = Route.useLoaderData();
  return <BlogArticleContent post={post} />;
}
