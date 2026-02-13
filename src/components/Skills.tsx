"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import {
  Code2,
  Layers,
  Brain,
  Database,
  Wrench,
  Cpu,
} from "lucide-react";
import profile from "@/data/profile.json";

const categoryIcons: Record<string, React.ElementType> = {
  Languages: Code2,
  Frameworks: Layers,
  "AI & ML": Brain,
  Databases: Database,
  Tools: Wrench,
  Others: Cpu,
};

const categoryColors: Record<string, string> = {
  Languages: "from-cyan-400 to-blue-500",
  Frameworks: "from-purple-400 to-pink-500",
  "AI & ML": "from-amber-400 to-orange-500",
  Databases: "from-emerald-400 to-teal-500",
  Tools: "from-rose-400 to-red-500",
  Others: "from-indigo-400 to-violet-500",
};

const categoryAccent: Record<string, string> = {
  Languages: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
  Frameworks: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  "AI & ML": "bg-amber-400/10 text-amber-400 border-amber-400/20",
  Databases: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  Tools: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  Others: "bg-indigo-400/10 text-indigo-400 border-indigo-400/20",
};

export default function Skills() {
  const skills = profile.skills;

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <p className="mx-auto mt-4 max-w-lg text-foreground/50">
              A comprehensive toolkit honed through real-world projects and
              continuous learning
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items], index) => {
            const Icon = categoryIcons[category] || Code2;
            return (
              <ScrollReveal key={category} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`glass glass-hover group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                    index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Gradient accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${categoryColors[category]} opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className={`rounded-xl p-2.5 ${categoryAccent[category]} border`}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">{category}</h3>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill: string, skillIndex: number) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.03 }}
                        viewport={{ once: true }}
                        className="rounded-lg border border-border bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-foreground/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
