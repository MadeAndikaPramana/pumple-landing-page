"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "AI Chatbot",
    title: "Tanya apa saja tentang market",
    desc: "Chat langsung dalam Bahasa Indonesia. Pumple memahami pertanyaan kompleks dan menjawab dengan analisis yang actionable.",
    color: "#4ADE80",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    label: "Fibonacci & SMC",
    title: "Deteksi otomatis, real-time",
    desc: "Fibonacci retracement, Smart Money Concepts (CHoCH, BOS, FVG) terdeteksi dan dijelaskan secara otomatis per aset.",
    color: "#A3E635",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Whale Tracking",
    title: "Pantau pergerakan big player",
    desc: "Monitor transaksi besar on-chain. Tahu kapan whale akumulasi atau distribusi sebelum harga bergerak.",
    color: "#60A5FA",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    label: "Sentiment Engine",
    title: "Agregat dari X, Bybit, Binance",
    desc: "Analisis sentimen dari ribuan sumber: Twitter/X, forum crypto, data funding rate Bybit dan Binance.",
    color: "#C084FC",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Chart Output",
    title: "AI kirim chart TA langsung ke chat",
    desc: "Pumple generate chart teknikal lengkap dengan markup Fibonacci, SMC levels, dan entry/exit points — dikirim langsung di chat.",
    color: "#FB923C",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Trade Journal",
    title: "Catat dan evaluasi trade kamu",
    desc: "Journal trading terintegrasi dengan AI. Pumple menganalisis pola trading kamu dan memberikan saran untuk improve win rate.",
    color: "#34D399",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Large bg glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(74,222,128,0.05) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-semibold text-[#A3E635] tracking-widest uppercase px-3 py-1 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F5F5] leading-tight">
            Semua yang kamu butuhkan,{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(135deg, #4ADE80 0%, #A3E635 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              dalam satu platform.
            </span>
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-2xl mx-auto">
            Tidak perlu banyak tools. Pumple menggabungkan semua analisis yang kamu butuhkan.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="feature-card group relative rounded-2xl p-6 cursor-default transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `radial-gradient(circle at 30% 40%, ${f.color}08 0%, transparent 60%)` }}
              />

              {/* Icon */}
              <div
                className="relative w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${f.color}12`,
                  border: `1px solid ${f.color}22`,
                  color: f.color,
                }}
              >
                {f.icon}
              </div>

              {/* Label */}
              <span className="relative inline-block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: f.color }}>
                {f.label}
              </span>

              {/* Title */}
              <h3 className="relative text-base font-bold text-[#F5F5F5] mb-2 leading-snug">
                {f.title}
              </h3>

              {/* Description */}
              <p className="relative text-sm text-[#6B7280] leading-relaxed">
                {f.desc}
              </p>

              {/* Arrow on hover */}
              <div
                className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                style={{ color: f.color }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
