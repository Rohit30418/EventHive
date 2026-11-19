import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode, RefObject } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  role?: string;
  "aria-labelledby"?: string;
};

// Content stays 94% opaque even before entering the viewport: never a blank section.
export function ScrollReveal({ children, className = "", delay = 0, ...accessibilityProps }: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      {...accessibilityProps}
      className={["eh-scroll-reveal", className].filter(Boolean).join(" ")}
      initial={reducedMotion ? false : { opacity: 0.94, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Scales with its parent preview: no positioned elements escaping the grid.
export function EventPosterSvg() {
  return (
    <svg className="eh-preview-art" viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="eh-poster-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#162447" />
          <stop offset="1" stopColor="#31499A" />
        </linearGradient>
        <linearGradient id="eh-poster-arch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7E91E5" />
          <stop offset="1" stopColor="#3848BE" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#eh-poster-bg)" />
      <path d="M0 286C130 250 260 320 390 290S540 278 640 260V320H0Z" fill="#354E9F" opacity=".25" />
      <path d="M421 275V151C421 91 467 45 522 45S624 91 624 151V275Z" fill="url(#eh-poster-arch)" />
      <path d="M444 275V151C444 104 479 70 522 70S601 104 601 151V275Z" stroke="#DDE7FF" strokeWidth="2" fill="none" opacity=".45" />
      <circle cx="522" cy="160" r="52" fill="#E6ECFF" />
      <path d="M507 143L523 133L538 143V165L523 175L507 165Z" fill="none" stroke="#3848BE" strokeWidth="3" strokeLinejoin="round" />
      <path d="M522 136V174M509 145L536 163M536 145L509 163" stroke="#3848BE" strokeWidth="2" opacity=".65" />
      <circle cx="383" cy="73" r="5" fill="#7DE8C2" />
      <circle cx="409" cy="56" r="3" fill="#7DE8C2" />
      <path d="M375 94L390 109M389 93L376 108" stroke="#E6ECFF" strokeWidth="2" strokeLinecap="round" />
      <text x="45" y="144" fill="#BCCBFF" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="24" fontWeight="700" letterSpacing="6">MAKE IT</text>
      <text x="42" y="205" fill="#F8FAFF" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="48" fontWeight="700" letterSpacing="-2">MEMORABLE.</text>
      <path d="M46 234H335" stroke="#3848BE" strokeWidth="4" strokeLinecap="round" />
      <text x="45" y="267" fill="#CAD6FF" fontFamily="Inter, Arial, sans-serif" fontSize="16" letterSpacing="2">EVENTHIVE / TOGETHER</text>
    </svg>
  );
}

export function WorkflowRail({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 45%"],
  });
  const drawingProgress = useTransform(scrollYProgress, [0.08, 0.65], [0, 1]);
  const springProgress = useSpring(drawingProgress, { stiffness: 130, damping: 30 });

  return (
    <div className="eh-workflow-rail" aria-hidden="true">
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none" focusable="false">
        <path d="M150 35H1050" stroke="#D6DEEE" strokeWidth="4" strokeLinecap="round" fill="none" />
        <motion.path
          d="M150 35H1050"
          stroke="#3848BE"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: reducedMotion ? 1 : springProgress }}
        />
        {[150, 450, 750, 1050].map((x, index) => (
          <g key={x}>
            <circle cx={x} cy="35" r="16" fill="#F8FAFF" stroke="#3848BE" strokeWidth="3" />
            <circle cx={x} cy="35" r="5" fill={index === 0 ? "#3848BE" : "#8295D6"} />
          </g>
        ))}
      </svg>
    </div>
  );
}
