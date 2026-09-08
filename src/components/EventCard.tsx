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
      className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[#eee3db] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ef6f30]/35 hover:shadow-[0_22px_55px_rgba(30,28,27,0.08)]"
    >
      <div className="relative h-56 overflow-hidden bg-[#f4ebe5]">
        <img
          src={event.banner || fallbackImage}
          alt={event.EventName || "Event banner"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/65 via-transparent to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#fffaf6]/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#ef6f30] backdrop-blur-sm">
            {category}
          </span>
          <span className="rounded-full border border-white/25 bg-[#1e1c1b]/65 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-2 font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#1e1c1b]">
          {event.EventName || "Untitled Event"}
        </h3>

        {(event.ShortDesc || event.BannerTagLine || event.description) && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#77736f]">
            {event.ShortDesc || event.BannerTagLine || event.description}
          </p>
        )}

        <div className="mt-5 space-y-3 border-t border-[#f0e5de] pt-5">
          <p className="flex items-center gap-3 text-sm font-semibold text-[#5f5955]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff0e6] text-[#ef6f30]">
              <CalendarDays size={16} />
            </span>
            {formatDate(event.eventDate)}
          </p>

          <p className="flex items-center gap-3 text-sm font-semibold text-[#5f5955]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff0e6] text-[#ef6f30]">
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
            className="group/btn flex items-center justify-between border-t border-[#1e1c1b] pt-4 text-sm font-extrabold text-[#1e1c1b] transition-colors hover:text-[#ef6f30]"
          >
            {variant === "public" ? "View Event" : "Manage Event"}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1e1c1b] text-white transition-all group-hover/btn:bg-[#ef6f30]">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
