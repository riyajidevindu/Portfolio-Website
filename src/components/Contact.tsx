"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Mail, Send, Github, Linkedin, MapPin, Phone, Loader2, CheckCircle } from "lucide-react";
import profile from "@/data/profile.json";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Create mailto link as fallback (works without backend)
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.open(mailtoLink, "_blank");

    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: "#",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/riyajidevindu",
      href: profile.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: profile.linkedin,
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <p className="mx-auto mt-4 max-w-lg text-foreground/50">
              Have a project in mind or want to collaborate? I&apos;d love to hear
              from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <ScrollReveal className="lg:col-span-2" direction="left">
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Location" ? "_blank" : undefined}
                  rel={item.label !== "Location" ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 4 }}
                  className="glass glass-hover group flex items-center gap-4 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover:bg-primary/20">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal className="lg:col-span-3" direction="right">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  placeholder="What's this about?"
                />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/40">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 sm:w-auto"
              >
                {status === "sending" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {status === "sent" && <CheckCircle size={16} />}
                {status === "idle" && (
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent!"}
                {status === "error" && "Try Again"}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
