"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, MapPin } from "lucide-react";
import profile from "@/data/profile.json";

const roles = [
  "Software Engineer",
  "AI/ML Engineer",
  "Full Stack Developer",
  "Privacy Tech Enthusiast",
];

function TypewriterText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentChar < role.length) {
            setCurrentChar((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentChar > 0) {
            setCurrentChar((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [currentChar, isDeleting, currentRole]);

  return (
    <span className="gradient-text">
      {roles[currentRole].substring(0, currentChar)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-primary ml-0.5 align-middle"
      />
    </span>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: `rgba(${Math.random() > 0.5 ? "34, 211, 238" : "168, 85, 247"}, ${Math.random() * 0.4 + 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden grid-bg"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px]" />

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Open to opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-6 text-xl font-medium sm:text-2xl md:text-3xl"
        >
          <TypewriterText />
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg"
        >
          {profile.summary}
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-8 flex items-center justify-center gap-2 text-sm text-foreground/40"
        >
          <MapPin size={14} />
          <span>{profile.location}</span>
          <span className="mx-2">•</span>
          <span>{profile.education.university}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <a
            href="#projects"
            className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300"
          >
            View Projects
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, href: profile.github, label: "GitHub" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="group rounded-xl p-3 text-foreground/40 transition-all duration-300 hover:bg-white/5 hover:text-primary"
            >
              <Icon
                size={22}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/30 transition-colors hover:text-primary"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}
