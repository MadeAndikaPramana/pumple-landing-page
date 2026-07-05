"use client";

import { useEffect } from "react";

/**
 * Toggles an `fx-paused` class on <html> when the tab is hidden or the window
 * loses focus, so continuously-running background CSS animations (ambient orbs,
 * grid sweep) stop burning GPU while nobody's looking. Purely a comfort/perf
 * win — no visual change while the page is active.
 */
export default function FxPause() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      root.classList.toggle("fx-paused", document.hidden || !document.hasFocus());
    };
    update();
    document.addEventListener("visibilitychange", update);
    window.addEventListener("blur", update);
    window.addEventListener("focus", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("blur", update);
      window.removeEventListener("focus", update);
      root.classList.remove("fx-paused");
    };
  }, []);

  return null;
}
