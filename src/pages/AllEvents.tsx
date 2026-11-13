import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
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
import "./events-directory-2026.css";

const categories = ["All", "Technology", "Webinar", "Music", "Art", "Sports"];
const EVENTS_PER_PAGE = 6;
type EventView = "all" | "upcoming" | "past";

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

  return <div className="eh-directory">
    <section className="eh-directory-listing" id="eh-directory-results" aria-labelledby="eh-directory-results-title">
      <div className="eh-directory-wrap">
        <div className="eh-directory-toolbar">
          <div className="eh-directory-toolbar__heading">
            <span className="eh-directory-kicker">EventHive · Events in India</span>
            <h1 id="eh-directory-results-title">Discover your next event<span className="eh-directory-heading-mark" aria-hidden="true">.</span></h1>
            <p className="eh-directory-toolbar__intro">Explore events by category, location or date. Open the event page to register.</p>
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
