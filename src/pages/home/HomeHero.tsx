import { ArrowRight, ArrowUpRight, CalendarCheck2, CalendarDays, Check, CheckCircle2, CirclePlay, MapPin, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { EventType } from "../../Types/eventType";

interface HomeHeroProps { heroEvent?: EventType; }

const formatDate = (value?: string) => {
  if (!value) return "Date coming soon";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
};

/** Presentation-only. Uses the real event supplied by Home.tsx. */
export default function HomeHero({ heroEvent }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const artworkY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section ref={sectionRef} className="eh-home-section eh-home-hero" aria-labelledby="eh-hero-title">
      <div className="eh-home-container">
        <div className="eh-hero-grid">
          <motion.div className="eh-hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="eh-home-eyebrow"><span className="eh-hero-status-dot" /> EVENTS, MADE SIMPLE</p>
            <h1 id="eh-hero-title" className="eh-hero-title">
              Bring people together. <em>Make it memorable.</em>
            </h1>
            <p className="eh-home-lead">
              Create event pages, connect with your audience and manage registrations
              in one thoughtfully designed place.
            </p>
            <div className="eh-home-actions">
              <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-primary">
                Host your event <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/Events" className="eh-home-btn eh-home-btn-outline">
                Explore events <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <Link to="/#how-it-works" className="eh-hero-watch">
              <span><CirclePlay size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              See how it works
            </Link>
            <div className="eh-hero-points" aria-label="Platform capabilities">
              <span><Check size={15} aria-hidden="true" /> Event microsites</span>
              <span><Check size={15} aria-hidden="true" /> Easy registration</span>
              <span><Check size={15} aria-hidden="true" /> Organizer workspace</span>
            </div>
          </motion.div>
          <motion.div className="eh-hero-stage"
            style={reducedMotion ? undefined : { y: artworkY }}
            role="img" aria-label="EventHive event page preview with registration and workspace cards">
            <div className="eh-stage-glow" aria-hidden="true" />
            <motion.div className="eh-stage-visual"
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}>
              <div className="eh-stage-preview">
                <div className="eh-stage-topbar">
                  <span className="eh-stage-brand-mark">e<span>.</span></span>
                  <span>EVENT PAGE</span>
                  <span className="eh-stage-topbar-action"><ArrowUpRight size={14} /></span>
                </div>
                <div className="eh-stage-cover">
                  {heroEvent?.banner ? (
                    <img src={heroEvent.banner} alt="" className="eh-stage-image" loading="eager" />
                  ) : (
                    <div className="eh-stage-cover-art" aria-hidden="true">
                      <i className="eh-stage-ring eh-stage-ring-one" />
                      <i className="eh-stage-ring eh-stage-ring-two" />
                      <i className="eh-stage-orb" />
                      <b>BRING THE ENERGY</b>
                    </div>
                  )}
                  <span className="eh-stage-cover-tag">EVENTHIVE</span>
                </div>
                <div className="eh-stage-preview-body">
                  <span className="eh-stage-small-label">{heroEvent ? "UPCOMING EVENT" : "YOUR NEXT EVENT"}</span>
                  <h2>{heroEvent?.EventName || "The next great experience starts here."}</h2>
                  <div className="eh-stage-meta">
                    <span><CalendarDays size={14} /> {formatDate(heroEvent?.eventDate)}</span>
                    <span><MapPin size={14} /> {heroEvent?.location || "Your community"}</span>
                  </div>
                  <div className="eh-stage-preview-footer">
                    <span>Make moments happen</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div className="eh-stage-float eh-stage-float-one"
              animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
              transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity }}>
              <span className="eh-stage-float-icon green"><CheckCircle2 size={19} /></span>
              <span><strong>Registration made easy</strong><small>A better attendee experience</small></span>
            </motion.div>
            <motion.div className="eh-stage-float eh-stage-float-two"
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6.8, ease: "easeInOut", repeat: Infinity }}>
              <span className="eh-stage-float-icon blue"><CalendarCheck2 size={20} /></span>
              <span><strong>One organized workspace</strong><small>Every event, in one place</small></span>
            </motion.div>
          </motion.div>
        </div>
        <div className="eh-hero-trust" aria-label="Designed for organizers and communities">
          <div className="eh-trust-avatars" aria-hidden="true">
            <span><UsersRound size={17} /></span>
            <span><CalendarCheck2 size={17} /></span>
            <span><Check size={17} /></span>
          </div>
          <p><strong>Designed for creators &amp; organizers</strong>
            <span>From community meetups to conferences and workshops.</span>
          </p>
          <div className="eh-trust-types" aria-hidden="true"><span>MEETUPS</span><span>WORKSHOPS</span><span>CONFERENCES</span></div>
        </div>
      </div>
    </section>
  );
}
