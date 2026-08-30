import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { type EventType } from "../Types/eventType";
import {createSlug} from "../../Utils/createSlug";

interface EventCardTypes {
  index: number;
  event: EventType;
  variant?: "public" | "compact";
}

const fallbackImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";

const formatDate = (value?: string) => {
  if (!value) return "Date coming soon";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const getStatus = (value?: string) => {
  if (!value) return { label: "TBA", tone: "bg-slate-950/70 text-white" };
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(date.getTime())) return { label: "Scheduled", tone: "bg-indigo-600 text-white" };
  return date >= today
    ? { label: "Open", tone: "bg-emerald-500 text-white" }
    : { label: "Completed", tone: "bg-slate-950/70 text-white" };
};

const EventCard: React.FC<EventCardTypes> = ({ event, index, variant = "public" }) => {
  const status = getStatus(event.eventDate);
  const category = event.eventType || event.category || "Event";
 const eventSlug = createSlug(
  event.EventName || "event"
);

const destination =
  variant === "public"
    ? `/events/${eventSlug}/${event.id}`
    : `/Dashboard/EditEvent/${event.id}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-[0_30px_90px_rgba(79,70,229,0.16)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-60 overflow-hidden bg-slate-200">
        <img
          src={event.banner || fallbackImage}
          alt={event.EventName || "Event banner"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-indigo-700 shadow-sm backdrop-blur-xl">
            {category}
          </span>
          <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] shadow-lg ${status.tone}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-cyan-100 backdrop-blur-md">
            <Sparkles size={12} /> EventHive picks
          </div>
          <h3 className="line-clamp-2 text-2xl font-black leading-tight tracking-tight text-white">
            {event.EventName || "Untitled Event"}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
              <CalendarDays size={16} />
            </span>
            {formatDate(event.eventDate)}
          </p>
          <p className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300">
              <MapPin size={16} />
            </span>
            <span className="truncate">{event.location || "Location to be announced"}</span>
          </p>
        </div>

        {(event.description || event.ShortDesc || event.BannerTagLine) && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {event.ShortDesc || event.BannerTagLine || event.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <Link
  to={destination}
  state={{ event }}
  className="group/btn flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition-all hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-600"
>
  {variant === "public" ? "View Event" : "Manage Event"}

  <ArrowRight
    size={17}
    className="transition-transform group-hover/btn:translate-x-1"
  />
</Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
