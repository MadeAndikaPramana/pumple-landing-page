"use client";

import { motion, MotionConfig } from "framer-motion";
import {
  BellRing,
  Crosshair,
  Gauge,
  MessagesSquare,
  Radar,
  TrendingUp,
} from "lucide-react";

const FIB_LEVELS = [
  { level: "0.382", price: "96,840" },
  { level: "0.500", price: "95,410" },
  { level: "0.618", price: "94,120" },
];

const CARDS = [
  {
    icon: TrendingUp,
    title: "Fibonacci Auto-Draw",
    desc: "Retracement & extension digambar otomatis dari swing high–low terakhir. Level krusial langsung kelihatan, tanpa gambar manual.",
    wide: true,
  },
  {
    icon: Radar,
    title: "Whale Radar",
    desc: "Pantau dompet besar on-chain. Transaksi di atas $500k langsung ketahuan arah masuknya.",
  },
  {
    icon: Crosshair,
    title: "SMC Bias Detector",
    desc: "Order block, BOS, dan CHoCH terdeteksi otomatis — kamu tahu posisi smart money sebelum melangkah.",
  },
  {
    icon: Gauge,
    title: "Sentiment Engine",
    desc: "Sinyal crowd dari X, Binance, dan Bybit dirangkum jadi satu skor, biar kamu nggak kebawa FOMO.",
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    desc: "Pasang alert dari chat: level harga, zona entry, atau aktivitas whale. Pumple yang begadang, kamu tidur.",
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
              {"// fitur"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Satu chat, semua sinyal penting.
            </h2>
            <p className="mt-5 text-lg text-pumple-muted">
              Tools yang biasanya kepencar di lima aplikasi — sekarang tinggal ditanyain.
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
                    {FIB_LEVELS.map((fib) => (
                      <div key={fib.level} className="flex items-center gap-3">
                        <span className="w-12 text-pumple-dim">{fib.level}</span>
                        <span className="h-px flex-1 bg-gradient-to-r from-pumple-green/40 to-transparent" />
                        <span className="text-pumple-muted">{fib.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}

            <motion.article
              variants={item}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition duration-300 hover:border-pumple-green/25 hover:shadow-glow-sm sm:col-span-2 sm:flex-row sm:items-center lg:col-span-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pumple-green/10 text-pumple-green">
                <MessagesSquare className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Chart langsung di chat</h3>
                <p className="mt-1 text-sm leading-relaxed text-pumple-muted">
                  Hasil analisis dirender jadi chart di dalam percakapan — nggak perlu
                  pindah aplikasi, siap di-screenshot buat jurnal trading-mu.
                </p>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
