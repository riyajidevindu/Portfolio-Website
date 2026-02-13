"use client";

import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import { GraduationCap, Code2, Brain, Trophy } from "lucide-react";
import profile from "@/data/profile.json";

const highlights = [
  {
    icon: Code2,
    label: "Full Stack",
    value: "Java, Python, PHP, Rust",
    color: "text-primary",
  },
  {
    icon: Brain,
    label: "AI & ML",
    value: "LLMs, NLP, Computer Vision",
    color: "text-secondary",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: `GPA ${profile.education.gpa}`,
    color: "text-pink-400",
  },
  {
    icon: Trophy,
    label: "Certifications",
    value: `${profile.certifications.length}+ Certified`,
    color: "text-amber-400",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Profile Image */}
          <ScrollReveal className="lg:col-span-4 flex justify-center" direction="left">
            <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:h-auto lg:aspect-square max-w-[280px]">
              {/* Gradient border frame */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-secondary to-pink-500 p-[2px]">
                <div className="h-full w-full rounded-2xl bg-background" />
              </div>
              {/* Image */}
              <div className="absolute inset-[4px] overflow-hidden rounded-2xl">
                <Image
                  src="/images/Riyaji_Devindu_02.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 256px, 280px"
                />
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-pink-500/10 blur-2xl" />
            </div>
          </ScrollReveal>

          {/* Text Content */}
          <ScrollReveal className="lg:col-span-5" direction="left">
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/70">
                I&apos;m an engineering graduate from the{" "}
                <span className="font-semibold text-foreground">
                  {profile.education.university}
                </span>{" "}
                with a{" "}
                <span className="font-semibold text-foreground">
                  {profile.education.degree}
                </span>
                . My passion lies at the intersection of software engineering
                and artificial intelligence.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/70">
                I specialize in building{" "}
                <span className="text-primary font-medium">
                  privacy-preserving AI systems
                </span>
                ,{" "}
                <span className="text-secondary font-medium">
                  real-time automation platforms
                </span>
                , and{" "}
                <span className="text-pink-400 font-medium">
                  scalable microservices architectures
                </span>
                . From fine-tuning YOLOv8 models for sensitive data detection to
                building WhatsApp automation with Agentic AI — I thrive on
                solving complex, real-world problems.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/70">
                When I&apos;m not coding, you&apos;ll find me leading IEEE
                initiatives, exploring emerging tech like Rust and SLMs, or
                contributing to open-source projects.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats / Highlight Cards */}
          <ScrollReveal className="lg:col-span-3" direction="right">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 0.1}>
                  <div className="glass glass-hover glow-hover group rounded-2xl p-5 text-center transition-all duration-300">
                    <item.icon
                      className={`mx-auto mb-3 ${item.color} transition-transform duration-300 group-hover:scale-110`}
                      size={28}
                    />
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-foreground/40">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground/80">
                      {item.value}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
