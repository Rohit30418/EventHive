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

const categories = [
  "All",
  "Technology",
  "Webinar",
  "Music",
  "Art",
  "Sports",
];

const EVENTS_PER_PAGE = 6;

type EventView = "all" | "upcoming" | "past";

const EventCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EAECF2] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <div className="animate-pulse">
        {/* Image placeholder */}
        <div className="h-48 w-full bg-slate-200 sm:h-52" />

        <div className="p-5">
          {/* Category / badge */}
          <div className="mb-4 h-6 w-24 rounded-full bg-slate-200" />

          {/* Title */}
          <div className="mb-2 h-5 w-[85%] rounded bg-slate-200" />
          <div className="mb-5 h-5 w-[58%] rounded bg-slate-200" />

          {/* Date / location style rows */}
          <div className="mb-3 flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-200" />
            <div className="h-4 w-[65%] rounded bg-slate-200" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-200" />
            <div className="h-4 w-[48%] rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

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
    if (!Array.isArray(data)) {
      return categories;
    }

    const eventCategories = data
      .map((event) => event.eventType || event.category)
      .filter(Boolean) as string[];

    return [
      "All",
      ...Array.from(
        new Set([...categories.slice(1), ...eventCategories])
      ),
    ];
  }, [data]);

  const { upcomingEvents, pastEvents, allFilteredEvents } = useMemo(() => {
    if (!Array.isArray(data)) {
      return {
        upcomingEvents: [],
        pastEvents: [],
        allFilteredEvents: [],
      };
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

      if (Number.isNaN(eventDate.getTime())) {
        return;
      }

      if (eventDate >= today) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    upcoming.sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );

    past.sort(
      (a, b) =>
        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
      allFilteredEvents: [...upcoming, ...past],
    };
  }, [data, category]);

  const displayedEvents = useMemo(() => {
    if (eventView === "upcoming") {
      return upcomingEvents;
    }

    if (eventView === "past") {
      return pastEvents;
    }

    return allFilteredEvents;
  }, [eventView, upcomingEvents, pastEvents, allFilteredEvents]);

  const totalPages = Math.ceil(displayedEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;

    return displayedEvents.slice(startIndex, endIndex);
  }, [displayedEvents, currentPage]);

  // Reset pagination when filters change.
  useEffect(() => {
    setCurrentPage(1);
  }, [category, eventView]);

  // Keep current page valid if data changes.
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
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

    window.scrollTo({
      top: 180,
      behavior: "smooth",
    });
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#111831]">
      <section className="border-b border-[#E9EAF2] bg-[#FFFFFF] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[1296px] px-6 lg:px-12">
          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#3848BE]">
            <span aria-hidden="true" className="h-0.5 w-10 bg-[#3848BE]" /> Event discovery
          </div>
          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-12">
            <h1 className="max-w-[700px] font-['Space_Grotesk',Inter,sans-serif] text-[clamp(2.75rem,4.3vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.055em] text-[#111831]">
              Explore events worth showing up for.
            </h1>
            <p className="max-w-xl text-base leading-8 text-[#73778E] sm:text-lg lg:mb-2">
              Browse upcoming and past events, filter by category, and open each event's dedicated microsite for details and registration.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1296px] px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
            <aside className="min-w-0 lg:sticky lg:top-[104px] lg:self-start">
              <div className="rounded-[1.4rem] border border-[#E9EAF2] bg-white p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3848BE]">
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
                            ? "bg-[#EDF1FF] text-[#3848BE]"
                            : "text-[#73778E] hover:bg-[#F8F7FF] hover:text-[#111831]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 whitespace-nowrap text-sm font-bold">
                          <Icon size={17} /> {item.label}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            active
                              ? "bg-white text-[#3848BE]"
                              : "bg-[#F7F9FE] text-[#8C8FA5]"
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
                        ? "border-[#3848BE] bg-[#3848BE] text-white"
                        : "border-[#E9EAF2] bg-white text-[#73778E] hover:border-[#3848BE]/40 hover:text-[#3848BE]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mb-7 flex items-end justify-between gap-3 border-b border-[#E9EAF2] pb-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9A9DB0]">
                    Results
                  </p>
                  <h2 className="mt-1 font-['Space Grotesk',sans-serif] text-3xl font-extrabold tracking-[-0.04em]">
                    {viewTitle}
                  </h2>
                </div>
                <span className="text-sm font-semibold text-[#73778E]">
                  {displayedEvents.length} {displayedEvents.length === 1 ? "event" : "events"}
                </span>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {Array.from({ length: EVENTS_PER_PAGE }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <ErrorState title="Could not load events" description={error} />
              ) : displayedEvents.length === 0 ? (
                <div className="rounded-[1.8rem] border border-dashed border-[#3848BE]/30 bg-white px-5 py-16 text-center">
                  <CalendarDays size={32} className="mx-auto text-[#3848BE]" />
                  <h3 className="mt-4 font-['Space Grotesk',sans-serif] text-xl font-extrabold">
                    No events found
                  </h3>
                  <p className="mt-2 text-sm text-[#73778E]">
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
                    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E9EAF2] pt-6 sm:flex-row">
                      <p className="text-sm text-[#73778E]">
                        Showing {(currentPage - 1) * EVENTS_PER_PAGE + 1}–
                        {Math.min(currentPage * EVENTS_PER_PAGE, displayedEvents.length)} of {displayedEvents.length}
                      </p>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Previous page"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9EAF2] bg-white text-[#73778E] hover:border-[#3848BE]/40 hover:text-[#3848BE] disabled:cursor-not-allowed disabled:opacity-40"
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
                                  ? "border-[#3848BE] bg-[#3848BE] text-white"
                                  : "border-[#E9EAF2] bg-white text-[#73778E] hover:border-[#3848BE]/40 hover:text-[#3848BE]"
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
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9EAF2] bg-white text-[#73778E] hover:border-[#3848BE]/40 hover:text-[#3848BE] disabled:cursor-not-allowed disabled:opacity-40"
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
