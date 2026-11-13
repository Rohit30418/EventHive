import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2,
  Copy, Link2, MapPin, Ticket, UsersRound,
} from "lucide-react";
import type { EventType } from "../../Types/eventType";
import { createSlug } from "../../../Utils/createSlug";
import AssetSlot from "../../components/media/AssetSlot";
import ContactForm from "./agency/ContactForm";
import "./agency-home.css";

type Props = {
  featuredEvents: EventType[];
  isLoading: boolean;
  error: string | null;
};

function EventUrl({ event }: { event: EventType }) {
  return <Link className="ea-event-link" to={`/events/${createSlug(event.EventName || "event")}/${event.id}`}>
    View event <ArrowUpRight size={17} aria-hidden="true" />
  </Link>;
}

function dateLabel(value?: string) {
  if (!value) return "Date to be confirmed";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value :
    date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Sample content is explicitly labelled. No fictional registration metrics are presented as real. */
function Hero() {
  return <section className="ea-hero" aria-labelledby="ea-title">
    <div className="ea-wrap ea-hero-layout">
      <div className="ea-hero-copy">
        <p className="ea-hero-overline">Made for the people who run events.</p>
        <h1 id="ea-title">Fill your next event in days, not weeks.</h1>
        <p>Build an event page, share the link in your WhatsApp group and keep track of who registered.</p>
        <div className="ea-hero-actions">
          <Link to="/OrganizerRegistration" className="ea-btn ea-btn--primary">Create free event <ArrowUpRight size={20} aria-hidden="true" /></Link>
          <Link to="/Events" className="ea-quiet-link">See an event page <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="ea-under-cta"><CheckCircle2 size={18} aria-hidden="true" /> No credit card needed to register as an organiser.</div>
      </div>
      <div className="ea-hero-composition" aria-label="Illustrative EventHive product arrangement">
        <div className="ea-hero-browser">
          <div className="ea-browser-bar"><span className="ea-browser-dots" aria-hidden="true"><i/><i/><i/></span><span>Event page</span><b>Sample</b></div>
          <div className="ea-hero-banner">
            <span className="ea-cover-overline">SAVE YOUR SEAT</span>
            <span className="ea-cover-title">Creative Saturday</span>
            <span className="ea-cover-place">Pune · Weekend meetup</span>
          </div>
          <div className="ea-hero-browser-content">
            <strong>An event page people understand.</strong>
            <span><CalendarDays size={16} aria-hidden="true"/> Date, venue, speakers and the next step</span>
          </div>
        </div>
        <div className="ea-hero-registration">
          <span className="ea-ui-mark">Sample registration</span>
          <h3>Save a place</h3>
          <div className="ea-sample-input">Full name <span>Attendee name</span></div>
          <div className="ea-sample-input">Email <span>name@example.com</span></div>
          <div className="ea-sample-button">Register <ArrowRight size={14} aria-hidden="true" /></div>
        </div>
        <div className="ea-hero-attendee-chip"><span><Check size={16} aria-hidden="true"/></span><div><strong>Registration recorded</strong><small>Sample attendee list</small></div></div>
        <div className="ea-hero-art"><AssetSlot id="heroMotif" /></div>
      </div>
    </div>
  </section>;
}

function Problem() {
  return <section className="ea-section ea-problem" aria-labelledby="ea-problem-heading">
    <div className="ea-wrap ea-problem-layout">
      <div>
        <h2 id="ea-problem-heading">Your guest list should not live across six WhatsApp chats and a spreadsheet.</h2>
        <p>When the event gets busy, finding a registration should be the easy part. Give every attendee one clear place to sign up.</p>
        <Link className="ea-inline-link" to="/OrganizerRegistration">Set up your event page <ArrowRight size={18}/></Link>
      </div>
      <div className="ea-problem-visual">
        <AssetSlot id="problem" />
        <span className="ea-problem-corner">One link replaces the back-and-forth.</span>
      </div>
    </div>
  </section>;
}

type Screen = {
  id: "eventPage" | "registration" | "attendeeList" | "preview";
  number: string;
  title: string;
  description: string;
  label: string;
  mode: "browser" | "phone";
};

const screens: Screen[] = [
  { id: "eventPage", number: "01", title: "Share one link that tells the whole story.", description: "Venue, schedule, speakers and registration live together on your event page.", label: "Published event page", mode: "browser" },
  { id: "registration", number: "02", title: "Give attendees a form they can finish on their phone.", description: "People can register without guessing what happens next.", label: "Registration form", mode: "phone" },
  { id: "attendeeList", number: "03", title: "Know who is coming before doors open.", description: "Review registration details from the organiser workspace.", label: "Attendee records", mode: "browser" },
  { id: "preview", number: "04", title: "Check the page before you publish it.", description: "See unsaved microsite changes without affecting the live event.", label: "Microsite preview", mode: "browser" },
];

function ProductShowcase() {
  return <section id="product" className="ea-section ea-product" aria-labelledby="ea-product-heading">
    <div className="ea-wrap">
      <div className="ea-section-heading ea-product-heading"><h2 id="ea-product-heading">The organiser's side of a good event.</h2><p>Four moments in the workflow, built around what you actually need to do.</p></div>
      <div className="ea-product-list">
        {screens.map((screen,index) => <article key={screen.id} className={`ea-product-row ea-product-row--${index % 2 ? "reverse" : "normal"}`}>
          <div className="ea-product-copy">
            <span className="ea-small-index">{screen.number} / THE WORKFLOW</span>
            <h3>{screen.title}</h3><p>{screen.description}</p>
            {index === 0 && <Link className="ea-inline-link" to="/Events">See public event pages <ArrowUpRight size={18}/></Link>}
          </div>
          <div className={`ea-product-frame ea-product-frame--${screen.mode}`}>
            <div className="ea-frame-header"><span className="ea-browser-dots" aria-hidden="true"><i/><i/><i/></span><span>{screen.label}</span><span className="ea-frame-corner">Asset slot</span></div>
            <AssetSlot id={screen.id} />
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

function ShareVisual() {
  const [copied,setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/Events");
      setCopied(true);
    } catch { setCopied(false); }
  };
  return <div className="ea-share-widget"><span className="ea-pill-label">Public event link</span>
    <div className="ea-share-link"><Link2 size={19} aria-hidden="true"/><span>/Events</span><button type="button" aria-label="Copy EventHive events link" onClick={share}><Copy size={17} aria-hidden="true"/></button></div>
    <p aria-live="polite">{copied?"Link copied to clipboard.":"Share the published link in your WhatsApp group."}</p>
  </div>;
}
function ProgressVisual() {
  return <div className="ea-progress-widget" aria-label="Illustrative registration goal progress">
    <div><span>Sample registration goal</span><strong>12 <small>of 20</small></strong></div>
    <div className="ea-progress-track"><span style={{ width:"60%" }}/></div>
    <p>Sample figures — not an actual event count</p>
  </div>;
}
function ApprovalsVisual() {
  return <div className="ea-approval-widget" aria-label="Example organiser approval view">
    <div className="ea-approval-badge"><UsersRound size={20}/></div>
    <div><strong>Organiser access</strong><span>Approved by Super Admin</span></div>
    <span className="ea-approval-status"><Check size={17}/> Approved</span>
  </div>;
}
function CityVisual() {
  const [selected,setSelected] = useState("Pune");
  return <div className="ea-city-widget" aria-label="Example city filters"><span>Explore by city</span>
    <div>{["Pune","Bengaluru","Delhi"].map(city=><button key={city} type="button" aria-pressed={selected===city} onClick={()=>setSelected(city)}>{city}</button>)}</div>
    <small>Example filter selection: {selected}</small>
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

function Capabilities() {
  return <section id="features" className="ea-section ea-capabilities" aria-labelledby="ea-cap-heading">
    <div className="ea-wrap">
      <div className="ea-section-heading"><h2 id="ea-cap-heading">Small details that save the event day.</h2><p>The useful parts of the organiser workflow, shown in context.</p></div>
      <div className="ea-bento">
        <article className="ea-bento-share"><h3>Send the same event link to everyone.</h3><ShareVisual /></article>
        <article className="ea-bento-progress"><h3>Keep track of registrations.</h3><ProgressVisual /></article>
        <article className="ea-bento-approval"><div><h3>Approve organisers before they publish.</h3><p>The Super Admin controls access.</p></div><ApprovalsVisual /></article>
        <article className="ea-bento-cities"><h3>Find events by location.</h3><CityVisual /></article>
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
    <div className="ea-section-heading"><h2 id="ea-steps-heading">From planning to registrations in four steps.</h2></div>
    <ol>{steps.map(([number,title,desc])=><li key={number}><span>{number}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
  </div></section>;
}

function Comparison() {
  const rows=[
    ["Event page","Designed to present event details","You create a form and share extra details separately"],
    ["Collect registrations","Records appear in the event workspace","Responses are collected in a form-linked sheet"],
    ["Speakers and venue","Part of the public event page","Usually a description or separate document"],
    ["Discover events","Public event listings are available","Distribution depends on your own shared link"],
    ["Cost to use","Event creation is currently free","Google Forms is available for free"],
  ];
  return <section id="compare" className="ea-section ea-comparison" aria-labelledby="ea-compare-heading"><div className="ea-wrap">
    <div className="ea-section-heading"><h2 id="ea-compare-heading">Why not use a Google Form and a spreadsheet?</h2><p>For a small signup list, that can work. EventHive adds the public event page and organiser view.</p></div>
    <div className="ea-comparison-scroll" role="region" aria-label="EventHive compared to manual registration tools" tabIndex={0}>
      <table><thead><tr><th scope="col">What matters</th><th scope="col">EventHive</th><th scope="col">Forms + manual tracking</th></tr></thead>
      <tbody>{rows.map(([point,hive,form])=><tr key={point}><th scope="row">{point}</th><td>{hive}</td><td>{form}</td></tr>)}</tbody></table>
    </div>
    <p className="ea-comparison-fine">Comparison covers published pages and registration tools available today, not planned payments or onsite scanning.</p>
  </div></section>;
}

const scenarios = [
  { id:"college" as const, city:"Pune", name:"A college fest", description:"Keep the programme, venue and registration link in one place for students." },
  { id:"meetup" as const, city:"Bengaluru", name:"A design meetup", description:"Share one page with the date, speakers and where to show up." },
  { id:"conference" as const, city:"Delhi", name:"A conference team", description:"Give delegates one page and keep attendee records accessible." },
];

function EventCards({ events, loading, error }: { events:EventType[], loading:boolean, error:string|null }) {
  return <div className="ea-live-events">
    <div className="ea-live-events-title"><h3>Explore event pages</h3><Link to="/Events">Browse all events <ArrowRight size={17}/></Link></div>
    {loading ? <p role="status">Loading upcoming events…</p> : error ? <p role="alert">Event listings could not load right now.</p>
      : events.length ? <div className="ea-event-grid">
        {events.slice(0,3).map(event=><article className="ea-event" key={event.id}>
          <AssetSlot id="eventPoster" src={event.banner} alt={event.banner ? `Poster for ${event.EventName}` : undefined}/>
          <div className="ea-event-body"><p><CalendarDays size={16}/>{dateLabel(event.eventDate)}</p><h4>{event.EventName}</h4><p><MapPin size={16}/>{event.location || "Venue to be announced"}</p><EventUrl event={event}/></div>
        </article>)}
      </div> : <div className="ea-events-empty"><AssetSlot id="empty"/><p>No upcoming events are listed yet.</p><Link to="/OrganizerRegistration">Create an event <ArrowRight size={17}/></Link></div>}
  </div>;
}

function Scenarios({ featuredEvents, isLoading, error }: Props) {
  return <section id="who-its-for" className="ea-section ea-scenarios" aria-labelledby="ea-scenarios-heading"><div className="ea-wrap">
    <div className="ea-section-heading"><h2 id="ea-scenarios-heading">Different gatherings. Familiar problems.</h2><p>Three everyday situations where clear registration details matter.</p></div>
    <div className="ea-scenario-grid">
      {scenarios.map((s,i)=><article key={s.id} className={`ea-scenario ea-scenario--${i+1}`}>
        <AssetSlot id={s.id}/><div><span>{s.city} · Illustrative scenario</span><h3>{s.name}</h3><p>{s.description}</p></div>
      </article>)}
    </div>
    <EventCards events={featuredEvents} loading={isLoading} error={error}/>
  </div></section>;
}

function Founding() {
  return <section id="founding" className="ea-section ea-founding" aria-labelledby="ea-founding-heading"><div className="ea-wrap ea-founding-layout">
    <div className="ea-founding-portrait"><AssetSlot id="founder"/></div>
    <div className="ea-founding-copy">
      <span className="ea-small-index">FOR EARLY ORGANISERS</span>
      <h2 id="ea-founding-heading">We want to hear from people doing the actual work.</h2>
      <p>Planning a college fest, running community meetups or coordinating a conference? Tell us where registration gets messy. Real feedback should shape what comes next.</p>
      <Link to="/?topic=founding#contact" className="ea-inline-link">Apply as a founding organiser <ArrowUpRight size={18}/></Link>
      <small>There are no customer quotes or logos displayed until organisers approve them.</small>
    </div>
  </div></section>;
}

function Pricing() {
  return <section id="pricing" className="ea-section ea-pricing" aria-labelledby="ea-pricing-heading"><div className="ea-wrap">
    <div className="ea-section-heading"><h2 id="ea-pricing-heading">Start without a ticketing bill.</h2><p>Free event pages are available today. Paid ticketing is not launched yet.</p></div>
    <div className="ea-pricing-layout">
      <article className="ea-price-free">
        <div><h3>Free events</h3><strong>₹0</strong><span>to create an event today</span></div>
        <p>For college events, community groups and meetups that do not charge attendees.</p>
        <ul><li><Check size={17}/> Event page and registration</li><li><Check size={17}/> Organiser dashboard</li><li><Check size={17}/> QR pass generation</li></ul>
        <Link className="ea-btn ea-btn--outline" to="/OrganizerRegistration">Create free event <ArrowUpRight size={18}/></Link>
      </article>
      <article className="ea-price-paid">
        <span className="ea-coming-label">Coming soon</span><h3>Paid events</h3>
        <p>UPI, card payments, payouts and refund handling are not available yet.</p>
        <div className="ea-price-divider"/><strong>No fees announced.</strong><span>We're collecting requirements before publishing rates.</span>
        <Link className="ea-inline-link" to="/?topic=paid#contact">Join the paid-events waitlist <ArrowRight size={18}/></Link>
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
  ["What does it cost to create a free event?", "Event pages and registration collection are currently available without a ticketing charge. Organiser accounts require Super Admin approval."],
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
    <div><h2 id="ea-final-heading">The event is yours. Make the first link count.</h2><p>Set up a page for the event you've been planning.</p><Link to="/OrganizerRegistration" className="ea-btn ea-btn--primary">Create free event <ArrowUpRight size={19}/></Link></div>
    <AssetSlot id="finalMotif" />
  </div></div></section>;
}

export default function AgencyHome(props:Props) {
  return <div className="ea-home">
    <Hero />
    <Problem />
    <ProductShowcase />
    <Capabilities />
    <Steps />
    <Comparison />
    <Scenarios {...props}/>
    <Founding />
    <Pricing />
    <Faq />
    <ContactForm />
    <FinalCTA />
  </div>;
}
