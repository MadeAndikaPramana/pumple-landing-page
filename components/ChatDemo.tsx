"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { ListChecks, Swords, Trophy, Zap } from "lucide-react";

const POINTS = [
  {
    icon: Zap,
    title: "Answers in seconds, 24/7",
    desc: "Crypto markets never sleep — neither does your analysis.",
  },
  {
    icon: Swords,
    title: "Share it straight to a battle",
    desc: "Turn any answer into a signal you can post to a battle or stake on the leaderboard.",
  },
  {
    icon: ListChecks,
    title: "Every call comes with reasoning",
    desc: "Levels, structure, and on-chain data — not just “buy now”.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const bubble = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

function BotAvatar() {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={28}
      height={28}
      className="mt-1 h-7 w-7 shrink-0 rounded-full"
      aria-hidden="true"
    />
  );
}

export default function ChatDemo() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-pumple-green">
              {"// ai chat"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Casual questions,
              <br />
              analyst-grade answers.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-pumple-muted">
              No more juggling five tabs and second-guessing Telegram calls. Ask in plain
              language, Pumple pulls it all together — then post the result as a signal
              your battles and leaderboard runs are built on.
            </p>

            <ul className="mt-9 space-y-6">
              {POINTS.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pumple-green/10 text-pumple-green">
                    <point.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-pumple-text">{point.title}</p>
                    <p className="mt-1 text-sm text-pumple-muted">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="glass space-y-4 rounded-2xl p-5 sm:p-7"
            >
              <motion.div variants={bubble} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md border border-pumple-green/25 bg-pumple-green/10 px-4 py-3 text-sm leading-relaxed">
                  How&apos;s BTC looking right now? Still ok for an entry?
                </p>
              </motion.div>

              <motion.div variants={bubble} className="flex gap-3">
                <BotAvatar />
                <div className="max-w-[85%] space-y-3 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed">
                  <p>
                    H4 structure is still bullish. CHoCH confirmed at 94.6k, and there&apos;s
                    a fresh order block at 95.1k–95.4k that hasn&apos;t been tapped yet.
                  </p>
                  <div className="space-y-1.5 rounded-lg bg-black/40 p-3 font-mono text-xs text-pumple-muted">
                    <p className="flex justify-between gap-4">
                      <span>FIB 0.618</span>
                      <span className="text-pumple-text">94,120</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>OB ZONE</span>
                      <span className="text-pumple-text">95,100 – 95,400</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>WHALE NET</span>
                      <span className="text-pumple-green">+$18.2M ▲</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>SENTIMENT</span>
                      <span className="text-pumple-text">72 · Greed</span>
                    </p>
                  </div>
                  <p>
                    If you&apos;re entering, the 95.1k–95.4k zone makes the most sense on
                    risk-reward. Want me to set an alert?
                  </p>
                </div>
              </motion.div>

              <motion.div variants={bubble} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md border border-pumple-green/25 bg-pumple-green/10 px-4 py-3 text-sm leading-relaxed">
                  Sure, alert me when price hits the zone.
                </p>
              </motion.div>

              <motion.div variants={bubble} className="flex gap-3">
                <BotAvatar />
                <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed">
                  Done — alert set at 95,400. I&apos;ll ping you the moment price taps the
                  zone.
                </p>
              </motion.div>

              <motion.div
                variants={bubble}
                className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-4"
              >
                <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-pumple-dim">
                  Share this call
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-pumple-green/25 bg-pumple-green/10 px-3 py-1 text-xs font-medium text-pumple-green">
                  <Swords className="h-3.5 w-3.5" aria-hidden="true" />
                  Post to a battle
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-pumple-muted">
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                  Stake on leaderboard
                </span>
              </motion.div>
            </motion.div>
            <p className="mt-3 text-center text-xs text-pumple-dim">
              Interface preview — illustrative data.
            </p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
