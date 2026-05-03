import { useMemo } from "react";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import EventCard from "../components/EventCard";
import { Loader2, Search, CalendarX, History, CalendarCheck } from "lucide-react";
import { type EventType } from "../Types/eventType";
// ✅ Define Event Type (Adjust fields if needed)

const AllEvents = () => {
  const { data, isLoading } = useGetEvent() as {
    data:EventType[],
    isLoading:boolean
  };

  const { upcomingEvents, pastEvents } = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return { upcomingEvents: [], pastEvents: [] };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const upcoming: EventType[] = [];
    const past: EventType[] = [];

    (data as EventType[]).forEach((event) => {
      const dateString = event.eventDate;
      if (!dateString) return;

      const eventDate = new Date(dateString);
      if (isNaN(eventDate.getTime())) return;

      if (eventDate >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    // ✅ FIX: Use getTime()
    upcoming.sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    );

    past.sort(
      (a, b) =>
        new Date(b.eventDate).getTime() -
        new Date(a.eventDate).getTime()
    );

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center gap-4 bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-slate-500 font-medium animate-pulse">
          Curating the best events...
        </p>
      </div>
    );
  }

  const hasEvents =
    upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO HEADER */}
      <div className="relative bg-[#020617] text-white pb-16 pt-28 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Trending Events
            </span>
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
            Discover conferences, workshops, and meetups happening around you.
          </p>

          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full py-3.5 pl-12 pr-4 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-sm"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* EVENTS CONTENT */}
      <div className="px-4 md:px-6 py-12 container mx-auto">
        {!hasEvents ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <CalendarX className="text-indigo-500" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No Events Found
            </h3>
            <p className="text-slate-500 max-w-sm">
              We couldn't find any upcoming or past events.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* UPCOMING EVENTS */}
            {upcomingEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <CalendarCheck
                    className="text-indigo-600"
                    size={24}
                  />
                  <h2 className="text-2xl font-bold text-slate-800">
                    Upcoming Events
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {upcomingEvents.map((item, index) => (
                    <EventCard
                      key={item.id}
                      event={item}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* PAST EVENTS */}
            {pastEvents.length > 0 && (
              <div className="pt-12 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-6 opacity-75">
                  <History className="text-slate-500" size={24} />
                  <h2 className="text-2xl font-bold text-slate-600">
                    Past Events
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 opacity-80">
                  {pastEvents.map((item, index) => (
                    <EventCard
                      key={item.id}
                      event={item}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
