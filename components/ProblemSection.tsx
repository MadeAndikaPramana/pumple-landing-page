"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
    title: "Buka banyak tab, buang waktu berjam-jam",
    description: "TradingView, CoinGecko, Twitter, Telegram — semua harus dibuka sekaligus hanya untuk satu keputusan trading.",
    accent: "#EF4444",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Signal Telegram tidak jelas alasannya",
    description: "\"Buy BTC $43k TP $50k\" — tanpa analisis, tanpa konteks, tanpa alasan yang bisa kamu evaluasi sendiri.",
    accent: "#F59E0B",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Tools bagus tapi mahal dan ribet",
    description: "Platform profesional harganya jutaan per bulan, butuh waktu berbulan-bulan untuk bisa menguasainya.",
    accent: "#8B5CF6",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProblemSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle separator glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#4ADE80]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-semibold text-[#EF4444] tracking-widest uppercase px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5">
            Masalah yang sering terjadi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F5F5] leading-tight">
            Analisis manual itu{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EF4444, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              melelahkan.
            </span>
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-2xl mx-auto">
            Kamu sudah cukup keras bekerja. Biarkan AI yang melakukan analisis berat-nya.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative group rounded-2xl p-6 cursor-default transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${p.accent}08, transparent)`,
                  border: `1px solid ${p.accent}25`,
                }}
              />

              {/* Icon */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${p.accent}10`,
                  border: `1px solid ${p.accent}20`,
                  color: p.accent,
                }}
              >
                {p.icon}
              </div>

              {/* Content */}
              <h3 className="relative text-lg font-bold text-[#F5F5F5] mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="relative text-sm text-[#6B7280] leading-relaxed">
                {p.description}
              </p>

              {/* Corner accent */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                style={{ background: p.accent }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Arrow down hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16 text-[#6B7280] text-base"
        >
          Ada solusinya. 👇
        </motion.p>
      </div>
    </section>
  );
}
