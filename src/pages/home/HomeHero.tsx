import { ArrowUpRight, CalendarDays, Check, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "./HomeScrollArt";
import type { EventType } from "../../Types/eventType";

interface HomeHeroProps {
  heroEvent?: EventType;
}

const formatDate = (value?: string) => {
  if (!value) return "Date to be announced";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

/**
 * Purely visual implementation of the approved EventHive homepage concept.
 * Existing public paths, live featured event data, and registration routes remain intact.
 */
const HomeHero = ({ heroEvent }: HomeHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  return (
    <section ref={sectionRef} className="eh-home-section eh-home-hero" aria-labelledby="eh-hero-title">
      <div className="eh-home-container eh-hero-grid">
        <ScrollReveal className="eh-hero-copy">
          <p className="eh-home-eyebrow">
            <Sparkles size={13} aria-hidden="true" /> One place for every event
          </p>
          <h1 id="eh-hero-title" className="eh-hero-title">
            Make every event <em>worth showing up for.</em>
          </h1>
          <p className="eh-home-lead">
            Discover memorable experiences, share beautiful event pages and manage
            registrations — all in one simple workspace.
          </p>
          <div className="eh-home-actions">
            <Link to="/Events" className="eh-home-btn eh-home-btn-primary">
              Explore events <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-outline">
              Host an event <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="eh-hero-points" aria-label="What EventHive offers">
            <span><Check size={16} aria-hidden="true" /> Easy to discover</span>
            <span><Check size={16} aria-hidden="true" /> Simple registration</span>
            <span><Check size={16} aria-hidden="true" /> One organized dashboard</span>
          </div>
        </ScrollReveal>

        <motion.div
          style={reducedMotion ? undefined : { y: previewY }}
          className="eh-reference-art"
          aria-label="Illustration of the EventHive experience"
        >
          <div className="eh-reference-poster">
            <div className="eh-reference-poster-top">
              <span>EVENTHIVE</span>
              <span>CREATE · CONNECT</span>
            </div>
            <div className="eh-reference-orbit" aria-hidden="true" />
            <h2>Where ideas <span>meet</span> people.</h2>
            <div className="eh-reference-poster-bottom">CREATE. CONNECT. CELEBRATE.</div>
          </div>
          <div className="eh-reference-float eh-reference-float-left">
            <span className="eh-reference-float-check"><CheckCircle2 size={21} aria-hidden="true" /></span>
            <span>
              <strong>Easy registration</strong>
              <small>Made for every attendee</small>
            </span>
          </div>
          <div className="eh-reference-float eh-reference-float-right">
            <p className="eh-reference-mini-label">{heroEvent ? "UPCOMING EVENT" : "YOUR EVENTS"}</p>
            <strong>{heroEvent?.EventName || "Everything in one place"}</strong>
            <small>
              {heroEvent ? (
                <><CalendarDays size={11} aria-hidden="true" /> {formatDate(heroEvent.eventDate)}</>
              ) : (
                "Your next experience starts here"
              )}
            </small>
            {heroEvent?.location && (
              <small><MapPin size={11} aria-hidden="true" /> {heroEvent.location}</small>
            )}
            <div className="eh-reference-bars" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="eh-home-container eh-reference-trust" aria-label="Who EventHive is for">
        <span>Thoughtfully made for</span>
        <div>
          <span>CREATORS &amp; COMMUNITIES</span>
          <span>WORKSHOPS</span>
          <span>MEETUPS</span>
          <span>CONFERENCES</span>
          <span>EVENT TEAMS</span>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
