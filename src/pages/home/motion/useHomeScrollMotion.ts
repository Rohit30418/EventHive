import { useEffect, type RefObject } from "react";

/**
 * Homepage-only, progressive-enhancement scroll motion.
 * - No scroll locking, no animation library, no React state per frame.
 * - Elements remain visible when JavaScript or IntersectionObserver is unavailable.
 * - Passive scroll + one rAF, and no parallax on touch/small screens.
 * - Reduced-motion preferences stop all movement immediately.
 */
export function useHomeScrollMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallaxAllowed = window.matchMedia("(min-width: 900px) and (pointer: fine)");

    const selectors = [
      ".eh-ref-section-intro",
      ".ea-capabilities .ea-section-heading",
      ".ea-bento > article",
      ".ea-steps .ea-section-heading",
      ".ea-steps ol > li",
      ".eh-ref-events-heading",
      ".eh-ref-event-grid > article",
      ".eh-ref-story",
      ".ea-pricing .ea-section-heading",
      ".ea-pricing-layout > article",
      ".ea-faq-layout > div",
      ".ea-contact-layout > *",
      ".ea-final-band > div:first-child",
    ].join(", ");

    const reveals = Array.from(root.querySelectorAll<HTMLElement>(selectors));
    const viewport = window.innerHeight;
    reveals.forEach((element, index) => {
      const bounds = element.getBoundingClientRect();
      // Above-the-fold content should never flash invisible.
      if (bounds.top > viewport * 0.89 && !reduced.matches) {
        element.classList.add("eh-motion-reveal");
        element.style.setProperty("--eh-motion-delay", `${(index % 3) * 65}ms`);
      } else {
        element.classList.add("eh-motion-visible");
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("eh-motion-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: "0px 0px -7% 0px" });
    reveals.forEach(element => {
      if (!element.classList.contains("eh-motion-visible")) observer.observe(element);
    });

    const heroArt = root.querySelector<HTMLElement>(".eh-ref-hero-stage");
    const finaleArt = root.querySelector<HTMLElement>(".ea-final-band .ea-asset");
    const storyArt = root.querySelector<HTMLElement>(".eh-ref-story-portrait");
    const stepsSection = root.querySelector<HTMLElement>(".ea-steps");
    const parallaxTargets = [
      { element: heroArt, speed: 0.10, limit: 28 },
      { element: storyArt, speed: -0.065, limit: 15 },
      { element: finaleArt, speed: -0.095, limit: 23 },
    ];

    let frame = 0;
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const paint = () => {
      frame = 0;
      if (reduced.matches) return;

      const height = window.innerHeight;
      // Keep the timeline line in sync with normal document scrolling.
      if (stepsSection) {
        const bounds = stepsSection.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < height) {
          const fraction = clamp((height * 0.76 - bounds.top) / (bounds.height + height * 0.24), 0, 1);
          stepsSection.style.setProperty("--eh-timeline-progress", fraction.toFixed(3));
        }
      }

      if (!parallaxAllowed.matches) {
        parallaxTargets.forEach(({ element }) => element?.style.removeProperty("--eh-scroll-shift"));
        return;
      }
      parallaxTargets.forEach(({ element, speed, limit }) => {
        if (!element || !element.isConnected) return;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -limit || rect.top > height + limit) return;
        const displacement = (height * 0.5 - (rect.top + rect.height * 0.5)) * speed;
        element.style.setProperty("--eh-scroll-shift", `${clamp(displacement, -limit, limit).toFixed(1)}px`);
      });
    };
    const schedulePaint = () => {
      if (frame || reduced.matches) return;
      frame = window.requestAnimationFrame(paint);
    };
    const syncPreference = () => {
      root.classList.toggle("eh-motion-enabled", !reduced.matches);
      if (reduced.matches) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        reveals.forEach(element => element.classList.add("eh-motion-visible"));
        stepsSection?.style.removeProperty("--eh-timeline-progress");
        parallaxTargets.forEach(({ element }) => element?.style.removeProperty("--eh-scroll-shift"));
      } else {
        schedulePaint();
      }
    };

    root.classList.toggle("eh-motion-enabled", !reduced.matches);
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint, { passive: true });
    reduced.addEventListener("change", syncPreference);
    parallaxAllowed.addEventListener("change", schedulePaint);
    schedulePaint();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      reduced.removeEventListener("change", syncPreference);
      parallaxAllowed.removeEventListener("change", schedulePaint);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("eh-motion-enabled");
      reveals.forEach(element => {
        element.classList.remove("eh-motion-reveal", "eh-motion-visible");
        element.style.removeProperty("--eh-motion-delay");
      });
      stepsSection?.style.removeProperty("--eh-timeline-progress");
      parallaxTargets.forEach(({ element }) => element?.style.removeProperty("--eh-scroll-shift"));
    };
  }, [rootRef]);
}
