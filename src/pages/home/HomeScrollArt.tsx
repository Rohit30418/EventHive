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
    <svg className="eh-preview-art" viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="eh-poster-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#28211D" />
          <stop offset="1" stopColor="#403024" />
        </linearGradient>
        <linearGradient id="eh-poster-arch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9A62" />
          <stop offset="1" stopColor="#F26B2A" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#eh-poster-bg)" />
      <path d="M0 286C130 250 260 320 390 290S540 278 640 260V320H0Z" fill="#6A412D" opacity=".25" />
      <path d="M421 275V151C421 91 467 45 522 45S624 91 624 151V275Z" fill="url(#eh-poster-arch)" />
      <path d="M444 275V151C444 104 479 70 522 70S601 104 601 151V275Z" stroke="#FFF0E4" strokeWidth="2" fill="none" opacity=".45" />
      <circle cx="522" cy="160" r="52" fill="#FFEBDD" />
      <path d="M507 143L523 133L538 143V165L523 175L507 165Z" fill="none" stroke="#A84013" strokeWidth="3" strokeLinejoin="round" />
      <path d="M522 136V174M509 145L536 163M536 145L509 163" stroke="#A84013" strokeWidth="2" opacity=".65" />
      <circle cx="383" cy="73" r="5" fill="#FFB58D" />
      <circle cx="409" cy="56" r="3" fill="#FFB58D" />
      <path d="M375 94L390 109M389 93L376 108" stroke="#FFEBDD" strokeWidth="2" strokeLinecap="round" />
      <text x="45" y="144" fill="#FFBF99" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="24" fontWeight="700" letterSpacing="6">MAKE IT</text>
      <text x="42" y="205" fill="#FFF8F3" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="48" fontWeight="700" letterSpacing="-2">MEMORABLE.</text>
      <path d="M46 234H335" stroke="#F26B2A" strokeWidth="4" strokeLinecap="round" />
      <text x="45" y="267" fill="#F4CCB3" fontFamily="Inter, Arial, sans-serif" fontSize="16" letterSpacing="2">EVENTHIVE / TOGETHER</text>
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
        <path d="M150 35H1050" stroke="#E5C1AD" strokeWidth="4" strokeLinecap="round" fill="none" />
        <motion.path
          d="M150 35H1050"
          stroke="#F26B2A"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: reducedMotion ? 1 : springProgress }}
        />
        {[150, 450, 750, 1050].map((x, index) => (
          <g key={x}>
            <circle cx={x} cy="35" r="16" fill="#FFF8F3" stroke="#F26B2A" strokeWidth="3" />
            <circle cx={x} cy="35" r="5" fill={index === 0 ? "#F26B2A" : "#D8A78E"} />
          </g>
        ))}
      </svg>
    </div>
  );
}
