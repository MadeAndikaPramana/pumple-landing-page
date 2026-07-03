"use client";

import { motion, MotionConfig } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Join the waitlist",
    desc: "Just your email. No long forms, no credit card.",
  },
  {
    number: "02",
    title: "Get your invite",
    desc: "Beta access opens in waves — the earlier you join, the sooner you're in.",
  },
  {
    number: "03",
    title: "Battle and climb",
    desc: "Post your calls, take on other traders, and rank up the leaderboard — with AI analysis on tap.",
  },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="cara-kerja" className="relative scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-pumple-green">
              {"// how it works"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Three steps, you&apos;re in.
            </h2>
          </div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.12 }}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <motion.li
                key={step.number}
                variants={item}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
              >
                <span className="font-mono text-5xl font-bold text-pumple-green/30">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-pumple-muted">{step.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>
    </MotionConfig>
  );
}
