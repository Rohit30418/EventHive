import { useEffect } from "react";
import Lenis from "lenis";

// Use the shared accessibility preference on every public page.
// The global accessibility panel dispatches this event whenever settings change.
export function HomeSmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const paused = media.matches || document.documentElement.classList.contains("a11y-pause-animations");
      if (paused) {
        lenis?.destroy();
        lenis = null;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.05, smoothWheel: true });
      }
    };

    sync();
    window.addEventListener("eventhive:a11y-change", sync);
    media.addEventListener("change", sync);
    return () => {
      window.removeEventListener("eventhive:a11y-change", sync);
      media.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return null;
}
