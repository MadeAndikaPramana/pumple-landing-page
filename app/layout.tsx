import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pumple — AI Crypto Analyst untuk Trader Indonesia",
  description:
    "Analisis pasar crypto real-time dengan AI. Fibonacci, SMC, Whale Tracking, dan Sentiment — semua dalam satu chat. Pump Smarter, Not Harder.",
  keywords: ["crypto", "AI analyst", "trading", "Indonesia", "Bitcoin", "SMC", "Fibonacci"],
  openGraph: {
    title: "Pumple — Pump Smarter, Not Harder",
    description: "Your AI Crypto Analyst. Available 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0D0D0D] text-[#F5F5F5]`}>
        {children}
      </body>
    </html>
  );
}
