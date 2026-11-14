import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { EventType } from "../Types/eventType";
import { createSlug } from "../../Utils/createSlug";
import AssetSlot from "./media/AssetSlot";

interface DirectoryEventCardProps {
  event: EventType;
}

function formatDate(dateValue?: string) {
  if (!dateValue) return "Date to be announced";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function eventPeriod(dateValue?: string) {
  if (!dateValue) return "Date to be announced";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Date to be announced";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today ? "Upcoming" : "Past event";
}

export default function DirectoryEventCard({ event }: DirectoryEventCardProps) {
  const title = event.EventName || "Untitled event";
  const category = event.eventType || event.category || "Event";
  const destination = `/events/${createSlug(title)}/${event.id}`;
  const status = eventPeriod(event.eventDate);

  return (
    <article className="eh-directory-card">
      <Link className="eh-directory-card__visual" to={destination} state={{ event }} aria-label={`View ${title}`}>
        <AssetSlot id="eventPoster" src={event.banner} alt={event.banner ? `Event banner: ${title}` : `EventHive illustration for ${title}`} />
        <span className="eh-directory-card__category">{category}</span>
      </Link>
      <div className="eh-directory-card__body">
        <span className={`eh-directory-card__status ${status === "Upcoming" ? "eh-directory-card__status--upcoming" : ""}`}>{status}</span>
        <h3><Link to={destination} state={{ event }}>{title}</Link></h3>
        <div className="eh-directory-card__details">
          <span><CalendarDays size={16} aria-hidden="true" />{formatDate(event.eventDate)}</span>
          <span><MapPin size={16} aria-hidden="true" />{event.location || "Venue to be announced"}</span>
        </div>
        {(event.ShortDesc || event.BannerTagLine || event.description) && (
          <p className="eh-directory-card__description">{event.ShortDesc || event.BannerTagLine || event.description}</p>
        )}
        <Link to={destination} state={{ event }} className="eh-directory-card__action">
          View event details <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
