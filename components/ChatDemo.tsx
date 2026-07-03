"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { Languages, ListChecks, Zap } from "lucide-react";

const POINTS = [
  {
    icon: Zap,
    title: "Jawaban dalam hitungan detik, 24/7",
    desc: "Pasar crypto nggak tidur — analismu juga nggak.",
  },
  {
    icon: Languages,
    title: "Bahasa Indonesia yang natural",
    desc: "Nggak perlu translate istilah atau baca laporan kaku.",
  },
  {
    icon: ListChecks,
    title: "Setiap sinyal ada alasannya",
    desc: "Level, struktur, dan data on-chain — bukan cuma “buy sekarang”.",
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
              {"// chat analyst"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Ngobrol santai,
              <br />
              jawaban level analis.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-pumple-muted">
              Nggak perlu buka lima tab dan nebak-nebak sinyal Telegram. Tanya langsung,
              Pumple yang ngerangkum semuanya.
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
                  BTC gimana sekarang? Masih oke buat entry?
                </p>
              </motion.div>

              <motion.div variants={bubble} className="flex gap-3">
                <BotAvatar />
                <div className="max-w-[85%] space-y-3 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed">
                  <p>
                    Struktur H4 masih bullish. CHoCH valid di 94.6k, dan ada order block
                    fresh di 95.1k–95.4k yang belum disentuh.
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
                      <span>SENTIMEN</span>
                      <span className="text-pumple-text">72 · Greed</span>
                    </p>
                  </div>
                  <p>
                    Kalau mau entry, zona 95.1k–95.4k paling masuk akal secara
                    risk-reward. Mau kupasangin alert?
                  </p>
                </div>
              </motion.div>

              <motion.div variants={bubble} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md border border-pumple-green/25 bg-pumple-green/10 px-4 py-3 text-sm leading-relaxed">
                  Boleh, alert pas harga masuk zona ya.
                </p>
              </motion.div>

              <motion.div variants={bubble} className="flex gap-3">
                <BotAvatar />
                <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed">
                  Beres — alert aktif di 95,400. Kukabari begitu harga nyentuh zonanya.
                </p>
              </motion.div>
            </motion.div>
            <p className="mt-3 text-center text-xs text-pumple-dim">
              Preview antarmuka — data ilustrasi.
            </p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
