import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, MapPin, Sparkles, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { createSlug } from "../../../Utils/createSlug";
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
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const eventLink = heroEvent?.id ? "/events/" + createSlug(heroEvent.EventName || "event") + "/" + heroEvent.id : "/Events";

  return (
    <section ref={sectionRef} className="eh-home-section eh-home-hero" aria-labelledby="eh-hero-title">
      <div className="eh-home-container eh-hero-grid">
        <ScrollReveal className="eh-hero-copy">
          <p className="eh-home-eyebrow eh-hero-kicker"><span className="eh-live-dot"/> EVENTHIVE / EVENTS MADE SIMPLE <ArrowUpRight size={15} aria-hidden="true" /></p>
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
          <div className="eh-hero-scroll-note"><span className="eh-scroll-note-line"/><ArrowDownRight size={16} aria-hidden="true"/><span>Made for people, built around events.</span></div>
        </ScrollReveal>

        <div className="eh-hero-stage">
          <svg className="eh-hero-stage-grid" viewBox="0 0 590 540" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs><pattern id="eh-hero-grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" stroke="#DDB59F" strokeWidth="1" fill="none"/></pattern></defs>
            <rect width="590" height="540" fill="url(#eh-hero-grid-pattern)" opacity=".34"/>
            <circle cx="315" cy="268" r="240" stroke="#C9977C" strokeWidth="1.5" fill="none" strokeDasharray="5 9" opacity=".6"/>
            <circle cx="315" cy="268" r="187" stroke="#E3BAA3" strokeWidth="1.5" fill="none"/>
          </svg>
          <motion.div
            initial={reducedMotion ? false : { opacity: .95, y: 25, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: reducedMotion ? 0 : .8, ease: [0.22, 1, 0.36, 1] }}
            style={reducedMotion ? undefined : { y: previewY }}
            className="eh-hero-preview eh-home-card"
            aria-label="Event page interface preview"
          >
            <div className="eh-preview-topbar">
              <span className="eh-preview-browser-dots" aria-hidden="true"><i/><i/><i/></span>
              <span className="eh-preview-browser-path">eventhive.app / event-page</span>
              <span className="eh-preview-label"><Sparkles size={13}/> EVENT PAGE</span>
            </div>
            <div className="eh-preview-cover">
              {heroEvent?.banner ? (
                <img src={heroEvent.banner} alt={heroEvent.EventName ? "Banner for " + heroEvent.EventName : "Event cover"} className="eh-preview-image" loading="eager" />
              ) : (
                <EventPosterSvg />
              )}
            </div>
            <div className="eh-preview-content">
              <div className="eh-preview-heading">
                <div><span className="eh-home-tag">DESIGNED FOR YOUR NEXT EVENT</span><h2>{heroEvent?.EventName || "Your next great event"}</h2></div>
                <span className="eh-preview-ticket" aria-hidden="true"><Ticket size={22}/></span>
              </div>
              <div className="eh-preview-details">
                <span><CalendarDays size={16} aria-hidden="true"/> {formatDate(heroEvent?.eventDate)}</span>
                <span><MapPin size={16} aria-hidden="true"/> {heroEvent?.location || "Location to be announced"}</span>
              </div>
              <div className="eh-preview-bottom">
                <span><CheckCircle2 size={17} aria-hidden="true"/> Designed for easy registration</span>
                <Link to={eventLink} className="eh-preview-button">Event details <ArrowRight size={16} aria-hidden="true"/></Link>
              </div>
            </div>
          </motion.div>
          <div className="eh-hero-stage-footer" aria-hidden="true"><span className="eh-stage-seal"><CheckCircle2 size={16}/> BUILD</span><span className="eh-hero-stage-progress"><i/><i/><i/></span><span className="eh-stage-seal">SHARE <ArrowUpRight size={15}/></span></div>
        </div>
      </div>
      <div className="eh-home-container">
        <div className="eh-hero-divider">
          <span>ONE HOME FOR THE ENTIRE EVENT JOURNEY</span>
          <div aria-hidden="true"><span>CREATE</span><i/><span>DISCOVER</span><i/><span>CONNECT</span><i/><span>GROW</span></div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
