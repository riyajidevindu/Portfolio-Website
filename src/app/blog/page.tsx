import Link from "next/link";
import { Calendar, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import posts from "@/data/posts.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Riyaji Devindu",
  description:
    "Read articles about AI, machine learning, software engineering, and emerging technologies by Riyaji Devindu.",
};

export default function BlogPage() {
  const publishedPosts = posts.filter((p) => p.published);

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-foreground/50">
            Thoughts on AI, software engineering, and emerging technologies
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        {publishedPosts.length === 0 ? (
          <div className="text-center text-foreground/40">
            <p className="text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {publishedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="glass glass-hover glow-hover group rounded-2xl p-8 transition-all duration-300">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3 text-xs text-foreground/40">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </span>
                      </div>

                      <h2 className="mb-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                        {post.title}
                      </h2>

                      <p className="mb-4 text-sm leading-relaxed text-foreground/50">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3">
                        <Tag size={12} className="text-foreground/30" />
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium text-primary/60 transition-colors duration-300 group-hover:text-primary">
                      Read
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
