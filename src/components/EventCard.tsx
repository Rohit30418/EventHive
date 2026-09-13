import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { type EventType } from "../Types/eventType";
import { createSlug } from "../../Utils/createSlug";

interface EventCardTypes {
  index: number;
  event: EventType;
  variant?: "public" | "compact";
}

const fallbackImage =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";

const formatDate = (value?: string) => {
  if (!value) return "Date coming soon";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatus = (value?: string) => {
  if (!value) return "TBA";
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(date.getTime())) return "Scheduled";
  return date >= today ? "Open" : "Completed";
};

const EventCard: React.FC<EventCardTypes> = ({
  event,
  index,
  variant = "public",
}) => {
  const category = event.eventType || event.category || "Event";
  const status = getStatus(event.eventDate);
  const eventSlug = createSlug(event.EventName || "event");

  const destination =
    variant === "public"
      ? `/events/${eventSlug}/${event.id}`
      : `/Dashboard/EditEvent/${event.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[var(--eh-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--eh-primary-300)] hover:shadow-[var(--eh-soft-shadow)]"
    >
      <div className="relative h-56 overflow-hidden bg-[var(--eh-primary-50)]">
        <img
          src={event.banner || fallbackImage}
          alt={event.EventName || "Event banner"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/65 via-transparent to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--eh-bg)]/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[var(--eh-primary)] backdrop-blur-sm">
            {category}
          </span>
          <span className="rounded-full border border-white/25 bg-[#1e1c1b]/65 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-white backdrop-blur-sm">
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-2 font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.1] tracking-[0.002em] text-[var(--eh-text)]">
          {event.EventName || "Untitled Event"}
        </h3>

        {(event.ShortDesc || event.BannerTagLine || event.description) && (
          <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 tracking-[0.006em] text-[var(--eh-muted)]">
            {event.ShortDesc || event.BannerTagLine || event.description}
          </p>
        )}

        <div className="mt-5 space-y-3 border-t border-[var(--eh-border)] pt-5">
          <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.004em] text-[var(--eh-muted-strong)]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--eh-primary-100)] text-[var(--eh-primary)]">
              <CalendarDays size={16} />
            </span>
            {formatDate(event.eventDate)}
          </p>

          <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.004em] text-[var(--eh-muted-strong)]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--eh-primary-100)] text-[var(--eh-primary)]">
              <MapPin size={16} />
            </span>
            <span className="truncate">
              {event.location || "Location to be announced"}
            </span>
          </p>
        </div>

        <div className="mt-auto pt-6">
          <Link
            to={destination}
            state={{ event }}
            className="group/btn flex items-center justify-between border-t border-[var(--eh-text)] pt-4 text-sm font-extrabold tracking-[0.01em] text-[var(--eh-text)] transition-colors hover:text-[var(--eh-primary)]"
          >
            {variant === "public" ? "View Event" : "Manage Event"}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--eh-text)] text-white transition-all group-hover/btn:bg-[var(--eh-primary)]">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;