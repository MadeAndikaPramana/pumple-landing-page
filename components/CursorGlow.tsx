"use client";

import { useEffect, useRef } from "react";

const SIZE = 520; // keep in sync with .cursor-glow in globals.css

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices and when the user prefers reduced motion.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      raf = 0;
      el.style.setProperty("--cursor-x", `${x - SIZE / 2}px`);
      el.style.setProperty("--cursor-y", `${y - SIZE / 2}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.active = "true";
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onLeave = () => {
      el.dataset.active = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
