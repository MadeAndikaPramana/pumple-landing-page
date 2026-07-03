import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Pumple — AI Crypto Analyst untuk Trader Indonesia",
  description:
    "Tanya apa aja soal pasar crypto, dijawab kayak analis pribadi: Fibonacci, SMC, whale tracking, dan sentimen — dalam satu chat Bahasa Indonesia. Pump Smarter, Not Harder.",
  keywords: [
    "crypto",
    "AI analyst",
    "trading",
    "Indonesia",
    "Bitcoin",
    "SMC",
    "Fibonacci",
    "whale tracking",
  ],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Pumple — Pump Smarter, Not Harder.",
    description:
      "AI crypto analyst yang jawab pertanyaan tradingmu 24/7. Gabung waitlist beta.",
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
    <html lang="id" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-pumple-bg font-sans text-pumple-text antialiased`}
      >
        <a
          href="#konten"
          className="sr-only z-[100] rounded-full bg-pumple-green px-5 py-2.5 font-bold text-pumple-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Langsung ke konten
        </a>
        {children}
      </body>
    </html>
  );
}
