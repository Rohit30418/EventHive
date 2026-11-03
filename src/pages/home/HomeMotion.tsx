import { useEffect } from "react";
import Lenis from "lenis";

// Smooth wheel scrolling is homepage-only; native scrolling is kept for reduced motion.
export function HomeSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.05, smoothWheel: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
