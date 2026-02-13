import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts
    .filter((p) => p.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Riyaji Devindu`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.published);

  if (!post) {
    notFound();
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="mb-4 mt-10 text-2xl font-bold text-foreground"
          >
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="mb-3 mt-8 text-xl font-semibold text-foreground"
          >
            {block.replace("### ", "")}
          </h3>
        );
      }
      return (
        <p
          key={i}
          className="mb-4 text-base leading-relaxed text-foreground/70"
        >
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            All Posts
          </Link>

          <div className="mt-4 flex items-center gap-3 text-sm text-foreground/40">
            <Calendar size={14} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-foreground/50">{post.excerpt}</p>

          <div className="mt-6 flex items-center gap-2">
            <Tag size={14} className="text-foreground/30" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
