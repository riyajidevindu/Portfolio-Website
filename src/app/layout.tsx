import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riyaji Devindu | Software & AI/ML Engineer",
  description:
    "Portfolio of Riyaji Devindu — Software & AI/ML Engineer specializing in Full Stack Development, LLMs, Computer Vision, and emerging tech. Based in Sri Lanka.",
  keywords: [
    "Riyaji Devindu",
    "Software Engineer",
    "AI Engineer",
    "ML Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Sri Lanka",
    "Python",
    "Rust",
    "React",
    "LLMs",
    "Computer Vision",
  ],
  authors: [{ name: "Riyaji Devindu" }],
  creator: "Riyaji Devindu",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Riyaji Devindu | Software & AI/ML Engineer",
    description:
      "Software & AI/ML Engineer specializing in Full Stack Development, LLMs, Computer Vision, and privacy-preserving systems.",
    siteName: "Riyaji Devindu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyaji Devindu | Software & AI/ML Engineer",
    description:
      "Software & AI/ML Engineer specializing in Full Stack Development, LLMs, Computer Vision, and privacy-preserving systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#030014" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Riyaji Devindu",
              jobTitle: "Software & AI/ML Engineer",
              url: "https://riyajidevindu.vercel.app",
              sameAs: [
                "https://github.com/riyajidevindu",
                "https://linkedin.com/in/riyajidevindu",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Ruhuna",
              },
              knowsAbout: [
                "Software Engineering",
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development",
                "Computer Vision",
                "Natural Language Processing",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
