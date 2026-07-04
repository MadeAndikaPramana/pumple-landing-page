"use client";

import { useEffect, useRef } from "react";

/**
 * Latar per-adegan: empat lapisan gradien fixed yang crossfade mengikuti
 * kedalaman scroll. Anchor menandai di mana adegan berikutnya mulai masuk;
 * transisi terjadi di zona selebar ~satu viewport di sekitar anchor.
 */
const SCENES = ["scene--hero", "scene--teal", "scene--lime", "scene--emerald"];
const ANCHORS = ["#community", "#fitur", "#faq"];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function ScrollBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = Array.from(root.children) as HTMLElement[];
    let offsets: number[] = [];
    let raf = 0;

    const paint = () => {
      raf = 0;
      // Titik acuan: sedikit di bawah tengah viewport, supaya adegan baru
      // sudah penuh saat section-nya menguasai layar
      const y = window.scrollY + window.innerHeight * 0.55;
      const blend = window.innerHeight * 0.9;
      let carry = 1;
      for (let i = 0; i < layers.length; i++) {
        const t =
          i < offsets.length
            ? smoothstep(Math.min(1, Math.max(0, (y - (offsets[i] - blend / 2)) / blend)))
            : 1;
        const w = i < offsets.length ? carry * (1 - t) : carry;
        layers[i].style.opacity = w.toFixed(3);
        carry -= w;
      }
    };

    const measure = () => {
      offsets = ANCHORS.map((sel) => {
        const el = document.querySelector<HTMLElement>(sel);
        return el ? el.getBoundingClientRect().top + window.scrollY : Number.MAX_SAFE_INTEGER;
      });
      paint();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    // Tinggi dokumen berubah saat font/gambar termuat — ukur ulang anchor
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="scene-backdrop" aria-hidden="true">
      {SCENES.map((cls) => (
        <div key={cls} className={`scene ${cls}`} />
      ))}
    </div>
  );
}
