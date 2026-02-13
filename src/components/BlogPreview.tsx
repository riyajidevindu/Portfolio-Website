"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  published: boolean;
}

interface BlogPreviewProps {
  posts: Post[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const publishedPosts = posts.filter((p) => p.published).slice(0, 3);

  if (publishedPosts.length === 0) return null;

  return (
    <section id="blog" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Latest <span className="gradient-text">Blog Posts</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <p className="mx-auto mt-4 max-w-lg text-foreground/50">
              Thoughts on AI, software engineering, and emerging technologies
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="glass glass-hover glow-hover group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
                >
                  {/* Gradient accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-pink-500 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Date */}
                    <div className="mb-3 flex items-center gap-2 text-xs text-foreground/40">
                      <Calendar size={12} />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground/50">
                      {post.excerpt}
                    </p>

                    {/* Tags & Read more */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Tag size={12} className="text-foreground/30" />
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary/60 transition-colors duration-300 group-hover:text-primary">
                        Read more
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground/60 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              View All Posts
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
