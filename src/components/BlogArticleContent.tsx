import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Image as ImageIcon, List } from "lucide-react";
import { blogBreadcrumb, blogCategoryName, type BlogBlock, type BlogPost } from "@/lib/blog";

function ArticleImageSlot({ label, alt, hero = false }: { label: string; alt: string; hero?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${alt} — image to be added`}
      className={`flex w-full flex-col items-center justify-center border border-dashed border-gold/50 bg-card px-6 text-center ${hero ? "aspect-[16/8]" : "aspect-[16/7]"}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
        <ImageIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-wine">{label}</p>
      <p className="mt-2 text-xs text-foreground/60">Image position reserved for the supplied visual</p>
    </div>
  );
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="leading-8 text-foreground/85">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-3 pl-5 leading-7 text-foreground/85">
          {block.items.map((item) => <li key={item} className="list-disc pl-1 marker:text-gold-deep">{item}</li>)}
        </ul>
      );
    case "subheading":
      return <h3 className="pt-3 font-display text-2xl text-wine sm:text-3xl">{block.text}</h3>;
    case "image":
      return <ArticleImageSlot label={block.label} alt={block.alt} />;
    case "table":
      return (
        <div className="overflow-x-auto border border-gold/25 bg-card" role="region" aria-label={block.caption} tabIndex={0}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6">
            <caption className="px-5 py-4 text-left font-display text-xl text-wine">{block.caption}</caption>
            <thead className="bg-muted text-wine">
              <tr>{block.headers.map((header) => <th key={header} scope="col" className="border-b border-gold/25 px-5 py-3 font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gold/15 last:border-0">
                  {row.map((cell, cellIndex) => <td key={cellIndex} className="px-5 py-4 align-top text-foreground/80">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "links":
      return (
        <nav aria-label="Related jewellery collections" className="border-y border-gold/25 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Explore NEHA Lifestyle</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {block.links.map((link) => (
              <Link key={link.slug} to="/category/$slug" params={{ slug: link.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-wine underline-offset-4 hover:underline">
                {link.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      );
  }
}

export function BlogArticleContent({ post }: { post: BlogPost }) {
  const sections = post.sections ?? [];
  const faqs = post.faqs;
  const breadcrumbs = blogBreadcrumb(post);

  return (
    <main className="bg-background px-5 py-10 sm:px-8 sm:py-14">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-foreground/65">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index < breadcrumbs.length - 1 ? (
                <Link to={crumb.path === "/" ? "/" : "/blog"} className="hover:text-wine">{crumb.name}</Link>
              ) : (
                <span aria-current="page" className="font-medium text-wine">{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>

        <header className="mx-auto mt-10 max-w-4xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">{blogCategoryName(post.category)}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-wine sm:text-5xl lg:text-6xl">{post.title}</h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl leading-7 text-foreground/75">{post.excerpt}</p>
        </header>

        <div className="mx-auto mt-10 max-w-5xl">
          {post.image ? (
            <img src={post.image.src} alt={post.image.alt} className="aspect-[16/8] w-full object-cover" />
          ) : (
            <ArticleImageSlot
              label={post.heroPlaceholder?.label ?? "Article hero image"}
              alt={post.heroPlaceholder?.alt ?? post.title}
              hero
            />
          )}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Table of contents" className="border border-gold/25 bg-card p-5">
              <div className="flex items-center gap-2 text-wine">
                <List className="h-4 w-4" aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">Table of Contents</h2>
              </div>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-foreground/75">
                {sections.map((section, index) => (
                  <li key={section.id} className="flex gap-2">
                    <span className="text-gold-deep">{index + 1}.</span>
                    <a href={`#${section.id}`} className="hover:text-wine hover:underline">{section.title}</a>
                  </li>
                ))}
                {faqs && (
                  <li className="flex gap-2">
                    <span className="text-gold-deep">{sections.length + 1}.</span>
                    <a href="#faqs" className="hover:text-wine hover:underline">Frequently Asked Questions</a>
                  </li>
                )}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            {post.body.length > 0 && (
              <div className="space-y-5 leading-8 text-foreground/85">
                {post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            )}

            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mb-12 scroll-mt-28 last:mb-0">
                <h2 id={section.id} className="mb-6 font-display text-3xl text-wine sm:text-4xl">{section.title}</h2>
                <div className="space-y-6">
                  {section.blocks.map((block, index) => <ArticleBlock key={index} block={block} />)}
                </div>
              </section>
            ))}

            {faqs && (
              <section id="faqs" aria-labelledby="faqs-heading" className="mt-12 scroll-mt-28 border-t border-gold/25 pt-10">
                <h2 id="faqs-heading" className="font-display text-3xl text-wine sm:text-4xl">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-6">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-display text-2xl text-wine">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-foreground/85">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
