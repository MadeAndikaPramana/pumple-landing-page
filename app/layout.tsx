import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import ScrollBackdrop from "@/components/ScrollBackdrop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pumple — Community Trading Platform for Crypto",
  description:
    "Battle your signals head-to-head, climb the accuracy leaderboard, and prove your calls against the community — with an AI analyst built in for Fibonacci, SMC, whale tracking, and sentiment. Pump Smarter, Not Harder.",
  keywords: [
    "crypto",
    "trading community",
    "signal battles",
    "leaderboard",
    "AI analyst",
    "trading",
    "Bitcoin",
    "SMC",
    "whale tracking",
  ],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Pumple — Pump Smarter, Not Harder.",
    description:
      "The community trading platform where traders battle signals and climb the leaderboard — with AI analysis built in. Join the beta waitlist.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-pumple-bg font-sans text-pumple-text antialiased`}
      >
        <ScrollBackdrop />
        <div className="ambient" aria-hidden="true">
          <div className="ambient-orb ambient-orb--a" />
          <div className="ambient-orb ambient-orb--b" />
          <div className="ambient-orb ambient-orb--c" />
          <div className="ambient-grain" />
        </div>
        <a
          href="#konten"
          className="sr-only z-[100] rounded-full bg-pumple-green px-5 py-2.5 font-bold text-pumple-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
