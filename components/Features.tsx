"use client";

import { motion, MotionConfig } from "framer-motion";
import { Crosshair, Gauge, Radar, Swords, Trophy, Users } from "lucide-react";

const BATTLE_ROWS = [
  { trader: "@satoshimaxi", call: "LONG", result: "+4.2%", win: true },
  { trader: "@rektradar", call: "SHORT", result: "-1.8%", win: false },
];

const CARDS = [
  {
    icon: Swords,
    title: "Signal Battles",
    desc: "Put your calls on the line and go head-to-head. Two traders, one pair — the market settles who read it right.",
    wide: true,
  },
  {
    icon: Trophy,
    title: "Leaderboard & Tiers",
    desc: "Every winning call earns points. Climb from Shrimp to Whale and let your accuracy rank speak for itself.",
  },
  {
    icon: Radar,
    title: "Whale Radar",
    desc: "Track big on-chain wallets. Moves above $500k surface instantly, so you see where smart money is flowing.",
  },
  {
    icon: Crosshair,
    title: "SMC Bias Detector",
    desc: "Order blocks, BOS, and CHoCH detected automatically — know where smart money sits before you commit.",
  },
  {
    icon: Gauge,
    title: "Sentiment Engine",
    desc: "Crowd signals from X, Binance, and Bybit rolled into one score, so you don't get swept up in the FOMO.",
  },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="fitur" className="relative scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-pumple-green">
              {"// features"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Compete, climb, and analyze.
            </h2>
            <p className="mt-5 text-lg text-pumple-muted">
              Battle other traders and rank up the leaderboard — with AI analysis on tap
              whenever you want the deeper read.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.08 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={item}
                className={`group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition duration-300 hover:border-pumple-green/25 hover:shadow-glow-sm ${
                  card.wide ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pumple-green/10 text-pumple-green">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pumple-muted">{card.desc}</p>

                {card.wide && (
                  <div
                    className="mt-6 space-y-2 rounded-xl bg-black/30 p-4 font-mono text-xs"
                    aria-hidden="true"
                  >
                    {BATTLE_ROWS.map((row) => (
                      <div key={row.trader} className="flex items-center justify-between gap-3">
                        <span className="flex-1 text-pumple-muted">{row.trader}</span>
                        <span className={`w-14 ${row.win ? "text-pumple-green" : "text-pumple-dim"}`}>
                          {row.call}
                        </span>
                        <span className={row.win ? "text-pumple-green" : "text-pumple-red"}>
                          {row.result}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2 text-pumple-dim">
                      <span>WINNER</span>
                      <span className="text-pumple-green">@satoshimaxi ▲</span>
                    </div>
                  </div>
                )}
              </motion.article>
            ))}

            <motion.article
              variants={item}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition duration-300 hover:border-pumple-green/25 hover:shadow-glow-sm sm:col-span-2 sm:flex-row sm:items-center lg:col-span-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pumple-green/10 text-pumple-green">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Follow the top of the board</h3>
                <p className="mt-1 text-sm leading-relaxed text-pumple-muted">
                  Open any ranked trader&apos;s profile to see their live calls and win
                  rate, then follow the ones who actually deliver.
                </p>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
