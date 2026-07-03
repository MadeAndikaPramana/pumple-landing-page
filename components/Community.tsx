"use client";

import { motion, MotionConfig } from "framer-motion";
import { Crown, Flame, Swords, Trophy } from "lucide-react";

const STATS = [
  { value: "12,480", label: "Traders in the arena" },
  { value: "3,201", label: "Battles this week" },
  { value: "68%", label: "Top-tier hit rate" },
];

const BATTLE = {
  pair: "BTC/USDT",
  timeframe: "H4",
  left: { handle: "@satoshimaxi", tier: "Whale", call: "LONG", entry: "95,180", pnl: "+4.2%", up: true, votes: 312 },
  right: { handle: "@rektradar", tier: "Shark", call: "SHORT", entry: "95,400", pnl: "-1.8%", up: false, votes: 128 },
};

const LEADERS = [
  { rank: 1, handle: "@satoshimaxi", tier: "Whale", acc: "78%", streak: 9 },
  { rank: 2, handle: "@lunahodl", tier: "Shark", acc: "74%", streak: 5 },
  { rank: 3, handle: "@zerofomo", tier: "Dolphin", acc: "71%", streak: 4 },
  { rank: 4, handle: "@candlewick", tier: "Dolphin", acc: "69%", streak: 2 },
  { rank: 5, handle: "@degenape", tier: "Fish", acc: "66%", streak: 3 },
];

const TIER_CLASS: Record<string, string> = {
  Whale: "bg-pumple-green/15 text-pumple-green",
  Shark: "bg-pumple-lime/15 text-pumple-lime",
  Dolphin: "bg-white/10 text-pumple-text",
  Fish: "bg-white/[0.06] text-pumple-muted",
  Shrimp: "bg-white/[0.06] text-pumple-dim",
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Avatar({ handle, className = "" }: { handle: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pumple-green/30 to-pumple-lime/20 font-bold text-pumple-text ${className}`}
    >
      {handle.charAt(1).toUpperCase()}
    </span>
  );
}

function TierPill({ tier }: { tier: string }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${TIER_CLASS[tier]}`}
    >
      {tier}
    </span>
  );
}

export default function Community() {
  const totalVotes = BATTLE.left.votes + BATTLE.right.votes;
  const leftPct = Math.round((BATTLE.left.votes / totalVotes) * 100);

  const traders = [BATTLE.left, BATTLE.right] as const;

  return (
    <MotionConfig reducedMotion="user">
      <section id="community" className="relative scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-pumple-green">
              {"// community"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              See the community in action.
            </h2>
            <p className="mt-5 text-lg text-pumple-muted">
              Traders put their calls on the line in live signal battles and climb an
              accuracy leaderboard. Your reputation is your track record — nothing else.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl px-5 py-3 text-center"
              >
                <p className="font-mono text-xl font-bold text-pumple-green">{stat.value}</p>
                <p className="mt-0.5 text-xs text-pumple-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid items-start gap-5 lg:grid-cols-2"
          >
            {/* Live signal battle */}
            <motion.article
              variants={item}
              className="glass overflow-hidden rounded-2xl shadow-glow-sm"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-pumple-red" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-pumple-red">
                    Live battle
                  </span>
                </span>
                <span className="font-mono text-xs text-pumple-muted">
                  {BATTLE.pair} · {BATTLE.timeframe}
                </span>
              </div>

              <div className="relative grid grid-cols-2">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-pumple-surface text-pumple-dim"
                >
                  <Swords className="h-4 w-4" />
                </span>

                {traders.map((t, i) => (
                  <div
                    key={t.handle}
                    className={`space-y-3 px-5 py-6 ${i === 0 ? "border-r border-white/5" : ""}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar handle={t.handle} className="h-9 w-9 text-sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-pumple-text">
                          {t.handle}
                        </p>
                        <TierPill tier={t.tier} />
                      </div>
                    </div>

                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold ${
                        t.up
                          ? "bg-pumple-green/15 text-pumple-green"
                          : "bg-pumple-red/15 text-pumple-red"
                      }`}
                    >
                      {t.call}
                    </span>

                    <div className="space-y-1 font-mono text-xs">
                      <p className="flex justify-between gap-3">
                        <span className="text-pumple-dim">ENTRY</span>
                        <span className="text-pumple-muted">{t.entry}</span>
                      </p>
                      <p className="flex justify-between gap-3">
                        <span className="text-pumple-dim">PNL</span>
                        <span className={t.up ? "text-pumple-green" : "text-pumple-red"}>
                          {t.pnl} {t.up ? "▲" : "▼"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 px-5 py-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-pumple-green">
                    {BATTLE.left.votes} backing
                  </span>
                  <span className="font-medium text-pumple-muted">
                    backing {BATTLE.right.votes}
                  </span>
                </div>
                <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-pumple-red/40">
                  <div
                    className="h-full rounded-l-full bg-pumple-green"
                    style={{ width: `${leftPct}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-pumple-dim">
                  {totalVotes} traders picked a side · winner settled at candle close
                </p>
              </div>
            </motion.article>

            {/* Accuracy leaderboard */}
            <motion.article
              variants={item}
              className="glass overflow-hidden rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
                <span className="inline-flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-pumple-green" aria-hidden="true" />
                  <span className="text-sm font-bold text-pumple-text">
                    Accuracy Leaderboard
                  </span>
                </span>
                <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-pumple-muted">
                  This week
                </span>
              </div>

              <ul>
                {LEADERS.map((leader) => (
                  <li
                    key={leader.handle}
                    className="flex items-center gap-3 border-b border-white/5 px-5 py-3.5"
                  >
                    <span className="flex w-6 justify-center">
                      {leader.rank === 1 ? (
                        <Crown className="h-4 w-4 text-pumple-lime" aria-hidden="true" />
                      ) : (
                        <span className="font-mono text-sm text-pumple-dim">
                          {leader.rank}
                        </span>
                      )}
                    </span>
                    <Avatar handle={leader.handle} className="h-8 w-8 text-xs" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-pumple-text">
                        {leader.handle}
                      </p>
                      <TierPill tier={leader.tier} />
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-pumple-dim">
                      <Flame className="h-3.5 w-3.5 text-pumple-lime" aria-hidden="true" />
                      {leader.streak}
                    </span>
                    <span className="w-12 text-right font-mono text-sm font-bold text-pumple-green">
                      {leader.acc}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 bg-white/[0.02] px-5 py-3.5">
                <span className="flex w-6 justify-center font-mono text-sm text-pumple-dim">
                  —
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-white/15 text-xs text-pumple-dim">
                  ?
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-pumple-muted">You</p>
                  <TierPill tier="Shrimp" />
                </div>
                <span className="text-xs text-pumple-dim">Join to claim your rank</span>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
