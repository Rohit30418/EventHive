import { useRef, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { EventType } from "../../../Types/eventType";
import { createSlug } from "../../../../Utils/createSlug";
import AssetSlot from "../../../components/media/AssetSlot";

/**
 * Artwork composition adapted from the supplied eventhive.zip reference.
 * All displayed attendee data is illustrative, never a Firebase registration.
 */
export default function ReferenceHero({ event }: { event?: EventType }) {
  const artRef = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches) return;
    const node = artRef.current;
    if (!node) return;
    const rect = e.currentTarget.getBoundingClientRect();
    node.style.setProperty("--rx", `${((e.clientX - rect.left) / rect.width - .5) * 12}px`);
    node.style.setProperty("--ry", `${((e.clientY - rect.top) / rect.height - .5) * 10}px`);
  };
  const reset = () => {
    artRef.current?.style.setProperty("--rx", "0px");
    artRef.current?.style.setProperty("--ry", "0px");
  };
  const eventUrl = event ? `/events/${createSlug(event.EventName || "event")}/${event.id}` : "/Events";

  return (
    <section className="eh-ref-hero" aria-labelledby="ea-title" onMouseMove={move} onMouseLeave={reset}>
      <div className="ea-wrap eh-ref-hero-inner">
        <div className="eh-ref-hero-copy">
          <p className="eh-ref-hero-kicker">Event creation, discovery & registration for India</p>
          <h1 id="ea-title">Fill your next event in <span className="eh-ref-underline">days, not weeks.
            <svg viewBox="0 0 280 14" fill="none" aria-hidden="true" preserveAspectRatio="none"><path d="M2 9.5C68 3.5 182 2.5 278 7.5" stroke="#FFC233" strokeWidth="4.5" strokeLinecap="round" pathLength="1"/></svg>
          </span></h1>
          <p className="eh-ref-hero-lead">Create a public event microsite, collect attendee registrations and review every sign-up from your organiser dashboard.</p>
          <div className="eh-ref-hero-actions">
            <Link to="/OrganizerRegistration" className="ea-btn ea-btn--primary">Register as organiser <ArrowRight size={18} aria-hidden="true"/></Link>
            <Link to={eventUrl} className="ea-btn ea-btn--outline">{event ? "See a published event" : "Explore events"} <ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <p className="eh-ref-hero-assurance"><CheckCircle2 size={16} aria-hidden="true"/> No charge during account setup · Super Admin approval required</p>
          <div className="eh-ref-hero-chips" aria-label="Current EventHive features"><span>Public microsites</span><span>Organiser approvals</span><span>Downloadable QR passes</span></div>
        </div>
        <div className="eh-ref-hero-stage" ref={artRef} aria-label="Layered example event page and attendee form">
          <div className="eh-ref-hero-browser">
            <div className="eh-ref-browser-bar"><span className="eh-ref-browser-dots" aria-hidden="true"><i/><i/><i/></span><span>EventHive / public event page</span><strong>Sample UI</strong></div>
            <div className="eh-ref-hero-browser-content">
              <div className="eh-ref-hero-cover"><AssetSlot id="eventPage"/></div>
              <div className="eh-ref-hero-event-info">
                <span>Community event · Example</span>
                <h2>Design Meetup Bengaluru</h2>
                <p><CalendarDays size={14} aria-hidden="true"/> Event date on microsite</p>
                <p><MapPin size={14} aria-hidden="true"/> Bengaluru, India</p>
                <Link to={eventUrl}>{event ? "See event" : "Explore events"} <ArrowUpRight size={14}/></Link>
              </div>
            </div>
          </div>
          <div className="eh-ref-hero-form" aria-label="Sample attendee registration preview">
            <div className="eh-ref-form-heading"><strong>Attendee registration</strong><span>Example</span></div>
            <div className="eh-ref-sample-field">Full name <span>Attendee name</span></div>
            <div className="eh-ref-sample-field">Email address <span>name@example.com</span></div>
            <div className="eh-ref-sample-submit">Continue to registration <ArrowRight size={15} aria-hidden="true"/></div>
          </div>
          <div className="eh-ref-hero-confirmed"><CheckCircle2 size={18} aria-hidden="true"/><span><strong>Registration recorded</strong><small>Illustrative status · no real attendee data</small></span></div>
          <svg className="eh-ref-hero-ticket" width="109" height="70" viewBox="0 0 109 70" fill="none" aria-hidden="true">
            <path d="M9 10C9 6 12 3 16 3H93C97 3 100 6 100 10V23C94 23 90 28 90 34C90 40 94 45 100 45V60C100 64 97 67 93 67H16C12 67 9 64 9 60V45C15 45 19 40 19 34C19 28 15 23 9 23V10Z" fill="#D7FAEE" stroke="#14133A" strokeWidth="2.5"/>
            <path d="M74 12V58" stroke="#14133A" strokeWidth="1.7" strokeDasharray="4 4"/>
            <circle cx="38" cy="26" r="8" fill="#FF7A6B"/>
            <path d="M52 23H65M52 32H61M27 46H62" stroke="#14133A" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
