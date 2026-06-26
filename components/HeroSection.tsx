"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PARTICLES = [
  { top: "18%", left: "8%", size: 3, delay: 0, dur: 7 },
  { top: "72%", left: "5%", size: 2, delay: 1.5, dur: 9 },
  { top: "40%", left: "12%", size: 4, delay: 3, dur: 6 },
  { top: "85%", left: "18%", size: 2, delay: 0.5, dur: 8 },
  { top: "25%", left: "88%", size: 3, delay: 2, dur: 7 },
  { top: "60%", left: "92%", size: 2, delay: 4, dur: 10 },
  { top: "10%", left: "75%", size: 4, delay: 1, dur: 6 },
  { top: "80%", left: "80%", size: 2, delay: 3.5, dur: 8 },
  { top: "50%", left: "3%", size: 3, delay: 2.5, dur: 9 },
  { top: "30%", left: "55%", size: 2, delay: 0.8, dur: 7 },
  { top: "68%", left: "48%", size: 3, delay: 5, dur: 8 },
  { top: "15%", left: "42%", size: 2, delay: 2.2, dur: 6 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid" style={{ backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Radial hero glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(74,222,128,0.14) 0%, transparent 65%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(163,230,53,0.05) 0%, transparent 55%)" }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? "#4ADE80" : i % 3 === 1 ? "#A3E635" : "#86EFAC",
            boxShadow: `0 0 ${p.size * 4}px ${p.size}px ${i % 3 === 0 ? "rgba(74,222,128,0.8)" : "rgba(163,230,53,0.8)"}`,
          }}
          animate={{
            y: [0, -(p.size * 8 + 20), 0],
            x: [0, p.size * 5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center py-20 lg:py-28">

          {/* Left — Copy */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/8"
            >
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-xs font-semibold text-[#4ADE80] tracking-wide uppercase">
                AI Crypto Analyst — Now in Beta
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight mb-6"
            >
              Your{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #4ADE80 0%, #A3E635 50%, #86EFAC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(74,222,128,0.4))",
                }}
              >
                AI Crypto
              </span>
              <br />
              Analyst.{" "}
              <span className="text-[#6B7280]">Available</span>
              <br />
              <span className="text-[#F5F5F5]">24/7.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl mb-10"
            >
              Analisis pasar crypto real-time dengan AI —{" "}
              <span className="text-[#A3E635] font-medium">Fibonacci</span>,{" "}
              <span className="text-[#4ADE80] font-medium">SMC</span>,{" "}
              <span className="text-[#A3E635] font-medium">Whale Tracking</span>, dan{" "}
              <span className="text-[#4ADE80] font-medium">Sentiment</span>, semua dalam satu chat.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(74,222,128,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full bg-[#4ADE80] text-[#0D0D0D] font-bold text-base text-center transition-all duration-200 hover:bg-[#A3E635]"
                style={{ boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}
              >
                🚀 Join Waitlist — Gratis
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.04, borderColor: "rgba(74,222,128,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full border border-white/15 text-[#F5F5F5] font-semibold text-base text-center transition-all duration-200 hover:bg-white/5"
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[
                  "https://ui-avatars.com/api/?name=Andi+S&background=2563EB&color=fff&size=40&rounded=true&bold=true",
                  "https://ui-avatars.com/api/?name=Budi+R&background=7C3AED&color=fff&size=40&rounded=true&bold=true",
                  "https://ui-avatars.com/api/?name=Sari+W&background=DC2626&color=fff&size=40&rounded=true&bold=true",
                  "https://ui-avatars.com/api/?name=Deni+P&background=D97706&color=fff&size=40&rounded=true&bold=true",
                ].map((url, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0D0D0D] overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={url}
                      width={40}
                      height={40}
                      alt={["Andi S", "Budi R", "Sari W", "Deni P"][i]}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#6B7280]">
                <span className="text-[#F5F5F5] font-semibold">1,200+</span> trader sudah daftar
              </p>
            </motion.div>
          </div>

          {/* Right — Mascot */}
          <div className="flex flex-col items-center lg:items-end gap-3">

            {/* Mascot + 4 cards container */}
            <div className="relative w-[340px] h-[380px] flex items-center justify-center">

              {/* Glow backdrop */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(74,222,128,0.15) 0%, transparent 65%)" }}
              />

              {/* Pulsing concentric rings */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 220, height: 220, border: "1px solid rgba(74,222,128,0.18)" }}
                animate={{ scale: [1, 1.13, 1], opacity: [0.18, 0.05, 0.18] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 280, height: 280, border: "1px solid rgba(74,222,128,0.09)" }}
                animate={{ scale: [1, 1.09, 1], opacity: [0.12, 0.03, 0.12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              />

              {/* Rotating orbit rings */}
              <motion.div
                className="absolute w-72 h-72 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(74,222,128,0.08)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-56 h-56 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(163,230,53,0.06)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />

              {/* Frog mascot */}
              <motion.div
                animate={{ y: [0, -16, 0], rotate: [0, 2, 0, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
                style={{ filter: "drop-shadow(0 20px 40px rgba(74,222,128,0.28))" }}
              >
                <Image
                  src="/mascot.png"
                  width={240}
                  height={240}
                  alt="Pumple mascot"
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
                  priority
                />
              </motion.div>

              {/* Card 1 — Top Left: SMC Analysis */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-2 left-0 z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p className="text-[10px] text-[#6B7280] mb-1">SMC Analysis</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse flex-shrink-0" />
                    <p className="text-xs font-semibold text-[#F5F5F5]">CHoCH terdeteksi</p>
                  </div>
                  <p className="text-[10px] text-[#A3E635] mt-0.5">FVG: $42,100 – $42,450</p>
                </motion.div>
              </motion.div>

              {/* Card 2 — Top Right: BTC Sentiment */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-2 right-0 z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="rounded-xl px-3 py-2.5 flex items-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#4ADE80]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280]">BTC Sentiment</p>
                    <p className="text-xs font-bold text-[#4ADE80]">68% Bullish 📈</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 3 — Bottom Left: Whale Alert */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-2 left-0 z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[11px]">🐋</span>
                    <p className="text-[10px] text-[#6B7280]">Whale Alert</p>
                  </div>
                  <p className="text-xs font-semibold text-[#F5F5F5]">1,240 BTC moved</p>
                  <span
                    className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(239,68,68,0.12)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      color: "#EF4444",
                    }}
                  >
                    SELL PRESSURE
                  </span>
                </motion.div>
              </motion.div>

              {/* Card 4 — Bottom Right: Fibonacci */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-2 right-0 z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[11px]">📐</span>
                    <p className="text-[10px] text-[#6B7280]">Fibonacci</p>
                  </div>
                  <p className="text-xs font-semibold text-[#F5F5F5]">61.8% • $41,200</p>
                  <span
                    className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(74,222,128,0.12)",
                      border: "1px solid rgba(74,222,128,0.25)",
                      color: "#4ADE80",
                    }}
                  >
                    STRONG ZONE
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Live ticker */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="w-[340px] overflow-hidden rounded-lg flex items-center gap-2 px-3 py-2"
              style={{
                background: "rgba(74,222,128,0.04)",
                border: "1px solid rgba(74,222,128,0.12)",
              }}
            >
              <span className="text-[9px] font-bold text-[#4ADE80] tracking-widest uppercase flex-shrink-0">LIVE</span>
              <div className="w-px h-3 flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="overflow-hidden flex-1">
                <motion.div
                  className="flex gap-5 whitespace-nowrap text-[11px] font-mono"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {/* First copy */}
                  <span className="text-[#6B7280]">BTC <span className="text-[#D1D5DB]">$67,420</span> <span className="text-[#4ADE80]">▲2.3%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">ETH <span className="text-[#D1D5DB]">$3,821</span> <span className="text-[#4ADE80]">▲1.1%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">SOL <span className="text-[#D1D5DB]">$142</span> <span className="text-[#EF4444]">▼0.4%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">BNB <span className="text-[#D1D5DB]">$568</span> <span className="text-[#4ADE80]">▲0.8%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">DOGE <span className="text-[#D1D5DB]">$0.142</span> <span className="text-[#EF4444]">▼1.2%</span></span>
                  <span className="text-[#374151]">•</span>
                  {/* Duplicate for seamless loop */}
                  <span className="text-[#6B7280]">BTC <span className="text-[#D1D5DB]">$67,420</span> <span className="text-[#4ADE80]">▲2.3%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">ETH <span className="text-[#D1D5DB]">$3,821</span> <span className="text-[#4ADE80]">▲1.1%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">SOL <span className="text-[#D1D5DB]">$142</span> <span className="text-[#EF4444]">▼0.4%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">BNB <span className="text-[#D1D5DB]">$568</span> <span className="text-[#4ADE80]">▲0.8%</span></span>
                  <span className="text-[#374151]">•</span>
                  <span className="text-[#6B7280]">DOGE <span className="text-[#D1D5DB]">$0.142</span> <span className="text-[#EF4444]">▼1.2%</span></span>
                  <span className="text-[#374151]">•</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-[#6B7280]">Scroll</span>
        <svg className="w-4 h-4 text-[#4ADE80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
