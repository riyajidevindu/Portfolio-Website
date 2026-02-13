"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Award, ExternalLink } from "lucide-react";
import profile from "@/data/profile.json";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Certifications &{" "}
              <span className="gradient-text">Leadership</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Certifications */}
          <ScrollReveal direction="left">
            <div className="glass rounded-2xl p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-amber-400/10 p-2.5 text-amber-400 border border-amber-400/20">
                  <Award size={22} />
                </div>
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>

              <div className="space-y-3">
                {profile.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/[0.03]"
                  >
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
                        {cert}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="mt-0.5 flex-shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-primary"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Volunteering & Leadership */}
          <ScrollReveal direction="right">
            <div className="glass rounded-2xl p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary border border-primary/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">
                  Volunteering & Leadership
                </h3>
              </div>

              <div className="space-y-3">
                {profile.volunteering.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/[0.03]"
                  >
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-secondary to-pink-400" />
                    <p className="text-sm font-medium text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
