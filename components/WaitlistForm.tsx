"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { isValidEmail, normalizeEmail } from "@/lib/validate";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setStatus("error");
      setMessage("That email doesn't look valid. Mind checking it?");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized, company }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (res.ok && data?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong on our end. Please try again in a moment.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection problem. Check your internet and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl border border-pumple-green/30 bg-pumple-green/10 px-5 py-4 text-left"
      >
        <CheckCircle2 className="h-6 w-6 shrink-0 text-pumple-green" aria-hidden="true" />
        <div>
          <p className="font-semibold text-pumple-text">You&apos;re officially on the list!</p>
          <p className="text-sm text-pumple-muted">
            Your beta invite lands in your inbox the moment your slot opens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative w-full">
      {/* Honeypot — hidden from humans & screen readers; bots that fill it are rejected */}
      <div
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]"
      >
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          aria-invalid={status === "error"}
          aria-describedby={`${id}-status`}
          className="min-h-[52px] flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-base text-pumple-text placeholder:text-pumple-dim focus:border-pumple-green/60 focus:outline-none focus:ring-2 focus:ring-pumple-green/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-pumple-green px-7 text-base font-bold text-pumple-bg transition hover:bg-pumple-lime hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              Joining…
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <p
        id={`${id}-status`}
        aria-live="polite"
        className="mt-2 min-h-[1.25rem] text-sm text-pumple-red"
      >
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
