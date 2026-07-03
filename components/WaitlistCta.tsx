"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistCta() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="waitlist" className="relative scroll-mt-20 px-4 py-24 sm:px-6 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-pumple-green/20 bg-gradient-to-b from-pumple-green/[0.07] to-transparent px-6 py-14 text-center sm:px-12 lg:py-20"
        >
          <div
            className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-64"
            aria-hidden="true"
          />

          <Image
            src="/mascot.png"
            alt="Mascot Pumple, raja katak santai bermahkota"
            width={128}
            height={128}
            className="relative mx-auto w-24 animate-float sm:w-28"
          />

          <h2 className="relative mt-8 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Antriannya jalan.
            <br />
            <span className="gradient-text">Kamu ikut nggak?</span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-lg text-pumple-muted">
            Slot beta terbatas dan dibuka bertahap. Amankan tempatmu sekarang — gratis,
            cukup satu email.
          </p>

          <div className="relative mx-auto mt-9 max-w-xl">
            <WaitlistForm />
          </div>

          <p className="relative text-sm text-pumple-dim">
            Email kamu cuma dipakai buat undangan beta. Nggak ada spam.
          </p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
