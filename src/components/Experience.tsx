"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import profile from "@/data/profile.json";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {profile.experience.map((exp, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.15}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`relative mb-12 flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/50 bg-background"
                  >
                    <Briefcase size={18} className="text-primary" />
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-14 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass glass-hover glow-hover group rounded-2xl p-6 transition-all duration-300"
                  >
                    {/* Period badge */}
                    <div className="mb-3 flex items-center gap-2 text-xs text-foreground/40">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {exp.role}
                    </h3>

                    <div className="mb-4 flex items-center gap-3 text-sm text-foreground/50">
                      <span className="font-medium text-secondary">
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li
                          key={hIndex}
                          className="flex gap-3 text-sm text-foreground/60"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
