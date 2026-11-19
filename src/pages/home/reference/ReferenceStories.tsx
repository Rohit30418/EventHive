import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import AssetSlot from "../../../components/media/AssetSlot";
import type { EventType } from "../../../Types/eventType";
import { createSlug } from "../../../../Utils/createSlug";

type Props = { events: EventType[]; isLoading: boolean; error: string | null };
const scenarios = [
  {
    id: "college" as const,
    category: "College fest · Pune",
    heading: "One event page for the whole campus.",
    story: "Keep the venue, programme and signup link together, even when the college WhatsApp groups get busy.",
  },
  {
    id: "meetup" as const,
    category: "Design meetup · Bengaluru",
    heading: "People know where to turn up.",
    story: "A public event page helps attendees see the schedule and speakers before they register.",
  },
  {
    id: "conference" as const,
    category: "Conference team · Delhi",
    heading: "Every registration belongs in one place.",
    story: "The organiser dashboard gives the team a clearer picture of who's attending.",
  },
];

function dateLabel(value?: string) {
  if (!value) return "Date to be confirmed";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}

export default function ReferenceStories({ events, isLoading, error }: Props) {
  const [active, setActive] = useState(0);
  const story = scenarios[active];
  return <section id="who-its-for" className="eh-ref-community" aria-labelledby="eh-ref-events-title">
    <div className="ea-wrap">
      <div className="eh-ref-events-heading">
        <div><span className="eh-ref-kicker">Published on EventHive</span><h2 id="eh-ref-events-title">Upcoming events across India.</h2></div>
        <Link to="/Events">Browse all events <ArrowRight size={18} aria-hidden="true"/></Link>
      </div>
      {isLoading ? <p className="eh-ref-event-status" role="status">Loading upcoming events…</p>
        : error ? <p className="eh-ref-event-status" role="alert">Events couldn't be loaded right now.</p>
        : events.length ? <div className="eh-ref-event-grid">
          {events.slice(0,3).map(event => <article className="eh-ref-event" key={event.id}>
            <div className="eh-ref-event-image"><AssetSlot id="eventPoster" src={event.banner} alt={event.banner ? `Poster for ${event.EventName}` : undefined}/></div>
            <div className="eh-ref-event-info"><p><CalendarDays size={16} aria-hidden="true"/>{dateLabel(event.eventDate)}</p>
              <h3>{event.EventName}</h3><p><MapPin size={16} aria-hidden="true"/>{event.location || "Venue to be announced"}</p>
            </div>
            <div className="eh-ref-event-actions">
              <Link className="eh-ref-event-register" to={`/events/${createSlug(event.EventName || "event")}/${event.id}`}>View event details <ArrowRight size={17}/></Link>
            </div>
          </article>)}
        </div> : <div className="eh-ref-no-events">
          <div><h3>No upcoming events listed yet.</h3><p>You can still create a public event page for your next gathering.</p>
          <Link to="/OrganizerRegistration">Register as organiser <ArrowRight size={17}/></Link></div><AssetSlot id="empty"/>
        </div>}
      <div className="eh-ref-story" aria-label="Illustrative organiser use cases">
        <div className="eh-ref-story-top">
          <div><span className="eh-ref-kicker">Organiser perspectives</span><p>Examples of how people might use EventHive—not customer reviews.</p></div>
          <div className="eh-ref-story-nav"><span>{String(active + 1).padStart(2, "0")} / 03</span>
            <button type="button" aria-label="Previous organiser scenario" onClick={() => setActive((active + 2) % scenarios.length)}><ArrowLeft size={18}/></button>
            <button type="button" aria-label="Next organiser scenario" onClick={() => setActive((active + 1) % scenarios.length)}><ArrowRight size={18}/></button>
          </div>
        </div>
        <div className="eh-ref-story-content" key={story.id}>
          <div className="eh-ref-story-portrait"><AssetSlot id={story.id}/></div>
          <div><span>{story.category} · Illustrative scenario</span><h3>{story.heading}</h3><p>{story.story}</p>
            <Link to="/?topic=founding#contact">Share your real organiser experience <ArrowUpRight size={17}/></Link>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
