import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2,
  ClipboardList, CreditCard, IndianRupee, Mail,
  MapPin, MessageCircle, TicketCheck, UsersRound,
} from "lucide-react";
import { createSlug } from "../../../Utils/createSlug";
import type { EventType } from "../../Types/eventType";

interface Props {
  featuredEvents: EventType[];
  isLoading: boolean;
  error: string | null;
}
type AudienceKey = "organizers" | "attendees" | "admins";
const audienceList: { key: AudienceKey; label: string; heading: string; desc: string; points: string[] }[] = [
  {
    key: "organizers", label: "Organizers",
    heading: "Spend less time coordinating. More time hosting.",
    desc: "Publish a clear event page, make registration easy and keep the essentials close.",
    points: ["Create a branded event microsite", "Review attendee registrations", "Edit and preview event pages before publishing"],
  },
  {
    key: "attendees", label: "Attendees",
    heading: "Find the event. Get the details. Register.",
    desc: "Give people a dependable path from discovery to registration.",
    points: ["Browse upcoming events", "See dates, venues and event details", "Register and download a QR pass"],
  },
  {
    key: "admins", label: "Admin Teams",
    heading: "Keep organiser access under control.",
    desc: "A separate workspace for approvals and platform oversight.",
    points: ["Review organiser applications", "Approve access to the organiser dashboard", "See activity in one admin interface"],
  },
];

const faqList = [
  { q: "Can I create an event without paying?", a: "Approved organisers can currently create event pages and collect registrations in EventHive. The pricing examples on this page are proposals, not a published billing policy." },
  { q: "Can attendees pay through UPI, cards or netbanking?", a: "Not yet. Online payments are not connected in the current version. UPI, card and netbanking support are planned capabilities, not available checkout options." },
  { q: "When would I receive payouts from paid registrations?", a: "Payouts are not available because the current platform does not process ticket payments. Timelines and settlement terms would be published before a paid-ticket launch." },
  { q: "How do refunds work?", a: "Automated refunds are not implemented yet. Event organisers should provide their cancellation and refund policy directly. Do not collect payments through the site until a verified payment and refund flow is introduced." },
  { q: "Will I get GST invoices?", a: "Automated GST invoices are not currently generated. They are part of the India-focused roadmap, and invoice rules must be reviewed before launch." },
  { q: "Can I share my event through WhatsApp?", a: "Yes. You can copy the public event-page link and share it using WhatsApp. Automatic WhatsApp messaging is not built into the platform." },
  { q: "Can team members manage my events?", a: "EventHive currently has organiser and Super Admin roles. More granular team-member permissions are a planned improvement." },
  { q: "Does the QR code support check-in scanning?", a: "Attendees can generate or download a QR pass. An on-site QR scanning and check-in verification workflow is not implemented yet." },
];

const exampleGoal = 40;
const exampleRegistrations = 24;
const samplePhoto = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&h=560&q=80";
const photos = [
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=760&h=475&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=760&h=475&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=760&h=475&q=80",
];

function dateLabel(value?: string) {
  if (!value) return "Date to be announced";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function eventPrice(event: EventType) {
  const extra = event as EventType & { price?: number | string; ticketPrice?: number | string; isFree?: boolean };
  const raw = extra.ticketPrice ?? extra.price;
  if (extra.isFree || raw === 0 || raw === "0" || (typeof raw === "string" && raw.toLowerCase() === "free")) return "Free";
  if (raw !== undefined && raw !== null && raw !== "" && Number.isFinite(Number(raw)) && Number(raw) >= 0) {
    return "₹" + Number(raw).toLocaleString("en-IN");
  }
  return "See event details";
}

function useExampleCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") { return; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          document.documentElement.classList.contains("a11y-pause-animations")) {
        setCount(exampleRegistrations);
        return;
      }
      const started = performance.now();
      const tick = (time: number) => {
        const fraction = Math.min(1, (time - started) / 950);
        const eased = 1 - Math.pow(1 - fraction, 3);
        setCount(Math.round(exampleRegistrations * eased));
        if (fraction < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return { ref, count };
}

function HeroPreview({ event }: { event?: EventType }) {
  const { ref, count } = useExampleCounter();
  return (
    <div className="eh26-hero-preview" aria-label="Illustrative EventHive event management preview">
      <div className="eh26-preview-top"><span className="eh26-mini-logo">e<span>.</span></span><span>Event page preview</span><span className="eh26-demo-tag">Illustrative UI</span></div>
      <img src={event?.banner || samplePhoto} alt={event?.banner ? `Banner for ${event.EventName}` : "Illustrative conference gathering"} width={900} height={560} className="eh26-preview-cover" />
      <div className="eh26-preview-info">
        <p className="eh26-preview-category">Your event microsite</p>
        <h2>{event?.EventName || "Your next community event"}</h2>
        <p><CalendarDays size={16} aria-hidden="true" /> {dateLabel(event?.eventDate)} <span aria-hidden="true">·</span> {event?.location || "Venue details on the event page"}</p>
        <div className="eh26-preview-count" ref={ref}>
          <div><span>Registrations</span><strong aria-label={`${count} of ${exampleGoal} example registrations`}>{count}<small> / {exampleGoal}</small></strong></div>
          <div className="eh26-progress" role="meter" aria-label="Illustrative registration goal progress" aria-valuemin={0} aria-valuemax={exampleGoal} aria-valuenow={count}>
            <span style={{ width: `${count / exampleGoal * 100}%` }} />
          </div>
          <small>Example counter only — not live attendee data</small>
        </div>
      </div>
    </div>
  );
}

function Hero({ event }: { event?: EventType }) {
  return (
    <section className="eh26-hero" aria-labelledby="eh26-hero-title">
      <div className="eh26-container eh26-hero-layout">
        <div className="eh26-hero-copy">
          <p className="eh26-hero-kicker">Event pages and registrations, together.</p>
          <h1 id="eh26-hero-title">Fill your next event <span>in days, not weeks.</span></h1>
          <p className="eh26-lead">Create an event page, share it with your community and manage registrations from one place.</p>
          <div className="eh26-actions">
            <Link className="eh26-button eh26-button-amber" to="/OrganizerRegistration">Create free event <ArrowUpRight size={19} aria-hidden="true" /></Link>
            <Link className="eh26-button eh26-button-outline" to="/Events">Browse events <ArrowRight size={19} aria-hidden="true" /></Link>
          </div>
          <p className="eh26-assurance"><CheckCircle2 size={17} aria-hidden="true" /> No credit card needed to create an organiser account.</p>
        </div>
        <HeroPreview event={event} />
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { title: "Share via WhatsApp", info: "Copy event links", live: true, icon: MessageCircle },
    { title: "Attendee records", info: "Available today", live: true, icon: ClipboardList },
    { title: "UPI · cards · netbanking", info: "Planned", live: false, icon: CreditCard },
    { title: "GST invoices", info: "Planned", live: false, icon: IndianRupee },
    { title: "Check-in list", info: "Planned", live: false, icon: TicketCheck },
  ];
  return (
    <section className="eh26-trust" aria-label="EventHive features and India-focused roadmap">
      <div className="eh26-container">
        <p className="eh26-trust-title">Built for event teams in India <span>· Features and roadmap clearly marked</span></p>
        <div className="eh26-trust-grid">
          {items.map(({ title, info, live, icon: Icon }) => (
            <div className="eh26-trust-item" key={title}>
              <Icon size={22} aria-hidden="true" />
              <div><strong>{title}</strong><span className={live ? "eh26-live" : "eh26-planned"}>{info}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniBuilder() {
  return <div className="eh26-ui-mini eh26-builder-preview" aria-hidden="true">
    <div className="eh26-ui-topbar"><span className="eh26-ui-dot" /> Event editor <span>Draft preview</span></div>
    <div className="eh26-form-row"><span>Event title</span><strong>Design & Community Meetup</strong></div>
    <div className="eh26-mini-columns"><div className="eh26-form-row"><span>Date</span><strong>12 December</strong></div><div className="eh26-form-row"><span>City</span><strong>Mumbai</strong></div></div>
    <div className="eh26-form-row"><span>Event page</span><strong>Banner · Agenda · Speakers</strong></div>
    <div className="eh26-ui-save"><Check size={14} /> Draft ready to preview</div>
  </div>;
}
function MiniRegister() {
  return <div className="eh26-ui-mini eh26-registration-preview" aria-hidden="true">
    <div className="eh26-ui-topbar">Registration form <span>Preview</span></div>
    <div className="eh26-form-row"><span>Full name</span><strong>Enter your name</strong></div>
    <div className="eh26-form-row"><span>Email address</span><strong>you@example.com</strong></div>
    <div className="eh26-ui-save">Register for this event <ArrowRight size={14}/></div>
  </div>;
}
function MiniAttendees() {
  return <div className="eh26-ui-mini eh26-attendee-preview" aria-hidden="true">
    <div className="eh26-ui-topbar">Attendee list <span>Sample interface</span></div>
    {["Attendee record", "Registration record", "QR pass available"].map((item,i) =>
      <div className="eh26-person-row" key={item}><span className="eh26-person-avatar">{i + 1}</span><span>{item}</span><CheckCircle2 size={16}/></div>)}
  </div>;
}
function MiniDiscover() {
  return <div className="eh26-ui-mini eh26-discovery-preview" aria-hidden="true">
    <div className="eh26-ui-topbar">Find events <span>All categories</span></div>
    <div className="eh26-search-field">Search events, city or type</div>
    <div className="eh26-discovery-event"><img src={photos[0]} alt="" width={80} height={60}/><div><strong>Upcoming experiences</strong><span>Date · City · Details</span></div></div>
  </div>;
}

function Features() {
  return <section id="features" className="eh26-section eh26-features" aria-labelledby="eh26-feature-title">
    <div className="eh26-container">
      <div className="eh26-section-heading"><h2 id="eh26-feature-title">From event idea to attendee list.</h2><p>Build the page people see and the workspace you use to manage it.</p></div>
      <div className="eh26-bento">
        <article className="eh26-bento-card eh26-bento-large"><div><h3>Publish a page worth sharing.</h3><p>Event details, branding and speakers in one public microsite.</p></div><MiniBuilder /></article>
        <article className="eh26-bento-card eh26-bento-compact"><div><h3>Make signing up straightforward.</h3><p>A clear registration form for every event.</p></div><MiniRegister /></article>
        <article className="eh26-bento-card eh26-bento-compact eh26-bento-ink"><div><h3>Keep attendee records in order.</h3><p>Review registrations without switching between spreadsheets.</p></div><MiniAttendees /></article>
        <article className="eh26-bento-card eh26-bento-large eh26-bento-surface"><div><h3>Help the right people find you.</h3><p>One discovery page connects visitors to your event details.</p></div><MiniDiscover /></article>
      </div>
    </div>
  </section>;
}

function AudiencePreview({ active }: { active: AudienceKey }) {
  return <div className="eh26-audience-ui" aria-label="Illustrative product UI preview">
    <div className="eh26-app-sidebar"><div className="eh26-app-mark">e.</div><span>Overview</span><span>Events</span><span>Registrations</span><span>Settings</span></div>
    <div className="eh26-app-main">
      <div className="eh26-ui-topbar"><strong>{active === "organizers" ? "Organizer workspace" : active === "attendees" ? "Discover events" : "Admin workspace"}</strong><span>Example interface</span></div>
      {active === "organizers" ? <>
        <h4>Your events</h4>
        <div className="eh26-app-summary"><div><small>Event page</small><strong>Community Meetup</strong></div><div><small>Registration</small><strong>Open</strong></div></div>
        <MiniAttendees />
      </> : active === "attendees" ? <>
        <h4>Explore upcoming events</h4>
        <MiniDiscover />
        <p className="eh26-app-footnote">View details → Register → Download pass</p>
      </> : <>
        <h4>Organizer requests</h4>
        {["New organizer request", "Approval review", "Organizer workspace access"].map((item,i)=>
          <div className="eh26-admin-row" key={item}><UsersRound size={17}/><span>{item}</span><span>{i===0 ? "Pending" : "Review"}</span></div>)}
      </>}
    </div>
  </div>;
}

function Audiences() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audienceList[activeIndex];
  const onKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string,number> = { ArrowRight: (index+1)%3, ArrowLeft: (index+2)%3, Home: 0, End: 2 };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`eh26-role-${next}`)?.focus();
  };
  return <section id="roles" className="eh26-section eh26-audiences" aria-labelledby="eh26-audience-title">
    <div className="eh26-container">
      <div className="eh26-section-heading"><h2 id="eh26-audience-title">One platform. Three clear experiences.</h2><p>The right tools for the people running, attending and overseeing events.</p></div>
      <div className="eh26-tabs" role="tablist" aria-label="Choose your EventHive experience" style={{"--tab":activeIndex} as CSSProperties}>
        {audienceList.map((item,i)=><button type="button" key={item.key} id={`eh26-role-${i}`} role="tab" tabIndex={activeIndex===i?0:-1} aria-selected={activeIndex===i} aria-controls="eh26-audience-panel" onKeyDown={e=>onKeys(e,i)} onClick={()=>setActiveIndex(i)}>{item.label}</button>)}
      </div>
      <div className="eh26-audience-panel" id="eh26-audience-panel" role="tabpanel" aria-labelledby={`eh26-role-${activeIndex}`} tabIndex={0}>
        <div className="eh26-audience-description">
          <h3>{active.heading}</h3>
          <p>{active.desc}</p>
          <ul>{active.points.map(p=><li key={p}><Check size={18} aria-hidden="true" />{p}</li>)}</ul>
          <Link to={active.key==="organizers" ? "/OrganizerRegistration" : active.key==="attendees"? "/Events" : "/Login"} className="eh26-text-link">
            {active.key==="organizers" ? "Create an event" : active.key==="attendees" ? "Browse events" : "Go to sign in"} <ArrowRight size={17}/>
          </Link>
        </div>
        <AudiencePreview active={active.key}/>
      </div>
    </div>
  </section>;
}

function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    // Reduced motion renders a static completed rail, not a scroll-filling line.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.classList.contains("a11y-pause-animations")) {
      setProgress(100);
      return;
    }
    let frame=0;
    const onScroll=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
      const el=ref.current;if(!el)return;
      const box=el.getBoundingClientRect();
      const value=Math.max(0,Math.min(1,(window.innerHeight*.75-box.top)/Math.max(box.height,1)));
      setProgress(value*100);
    });};
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);};
  },[]);
  const steps=[
    ["01","Create your event","Add the name, date, venue and banner."],
    ["02","Preview the page","Check the microsite before publishing."],
    ["03","Share the link","Invite your audience through your usual channels."],
    ["04","Manage registrations","Review attendee details in your dashboard."],
  ];
  return <section id="how-it-works" className="eh26-section eh26-process" aria-labelledby="eh26-process-title">
    <div className="eh26-container">
      <div className="eh26-section-heading"><h2 id="eh26-process-title">Launch in four clear steps.</h2><p>From your first event detail to a usable attendee list.</p></div>
      <ol className="eh26-process-list" ref={ref} style={{"--fill":`${progress}%`} as CSSProperties}>
        {steps.map(([n,h,d])=><li key={n}><span className="eh26-process-num">{n}</span><div><h3>{h}</h3><p>{d}</p></div></li>)}
      </ol>
    </div>
  </section>;
}

function Comparison() {
  const rows=[
    ["Branded event page","Build a dedicated microsite","Mostly a form and confirmation"],
    ["Attendee discovery","Visitors can browse public events","You need to distribute the form link"],
    ["Event details and speakers","Display details on one event page","Separate documents or descriptions"],
    ["Organizer approvals","Separate approval and access roles","Manual sharing and permission work"],
    ["Registration records","Manage event registration data","Collect individual form responses"],
  ];
  return <section id="compare" className="eh26-section eh26-comparison" aria-labelledby="eh26-compare-title">
    <div className="eh26-container">
      <div className="eh26-section-heading"><h2 id="eh26-compare-title">Why not just use a Google Form?</h2><p>Forms are useful for collecting information. Events need a page, discovery and a place to manage what happens next.</p></div>
      <div className="eh26-table-scroll" role="region" tabIndex={0} aria-label="Comparison table: EventHive and Google Forms">
        <table><thead><tr><th scope="col">What you need</th><th scope="col">EventHive</th><th scope="col">Google Forms</th></tr></thead>
        <tbody>{rows.map(([name,eh,g])=><tr key={name}><th scope="row">{name}</th><td>{eh}</td><td>{g}</td></tr>)}</tbody></table>
      </div>
      <p className="eh26-section-note">Comparison describes the current EventHive registration workflow, not payment processing or ticket scanning.</p>
    </div>
  </section>;
}

function Pricing() {
  const plans=[
    {name:"Free events",cost:"₹0",unit:"Example plan",detail:"For meetups and free community events.",list:["Custom event microsite","Event registration form","Organizer dashboard"],cta:"Create free event",to:"/OrganizerRegistration",featured:false},
    {name:"Paid events",cost:"₹19",unit:"Example fee per ticket",detail:"A proposed model for paid-ticket workflows.",list:["Planned UPI and card collection","Planned payout reconciliation","Planned GST invoice support"],cta:"Ask about paid events",to:"/#contact",featured:true},
    {name:"Teams & colleges",cost:"Let's talk",unit:"Custom requirements",detail:"For institutions and teams with specific access needs.",list:["Organizer onboarding","Event microsite workflows","Discuss team access requirements"],cta:"Contact sales",to:"/#contact",featured:false},
  ];
  return <section id="pricing" className="eh26-section eh26-pricing" aria-labelledby="eh26-pricing-title">
    <div className="eh26-container">
      <div className="eh26-section-heading"><h2 id="eh26-pricing-title">Simple pricing, with no surprises.</h2><p>Start with an event page. Ask us about the proposed paid-event and team models.</p></div>
      <div className="eh26-pricing-grid">
        {plans.map(p=><article className={`eh26-price-card ${p.featured?"eh26-price-featured":""}`} key={p.name}>
          {p.featured&&<span className="eh26-price-pill">Illustrative paid-event plan</span>}
          <h3>{p.name}</h3><div className="eh26-price-amount">{p.cost}</div>
          <p className="eh26-price-unit">{p.unit}</p><p>{p.detail}</p>
          <ul>{p.list.map(item=><li key={item}><Check size={17}/>{item}</li>)}</ul>
          <Link to={p.to} className={p.featured?"eh26-button eh26-button-indigo":"eh26-button eh26-button-outline"}>{p.cta}<ArrowRight size={17}/></Link>
        </article>)}
      </div>
      <p className="eh26-price-disclosure"><strong>Pricing examples only.</strong> ₹0 and ₹19 are illustrative design figures, not published rates. Paid ticket checkout, UPI, payouts and GST invoicing are not yet implemented.</p>
    </div>
  </section>;
}

function Events({events,isLoading,error}:{events:EventType[];isLoading:boolean;error:string|null}) {
  return <section id="events" className="eh26-section eh26-events" aria-labelledby="eh26-events-title">
    <div className="eh26-container">
      <div className="eh26-section-heading eh26-heading-row"><div><h2 id="eh26-events-title">Find your next experience.</h2><p>Explore event pages published by EventHive organizers.</p></div><Link className="eh26-text-link" to="/Events">Browse all events <ArrowRight size={18}/></Link></div>
      {isLoading ? <p className="eh26-status" role="status">Loading events…</p> : error ? <p className="eh26-status" role="alert">We couldn't load the events. Please try again shortly.</p> : events.length > 0 ?
      <div className="eh26-events-grid">{events.slice(0,3).map((event,i)=>{
        const future = !!event.eventDate && new Date(event.eventDate).getTime() >= Date.now();
        return <article className="eh26-event-card" key={event.id}>
          <img src={event.banner||photos[i%photos.length]} alt={event.banner?`Banner for ${event.EventName}`:"Illustrative event photo"} loading="lazy" decoding="async" width={760} height={475} />
          <div className="eh26-event-body">
            <p className="eh26-event-date"><CalendarDays size={17} aria-hidden="true"/>{dateLabel(event.eventDate)}</p>
            <h3>{event.EventName||"Event details"}</h3>
            <p className="eh26-event-city"><MapPin size={17} aria-hidden="true"/>{event.location||"Location to be announced"}</p>
            <div className="eh26-event-bottom"><strong>{eventPrice(event)}</strong><Link to={`/events/${createSlug(event.EventName||"event")}/${event.id}`} className="eh26-small-button">{future?"Register / details":"View event"} <ArrowUpRight size={16}/></Link></div>
          </div>
        </article>;
      })}</div>
      : <div className="eh26-empty-events"><h3>No upcoming events listed yet.</h3><p>Ready to organize one? Publish a page for your community.</p><Link to="/OrganizerRegistration" className="eh26-text-link">Create an event <ArrowRight size={18}/></Link></div>}
    </div>
  </section>;
}

function Proof() {
  return <section id="testimonials" className="eh26-section eh26-proof" aria-labelledby="eh26-proof-title">
    <div className="eh26-container eh26-proof-layout"><div><h2 id="eh26-proof-title">Help shape EventHive for the events you run.</h2><p>We'd rather show genuine organizer feedback than publish invented reviews.</p></div>
      <div className="eh26-proof-offer">
        <span className="eh26-proof-line" aria-hidden="true"/>
        <h3>Early organizer feedback</h3>
        <p>Are you planning a meetup, workshop, college event or conference? Tell us what's slowing you down. Your feedback can help prioritize the next features.</p>
        <ul><li><Check size={17}/>Share your event workflow</li><li><Check size={17}/>Tell us what integrations matter</li><li><Check size={17}/>Discuss how EventHive could fit your team</li></ul>
        <a href="mailto:support@eventhive.com?subject=EventHive%20early%20organiser%20feedback" className="eh26-text-link">Share your feedback <ArrowRight size={18}/></a>
      </div></div>
  </section>;
}

function Faq() {
  return <section id="faq" className="eh26-section eh26-faq" aria-labelledby="eh26-faq-title">
    <div className="eh26-container eh26-faq-layout"><div><h2 id="eh26-faq-title">Questions before you create an event?</h2><p>Here are the practical answers—including what's not live yet.</p></div>
      <div>{faqList.map(item=><details key={item.q} className="eh26-faq-item"><summary>{item.q}<span className="eh26-faq-plus" aria-hidden="true"/></summary><p>{item.a}</p></details>)}</div>
    </div>
  </section>;
}

function SalesContact() {
  const [prepared,setPrepared]=useState(false);
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const fields=new FormData(event.currentTarget);
    const name=String(fields.get("name")||"").trim();
    const email=String(fields.get("email")||"").trim();
    const organization=String(fields.get("organization")||"").trim();
    const topic=String(fields.get("topic")||"").trim();
    const notes=String(fields.get("notes")||"").trim();
    const subject=encodeURIComponent("EventHive sales enquiry: "+topic);
    const body=encodeURIComponent([`Name: ${name}`,`Email: ${email}`,`Organization: ${organization}`,`Interest: ${topic}`,"",notes].join("\n"));
    setPrepared(true);
    window.location.href=`mailto:support@eventhive.com?subject=${subject}&body=${body}`;
  };
  return <section id="contact" className="eh26-section eh26-contact" aria-labelledby="eh26-contact-title">
    <div className="eh26-container eh26-contact-layout"><div><h2 id="eh26-contact-title">Planning an event for a team or institution?</h2><p>Tell us what you're planning. This form is for sales, colleges and enterprise requirements—not attendee support.</p><p className="eh26-contact-email"><Mail size={19}/> support@eventhive.com</p></div>
      <form className="eh26-contact-form" onSubmit={submit}>
        <div className="eh26-contact-fields"><label>Name<input name="name" autoComplete="name" placeholder="Your name" required maxLength={100}/></label><label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@company.in" required maxLength={160}/></label></div>
        <label>Company or college<input name="organization" placeholder="Organization name" required maxLength={160}/></label>
        <label>What would you like to discuss?<select name="topic" defaultValue="Team and college events"><option>Team and college events</option><option>Paid event requirements</option><option>Organizer onboarding</option><option>Enterprise integrations</option></select></label>
        <label>Your requirements<textarea name="notes" rows={4} required maxLength={2000} placeholder="Event type, expected audience and what you need help with"/></label>
        <button className="eh26-button eh26-button-indigo" type="submit">Compose sales enquiry <ArrowRight size={18}/></button>
        <p className="eh26-form-note" role="status">{prepared?"Your email app should open. Review and send the message there.":"This opens your email app with a draft. Nothing is sent automatically."}</p>
      </form>
    </div>
  </section>;
}
function FinalCta(){
  return <section className="eh26-final-section" aria-labelledby="eh26-final-title"><div className="eh26-container"><div className="eh26-final">
    <div><h2 id="eh26-final-title">Your next event deserves a better starting point.</h2><p>Make the page. Share the link. Welcome your people.</p></div>
    <Link to="/OrganizerRegistration" className="eh26-button eh26-button-amber">Create free event <ArrowUpRight size={19}/></Link>
  </div></div></section>;
}

export default function Home2026({featuredEvents,isLoading,error}:Props){
  return <div className="eh26-home">
    <Hero event={featuredEvents[0]}/>
    <TrustStrip/>
    <Features/>
    <Audiences/>
    <HowItWorks/>
    <Comparison/>
    <Pricing/>
    <Events events={featuredEvents} isLoading={isLoading} error={error}/>
    <Proof/>
    <Faq/>
    <SalesContact/>
    <FinalCta/>
  </div>;
}
