import { ArrowUpRight, CalendarDays, CheckCircle2, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EventPosterSvg, ScrollReveal } from "./HomeScrollArt";
import type { EventType } from "../../Types/eventType";

const formatDate = (value?: string) => {
  if (!value) return "Date to be announced";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

interface HomeHeroProps {
  heroEvent?: EventType;
}

const HomeHero = ({ heroEvent }: HomeHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  return (
  <section ref={sectionRef} className="eh-home-section eh-home-hero" aria-labelledby="eh-hero-title">
    <div className="eh-home-container eh-hero-grid">
      <ScrollReveal className="eh-hero-copy">
        <p className="eh-home-eyebrow">EVENTHIVE / EVENTS MADE SIMPLE</p>
        <h1 id="eh-hero-title" className="eh-hero-title">
          Build events people want to be <em>part of.</em>
        </h1>
        <p className="eh-home-lead">
          Create beautiful event pages, welcome attendees and manage registrations
          in one thoughtful space.
        </p>
        <div className="eh-home-actions">
          <Link to="/Events" className="eh-home-btn eh-home-btn-primary">
            Browse Events <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-outline">
            Create Event <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <div className="eh-hero-points" aria-label="Platform highlights">
          <span><CheckCircle2 size={18} aria-hidden="true" /> Branded event pages</span>
          <span><CheckCircle2 size={18} aria-hidden="true" /> Easy registrations</span>
          <span><CheckCircle2 size={18} aria-hidden="true" /> Organizer dashboard</span>
        </div>
      </ScrollReveal>

      <motion.div style={reducedMotion ? undefined : { y: previewY }} className="eh-hero-preview eh-home-card" aria-label="Event page interface preview">
        <div className="eh-preview-topbar">
          <span className="eh-preview-brand">EventHive</span>
          <span className="eh-preview-label">EVENT PAGE PREVIEW</span>
        </div>
        <div className="eh-preview-cover">
          {heroEvent?.banner ? (
            <img
              src={heroEvent.banner}
              alt={heroEvent.EventName ? `Banner for ${heroEvent.EventName}` : "Event cover"}
              className="eh-preview-image"
              loading="eager"
            />
          ) : (
            <EventPosterSvg />
          )}
        </div>
        <div className="eh-preview-content">
          <div className="eh-preview-heading">
            <div>
              <span className="eh-home-tag">EVENT PAGE</span>
              <h2>{heroEvent?.EventName || "Your next great event"}</h2>
            </div>
            <span className="eh-preview-ticket" aria-hidden="true"><Ticket size={23} /></span>
          </div>
          <div className="eh-preview-details">
            <span><CalendarDays size={17} aria-hidden="true" /> {formatDate(heroEvent?.eventDate)}</span>
            <span><MapPin size={17} aria-hidden="true" /> {heroEvent?.location || "Location to be announced"}</span>
          </div>
          <div className="eh-preview-bottom">
            <span><CheckCircle2 size={18} aria-hidden="true" /> Designed for easy registration</span>
            <span className="eh-preview-button">Event details <ArrowUpRight size={15} aria-hidden="true" /></span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default HomeHero;
