"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import Fireflies from "@/components/Fireflies";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const CARD_ROWS = [
  { label: "ENTRY ZONE", value: "95,800 – 96,400" },
  { label: "FIB 0.618", value: "94,120" },
  { label: "WHALE FLOW", value: "+$18.2M / 4h ▲", green: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const frogRef = useRef<HTMLDivElement>(null);
  const frogBobRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLSpanElement>(null);
  const chompTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // resting = content frame; briefly swap to the open-mouth frame for the bite
  const [chomping, setChomping] = useState(false);

  const handleChomp = useCallback(() => {
    setChomping(true);
    clearTimeout(chompTimer.current);
    chompTimer.current = setTimeout(() => setChomping(false), 420);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
        <div className="bg-grid-fade absolute inset-0" aria-hidden="true" />
        <div className="hero-glow absolute inset-x-0 top-0 h-[600px]" aria-hidden="true" />
        <canvas
          ref={backRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6"
        >
          <motion.div
            variants={item}
            className="glass flex items-center gap-2.5 rounded-full px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-pumple-green" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-pumple-muted">
              Closed beta 2026 — waitlist open
            </span>
          </motion.div>

          <motion.h1
            ref={h1Ref}
            variants={item}
            className="relative mt-7 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Pump Smarter,
            <br />
            <span className="gradient-text">Not Harder.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-pumple-muted"
          >
            Pumple is the arena for crypto traders. Battle your signals head-to-head,
            climb the accuracy leaderboard, and prove your calls against the community —
            with an AI analyst on tap for the deep reads (Fibonacci, Smart Money,
            whale flow, sentiment) whenever you want backup.
          </motion.p>

          {/* Sample analysis card + mascot */}
          <motion.div variants={item} className="relative mt-16 w-full max-w-2xl">
            <div
              ref={frogRef}
              className="absolute -top-[104px] right-4 z-10 w-28 animate-float sm:right-8 sm:w-36"
            >
              <div ref={frogBobRef} className="relative origin-bottom">
                <Image
                  src="/mascot-idle.png"
                  alt="Pumple mascot, a laid-back crowned frog king"
                  width={160}
                  height={160}
                  priority
                  className={`w-full ${chomping ? "opacity-0" : "opacity-100"}`}
                />
                <Image
                  src="/mascot-chomp.png"
                  alt=""
                  aria-hidden="true"
                  width={160}
                  height={160}
                  priority
                  className={`absolute inset-0 w-full ${chomping ? "opacity-100" : "opacity-0"}`}
                />
                {/* Invisible mouth anchor — the tongue reads its live position.
                    Sits inside the bob div so it inherits the squash/stretch. */}
                <span
                  ref={mouthRef}
                  aria-hidden="true"
                  className="absolute h-0 w-0"
                  style={{ left: "37.5%", top: "46.5%" }}
                />
              </div>
            </div>
            <div className="glass overflow-hidden rounded-2xl text-left shadow-glow-lg">
              <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-pumple-red/70" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-pumple-green/70" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-pumple-muted">
                  pumple · BTC/USDT analysis · H4
                </span>
              </div>

              <div className="space-y-4 px-5 py-6 font-mono text-sm sm:px-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-pumple-dim">Bias</span>
                  <span className="rounded-md bg-pumple-green/15 px-2.5 py-1 text-xs font-bold text-pumple-green">
                    LONG
                  </span>
                  <span className="text-xs text-pumple-muted">
                    H4 structure bullish · CHoCH confirmed at 94.6k
                  </span>
                </div>

                {CARD_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-t border-white/5 pt-4"
                  >
                    <span className="text-xs uppercase tracking-wider text-pumple-dim">
                      {row.label}
                    </span>
                    <span className={row.green ? "text-pumple-green" : "text-pumple-text"}>
                      {row.value}
                    </span>
                  </div>
                ))}

                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-pumple-dim">
                      Sentiment
                    </span>
                    <span className="text-pumple-text">72 · Greed</span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full w-[72%] rounded-full bg-gradient-to-r from-pumple-green to-pumple-lime"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <p className="border-t border-white/5 px-5 py-3 text-xs text-pumple-dim sm:px-7">
                Illustration only — not a signal &amp; not financial advice.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <canvas
          ref={frontRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        />
        <Fireflies
          sectionRef={sectionRef}
          backRef={backRef}
          frontRef={frontRef}
          h1Ref={h1Ref}
          frogRef={frogRef}
          frogBobRef={frogBobRef}
          mouthRef={mouthRef}
          onChomp={handleChomp}
        />
      </section>
    </MotionConfig>
  );
}
