import { useEffect, useMemo, useState } from "react";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import EventCard from "../components/EventCard";
import {
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  History,
} from "lucide-react";
import { ErrorState } from "../common/StateViews";
import { type EventType } from "../Types/eventType";

const categories = ["All", "Technology", "Webinar", "Music", "Art", "Sports"];
const EVENTS_PER_PAGE = 6;
type EventView = "all" | "upcoming" | "past";

const EventCardSkeleton = () => (
  <div className="overflow-hidden rounded-[1.8rem] border border-[#eee3db] bg-white">
    <div className="animate-pulse">
      <div className="h-56 bg-[#eee7e2]" />
      <div className="p-6">
        <div className="h-6 w-24 rounded-full bg-[#eee7e2]" />
        <div className="mt-5 h-6 w-4/5 rounded bg-[#eee7e2]" />
        <div className="mt-2 h-6 w-2/3 rounded bg-[#eee7e2]" />
        <div className="mt-6 h-16 rounded-2xl bg-[#f4efeb]" />
      </div>
    </div>
  </div>
);

const AllEvents = () => {
  const [category, setCategory] = useState("All");
  const [eventView, setEventView] = useState<EventView>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data = [],
    isLoading,
    error,
  } = useGetEvent() as {
    data?: EventType[];
    isLoading: boolean;
    error?: string | null;
  };

  const categoryOptions = useMemo(() => {
    if (!Array.isArray(data)) return categories;

    const eventCategories = data
      .map((event) => event.eventType || event.category)
      .filter(Boolean) as string[];

    return [
      "All",
      ...Array.from(new Set([...categories.slice(1), ...eventCategories])),
    ];
  }, [data]);

  const { upcomingEvents, pastEvents, allFilteredEvents } = useMemo(() => {
    if (!Array.isArray(data)) {
      return { upcomingEvents: [], pastEvents: [], allFilteredEvents: [] };
    }

    const filtered = data.filter((event) => {
      const eventCategory = event.eventType || event.category || "Event";
      return (
        category === "All" ||
        eventCategory.toLowerCase() === category.toLowerCase()
      );
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: EventType[] = [];
    const past: EventType[] = [];

    filtered.forEach((event) => {
      if (!event.eventDate) return;
      const eventDate = new Date(event.eventDate);
      if (Number.isNaN(eventDate.getTime())) return;
      if (eventDate >= today) upcoming.push(event);
      else past.push(event);
    });

    upcoming.sort(
      (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
    past.sort(
      (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
      allFilteredEvents: [...upcoming, ...past],
    };
  }, [data, category]);

  const displayedEvents = useMemo(() => {
    if (eventView === "upcoming") return upcomingEvents;
    if (eventView === "past") return pastEvents;
    return allFilteredEvents;
  }, [eventView, upcomingEvents, pastEvents, allFilteredEvents]);

  const totalPages = Math.ceil(displayedEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    return displayedEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  }, [displayedEvents, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, eventView]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginationPages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis-right", totalPages] as const;
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis-left",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }
    return [
      1,
      "ellipsis-left",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-right",
      totalPages,
    ] as const;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const viewTitle =
    eventView === "upcoming"
      ? "Upcoming Events"
      : eventView === "past"
      ? "Past Events"
      : "All Events";

  const sidebarItems = [
    {
      id: "all" as const,
      label: "All Events",
      count: allFilteredEvents.length,
      icon: CalendarDays,
    },
    {
      id: "upcoming" as const,
      label: "Upcoming Events",
      count: upcomingEvents.length,
      icon: CalendarCheck,
    },
    {
      id: "past" as const,
      label: "Past Events",
      count: pastEvents.length,
      icon: History,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf6] text-[#1e1c1b]">
      <section className="border-b border-[#eadfd7] bg-white px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">
            <span className="h-px w-10 bg-[#ef6f30]" /> Event discovery
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <h1 className="font-['Manrope',sans-serif] text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Explore events worth showing up for.
            </h1>
            <p className="max-w-xl text-base leading-8 text-[#77736f] lg:justify-self-end">
              Browse upcoming and past events, filter by category and open each
              event's dedicated microsite for details and registration.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start lg:gap-10">
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[1.7rem] border border-[#eee3db] bg-white p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ef6f30]">
                  Browse by time
                </p>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:pb-0">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const active = eventView === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEventView(item.id)}
                        className={`flex shrink-0 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition lg:w-full ${
                          active
                            ? "bg-[#fff0e6] text-[#ef6f30]"
                            : "text-[#625d59] hover:bg-[#fff6ef] hover:text-[#1e1c1b]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 whitespace-nowrap text-sm font-bold">
                          <Icon size={17} /> {item.label}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            active
                              ? "bg-white text-[#ef6f30]"
                              : "bg-[#f4efeb] text-[#8f8882]"
                          }`}
                        >
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <main className="min-w-0">
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categoryOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                      category === item
                        ? "border-[#ef6f30] bg-[#ef6f30] text-white"
                        : "border-[#e8ddd5] bg-white text-[#77736f] hover:border-[#ef6f30]/40 hover:text-[#ef6f30]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mb-7 flex items-end justify-between gap-3 border-b border-[#e9ddd4] pb-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9a938d]">
                    Results
                  </p>
                  <h2 className="mt-1 font-['Manrope',sans-serif] text-3xl font-extrabold tracking-[-0.04em]">
                    {viewTitle}
                  </h2>
                </div>
                <span className="text-sm font-semibold text-[#77736f]">
                  {displayedEvents.length} {displayedEvents.length === 1 ? "event" : "events"}
                </span>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {Array.from({ length: EVENTS_PER_PAGE }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <ErrorState title="Could not load events" description={error} />
              ) : displayedEvents.length === 0 ? (
                <div className="rounded-[1.8rem] border border-dashed border-[#ef6f30]/30 bg-white px-5 py-16 text-center">
                  <CalendarDays size={32} className="mx-auto text-[#ef6f30]" />
                  <h3 className="mt-4 font-['Manrope',sans-serif] text-xl font-extrabold">
                    No events found
                  </h3>
                  <p className="mt-2 text-sm text-[#77736f]">
                    No events are currently available in this category.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {paginatedEvents.map((event, index) => (
                      <EventCard
                        key={event.id || `${event.EventName}-${index}`}
                        event={event}
                        index={(currentPage - 1) * EVENTS_PER_PAGE + index}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#e9ddd4] pt-6 sm:flex-row">
                      <p className="text-sm text-[#77736f]">
                        Showing {(currentPage - 1) * EVENTS_PER_PAGE + 1}–
                        {Math.min(currentPage * EVENTS_PER_PAGE, displayedEvents.length)} of {displayedEvents.length}
                      </p>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Previous page"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8ddd5] bg-white text-[#77736f] hover:border-[#ef6f30]/40 hover:text-[#ef6f30] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        {paginationPages.map((page, index) => {
                          if (typeof page !== "number") {
                            return (
                              <span
                                key={`${page}-${index}`}
                                className="flex h-10 min-w-8 items-center justify-center text-sm text-[#aaa19a]"
                              >
                                ...
                              </span>
                            );
                          }

                          const active = currentPage === page;
                          return (
                            <button
                              key={page}
                              type="button"
                              aria-label={`Go to page ${page}`}
                              aria-current={active ? "page" : undefined}
                              onClick={() => handlePageChange(page)}
                              className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-bold transition ${
                                active
                                  ? "border-[#ef6f30] bg-[#ef6f30] text-white"
                                  : "border-[#e8ddd5] bg-white text-[#77736f] hover:border-[#ef6f30]/40 hover:text-[#ef6f30]"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}

                        <button
                          type="button"
                          aria-label="Next page"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8ddd5] bg-white text-[#77736f] hover:border-[#ef6f30]/40 hover:text-[#ef6f30] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllEvents;
