import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://glitchsync.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GlitchSync | Agile Software Development & Vibe Coding Agency",
    template: "%s | GlitchSync",
  },
  description:
    "GlitchSync is a creative software agency specialising in vibe coding, mobile apps, art & craft, and agile scrum delivery. Ship products that feel alive.",
  keywords: [
    "agile software development",
    "vibe coding",
    "mobile app development",
    "scrum management",
    "creative agency",
    "Next.js",
    "React",
  ],
  authors: [{ name: "GlitchSync", url: siteUrl }],
  openGraph: {
    title: "GlitchSync | Agile Software Development & Vibe Coding Agency",
    description:
      "Creative software agency delivering vibe-coded projects, mobile apps, and agile scrum management.",
    url: siteUrl,
    siteName: "GlitchSync",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlitchSync | Agile Software Development & Vibe Coding Agency",
    description:
      "Creative software agency delivering vibe-coded projects, mobile apps, and agile scrum management.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GlitchSync",
  url: siteUrl,
  description:
    "Agile software development agency specialising in vibe coding, mobile apps, art & craft projects, and scrum management.",
  serviceType: [
    "Software Development",
    "Mobile App Development",
    "Agile Scrum Management",
    "Creative Coding",
    "Art & Craft Technology",
  ],
  areaServed: "Worldwide",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full antialiased">
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
