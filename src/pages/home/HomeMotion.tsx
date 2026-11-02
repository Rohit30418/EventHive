import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function FadeUp({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  return (
    <motion.span
      ref={ref}
      className={"inline-flex " + className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={(event) => {
        if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.13);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.13);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 420, damping: 32 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 32 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHovered(Boolean((event.target as Element | null)?.closest?.("a, button, [data-magnetic], [data-hover-card]")));
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, reduceMotion, x, y]);

  if (!enabled || reduceMotion) return null;
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border-2 border-[#F26B2A] mix-blend-multiply md:block"
      style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: hovered ? 38 : 9, height: hovered ? 38 : 9, backgroundColor: hovered ? "rgba(242,107,42,0.08)" : "#F26B2A" }}
      transition={{ duration: 0.16 }}
    />
  );
}

export function HomeSmoothScroll() {
  // Native anchor smooth scrolling avoids layout interception and honors reduced motion.
  // A Lenis dependency can be introduced later if inertia is specifically desired.
  return null;
}
