"use client";

import { useEffect, type RefObject } from "react";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  backRef: RefObject<HTMLCanvasElement | null>;
  frontRef: RefObject<HTMLCanvasElement | null>;
  h1Ref: RefObject<HTMLHeadingElement | null>;
  frogRef: RefObject<HTMLDivElement | null>;
  frogBobRef: RefObject<HTMLDivElement | null>;
  mouthRef: RefObject<HTMLElement | null>;
  onChomp: () => void;
};

type Firefly = {
  angle: number;
  speed: number;
  rx: number;
  ry: number;
  depthPhase: number;
  size: number;
  flick: number;
  flickSpeed: number;
  lime: boolean;
  state: "orbit" | "lure" | "gone";
  x: number;
  y: number;
  lureFromX: number;
  lureFromY: number;
  lureT: number;
  respawnAt: number;
};

type Snack =
  | { phase: "lure"; p: Firefly }
  | { phase: "out" | "in"; cx: number; cy: number; t: number };

type Pop = { x: number; y: number; t: number };

const COUNT = 16;
const LURE_S = 1.15; // firefly drifts toward the frog
const OUT_S = 0.16; // tongue extends
const IN_S = 0.13; // tongue retracts
const POP_S = 0.45;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 2;

export default function Fireflies({
  sectionRef,
  backRef,
  frontRef,
  h1Ref,
  frogRef,
  frogBobRef,
  mouthRef,
  onChomp,
}: Props) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = sectionRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!section || !back || !front) return;

    const bctx = back.getContext("2d");
    const fctx = front.getContext("2d");
    if (!bctx || !fctx) return;

    // Decorative glow renders at CSS resolution (DPR 1) — keeps the canvases
    // cheap on high-DPI / integrated GPUs, and soft glows don't need retina.
    let W = 0;
    let H = 0;

    const resize = () => {
      const r = section.getBoundingClientRect();
      W = r.width;
      H = r.height;
      for (const c of [back, front]) {
        c.width = Math.round(W);
        c.height = Math.round(H);
        c.style.width = `${W}px`;
        c.style.height = `${H}px`;
      }
      measure();
    };

    // Cached geometry in section-local px. These are invariant to scroll, so we
    // only recompute on resize and while the entry animation settles.
    let cx = 0;
    let cy = 0; // headline centre (orbit centre)
    let mrx = 0;
    let mry = 0; // frog mouth at rest (lure target)
    let frogW = 120;
    const secRect = () => section.getBoundingClientRect();
    const measure = () => {
      const s = secRect();
      const h = h1Ref.current?.getBoundingClientRect();
      if (h) {
        cx = h.left - s.left + h.width / 2;
        cy = h.top - s.top + h.height / 2;
      } else {
        cx = W / 2;
        cy = H * 0.32;
      }
      const a = mouthRef.current?.getBoundingClientRect();
      if (a) {
        mrx = a.left - s.left + a.width / 2;
        mry = a.top - s.top + a.height / 2;
      } else {
        mrx = W * 0.7;
        mry = H * 0.5;
      }
      const f = frogRef.current?.getBoundingClientRect();
      if (f) frogW = f.width;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    // Re-measure a few times while the hero's entry animation settles.
    const settleTimers = [300, 700, 1300].map((ms) => window.setTimeout(measure, ms));

    // Pre-rendered glow sprite (built once) — far cheaper than creating a radial
    // gradient per particle every frame. The bright core is baked in.
    const makeGlow = (cr: number, cg: number, cb: number) => {
      const S = 48;
      const cv = document.createElement("canvas");
      cv.width = cv.height = S;
      const g = cv.getContext("2d")!;
      const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      grd.addColorStop(0, "rgba(240,255,230,0.95)");
      grd.addColorStop(0.18, `rgba(${cr},${cg},${cb},0.7)`);
      grd.addColorStop(0.45, `rgba(${cr},${cg},${cb},0.2)`);
      grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      g.fillStyle = grd;
      g.fillRect(0, 0, S, S);
      return cv;
    };
    const glowGreen = makeGlow(74, 222, 128);
    const glowLime = makeGlow(163, 230, 53);

    const spawn = (p: Firefly) => {
      p.angle = rand(0, Math.PI * 2);
      p.speed = rand(0.18, 0.42) * (Math.random() < 0.5 ? 1 : -1);
      p.rx = rand(90, 210);
      p.ry = rand(45, 105);
      p.depthPhase = rand(0, Math.PI * 2);
      p.size = rand(1.4, 2.8);
      p.flick = rand(0, Math.PI * 2);
      p.flickSpeed = rand(2, 5);
      p.lime = Math.random() < 0.4;
      p.state = "orbit";
      // Seed a finite position from cached geometry.
      p.x = cx + Math.cos(p.angle) * p.rx;
      p.y = cy + Math.sin(p.angle) * p.ry;
    };

    const flies: Firefly[] = Array.from({ length: COUNT }, () => {
      const p = {} as Firefly;
      spawn(p);
      return p;
    });

    let snack: Snack | null = null;
    const pops: Pop[] = [];
    let nextSnackAt = performance.now() / 1000 + rand(3, 6);

    const drawFly = (ctx: CanvasRenderingContext2D, p: Firefly, alpha: number, scale: number) => {
      // Guard against a non-finite position during a layout/resize race.
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return;
      const glow = p.size * scale * 5; // glow radius
      ctx.globalAlpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
      ctx.drawImage(p.lime ? glowLime : glowGreen, p.x - glow, p.y - glow, glow * 2, glow * 2);
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      // Cached geometry — no per-frame layout reads.
      const dx = cx - mrx;
      const dy = cy - mry;
      const dl = Math.hypot(dx, dy) || 1;
      const reach = Math.min(frogW * 0.75, 80);
      const lureX = mrx + (dx / dl) * reach;
      const lureY = mry + (dy / dl) * reach;

      // Schedule a snack.
      if (!snack && t > nextSnackAt) {
        const candidates = flies.filter((f) => f.state === "orbit");
        if (candidates.length) {
          const p = candidates[Math.floor(Math.random() * candidates.length)];
          p.state = "lure";
          p.lureFromX = p.x;
          p.lureFromY = p.y;
          p.lureT = 0;
          snack = { phase: "lure", p };
        }
        nextSnackAt = t + rand(6, 11);
      }

      bctx.clearRect(0, 0, W, H);
      fctx.clearRect(0, 0, W, H);
      bctx.globalCompositeOperation = "lighter";
      fctx.globalCompositeOperation = "lighter";

      for (const p of flies) {
        if (p.state === "gone") {
          if (t > p.respawnAt) spawn(p);
          else continue;
        }

        let depth = 0;
        if (p.state === "orbit") {
          p.angle += p.speed * dt;
          p.x = cx + Math.cos(p.angle) * p.rx;
          p.y = cy + Math.sin(p.angle) * p.ry;
          depth = Math.sin(p.angle + p.depthPhase);
        } else if (p.state === "lure") {
          p.lureT = Math.min(1, p.lureT + dt / LURE_S);
          const e = easeInOut(p.lureT);
          p.x = p.lureFromX + (lureX - p.lureFromX) * e;
          p.y = p.lureFromY + (lureY - p.lureFromY) * e;
          depth = 1; // ride in front as it approaches the frog
          if (p.lureT >= 1) {
            // Caught: fire the tongue, pop, and bob the frog.
            snack = { phase: "out", cx: p.x, cy: p.y, t: 0 };
            pops.push({ x: p.x, y: p.y, t: 0 });
            p.state = "gone";
            p.respawnAt = t + rand(2.5, 4.5);
            const bob = frogBobRef.current;
            if (bob) {
              bob.classList.remove("frog-snack");
              void bob.offsetWidth; // restart the animation
              bob.classList.add("frog-snack");
            }
            onChomp(); // open the frog's mouth for the bite
            continue;
          }
        }

        p.flick += p.flickSpeed * dt;
        const flick = 0.55 + 0.45 * Math.sin(p.flick);
        const front01 = (depth + 1) / 2;
        const scale = 0.7 + 0.55 * front01;
        const alpha = flick * (0.45 + 0.55 * front01);
        drawFly(depth >= 0 ? fctx : bctx, p, alpha, scale);
      }

      // Tongue (front canvas, normal blending for the pink). Only here do we read
      // the live mouth position, so the base tracks the squash/stretch.
      if (snack && snack.phase !== "lure") {
        const s = secRect();
        const a = mouthRef.current?.getBoundingClientRect();
        const mx = a ? a.left - s.left + a.width / 2 : mrx;
        const my = a ? a.top - s.top + a.height / 2 : mry;
        snack.t += dt / (snack.phase === "out" ? OUT_S : IN_S);
        const prog = Math.min(1, snack.t);
        const e = easeOut(prog);
        const k = snack.phase === "out" ? e : 1 - e;
        const tipX = mx + (snack.cx - mx) * k;
        const tipY = my + (snack.cy - my) * k;
        fctx.globalCompositeOperation = "source-over";
        fctx.lineCap = "round";
        fctx.strokeStyle = "rgba(251,113,133,0.95)";
        fctx.lineWidth = 5;
        fctx.beginPath();
        fctx.moveTo(mx, my);
        fctx.lineTo(tipX, tipY);
        fctx.stroke();
        fctx.fillStyle = "rgba(251,113,133,0.95)";
        fctx.beginPath();
        fctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
        fctx.fill();
        if (prog >= 1) {
          if (snack.phase === "out") snack = { phase: "in", cx: snack.cx, cy: snack.cy, t: 0 };
          else snack = null;
        }
      }

      // Pops.
      fctx.globalCompositeOperation = "lighter";
      for (let i = pops.length - 1; i >= 0; i--) {
        const pop = pops[i];
        pop.t += dt / POP_S;
        if (pop.t >= 1) {
          pops.splice(i, 1);
          continue;
        }
        const rr = 3 + pop.t * 22;
        fctx.strokeStyle = `rgba(163,230,53,${0.7 * (1 - pop.t)})`;
        fctx.lineWidth = 2;
        fctx.beginPath();
        fctx.arc(pop.x, pop.y, rr, 0, Math.PI * 2);
        fctx.stroke();
      }

      bctx.globalCompositeOperation = "source-over";
      fctx.globalCompositeOperation = "source-over";
      raf = running() ? requestAnimationFrame(frame) : 0;
    };

    // Run only while the hero is on screen AND the tab is visible & focused —
    // no cost once scrolled past or when the window is in the background.
    let onScreen = true;
    const running = () => onScreen && !document.hidden && document.hasFocus();
    const sync = () => {
      if (running()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        bctx.clearRect(0, 0, W, H);
        fctx.clearRect(0, 0, W, H);
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(section);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("blur", sync);
    window.addEventListener("focus", sync);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("blur", sync);
      window.removeEventListener("focus", sync);
      settleTimers.forEach(clearTimeout);
    };
  }, [sectionRef, backRef, frontRef, h1Ref, frogRef, frogBobRef, mouthRef, onChomp]);

  return null;
}
