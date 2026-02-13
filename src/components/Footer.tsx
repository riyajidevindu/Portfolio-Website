"use client";

import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import profile from "@/data/profile.json";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-black/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">
              <span className="gradient-text">RD</span>
              <span className="text-foreground/40 ml-1 text-sm font-light">
                .dev
              </span>
            </h3>
            <p className="mt-2 max-w-xs text-sm text-foreground/40">
              Software & AI/ML Engineer crafting efficient, real-world systems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground/40">
            {["About", "Skills", "Experience", "Projects", "Blog", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              {
                icon: Mail,
                href: `mailto:${profile.email}`,
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="rounded-lg p-2 text-foreground/30 transition-all duration-200 hover:bg-white/5 hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="flex items-center gap-1 text-xs text-foreground/30" suppressHydrationWarning>
            © {new Date().getFullYear()} {profile.name}. Built with
            <Heart size={12} className="text-pink-400" />
            using Next.js & Tailwind CSS
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-foreground/30 transition-colors duration-200 hover:text-primary"
          >
            Back to top
            <ArrowUp
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
