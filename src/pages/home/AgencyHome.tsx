import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2,
  Copy, Link2, Ticket, UsersRound,
} from "lucide-react";
import type { EventType } from "../../Types/eventType";
import { createSlug } from "../../../Utils/createSlug";
import AssetSlot from "../../components/media/AssetSlot";
import ContactForm from "./agency/ContactForm";
import ReferenceHero from "./reference/ReferenceHero";
import ReferenceShowcase from "./reference/ReferenceShowcase";
import ReferenceStories from "./reference/ReferenceStories";
import { useHomeScrollMotion } from "./motion/useHomeScrollMotion";
import "./agency-home.css";
import "./reference/reference-upgrade.css";
import "./motion/home-scroll-motion.css";
import "./reference/compact-showcase.css";

type Props = {
  featuredEvents: EventType[];
  isLoading: boolean;
  error: string | null;
};

function ShareVisual({ event }: { event?: EventType }) {
  const [copied,setCopied] = useState(false);
  const eventPath = event ? `/events/${createSlug(event.EventName || "event")}/${event.id}` : "/Events";
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + eventPath);
      setCopied(true);
    } catch { setCopied(false); }
  };
  return <div className="ea-share-widget"><span className="ea-pill-label">{event ? "Published event link" : "Events directory link"}</span>
    <div className="ea-share-link">
      <Link2 size={19} aria-hidden="true" className="ea-share-link-icon"/>
      <span className="ea-share-link-path" title={eventPath}>{eventPath}</span>
      <button className="ea-share-link-copy" type="button" aria-label={event ? "Copy published event link" : "Copy EventHive events directory link"} onClick={share}>
        {copied ? <Check size={17} aria-hidden="true"/> : <Copy size={17} aria-hidden="true"/>}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
    <p aria-live="polite">{copied?"Link copied to clipboard.":"Share the published link in your WhatsApp group."}</p>
  </div>;
}
function ProgressVisual() {
  return <div className="ea-progress-widget" aria-label="Registration submission workflow">
    <div><span>Attendee registration</span><strong>Recorded</strong></div>
    <div className="ea-progress-steps">
      <span><CheckCircle2 size={17} aria-hidden="true"/> Form submitted</span>
      <span><ArrowRight size={17} aria-hidden="true"/> Added to event records</span>
    </div>
    <p>Review registrations in your organiser dashboard.</p>
  </div>;
}
function ApprovalsVisual() {
  return <div className="ea-approval-widget" aria-label="Example organiser approval view">
    <div className="ea-approval-badge"><UsersRound size={20}/></div>
    <div><strong>Organiser access</strong><span>Approved by Super Admin</span></div>
    <span className="ea-approval-status"><Check size={17}/> Approved</span>
  </div>;
}
function CategoryVisual() {
  return <div className="ea-city-widget" aria-label="Event category browsing">
    <span>Categories on the Events page</span>
    <div>{["Technology","Music","Art","Sports"].map(category=><span className="ea-category-chip" key={category}>{category}</span>)}</div>
    <Link to="/Events" className="ea-category-link">Browse events by category <ArrowRight size={15} aria-hidden="true"/></Link>
  </div>;
}
function SpeakersVisual() {
  return <div className="ea-speaker-widget" aria-label="Event content checklist">
    <p><CheckCircle2 size={18}/> Venue and timing</p>
    <p><CheckCircle2 size={18}/> Speaker list</p>
    <p><CheckCircle2 size={18}/> Registration details</p>
    <span>Make updates in one editor.</span>
  </div>;
}
function PassVisual() {
  return <div className="ea-pass-widget" aria-label="Example downloadable event pass">
    <div className="ea-pass-ticket"><Ticket size={29} aria-hidden="true"/><span><strong>EVENT PASS</strong><small>Sample preview · not valid for entry</small></span></div>
    <p>Downloadable QR passes. Scanning at check-in is coming later.</p>
  </div>;
}

function Capabilities({ event }: { event?: EventType }) {
  return <section id="features" className="ea-section ea-capabilities" aria-labelledby="ea-cap-heading">
    <div className="ea-wrap">
      <div className="ea-section-heading">
        <h2 id="ea-cap-heading">Small details that <span className="eh-motion-sketch">save the event day.
          <svg viewBox="0 0 265 14" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path d="M3 10C74 3 178 5 262 8" stroke="#5B4BFF" strokeWidth="3.6" pathLength="1"/>
          </svg>
        </span></h2>
        <p>The useful parts of the organiser workflow, shown in context.</p>
      </div>
      <div className="ea-bento">
        <article className="ea-bento-share">
          <svg className="eh-motion-share-arc" viewBox="0 0 148 102" fill="none" aria-hidden="true">
            <path d="M10 74C43 6 85 7 133 28M133 28L112 26M133 28L122 45"
              stroke="#7469CE" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1"/>
          </svg>
          <h3>Send the same event link to everyone.</h3><ShareVisual event={event} />
        </article>
        <article className="ea-bento-progress"><h3>Keep track of registrations.</h3><ProgressVisual /></article>
        <article className="ea-bento-approval"><div><h3>Know when your organiser account is approved.</h3><p>A Super Admin reviews new accounts before dashboard access.</p></div><ApprovalsVisual /></article>
        <article className="ea-bento-cities"><h3>Browse events by category.</h3><CategoryVisual /></article>
        <article className="ea-bento-speakers"><h3>Keep details ready for guests.</h3><SpeakersVisual /></article>
        <article className="ea-bento-pass"><h3>Give guests a pass to keep.</h3><PassVisual /></article>
      </div>
    </div>
  </section>;
}

function Steps() {
  const steps = [
    ["01","Create a page","Add the event name, venue and date."],
    ["02","Preview it","Check the content and registration flow."],
    ["03","Share one link","Send it to your group or mailing list."],
    ["04","Review registrations","Keep your attendee details in order."],
  ];
  return <section id="how-it-works" className="ea-section ea-steps" aria-labelledby="ea-steps-heading"><div className="ea-wrap">
    <div className="ea-section-heading"><h2 id="ea-steps-heading">From planning to registrations in four steps.</h2><p>First register as an organiser and wait for Super Admin approval. Then follow this flow in your dashboard.</p></div>
    <ol>{steps.map(([number,title,desc])=><li key={number}><span>{number}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
  </div></section>;
}

function Pricing() {
  return <section id="pricing" className="ea-section ea-pricing" aria-labelledby="ea-pricing-heading"><div className="ea-wrap">
    <div className="ea-section-heading"><h2 id="ea-pricing-heading">Start without a ticketing bill.</h2><p>Free event pages are available today. Paid ticketing is not launched yet.</p></div>
    <div className="ea-pricing-layout">
      <article className="ea-price-free">
        <div><h3>Free events</h3><strong>₹0</strong><span>to create an event after account approval</span></div>
        <p>For free meetups and college events. Account setup includes a simulated checkout, but no payment is charged.</p>
        <ul><li><Check size={17}/> Event page and registration</li><li><Check size={17}/> Organiser dashboard</li><li><Check size={17}/> QR pass generation</li></ul>
        <Link className="ea-btn ea-btn--outline" to="/OrganizerRegistration">Register as organiser <ArrowUpRight size={18}/></Link>
      </article>
      <article className="ea-price-paid">
        <span className="ea-coming-label">Coming soon</span><h3>Paid events</h3>
        <p>UPI, card payments, payouts and refund handling are not available yet.</p>
        <div className="ea-price-divider"/><strong>No fees announced.</strong><span>We're collecting requirements before publishing rates.</span>
        <Link className="ea-inline-link" to="/?topic=paid#contact">Ask about planned paid events <ArrowRight size={18}/></Link>
      </article>
      <article className="ea-price-teams">
        <h3>Teams and colleges</h3><p>Need institution-specific access or help with a larger event programme?</p>
        <div className="ea-teams-mark" aria-hidden="true"><span/><span/><span/></div>
        <Link className="ea-inline-link" to="/?topic=teams#contact">Contact the team <ArrowRight size={18}/></Link>
      </article>
    </div>
  </div></section>;
}

const faq = [
  ["How do I start creating events?", "Register as an organiser, complete the simulated checkout (no payment is charged) and wait for Super Admin approval. Once approved, sign in to create an event page."],
  ["Can attendees register through their phone?", "Yes. Visitors can open an event page and register using the event form."],
  ["Does EventHive collect UPI payments?", "Not yet. UPI and card payments are planned for a paid-events release. No live checkout or settlement service is connected."],
  ["When will paid-event payouts and refunds be available?", "Payouts and automated refunds are not available. Terms, fees and timelines will be published before paid registrations launch."],
  ["Can we share the event in a WhatsApp group?", "Yes. Share the public event page link in your group. Automated WhatsApp reminders are not implemented."],
  ["Can my college team have separate access?", "The current roles are Organiser and Super Admin. More detailed team permissions are not yet available; you can contact us with institutional requirements."],
  ["Can I check people in by scanning their QR pass?", "EventHive can generate a downloadable QR pass, but a QR scanning and attendance verification workflow is not available yet."],
  ["Can I edit the public event page before publishing?", "Yes. Organisers can draft and preview microsite changes through the EventHive editor, then save the event."],
];

function Faq() {
  return <section id="faq" className="ea-section ea-faq" aria-labelledby="ea-faq-heading"><div className="ea-wrap ea-faq-layout">
    <div><h2 id="ea-faq-heading">The questions organisers ask us first.</h2><p>No fine print hidden behind a sales call.</p></div>
    <div className="ea-faq-list">{faq.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true" className="ea-faq-symbol"/></summary><p>{a}</p></details>)}</div>
  </div></section>;
}

function FinalCTA() {
  return <section className="ea-final" aria-labelledby="ea-final-heading"><div className="ea-wrap"><div className="ea-final-band">
    <div><h2 id="ea-final-heading">The event is yours. <span className="eh-motion-sketch">Make the first link count.
      <svg viewBox="0 0 360 14" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <path d="M3 8C90 2 236 3 357 10" stroke="#FFC233" strokeWidth="3.8" pathLength="1"/>
      </svg>
    </span></h2><p>Set up a page for the event you've been planning.</p><Link to="/OrganizerRegistration" className="ea-btn ea-btn--primary">Register as organiser <ArrowUpRight size={19}/></Link></div>
    <AssetSlot id="finalMotif" />
  </div></div></section>;
}

export default function AgencyHome(props:Props) {
  const homeRef = useRef<HTMLDivElement>(null);
  useHomeScrollMotion(homeRef);
  return <div className="ea-home" ref={homeRef}>
    <ReferenceHero event={props.featuredEvents[0]} />
    <ReferenceShowcase event={props.featuredEvents[0]} />
    <Capabilities event={props.featuredEvents[0]} />
    <Steps />
    <ReferenceStories events={props.featuredEvents} isLoading={props.isLoading} error={props.error} />
    <Pricing />
    <Faq />
    <ContactForm />
    <FinalCTA />
  </div>;
}
