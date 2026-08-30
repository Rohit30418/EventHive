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
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* =========================
          DARK CENTERED BANNER
      ========================== */}
      <section className="flex min-h-[180px] items-center justify-center bg-[#0B1020] px-4 sm:min-h-[200px] sm:px-6 lg:min-h-[220px] lg:px-8">
        <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Explore Events
        </h1>
      </section>

      {/* =========================
          EVENTS AREA
      ========================== */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-8">
            {/* =========================
                EVENT CATEGORIES
            ========================== */}
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-[#EAECF2] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-5">
                <h2 className="mb-4 text-lg font-semibold text-[#151826] sm:text-xl">
                  Event Categories
                </h2>

                <div
                  className="
                    flex gap-2 overflow-x-auto pb-2
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                    lg:flex-col
                    lg:overflow-visible
                    lg:pb-0
                  "
                >
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const active = eventView === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEventView(item.id)}
                        className={`
                          flex shrink-0 items-center justify-between
                          gap-3 rounded-xl px-4 py-3
                          text-left transition
                          lg:w-full
                          ${
                            active
                              ? "bg-[#F3F0FF] text-[#6C4CF1]"
                              : "bg-[#F8F9FC] text-[#4B5563] hover:bg-[#F3F0FF] hover:text-[#6C4CF1] lg:bg-transparent"
                          }
                        `}
                      >
                        <span className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium">
                          <Icon
                            size={18}
                            className={
                              active ? "text-[#6C4CF1]" : "text-slate-400"
                            }
                          />

                          {item.label}
                        </span>

                        <span
                          className={`
                            rounded-full px-2 py-0.5
                            text-[11px]
                            ${
                              active
                                ? "bg-white text-[#6C4CF1]"
                                : "bg-slate-100 text-slate-500"
                            }
                          `}
                        >
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* =========================
                RIGHT SIDE
            ========================== */}
            <main className="min-w-0">
              {/* CATEGORY FILTERS */}
              <div
                className="
                  mb-5 flex gap-2 overflow-x-auto pb-2
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {categoryOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`
                      shrink-0 rounded-lg border
                      px-3.5 py-2
                      text-xs font-medium
                      transition
                      sm:px-4 sm:text-sm
                      ${
                        category === item
                          ? "border-[#6C4CF1] bg-[#6C4CF1] text-white"
                          : "border-[#EAECF2] bg-white text-[#697386] hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1]"
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* TITLE + COUNT */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[#151826] sm:text-2xl lg:text-3xl">
                  {viewTitle}
                </h2>

                <span className="shrink-0 rounded-lg border border-[#EAECF2] bg-white px-3 py-1.5 text-xs text-[#697386] shadow-sm sm:text-sm">
                  {displayedEvents.length} {displayedEvents.length === 1 ? "event" : "events"}
                </span>
              </div>

              {/* =========================
                  LOADING SKELETON
              ========================== */}
              {isLoading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  {Array.from({ length: EVENTS_PER_PAGE }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <ErrorState
                  title="Could not load events"
                  description={error}
                />
              ) : displayedEvents.length === 0 ? (
                /* EMPTY */
                <div className="rounded-2xl border border-[#EAECF2] bg-white px-5 py-12 text-center sm:px-8 sm:py-16">
                  <CalendarDays
                    size={28}
                    className="mx-auto text-[#6C4CF1]"
                  />

                  <h3 className="mt-4 text-lg font-semibold text-[#151826]">
                    No events found
                  </h3>

                  <p className="mt-2 text-sm text-[#697386]">
                    No events are currently available in this category.
                  </p>
                </div>
              ) : (
                <>
                  {/* =========================
                      EVENT GRID
                  ========================== */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                    {paginatedEvents.map((event, index) => (
                      <div
                        key={
                          event.id ||
                          `${event.EventName}-${
                            (currentPage - 1) * EVENTS_PER_PAGE + index
                          }`
                        }
                        className="min-w-0"
                      >
                        <EventCard
                          event={event}
                          index={(currentPage - 1) * EVENTS_PER_PAGE + index}
                        />
                      </div>
                    ))}
                  </div>

                  {/* =========================
                      PAGINATION
                  ========================== */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#EAECF2] pt-6 sm:flex-row">
                      <p className="text-sm text-[#697386]">
                        Showing{" "}
                        <span className="font-medium text-[#151826]">
                          {(currentPage - 1) * EVENTS_PER_PAGE + 1}
                        </span>{" "}
                        -{" "}
                        <span className="font-medium text-[#151826]">
                          {Math.min(
                            currentPage * EVENTS_PER_PAGE,
                            displayedEvents.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-[#151826]">
                          {displayedEvents.length}
                        </span>{" "}
                        events
                      </p>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Previous page"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EAECF2] bg-white text-[#697386] transition hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        {paginationPages.map((page, index) => {
                          if (typeof page !== "number") {
                            return (
                              <span
                                key={`${page}-${index}`}
                                className="flex h-10 min-w-8 items-center justify-center px-1 text-sm text-[#98A2B3]"
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
                              className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
                                active
                                  ? "border-[#6C4CF1] bg-[#6C4CF1] text-white"
                                  : "border-[#EAECF2] bg-white text-[#697386] hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1]"
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
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EAECF2] bg-white text-[#697386] transition hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] disabled:cursor-not-allowed disabled:opacity-40"
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
