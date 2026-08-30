import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../Firebase";
import useGetEvents from "../AdminCustomHooks/useGetEvents";
import useDeleteEvent from "../AdminCustomHooks/useDeleteEvent";
import { apiPath } from "../../Utils/Utils";
import { CalendarDays, MapPin, Plus, Search, Trash2, Pencil, Inbox } from "lucide-react";
import { ErrorState, PageLoader } from "../common/StateViews";
import type { EventType } from "../Types/eventType";

const formatDate = (value?: string) => {
  if (!value) return "Date missing";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getEventTime = (value?: string) => {
  if (!value) return 0;

  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const Events: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetEvents();
  const { deleteEvent } = useDeleteEvent();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<{ uid: string; role: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  // Tracks the specific event currently being deleted, so only THAT card's
  // button shows "deleting" — useDeleteEvent's own isLoading is shared
  // across every card since the hook is only called once for the whole list.
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const ok = await deleteEvent(id);
    if (ok) refetch();
    setDeletingId(null);
  };

  // Always pull fresh data the moment this page is visited, instead of
  // relying on cross-page cache-invalidation timing from CreateEvent.tsx.
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const res = await axios.get(`${apiPath}/Organizer/${user.uid}.json`);
          const role = res.data?.role || "Organizer";
          setCurrentUser({ uid: user.uid, role });
        } catch (err) {
          console.error("Error fetching user role:", err);
          setCurrentUser({ uid: user.uid, role: "Organizer" });
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const { upcomingEvents, pastEvents, hasResults } = useMemo(() => {
    if (!data || !Array.isArray(data) || authLoading || !currentUser) {
      return { upcomingEvents: [], pastEvents: [], hasResults: false };
    }

    const userSpecificData = data.filter((item) => {
      if (currentUser.role === "SuperAdmin") return true;
      return item.userId === currentUser.uid;
    });

    const query = searchTerm.trim().toLowerCase();
    const filtered = query
      ? userSpecificData.filter((item) =>
          [item.EventName, item.category, item.eventType, item.location].some(
            (value) => value?.toLowerCase().includes(query) ?? false
          )
        )
      : userSpecificData;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const upcoming: EventType[] = [];
    const past: EventType[] = [];

    filtered.forEach((item) => {
      if (!item.eventDate) return;
      const eventDate = new Date(item.eventDate);
      if (Number.isNaN(eventDate.getTime())) return;
      if (eventDate >= now) upcoming.push(item);
      else past.push(item);
    });

    upcoming.sort((a, b) => getEventTime(a.eventDate) - getEventTime(b.eventDate));
    past.sort((a, b) => getEventTime(b.eventDate) - getEventTime(a.eventDate));

    return { upcomingEvents: upcoming, pastEvents: past, hasResults: upcoming.length > 0 || past.length > 0 };
  }, [data, searchTerm, currentUser, authLoading]);

  const renderEventCard = (item: EventType, isPast = false) => {
    const eventId = item.id ? String(item.id) : "";

    return (
    <article
      key={eventId || item.EventName || `${item.eventDate}-${item.location}`}
      className={`group overflow-hidden rounded-[1.7rem] border bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(99,102,241,0.16)] dark:bg-slate-900 ${isPast ? "border-slate-200 opacity-80 grayscale-[20%] hover:opacity-100 hover:grayscale-0 dark:border-slate-800" : "border-indigo-100 dark:border-slate-800"}`}
    >
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img
          src={item.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80"}
          alt={item.EventName || "Event banner"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] shadow-sm backdrop-blur-xl ${isPast ? "bg-slate-900/70 text-white" : "bg-white/90 text-indigo-700"}`}>
            {isPast ? "Ended" : item.eventType || item.category || "Event"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="line-clamp-2 text-lg font-black text-slate-950 dark:text-white">{item.EventName || "Untitled Event"}</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2 font-semibold">
            <CalendarDays size={16} className={isPast ? "text-slate-400" : "text-indigo-600"} />
            {formatDate(item.eventDate)}
          </p>
          <p className="flex items-center gap-2 font-semibold">
            <MapPin size={16} className={isPast ? "text-slate-400" : "text-cyan-600"} />
            <span className="truncate">{item.location || "No location"}</span>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            to={eventId ? `/Dashboard/EditEvent/${eventId}` : "#"}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-700 hover:bg-indigo-600 hover:text-white dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-600"
          >
            <Pencil size={15} /> Edit
          </Link>
          <button
            onClick={() => eventId && handleDelete(eventId)}
            disabled={!eventId || deletingId === eventId}
            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-black text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-600"
          >
            <Trash2 size={15} /> {deletingId === eventId ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
    );
  };

  if (isLoading || authLoading) {
    return <PageLoader label="Loading event control center..." />;
  }

  if (error) {
    return <ErrorState title="Failed to load events" description={error} />;
  }

  return (
    <div className="space-y-8">
      <div className="eh-panel overflow-hidden p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">Event Control Center</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">Events Dashboard</h1>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              {currentUser?.role === "SuperAdmin" ? "Managing all platform events from one place." : "Manage your events, details and public pages."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="eh-input py-3 pl-11 pr-4 text-sm font-semibold"
              />
            </div>
            <Link to="/Dashboard/CreateEvent" className="eh-btn-primary px-5 py-3 text-sm">
              <Plus size={18} /> Create Event
            </Link>
          </div>
        </div>
      </div>

      {!hasResults ? (
        <div className="eh-card flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border-dashed p-8 text-center">
          <Inbox className="mb-4 text-slate-300" size={56} />
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">No events found</h3>
          <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
            {currentUser?.role !== "SuperAdmin" ? "Create your first event or adjust your search query." : "No platform events match the current search."}
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {upcomingEvents.length > 0 && (
            <section>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-3 text-xl font-black text-slate-950 dark:text-white">
                  <span className="h-8 w-2 rounded-full bg-indigo-600" /> Upcoming Events
                </h2>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{upcomingEvents.length}</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {upcomingEvents.map((item) => renderEventCard(item, false))}
              </div>
            </section>
          )}

          {pastEvents.length > 0 && (
            <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-3 text-xl font-black text-slate-700 dark:text-slate-200">
                  <span className="h-8 w-2 rounded-full bg-slate-400" /> Past Events
                </h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">{pastEvents.length}</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {pastEvents.map((item) => renderEventCard(item, true))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;