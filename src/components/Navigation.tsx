"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            <span className="gradient-text">RD</span>
            <span className="text-foreground/60 ml-1 text-sm font-light hidden sm:inline">
              .dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <div className="hidden md:block">
            <a
              href="/CV/Riyaji_Devindu_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-border rounded-lg px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-white/5"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-foreground/60 transition-colors hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "gradient-text"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/CV/Riyaji_Devindu_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              className="gradient-border mt-4 rounded-lg px-6 py-3 text-lg font-medium text-foreground"
            >
              Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
