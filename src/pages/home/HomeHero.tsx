import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, CirclePlay, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { EventType } from "../../Types/eventType";

interface HomeHeroProps {
  heroEvent?: EventType;
}

// Decorative stock portraits from Unsplash — not EventHive members or attendees.
// Keep these as real photographs, rather than generated avatars or initials.
const portraitPhotos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=180&h=180&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=180&h=180&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=180&h=180&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=180&h=180&q=80",
] as const;

// Real event photography until the existing Firebase query provides an event banner.
const fallbackEventPhoto =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=760&h=490&q=82";

const formatDate = (value?: string) => {
  if (!value) return "Discover upcoming events";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

/** A presentation-only animation. Existing event/registration APIs are untouched. */
export default function HomeHero({ heroEvent }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const artworkY = useTransform(scrollYProgress, [0, 1], [0, -16]);

  return (
    <section ref={sectionRef} className="eh-home-section eh-home-hero" aria-labelledby="eh-hero-title">
      <div className="eh-home-container">
        <div className="eh-hero-grid">
          <motion.div
            className="eh-hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
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

          <motion.div
            className="eh-hero-stage eh-connection-stage"
            style={reducedMotion ? undefined : { y: artworkY }}
            role="img"
            aria-label="Illustration of people connecting to an event and completing registration, using illustrative portrait photographs"
          >
            <div className="eh-connection-background" aria-hidden="true" />
            <svg className="eh-connection-paths" viewBox="0 0 560 470" aria-hidden="true" focusable="false">
              <path d="M280 237C215 190 150 140 93 100" />
              <path d="M280 237C346 185 409 140 466 101" />
              <path d="M280 237C345 298 402 336 465 369" />
              <path d="M280 237C214 299 149 339 94 365" />
              <circle className="eh-connection-origin" cx="280" cy="237" r="8" />
            </svg>

            {portraitPhotos.map((photo, index) => (
              <motion.div
                key={photo}
                className={`eh-connection-person eh-connection-person-${index + 1}`}
                aria-hidden="true"
                animate={reducedMotion ? undefined : { y: [0, index % 2 ? 7 : -7, 0] }}
                transition={{ duration: 5 + index * 0.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
              >
                <img
                  src={photo}
                  alt=""
                  width={74}
                  height={74}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
                <span className="eh-connection-online" />
              </motion.div>
            ))}

            <motion.div
              className="eh-connection-event"
              animate={reducedMotion ? undefined : { y: [0, -6, 0], rotate: [-1.5, -0.5, -1.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="eh-connection-event-top">
                <span className="eh-connection-event-logo">e<span>.</span></span>
                <span>EVENT PAGE</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </div>
              <div className="eh-connection-event-cover">
                <img
                  src={heroEvent?.banner || fallbackEventPhoto}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
                <span>EVENTHIVE</span>
              </div>
              <div className="eh-connection-event-body">
                <p>{heroEvent ? "UPCOMING EVENT" : "DISCOVER EVENTS"}</p>
                <h2>{heroEvent?.EventName || "Real people. Shared experiences."}</h2>
                <div className="eh-connection-event-meta">
                  <span><CalendarDays size={13} aria-hidden="true" /> {formatDate(heroEvent?.eventDate)}</span>
                  <span><MapPin size={13} aria-hidden="true" /> {heroEvent?.location || "Find your community"}</span>
                </div>
                <div className="eh-connection-event-footer">
                  <span>Connect through events</span><ArrowUpRight size={16} aria-hidden="true" />
                </div>
              </div>
            </motion.div>

            {/* Illustrative success state: not an actual Firebase registration. */}
            <motion.div
              className="eh-connection-success"
              aria-hidden="true"
              initial={false}
              animate={reducedMotion ? undefined : { opacity: [0, 0, 1, 1, 0], x: [12, 12, 0, 0, 12] }}
              transition={reducedMotion ? undefined : {
                duration: 8,
                times: [0, 0.18, 0.3, 0.84, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <span><CheckCircle2 size={20} /></span>
              <div><strong>Registration successful</strong><small>You're part of the event</small></div>
            </motion.div>
          </motion.div>
        </div>

        <div className="eh-hero-trust" aria-label="Designed for organizers and communities">
          <div className="eh-trust-avatars" aria-hidden="true">
            {portraitPhotos.slice(0, 3).map((photo) => (
              <span key={photo}><img src={photo} alt="" width={36} height={36} decoding="async" loading="eager" /></span>
            ))}
          </div>
          <p>
            <strong>Designed for creators &amp; organizers</strong>
            <span>From community meetups to conferences and workshops.</span>
          </p>
          <div className="eh-trust-types" aria-hidden="true">
            <span>MEETUPS</span><span>WORKSHOPS</span><span>CONFERENCES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
