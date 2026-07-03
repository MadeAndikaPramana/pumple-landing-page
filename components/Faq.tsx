"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "Apa itu Pumple?",
    a: "Pumple adalah AI analyst untuk pasar crypto. Kamu bertanya lewat chat — soal struktur harga, level Fibonacci, aktivitas whale, atau sentimen pasar — dan Pumple menjawab dengan analisis yang ada alasannya, dalam Bahasa Indonesia.",
  },
  {
    q: "Kapan aksesnya dibuka?",
    a: "Beta tertutup dibuka bertahap sepanjang 2026. Undangan dikirim lewat email sesuai urutan waitlist — yang daftar duluan, masuk duluan.",
  },
  {
    q: "Bayar berapa?",
    a: "Selama beta: gratis, tanpa kartu kredit. Skema harga publik diumumkan menjelang launch, dan anggota waitlist dapat penawaran paling awal.",
  },
  {
    q: "Ini financial advice bukan?",
    a: "Bukan. Pumple adalah alat bantu analisis — dia menyajikan data dan struktur pasar, tapi keputusan (dan risikonya) tetap sepenuhnya di tangan kamu. Trading crypto berisiko tinggi.",
  },
  {
    q: "Datanya dari mana?",
    a: "Harga dan orderflow dari exchange besar seperti Binance dan Bybit, data on-chain untuk pergerakan whale, plus sinyal sosial dari X untuk sentimen.",
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
              Masih mikir-mikir?
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
