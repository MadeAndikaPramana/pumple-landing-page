"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "What is Pumple?",
    a: "Pumple is a community trading platform for crypto. Traders battle their signals head-to-head, climb an accuracy leaderboard, and prove their calls against each other — with an AI analyst built in to break down structure, Fibonacci levels, whale activity, and sentiment whenever you want a deeper read.",
  },
  {
    q: "When does access open?",
    a: "The closed beta opens in waves throughout 2026. Invites go out by email in waitlist order — first in line, first in.",
  },
  {
    q: "How much does it cost?",
    a: "During beta it's free, no credit card. Public pricing lands closer to launch, and waitlist members get the earliest offer.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Pumple is an analysis and competition tool — it surfaces data, market structure, and community calls, but every decision (and its risk) stays entirely with you. Crypto trading is high-risk.",
  },
  {
    q: "Where does the data come from?",
    a: "Prices and orderflow from major exchanges like Binance and Bybit, on-chain data for whale movements, plus social signals from X for sentiment.",
  },
];

export default function Faq() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section id="faq" className="relative scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-pumple-green">
              {"// faq"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Still on the fence?
            </h2>
          </div>

          <div className="mt-12 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6">
            {ITEMS.map((faqItem, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <div key={faqItem.q}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-semibold text-pumple-text transition-colors hover:text-pumple-green"
                    >
                      {faqItem.q}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-pumple-dim transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 leading-relaxed text-pumple-muted">{faqItem.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
