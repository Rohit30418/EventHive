import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import DirectoryEventCard from "../components/DirectoryEventCard";
import AssetSlot from "../components/media/AssetSlot";
import { ErrorState } from "../common/StateViews";
import type { EventType } from "../Types/eventType";
import { createSlug } from "../../Utils/createSlug";
import "./events-directory-2026.css";

const categories = ["All", "Technology", "Webinar", "Music", "Art", "Sports"];
const EVENTS_PER_PAGE = 6;
type EventView = "all" | "upcoming" | "past";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function EventsCardSkeleton() {
  return <div className="eh-directory-skeleton" aria-hidden="true">
    <div className="eh-directory-skeleton__image" />
    <div className="eh-directory-skeleton__body">
      <span /><span /><span /><span />
    </div>
  </div>;
}

export default function AllEvents() {
  const [category, setCategory] = useState("All");
  const [eventView, setEventView] = useState<EventView>("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [], isLoading, error } = useGetEvent() as {
    data?: EventType[];
    isLoading: boolean;
    error?: string | null;
  };

  const events = Array.isArray(data) ? data : [];

  const categoryOptions = useMemo(() => {
    const fromEvents = events.map(event => event.eventType || event.category).filter(Boolean) as string[];
    return ["All", ...Array.from(new Set([...categories.slice(1), ...fromEvents]))];
  }, [events]);

  const nextEvent = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events
      .filter(event => event.eventDate && Number.isFinite(new Date(event.eventDate).getTime()) && new Date(event.eventDate) >= now)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())[0];
  }, [events]);

  const { upcomingEvents, pastEvents, allFilteredEvents } = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const filtered = events.filter(event => {
      const eventCategory = event.eventType || event.category || "Event";
      const categoryMatches = category === "All" || eventCategory.toLocaleLowerCase() === category.toLocaleLowerCase();
      const searchable = [event.EventName, event.location, eventCategory, event.ShortDesc, event.BannerTagLine]
        .filter(Boolean).join(" ").toLocaleLowerCase();
      return categoryMatches && (!query || searchable.includes(query));
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming: EventType[] = [];
    const past: EventType[] = [];

    filtered.forEach(event => {
      if (!event.eventDate) return;
      const date = new Date(event.eventDate);
      if (Number.isNaN(date.getTime())) return;
      if (date >= today) upcoming.push(event);
      else past.push(event);
    });

    upcoming.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    past.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
      allFilteredEvents: [...upcoming, ...past],
    };
  }, [events, category, search]);

  const displayedEvents = useMemo(() => {
    if (eventView === "upcoming") return upcomingEvents;
    if (eventView === "past") return pastEvents;
    return allFilteredEvents;
  }, [eventView, upcomingEvents, pastEvents, allFilteredEvents]);

  const totalPages = Math.ceil(displayedEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return displayedEvents.slice(start, start + EVENTS_PER_PAGE);
  }, [displayedEvents, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [category, eventView, search]);
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginationPages = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis-right", totalPages] as const;
    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis-left", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
    }
    return [1, "ellipsis-left", currentPage - 1, currentPage, currentPage + 1, "ellipsis-right", totalPages] as const;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("eh-directory-results")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setEventView("all");
    setCurrentPage(1);
  };

  const viewTitle = eventView === "upcoming" ? "Upcoming events" : eventView === "past" ? "Past events" : "Explore all events";
  const spotlightLink = nextEvent ? `/events/${createSlug(nextEvent.EventName || "event")}/${nextEvent.id}` : null;

  return <div className="eh-directory">
    <section className="eh-directory-hero" aria-labelledby="eh-events-page-title">
      <div className="eh-directory-wrap eh-directory-hero__grid">
        <div className="eh-directory-hero__copy">
          <span className="eh-directory-kicker">EventHive · Events in India</span>
          <h1 id="eh-events-page-title">Find an event worth <span className="eh-directory-underline">showing up for.
            <svg viewBox="0 0 290 16" preserveAspectRatio="none" aria-hidden="true"><path d="M4 10C75 2 218 3 286 8" stroke="#FFC233" strokeWidth="5" fill="none" strokeLinecap="round" pathLength="1"/></svg>
          </span></h1>
          <p>Discover events, browse what interests you and register directly on the organiser's page.</p>
          <div className="eh-directory-hero__actions">
            <a href="#eh-directory-results" className="eh-directory-btn eh-directory-btn--primary">Explore events <ArrowRight size={18} aria-hidden="true"/></a>
            <Link to="/OrganizerRegistration" className="eh-directory-text-link">Hosting an event? <ArrowUpRight size={16} aria-hidden="true"/></Link>
          </div>
        </div>
        <div className="eh-directory-hero__visual">
          <div className="eh-directory-hero__card">
            <div className="eh-directory-hero__browser">
              <span className="eh-directory-dots" aria-hidden="true"><i/><i/><i/></span>
              <span>{nextEvent ? "Next on the calendar" : "Explore EventHive"}</span>
              <span>EVENTS</span>
            </div>
            <div className="eh-directory-hero__poster">
              <AssetSlot id="eventPoster" src={nextEvent?.banner} alt={nextEvent ? `Event poster: ${nextEvent.EventName}` : "EventHive event-themed illustration"}/>
            </div>
            <div className="eh-directory-hero__featured">
              <span>{nextEvent ? (nextEvent.eventType || nextEvent.category || "Upcoming event") : "Discover what's happening"}</span>
              <h2>{nextEvent ? nextEvent.EventName : "Your next event starts here."}</h2>
              {nextEvent && <p><CalendarDays size={15} aria-hidden="true"/>{formatDate(nextEvent.eventDate)}</p>}
              {spotlightLink && <Link to={spotlightLink} state={{ event: nextEvent }}>View event <ArrowUpRight size={16} aria-hidden="true"/></Link>}
            </div>
          </div>
          <svg className="eh-directory-ticket" viewBox="0 0 118 83" width="118" height="83" fill="none" aria-hidden="true">
            <path d="M10 8H108V27C101 27 96 32 96 41.5C96 51 101 56 108 56V75H10V56C17 56 22 51 22 41.5C22 32 17 27 10 27V8Z" fill="#CFF5E4" stroke="#14133A" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M79 15V68" stroke="#14133A" strokeWidth="2" strokeDasharray="4 5"/>
            <circle cx="45" cy="33" r="10" fill="#5B4BFF"/>
            <path d="M30 52H61" stroke="#14133A" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>

    <section className="eh-directory-listing" id="eh-directory-results" aria-labelledby="eh-directory-results-title">
      <div className="eh-directory-wrap">
        <div className="eh-directory-toolbar">
          <div className="eh-directory-toolbar__heading">
            <span className="eh-directory-kicker">Find your kind of event</span>
            <h2 id="eh-directory-results-title">Explore the calendar.</h2>
          </div>
          <label className="eh-directory-search">
            <Search size={19} aria-hidden="true"/>
            <span className="sr-only">Search events by name, location or category</span>
            <input type="search" placeholder="Search events, cities or categories" value={search} onChange={event => setSearch(event.target.value)}
              aria-label="Search events by name, location or category"/>
            {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search"><X size={17} aria-hidden="true"/></button>}
          </label>
        </div>

        <div className="eh-directory-filter-row">
          <div className="eh-directory-view-switch" role="group" aria-label="Filter events by date">
            {([
              { id:"all" as const, label:"All events", count:allFilteredEvents.length },
              { id:"upcoming" as const, label:"Upcoming", count:upcomingEvents.length },
              { id:"past" as const, label:"Past", count:pastEvents.length },
            ]).map(item => <button type="button" key={item.id} onClick={() => setEventView(item.id)}
              aria-pressed={eventView === item.id} className={eventView === item.id ? "is-active" : ""}>
                {item.label}<span>{item.count}</span>
              </button>)}
          </div>
          <div className="eh-directory-categories" role="group" aria-label="Filter events by category">
            {categoryOptions.map(item => <button key={item} type="button" onClick={() => setCategory(item)}
              aria-pressed={category === item} className={category === item ? "is-active" : ""}>{item}</button>)}
          </div>
        </div>

        <div className="eh-directory-results-header">
          <div><h3>{viewTitle}</h3><p>{displayedEvents.length} {displayedEvents.length === 1 ? "event" : "events"} found</p></div>
          {(search || category !== "All" || eventView !== "all") && <button type="button" onClick={resetFilters}>Clear filters <X size={16} aria-hidden="true"/></button>}
        </div>

        <div className="eh-directory-results-content" aria-busy={isLoading}>
          {isLoading ? <div className="eh-directory-cards" role="status" aria-label="Loading events">
            {Array.from({ length: EVENTS_PER_PAGE }).map((_, index) => <EventsCardSkeleton key={index}/>)}
          </div> : error ? <ErrorState title="Could not load events" description={error}/> :
          displayedEvents.length === 0 ? <div className="eh-directory-empty">
            <div><h3>No matching events right now.</h3><p>Try another category, a different search or switch between upcoming and past events.</p>
              <button type="button" onClick={resetFilters}>See all events <ArrowRight size={17} aria-hidden="true"/></button></div>
            <AssetSlot id="empty"/>
          </div> : <>
            <div className="eh-directory-cards">
              {paginatedEvents.map((event,index) => <DirectoryEventCard
                key={event.id || `${event.EventName}-${index}`} event={event}/>)}
            </div>
            {totalPages > 1 && <nav className="eh-directory-pagination" aria-label="Event results pages">
              <p>Showing {(currentPage - 1) * EVENTS_PER_PAGE + 1}–{Math.min(currentPage * EVENTS_PER_PAGE, displayedEvents.length)} of {displayedEvents.length}</p>
              <div>
                <button type="button" aria-label="Previous page" disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}><ChevronLeft size={19} aria-hidden="true"/></button>
                {paginationPages.map((page,index) => typeof page !== "number"
                  ? <span key={`${page}-${index}`} aria-hidden="true" className="eh-directory-pagination__ellipsis">…</span>
                  : <button type="button" key={page} aria-label={`Go to page ${page}`} aria-current={page === currentPage ? "page" : undefined}
                      className={page === currentPage ? "is-active" : ""} onClick={() => handlePageChange(page)}>{page}</button>)}
                <button type="button" aria-label="Next page" disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}><ChevronRight size={19} aria-hidden="true"/></button>
              </div>
            </nav>}
          </>}
        </div>
      </div>
    </section>
    <section className="eh-directory-closer" aria-label="Create your own event">
      <div className="eh-directory-wrap eh-directory-closer__content">
        <div><span>Hosting something soon?</span><h2>Give your event a page worth sharing.</h2></div>
        <Link to="/OrganizerRegistration">Register as organiser <ArrowUpRight size={19} aria-hidden="true"/></Link>
      </div>
    </section>
  </div>;
}
