"use client";

import { motion, MotionConfig } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Daftar antrian",
    desc: "Cukup email. Nggak ada formulir panjang, nggak ada kartu kredit.",
  },
  {
    number: "02",
    title: "Terima undangan",
    desc: "Akses beta dibuka bertahap — makin awal daftar, makin cepat masuk.",
  },
  {
    number: "03",
    title: "Mulai nanya",
    desc: "Tanya pair apa pun, dapat analisis lengkap: level, bias, dan alasannya.",
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
              {"// cara kerja"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Tiga langkah, langsung jalan.
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
