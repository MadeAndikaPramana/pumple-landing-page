"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// ── Types ──────────────────────────────────────────────────────────────────
type Candle = [number, number, number, number, boolean]; // [wickTop, bodyTop, bodyBot, wickBot, green]
type FibLine = { y: number; label: string };
interface BotLine { text: string; bold: boolean; color: string }
interface Scenario {
  userMsg: string;
  tag: string;
  accentColor: string;
  lines: BotLine[];
  candles: Candle[];
  fibLines: FibLine[];
}

// ── Inline candlestick chart ───────────────────────────────────────────────
function CandleChart({ candles, fibLines }: { candles: Candle[]; fibLines: FibLine[] }) {
  const count = candles.length;
  // Spread candles evenly across 280px (10px margin each side)
  const xOf = (i: number) => 10 + (i * 280) / (count - 1);

  return (
    <svg viewBox="0 0 300 95" className="w-full" aria-hidden="true" style={{ height: 76 }}>
      {/* Subtle grid */}
      {[24, 48, 72].map((y) => (
        <line key={y} x1="0" y1={y} x2="300" y2={y}
          stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}

      {/* Fibonacci lines (gold dashed) */}
      {fibLines.map((f, i) => (
        <g key={i}>
          <line
            x1="0" y1={f.y} x2="300" y2={f.y}
            stroke="#EAB308"
            strokeDasharray="4,3"
            strokeWidth="0.9"
            opacity={Math.max(0.85 - i * 0.15, 0.4)}
          />
          <text
            x="3" y={f.y - 2}
            fontSize="6"
            fill="#EAB308"
            opacity={Math.max(0.9 - i * 0.15, 0.4)}
            fontFamily="monospace"
          >
            {f.label}
          </text>
        </g>
      ))}

      {/* Candles */}
      {candles.map(([wickTop, bodyTop, bodyBot, wickBot, green], i) => {
        const x = xOf(i);
        const fill = green ? "#4ADE80" : "#EF4444";
        const bodyH = Math.max(bodyBot - bodyTop, 1.5);
        return (
          <g key={i}>
            <line x1={x} y1={wickTop} x2={x} y2={wickBot}
              stroke={fill} strokeWidth="0.9" opacity="0.85" />
            <rect x={x - 3.5} y={bodyTop} width={7} height={bodyH}
              fill={fill} rx="0.5" opacity="0.95" />
          </g>
        );
      })}
    </svg>
  );
}

// ── Scenario data ──────────────────────────────────────────────────────────
const SCENARIOS: Scenario[] = [
  // ── 1: BTC — SMC Bullish Reversal ───────────────────────────────────────
  {
    userMsg: "Analisis BTC sekarang, ada setup SMC ga?",
    tag: "BTC/USDT",
    accentColor: "#4ADE80",
    lines: [
      { text: "🔍 BTC/USDT — Analisis Lengkap", bold: true, color: "#4ADE80" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "📐 Fibonacci Retracement", bold: true, color: "#A3E635" },
      { text: "  • Support: $41,200 (0.618)", bold: false, color: "#9CA3AF" },
      { text: "  • Target: $44,800 (0.5)", bold: false, color: "#9CA3AF" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "🏗️ SMC Structure", bold: true, color: "#A3E635" },
      { text: "  ✅ CHoCH di $41,850", bold: false, color: "#4ADE80" },
      { text: "  ✅ FVG: $42,100–$42,450", bold: false, color: "#4ADE80" },
      { text: "  ⚠️  BOS $43,200 belum konfirmasi", bold: false, color: "#F59E0B" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "🐋 Whale: Accumulation aktif", bold: false, color: "#60A5FA" },
      { text: "💬 Sentiment: 68% Bullish", bold: false, color: "#C084FC" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "⚡ BUY $41,850–$42,200", bold: true, color: "#4ADE80" },
      { text: "  SL: $40,500  |  TP: $44,800", bold: false, color: "#9CA3AF" },
    ],
    // Downtrend then bullish reversal pattern
    candles: [
      [30, 33, 38, 41, false],
      [33, 36, 42, 46, false],
      [37, 40, 47, 51, false],
      [41, 44, 51, 55, false],
      [45, 49, 57, 61, false],
      [50, 54, 60, 64, false],
      [55, 58, 63, 67, false],
      [58, 61, 65, 68, false],
      [56, 60, 58, 67, true],  // CHoCH reversal
      [52, 57, 53, 62, true],
      [47, 52, 48, 57, true],
      [42, 47, 43, 52, true],
      [36, 41, 37, 47, true],
      [31, 35, 32, 41, true],
      [26, 30, 27, 36, true],
      [22, 26, 23, 31, true],
    ],
    fibLines: [
      { y: 28, label: "0.382" },
      { y: 48, label: "0.5" },
      { y: 63, label: "0.618" },
    ],
  },

  // ── 2: ETH — Bearish Hold Analysis ─────────────────────────────────────
  {
    userMsg: "ETH lagi bearish ga? Worth hold?",
    tag: "ETH/USDT",
    accentColor: "#EF4444",
    lines: [
      { text: "🔍 ETH/USDT — Bearish Analysis", bold: true, color: "#EF4444" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "⚠️ Trend: BEARISH terkonfirmasi", bold: true, color: "#F59E0B" },
      { text: "  Lower Highs + Lower Lows aktif", bold: false, color: "#9CA3AF" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "📐 Fibonacci Resistance", bold: true, color: "#A3E635" },
      { text: "  🔴 0.382: $3,420 (resistance kuat)", bold: false, color: "#EF4444" },
      { text: "  🔴 0.5: $3,150 (breakdown zone)", bold: false, color: "#EF4444" },
      { text: "  🎯 0.618: $2,890 (target drop)", bold: false, color: "#9CA3AF" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "🏗️ SMC: BOS Bearish di $3,520", bold: false, color: "#F59E0B" },
      { text: "  OB (Order Block): $3,420–$3,480", bold: false, color: "#9CA3AF" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "🐋 Whale: Distribusi aktif", bold: false, color: "#60A5FA" },
      { text: "💬 Sentiment: 62% Bearish", bold: false, color: "#C084FC" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "⚡ Worth hold: ❌ Hati-hati!", bold: true, color: "#F59E0B" },
      { text: "  SL jika break $3,200 | Target $2,890", bold: false, color: "#9CA3AF" },
    ],
    // Sustained downtrend
    candles: [
      [15, 18, 23, 27, false],
      [19, 22, 27, 31, false],
      [22, 26, 29, 33, true],   // dead cat bounce
      [20, 24, 29, 33, false],
      [25, 28, 34, 38, false],
      [29, 33, 40, 44, false],
      [35, 38, 45, 49, false],
      [40, 44, 48, 52, true],   // small bounce at 0.5
      [39, 43, 49, 54, false],
      [45, 49, 56, 60, false],
      [52, 55, 62, 66, false],
      [57, 60, 65, 69, false],
      [60, 63, 68, 72, false],
      [63, 66, 72, 76, false],
      [66, 69, 74, 78, true],   // weak bounce
      [67, 72, 77, 82, false],
    ],
    fibLines: [
      { y: 30, label: "0.382" },
      { y: 49, label: "0.5" },
      { y: 65, label: "0.618" },
    ],
  },

  // ── 3: SOL — Fibonacci Setup ─────────────────────────────────────────────
  {
    userMsg: "Ada setup Fibonacci di SOL?",
    tag: "SOL/USDT",
    accentColor: "#A3E635",
    lines: [
      { text: "🔍 SOL/USDT — Fibonacci Setup", bold: true, color: "#A3E635" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "📐 Fibonacci Levels (setup clean!)", bold: true, color: "#A3E635" },
      { text: "  • 0.236: $168 — resistance tipis", bold: false, color: "#9CA3AF" },
      { text: "  • 0.382: $152 — resistance utama", bold: false, color: "#9CA3AF" },
      { text: "  • 0.5:   $140 — zona konsolidasi", bold: false, color: "#9CA3AF" },
      { text: "  🎯 0.618: $128 — support kuat!", bold: false, color: "#4ADE80" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "✅ Setup: Harga retest 0.618", bold: false, color: "#4ADE80" },
      { text: "  Entry ideal: $128–$132", bold: false, color: "#4ADE80" },
      { text: "  Target 1: $152 (0.382)", bold: false, color: "#9CA3AF" },
      { text: "  Target 2: $168 (0.236)", bold: false, color: "#9CA3AF" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "🐋 Whale: Quiet accumulation", bold: false, color: "#60A5FA" },
      { text: "💬 Sentiment: 71% Bullish", bold: false, color: "#C084FC" },
      { text: "─────────────────────────", color: "#374151", bold: false },
      { text: "⚡ BUY $128–$132 | R:R = 1:3.2", bold: true, color: "#4ADE80" },
      { text: "  SL: $122  |  TP1: $152  TP2: $168", bold: false, color: "#9CA3AF" },
    ],
    // Ranging with clear Fibonacci bounces
    candles: [
      [52, 55, 60, 64, false],
      [50, 53, 58, 62, true],
      [46, 50, 55, 59, false],
      [49, 53, 57, 60, true],
      [44, 47, 52, 56, false],
      [48, 52, 56, 59, true],
      [40, 43, 48, 52, true],
      [35, 38, 44, 48, true],
      [33, 36, 41, 45, false],  // rejection at 0.382
      [34, 38, 42, 46, true],
      [30, 33, 38, 42, true],
      [26, 29, 34, 38, true],
      [22, 25, 30, 34, false],  // test of 0.236
      [23, 27, 31, 35, true],
      [20, 23, 28, 33, false],
      [18, 21, 26, 30, true],   // breakout above 0.236
    ],
    fibLines: [
      { y: 20, label: "0.236" },
      { y: 36, label: "0.382" },
      { y: 53, label: "0.5" },
      { y: 68, label: "0.618" },
    ],
  },
];

// ── Main component ─────────────────────────────────────────────────────────
export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoResetKey, setAutoResetKey] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "bot">("idle");
  const [visibleLines, setVisibleLines] = useState(0);

  // Typing animation — resets on every slide change
  useEffect(() => {
    if (!isInView) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    setPhase("idle");
    setVisibleLines(0);

    timers.push(setTimeout(() => {
      if (cancelled) return;
      setPhase("typing");
    }, 450));

    timers.push(setTimeout(() => {
      if (cancelled) return;
      setPhase("bot");
      const maxLines = SCENARIOS[activeIndex].lines.length;
      const addLines = (idx: number) => {
        if (cancelled || idx > maxLines) return;
        setVisibleLines(idx);
        timers.push(setTimeout(() => addLines(idx + 1), 42));
      };
      addLines(1);
    }, 1500));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isInView, activeIndex]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SCENARIOS.length);
    }, 5800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, autoResetKey]);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    setAutoResetKey((k) => k + 1);
  };

  const scenario = SCENARIOS[activeIndex];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Bg accents */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 70%)", transform: "translate(-50%,-50%)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)", transform: "translate(50%,50%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-semibold text-[#4ADE80] tracking-widest uppercase px-3 py-1 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/5">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F5F5] leading-tight">
            Tanya Pumple,{" "}
            <span style={{
              background: "linear-gradient(135deg, #4ADE80 0%, #A3E635 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              dapat analisis lengkap.
            </span>
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-xl mx-auto">
            Cukup tanya dalam bahasa Indonesia. Pumple langsung analisis dan kirim hasilnya.
          </p>
        </motion.div>

        {/* Chat carousel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          {/* Chat window */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(74,222,128,0.06)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#4ADE80]/25 bg-[#4ADE80]/10">
                  <Image
                    src="/logo.png"
                    width={32}
                    height={32}
                    alt="Pumple"
                    className="object-contain w-full h-full"
                    style={{ filter: "brightness(1.3) contrast(1.1)" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F5F5F5]">Pumple AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                    <span className="text-xs text-[#6B7280]">Online</span>
                  </div>
                </div>
              </div>
              {/* Scenario pill */}
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${scenario.accentColor}15`,
                    border: `1px solid ${scenario.accentColor}30`,
                    color: scenario.accentColor,
                  }}
                >
                  {scenario.tag}
                </span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#4ADE80]/60" />
                </div>
              </div>
            </div>

            {/* Chat body — slides */}
            <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 space-y-4"
                  style={{ fontFamily: "'SF Mono','Fira Code',monospace" }}
                >
                  {/* User message */}
                  <div className="flex justify-end items-end gap-2">
                    <div
                      className="max-w-[78%] px-4 py-3 rounded-2xl rounded-tr-sm"
                      style={{
                        background: `linear-gradient(135deg, ${scenario.accentColor}18, ${scenario.accentColor}0D)`,
                        border: `1px solid ${scenario.accentColor}25`,
                      }}
                    >
                      <p
                        className="text-sm text-[#F5F5F5] font-medium"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {scenario.userMsg}
                      </p>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{
                        background: `${scenario.accentColor}20`,
                        border: `1px solid ${scenario.accentColor}35`,
                        color: scenario.accentColor,
                      }}
                    >
                      You
                    </div>
                  </div>

                  {/* Typing indicator */}
                  {phase === "typing" && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-end gap-2"
                    >
                      <div className="w-7 h-7 flex-shrink-0 overflow-hidden rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10">
                        <Image src="/logo.png" width={28} height={28} alt="Pumple"
                          className="object-contain w-full h-full" style={{ filter: "brightness(1.3) contrast(1.1)" }} />
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-tl-sm"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <div className="flex gap-1.5 items-center h-5">
                          {[0, 0.2, 0.4].map((d, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-[#4ADE80]"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Bot response */}
                  {phase === "bot" && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-7 h-7 flex-shrink-0 overflow-hidden rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10">
                        <Image src="/logo.png" width={28} height={28} alt="Pumple"
                          className="object-contain w-full h-full" style={{ filter: "brightness(1.3) contrast(1.1)" }} />
                      </div>
                      <div
                        className="flex-1 px-4 py-4 rounded-2xl rounded-tl-sm"
                        style={{
                          background: "rgba(255,255,255,0.035)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          fontFamily: "'SF Mono','Fira Code','Courier New',monospace",
                        }}
                      >
                        {/* Typed lines */}
                        <div className="text-xs leading-relaxed">
                          {scenario.lines.slice(0, visibleLines).map((line, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.12 }}
                            >
                              <span style={{ color: line.color, fontWeight: line.bold ? 700 : 400 }}>
                                {line.text}
                              </span>
                              <br />
                            </motion.div>
                          ))}
                          {/* Blinking cursor while typing */}
                          {visibleLines > 0 && visibleLines < scenario.lines.length && (
                            <motion.span
                              className="inline-block w-1.5 h-3 bg-[#4ADE80]"
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            />
                          )}
                        </div>

                        {/* Candlestick chart — appears after all lines */}
                        <AnimatePresence>
                          {visibleLines >= scenario.lines.length && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="mt-3 pt-3"
                              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">
                                  Chart Output — {scenario.tag}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                              </div>
                              <div
                                className="rounded-xl overflow-hidden p-2"
                                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}
                              >
                                <CandleChart
                                  candles={scenario.candles}
                                  fibLines={scenario.fibLines}
                                />
                                {/* Legend */}
                                <div className="flex items-center gap-3 mt-1 px-1">
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-sm bg-[#4ADE80]" />
                                    <span className="text-[9px] text-[#6B7280]">Bullish</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-sm bg-[#EF4444]" />
                                    <span className="text-[9px] text-[#6B7280]">Bearish</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-px" style={{ background: "#EAB308", borderTop: "1px dashed #EAB308" }} />
                                    <span className="text-[9px] text-[#6B7280]">Fibonacci</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div
              className="flex items-center gap-3 px-5 py-3.5 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
            >
              <div
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-[#6B7280]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                Tanya apapun tentang market...
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-[#4ADE80] text-[#0D0D0D] flex items-center justify-center flex-shrink-0"
                aria-label="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {SCENARIOS.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Scenario ${i + 1}: ${s.tag}`}
                className="group flex items-center gap-2 transition-all duration-300"
              >
                <motion.div
                  animate={{
                    width: i === activeIndex ? 24 : 8,
                    opacity: i === activeIndex ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-2 rounded-full"
                  style={{ background: i === activeIndex ? s.accentColor : "#6B7280" }}
                />
              </button>
            ))}
          </div>

          {/* Scenario labels */}
          <div className="flex justify-center gap-6 mt-3">
            {SCENARIOS.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="text-xs transition-all duration-200"
                style={{
                  color: i === activeIndex ? s.accentColor : "#4B5563",
                  fontWeight: i === activeIndex ? 600 : 400,
                }}
              >
                {s.tag}
              </button>
            ))}
          </div>

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mt-8"
          >
            {["SMC Analysis", "Fibonacci", "Whale Watch", "Sentiment", "Chart Output", "24/7 Aktif"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.18)",
                  color: "#4ADE80",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
