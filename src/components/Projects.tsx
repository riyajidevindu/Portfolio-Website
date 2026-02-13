"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ExternalLink, Github, ChevronRight, Sparkles } from "lucide-react";
import profile from "@/data/profile.json";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featured = profile.projects.filter((p) => p.featured);
  const displayProjects = showAll ? profile.projects : featured;

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <p className="mx-auto mt-4 max-w-lg text-foreground/50">
              A selection of projects that showcase my expertise in AI, privacy
              tech, and full-stack development
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {displayProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <motion.div
                  layout
                  whileHover={{ y: -6 }}
                  className="glass glass-hover glow-hover group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
                >
                  {/* Gradient top accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-pink-500" />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                        <Sparkles size={20} />
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-foreground/30 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
                            aria-label="GitHub"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-foreground/30 transition-all duration-200 hover:bg-white/5 hover:text-primary"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground/50">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-primary/15 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </div>

        {/* Show All Button */}
        {profile.projects.length > featured.length && (
          <ScrollReveal>
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground/60 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                {showAll ? "Show Featured" : "View All Projects"}
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${showAll ? "rotate-90" : "group-hover:translate-x-1"}`}
                />
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
