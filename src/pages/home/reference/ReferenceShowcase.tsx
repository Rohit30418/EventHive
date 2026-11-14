import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Monitor, Smartphone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AssetSlot from "../../../components/media/AssetSlot";
import { assetSlots, type AssetId } from "../../../data/assetSlots";
import type { EventType } from "../../../Types/eventType";
import { createSlug } from "../../../../Utils/createSlug";

type Stage = {
  id: AssetId;
  number: string;
  title: string;
  description: string;
  outcome: string;
  mode: "desktop" | "phone";
};

const stages: Stage[] = [
  {
    id: "eventPage",
    number: "01",
    title: "Create an event page",
    description: "Add the date, venue, schedule and speakers. Give your event a public page worth sharing.",
    outcome: "Start creating after your organiser account is approved.",
    mode: "desktop",
  },
  {
    id: "registration",
    number: "02",
    title: "Collect attendee registrations",
    description: "Guests open the event link on their phone or computer and submit their details.",
    outcome: "The registration form records attendee details for your event.",
    mode: "phone",
  },
  {
    id: "attendeeList",
    number: "03",
    title: "Review registration records",
    description: "See who signed up without searching through spreadsheets or WhatsApp chats.",
    outcome: "Attendee records stay available in your organiser workspace.",
    mode: "desktop",
  },
  {
    id: "preview",
    number: "04",
    title: "Preview your event microsite",
    description: "Check the event page, revise the content and save when you're ready.",
    outcome: "The draft preview doesn't change the published event.",
    mode: "desktop",
  },
];

export default function ReferenceShowcase({ event }: { event?: EventType }) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"desktop" | "phone">("desktop");
  const stage = stages[active];
  const liveEventPath = event
    ? `/events/${createSlug(event.EventName || "event")}/${event.id}`
    : "/Events";

  const selectStage = (index: number) => {
    setActive(index);
    setView(stages[index].mode);
  };

  const handleTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      e.key === "ArrowRight" ? (index + 1) % stages.length :
      e.key === "ArrowLeft" ? (index - 1 + stages.length) % stages.length :
      e.key === "Home" ? 0 :
      e.key === "End" ? stages.length - 1 : -1;

    if (next === -1) return;
    e.preventDefault();
    selectStage(next);
    document.getElementById(`eh-ref-stage-tab-${next}`)?.focus();
  };

  return (
    <section id="product" className="eh-ref-showcase eh-compact-showcase" aria-labelledby="ea-product-heading">
      <div className="ea-wrap">
        <div className="eh-ref-section-intro">
          <div>
            <span className="eh-ref-kicker">Explore EventHive</span>
            <h2 id="ea-product-heading">The organiser's side of a good event.</h2>
          </div>
          <p>Four steps, one event. Pick a stage to explore what happens from the first page to the guest list.</p>
        </div>

        <div className="eh-ref-mobile-tabs eh-compact-tabs" role="tablist" aria-label="EventHive product views">
          {stages.map((item, index) => (
            <button
              key={item.id}
              id={`eh-ref-stage-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="eh-ref-product-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => selectStage(index)}
              onKeyDown={e => handleTabKey(e, index)}
            >
              <span className="eh-compact-tab-number">{item.number}</span>
              <span className="eh-compact-tab-title">{item.title}</span>
              <span className="eh-compact-tab-dot" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="eh-compact-layout">
          <div className="eh-compact-copy" aria-live="polite" key={stage.id}>
            <span className="eh-compact-step-label">Stage {stage.number} <span aria-hidden="true">/</span> 04</span>
            <h3>{stage.title}.</h3>
            <p>{stage.description}</p>
            <div className="eh-compact-outcome">
              <CheckCircle2 size={19} aria-hidden="true" />
              <span>{stage.outcome}</span>
            </div>
            <Link to={liveEventPath} className="eh-compact-example-link">
              {event ? "See a published EventHive event" : "Browse published events"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div
            className="eh-compact-display"
            id="eh-ref-product-panel"
            role="tabpanel"
            aria-labelledby={`eh-ref-stage-tab-${active}`}
            tabIndex={0}
          >
            <div className="eh-ref-showcase-toolbar">
              <span>Stage {stage.number} / 04 <span className="eh-ref-toolbar-title">· {stage.title}</span></span>
              <div className="eh-ref-view-switch" role="group" aria-label="Preview screen size">
                <button type="button" aria-pressed={view === "desktop"} onClick={() => setView("desktop")}>
                  <Monitor size={15} aria-hidden="true" /> Desktop
                </button>
                <button type="button" aria-pressed={view === "phone"} onClick={() => setView("phone")}>
                  <Smartphone size={15} aria-hidden="true" /> Phone
                </button>
              </div>
            </div>
            <div className={`eh-ref-showcase-screen eh-compact-screen ${view === "phone" ? "is-phone" : "is-desktop"}`} key={stage.id + view}>
              <div className="eh-ref-screen-topbar">
                <span className="eh-ref-browser-dots" aria-hidden="true"><i /><i /><i /></span>
                <span>{
                  stage.id === "registration" ? "Attendee form" :
                  stage.id === "attendeeList" ? "Registration records" :
                  stage.id === "preview" ? "Microsite editor" : "Event microsite"
                }</span>
                <b>Illustrative screen</b>
              </div>
              <div className="eh-ref-showcase-art eh-compact-art">
                <AssetSlot id={stage.id} />
              </div>
            </div>
            <div className="eh-compact-display-footer">
              <span>Illustrative product image, not a live event.</span>
              {assetSlots[stage.id].src && (
                <a href={assetSlots[stage.id].src ?? undefined} target="_blank" rel="noopener noreferrer">
                  Open full-size image <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
