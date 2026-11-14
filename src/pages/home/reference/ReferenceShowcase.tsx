import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Monitor, Smartphone, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AssetSlot from "../../../components/media/AssetSlot";
import type { AssetId } from "../../../data/assetSlots";
import type { EventType } from "../../../Types/eventType";
import { createSlug } from "../../../../Utils/createSlug";

type Stage = { id: AssetId; number: string; title: string; description: string; outcome: string; mode: "browser" | "phone" };
const stages: Stage[] = [
  {
    id: "eventPage", number: "01", title: "Create an event page.",
    description: "Add the date, venue, schedule and speakers. Give your event a public page worth sharing.",
    outcome: "Build your event after your organiser account is approved.", mode: "browser",
  },
  {
    id: "registration", number: "02", title: "Collect attendee registrations.",
    description: "Guests open the event link and fill in their details on a phone or computer.",
    outcome: "The registration form writes attendee details to the event.", mode: "phone",
  },
  {
    id: "attendeeList", number: "03", title: "Review registration records.",
    description: "See who has registered without checking several spreadsheets or WhatsApp chats.",
    outcome: "Attendee records remain in your organiser workspace.", mode: "browser",
  },
  {
    id: "preview", number: "04", title: "Preview your event microsite.",
    description: "Edit the page, check your changes and save when you're happy with the result.",
    outcome: "The draft preview does not change the published event.", mode: "browser",
  },
];

export default function ReferenceShowcase({ event }: { event?: EventType }) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"desktop" | "phone">("desktop");
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStage = stages[active];

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number((entry.target as HTMLElement).dataset.stage);
        if (Number.isInteger(index) && index >= 0 && index < stages.length) {
          setActive(index);
          setView(stages[index].mode === "phone" ? "phone" : "desktop");
        }
      }
    }, { rootMargin: "-29% 0px -48% 0px", threshold: 0.1 });
    stageRefs.current.forEach(node => { if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  const jumpTo = (idx: number) => {
    setActive(idx);
    setView(stages[idx].mode === "phone" ? "phone" : "desktop");
    if (!window.matchMedia("(min-width: 1200px)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stageRefs.current[idx]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % stages.length :
      e.key === "ArrowLeft" ? (i + stages.length - 1) % stages.length :
      e.key === "Home" ? 0 : e.key === "End" ? stages.length - 1 : -1;
    if (next === -1) return;
    e.preventDefault();
    setActive(next);
    setView(stages[next].mode === "phone" ? "phone" : "desktop");
    document.getElementById(`eh-ref-stage-tab-${next}`)?.focus();
  };
  const liveEventPath = event ? `/events/${createSlug(event.EventName || "event")}/${event.id}` : "/Events";

  return <section id="product" className="eh-ref-showcase" aria-labelledby="ea-product-heading">
    <div className="ea-wrap">
      <div className="eh-ref-section-intro">
        <div><span className="eh-ref-kicker">Product showcase</span><h2 id="ea-product-heading">The organiser's side of a good event.</h2></div>
        <p>Explore how a page becomes a registration list. Scroll through the journey or choose a step.</p>
      </div>
      <div className="eh-ref-mobile-tabs" role="tablist" aria-label="EventHive product views">
        {stages.map((step, i) => <button id={`eh-ref-stage-tab-${i}`} key={step.id}
          type="button" role="tab" aria-selected={active === i} aria-controls="eh-ref-product-panel" tabIndex={active === i ? 0 : -1}
          onKeyDown={e => onTabKey(e, i)} onClick={() => { setActive(i); setView(step.mode === "phone" ? "phone" : "desktop"); }}>
          {step.number}. {step.title.replace(".", "")}</button>)}
      </div>
      <div className="eh-ref-showcase-layout">
        <div className="eh-ref-stages">
          <svg className="eh-ref-path" viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6 0V100" stroke="#E1DEF6" strokeWidth="1.8" fill="none"/>
            <path d="M6 0V100" stroke="#5B4BFF" strokeWidth="2.4" fill="none"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1 - (active + 1) / stages.length}
              style={{ transition:"stroke-dashoffset .36s ease" }}/>
          </svg>
          {stages.map((stage, i) => <div key={stage.id} className="eh-ref-stage"
            ref={node => { stageRefs.current[i] = node; }} data-stage={i}>
            <button type="button" className={`eh-ref-stage-button ${active === i ? "is-active" : ""}`}
              aria-current={active === i ? "step" : undefined} onClick={() => jumpTo(i)}>
              <span className="eh-ref-stage-dot" aria-hidden="true">{i < active ? <Check size={11}/> : i + 1}</span>
              <span className="eh-ref-stage-index">STAGE {stage.number} {active === i && <em>Active view</em>}</span>
              <strong>{stage.title}</strong>
              <span className="eh-ref-stage-desc">{stage.description}</span>
              <span className="eh-ref-stage-outcome">{stage.outcome}</span>
            </button>
          </div>)}
        </div>
        <div className="eh-ref-showcase-sticky" id="eh-ref-product-panel" role="tabpanel" aria-label={`EventHive product preview: ${activeStage.title}`}>
          <div className="eh-ref-showcase-toolbar">
            <span>Stage {activeStage.number} / 04 <span className="eh-ref-toolbar-title">· {activeStage.title}</span></span>
            <div className="eh-ref-view-switch" aria-label="Preview screen size">
              <button type="button" aria-pressed={view === "desktop"} onClick={() => setView("desktop")}><Monitor size={15}/> Desktop</button>
              <button type="button" aria-pressed={view === "phone"} onClick={() => setView("phone")}><Smartphone size={15}/> Phone</button>
            </div>
          </div>
          <div className={`eh-ref-showcase-screen ${view === "phone" ? "is-phone" : "is-desktop"}`} key={activeStage.id + view}>
            <div className="eh-ref-screen-topbar">
              <span className="eh-ref-browser-dots" aria-hidden="true"><i/><i/><i/></span>
              <span>{activeStage.id === "registration" ? "Attendee form" : activeStage.id === "attendeeList" ? "Registration records" : activeStage.id === "preview" ? "Microsite editor" : "Event microsite"}</span>
              <b>Example screen</b>
            </div>
            <div className="eh-ref-showcase-art"><AssetSlot id={activeStage.id}/></div>
          </div>
          <div className="eh-ref-showcase-footer">
            <p>Product illustrations are examples. Real registrations are visible after attendees sign up.</p>
            <Link to={liveEventPath}>{event ? "View a published event" : "Explore real events"} <ArrowUpRight size={16}/></Link>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
