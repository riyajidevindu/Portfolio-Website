import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";
import prisma from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let profile;
  try {
    profile = await prisma.profile.findFirst();
  } catch (e) {
    console.error("DB error in layout", e);
  }

  const name = profile?.name || "Riyaji Devindu";
  const title = profile?.title || "Software & AI/ML Engineer";
  const description = profile?.bio || "Software & AI/ML Engineer specializing in Full Stack Development, LLMs, Computer Vision, and emerging tech.";

  return {
    title: `${name} | ${title}`,
    description: description,
    keywords: [
      name,
      "Software Engineer",
      "AI Engineer",
      "ML Engineer",
      "Full Stack Developer",
      "Portfolio",
      "React",
      "Next.js"
    ],
    authors: [{ name: name }],
    creator: name,
    openGraph: {
      type: "website",
      locale: "en_US",
      title: `${name} | ${title}`,
      description: description,
      siteName: `${name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description: description,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let profile;
  try {
    profile = await prisma.profile.findFirst();
  } catch (e) {
    console.error("DB error in layout", e);
  }

  const name = profile?.name || "Riyaji Devindu";
  const title = profile?.title || "Software & AI/ML Engineer";
  const github = profile?.github || "https://github.com/riyajidevindu";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/riyaji-samasundara-979b96265/";

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
              name: name,
              jobTitle: title,
              url: "https://riyajidevindu.vercel.app",
              sameAs: [github, linkedin].filter(Boolean),
              image: "https://riyajidevindu.vercel.app/images/Riyaji_Devindu_02.jpg",
              knowsAbout: [
                "Software Engineering",
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise`}
      >
        <div className="aurora-bg" />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
