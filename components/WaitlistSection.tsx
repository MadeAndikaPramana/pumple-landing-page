"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");

    await new Promise((r) => setTimeout(r, 1200));

    if (email.includes("@")) {
      setState("success");
    } else {
      setState("error");
    }
  };

  return (
    <section id="waitlist" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(74,222,128,0.08) 0%, transparent 65%)" }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Waving frog */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 10px 30px rgba(74,222,128,0.3))" }}
          >
            <Image
                src="/logo.png"
                width={280}
                height={280}
                alt="Pumple"
                className="object-contain"
              />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block mb-4 text-sm font-semibold text-[#4ADE80] tracking-widest uppercase px-3 py-1 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/5">
            Early Access
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F5F5] leading-tight mb-4">
            Jadilah yang{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4ADE80 0%, #A3E635 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              pertama
            </span>
            {" "}mencoba Pumple.
          </h2>
          <p className="text-[#6B7280] text-lg mb-10">
            Daftar sekarang dan dapatkan akses awal dengan harga spesial.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {state === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 px-6 rounded-2xl"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
              }}
            >
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-[#4ADE80] mb-2">Kamu masuk daftar!</h3>
              <p className="text-[#6B7280] text-sm">
                Kami akan kirim email ke <span className="text-[#F5F5F5] font-medium">{email}</span> saat Pumple siap.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  disabled={state === "loading"}
                  className="w-full px-5 py-4 rounded-xl text-[#F5F5F5] text-sm placeholder-[#4B5563] outline-none transition-all duration-200 focus:border-[#4ADE80] disabled:opacity-60"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: state === "error" ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  aria-invalid={state === "error"}
                  aria-describedby={state === "error" ? "email-error" : undefined}
                />
                {state === "error" && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400 text-left pl-1">
                    Masukkan email yang valid.
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={state === "loading"}
                whileHover={state !== "loading" ? { scale: 1.04, boxShadow: "0 0 25px rgba(74,222,128,0.5)" } : {}}
                whileTap={state !== "loading" ? { scale: 0.97 } : {}}
                className="px-6 py-4 rounded-xl text-sm font-bold text-[#0D0D0D] transition-all duration-200 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #4ADE80, #A3E635)" }}
              >
                {state === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mendaftar...
                  </span>
                ) : (
                  "Join Waitlist 🚀"
                )}
              </motion.button>
            </form>
          )}

          {/* Trust line */}
          {state !== "success" && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-5 text-xs text-[#4B5563] flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Gratis. Tidak ada spam. Cancel kapan saja.
            </motion.p>
          )}
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          {[
            { val: "1,200+", label: "Sudah daftar" },
            { val: "4.9★", label: "Rating waitlist" },
            { val: "48h", label: "Respon support" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-black text-[#4ADE80]">{s.val}</p>
              <p className="text-xs text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
