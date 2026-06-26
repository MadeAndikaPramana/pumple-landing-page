"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "Rp 0",
    period: "",
    desc: "Cobain dulu, gratis selamanya",
    badge: null,
    features: [
      "10 query AI per hari",
      "Analisis Fibonacci dasar",
      "Sentiment harian",
      "Akses komunitas Discord",
    ],
    missing: ["SMC real-time", "Whale Tracking", "Chart Output", "Trade Journal"],
    cta: "Mulai Gratis",
    ctaStyle: "ghost",
  },
  {
    name: "Pro",
    price: "Rp 149.000",
    period: "/bulan",
    desc: "Untuk trader serius yang mau level up",
    badge: "Most Popular",
    features: [
      "Unlimited query AI",
      "Analisis real-time (semua pair)",
      "Fibonacci + SMC otomatis",
      "Sentiment Engine (X + Bybit + Binance)",
      "Chart Output di chat",
      "Trade Journal + AI Review",
      "Priority support",
    ],
    missing: [],
    cta: "Coba 7 Hari Gratis",
    ctaStyle: "primary",
  },
  {
    name: "Whale",
    price: "Rp 250.000",
    period: "/bulan",
    desc: "Pro + tools eksklusif big player",
    badge: null,
    features: [
      "Semua fitur Pro",
      "Whale Tracking on-chain",
      "Alert transaksi besar (>$500k)",
      "GPT-4o model (lebih akurat)",
      "Laporan mingguan PDF",
      "Early access fitur baru",
    ],
    missing: [],
    cta: "Join Whale Club",
    ctaStyle: "ghost",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function CheckIcon({ color = "#4ADE80" }: { color?: string }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={color} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle bg line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#4ADE80]/25 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-semibold text-[#4ADE80] tracking-widest uppercase px-3 py-1 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/5">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F5F5] leading-tight">
            Mulai gratis,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4ADE80 0%, #A3E635 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              upgrade kapan saja.
            </span>
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-xl mx-auto">
            Tidak ada kontrak. Tidak ada biaya tersembunyi. Cancel kapan saja.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan, i) => {
            const isPopular = plan.badge === "Most Popular";
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${isPopular ? "pricing-popular" : ""}`}
                style={
                  isPopular
                    ? {
                        background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(163,230,53,0.04) 100%)",
                        border: "1.5px solid rgba(74,222,128,0.4)",
                        boxShadow: "0 0 50px rgba(74,222,128,0.12), inset 0 0 40px rgba(74,222,128,0.03)",
                      }
                    : {
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-[#0D0D0D] tracking-wide"
                      style={{ background: "linear-gradient(135deg, #4ADE80, #A3E635)" }}
                    >
                      ✦ Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-5">
                  <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: isPopular ? "#4ADE80" : "#6B7280" }}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-black text-[#F5F5F5]">{plan.price}</span>
                    {plan.period && <span className="text-[#6B7280] text-sm mb-1">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-[#6B7280] mt-2">{plan.desc}</p>
                </div>

                <div className="w-full h-px mb-5" style={{ background: isPopular ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.06)" }} />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#D1D5DB]">
                      <CheckIcon color={isPopular ? "#4ADE80" : "#6B7280"} />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {plan.missing.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                      <XIcon />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#waitlist"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="block text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={
                    plan.ctaStyle === "primary"
                      ? {
                          background: "linear-gradient(135deg, #4ADE80, #A3E635)",
                          color: "#0D0D0D",
                          boxShadow: "0 0 20px rgba(74,222,128,0.35)",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${isPopular ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)"}`,
                          color: "#F5F5F5",
                        }
                  }
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-sm text-[#6B7280] mt-10"
        >
          Semua harga dalam Rupiah. Pembayaran via GoPay, OVO, QRIS, atau kartu kredit.
        </motion.p>
      </div>
    </section>
  );
}
