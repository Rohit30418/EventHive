import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Clock3,
  Inbox,
  Layers3,
  Plus,
  Sparkles,
  TicketCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { ErrorState, PageLoader } from "../../common/StateViews";
import useGetEvents from "../../AdminCustomHooks/useGetEvents";
import useGetRegistrations from "../../AdminCustomHooks/useGetRegistrations";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrganizerDashboard = () => {
  const uid = auth?.currentUser?.uid;

  const [isDark, setIsDark] = useState(false);

  const {
    data: allEvents,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGetEvents();

  const {
    data: allRegistrations,
    isLoading: regLoading,
    error: regError,
  } = useGetRegistrations();

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const stats = useMemo(() => {
    if (!uid) {
      return {
        myEvents: [],
        myRegistrations: [],
        totalAttendees: 0,
        upcomingEvents: 0,
        completedEvents: 0,
      };
    }

    const myEvents = allEvents?.filter((event) => event.userId === uid) || [];
    const myEventIds = myEvents.map((event) => event.id);

    const myRegistrations =
      (allRegistrations || []).filter((registration) =>
        myEventIds.includes(registration.eventId)
      ) || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = myEvents.filter((event) => {
      if (!event.eventDate) return false;
      const eventDate = new Date(event.eventDate);
      if (Number.isNaN(eventDate.getTime())) return false;
      return eventDate >= today;
    }).length;

    return {
      myEvents,
      myRegistrations,
      totalAttendees: myRegistrations.length,
      upcomingEvents,
      completedEvents: Math.max(myEvents.length - upcomingEvents, 0),
    };
  }, [allEvents, allRegistrations, uid]);

  const eventMap = useMemo(() => {
    return new Map(stats.myEvents.map((event) => [event.id, event]));
  }, [stats.myEvents]);

  const latestEvents = useMemo(() => {
    return [...stats.myEvents]
      .sort((a, b) => {
        const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
        const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 4);
  }, [stats.myEvents]);

  const conversionRate =
    stats.myEvents.length > 0
      ? Math.round(stats.totalAttendees / stats.myEvents.length)
      : 0;

  const pieData = useMemo(
    () => ({
      labels: ["Upcoming", "Completed"],
      datasets: [
        {
          data: [stats.upcomingEvents, stats.completedEvents],
          backgroundColor: ["#6366F1", "#10B981"],
          hoverBackgroundColor: ["#4F46E5", "#059669"],
          borderColor: isDark ? "#020617" : "#FFFFFF",
          borderWidth: 4,
          hoverOffset: 8,
        },
      ],
    }),
    [stats.upcomingEvents, stats.completedEvents, isDark]
  );

  const pieOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 22,
            color: isDark ? "#CBD5E1" : "#475569",
            font: {
              size: 12,
              weight: 700 as const,
            },
          },
        },
        tooltip: {
          backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
          titleColor: isDark ? "#FFFFFF" : "#0F172A",
          bodyColor: isDark ? "#CBD5E1" : "#475569",
          borderColor: isDark ? "#1E293B" : "#E2E8F0",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 14,
        },
      },
    }),
    [isDark]
  );

  const metricCards = [
    {
      label: "My Events",
      value: stats.myEvents.length,
      hint: "Total event workspace",
      icon: Layers3,
      tone:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300",
    },
    {
      label: "Total Attendees",
      value: stats.totalAttendees,
      hint: "Registrations received",
      icon: UsersRound,
      tone:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
    },
    {
      label: "Upcoming Events",
      value: stats.upcomingEvents,
      hint: "Still in pipeline",
      icon: CalendarCheck,
      tone:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300",
    },
    {
      label: "Avg. Reach",
      value: conversionRate,
      hint: "Attendees per event",
      icon: TrendingUp,
      tone:
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300",
    },
  ];

  if (eventsLoading || regLoading) {
    return <PageLoader label="Synchronizing organizer analytics..." />;
  }

  if (eventsError || regError) {
    return (
      <ErrorState
        title="Could not load organizer dashboard"
        description={String(eventsError || regError)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900/90 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles size={14} />
              Organizer Analytics
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
              Analytics Overview
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 dark:text-slate-400 md:text-base">
              Track your events, registrations, attendee reach and upcoming
              event activity from one clean organizer workspace.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/Dashboard/CreateEvent"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
            >
              <Plus size={18} />
              Create Event
            </Link>

            <Link
              to="/Dashboard/Events"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-indigo-800 dark:hover:text-indigo-300"
            >
              Manage Events
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.09)] dark:border-slate-800 dark:bg-slate-900/90 dark:hover:shadow-black/20"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/5 transition-transform duration-700 group-hover:scale-150 dark:bg-indigo-400/10" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    {card.label}
                  </p>

                  <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                    {card.value}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {card.hint}
                  </p>
                </div>

                <div className={`rounded-2xl p-4 ${card.tone}`}>
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        {/* Lifecycle Chart */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Event Lifecycle
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Upcoming vs completed event distribution.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Real-time
            </span>
          </div>

          <div className="relative flex h-80 items-center justify-center rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
            {stats.myEvents.length === 0 ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <BarChart3 size={26} />
                </div>
                <p className="font-bold text-slate-400">
                  Create an event to see analytics.
                </p>
              </div>
            ) : (
              <Pie data={pieData} options={pieOptions} />
            )}
          </div>
        </div>

        {/* Registration Stream */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Registration Stream
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Latest attendee activity from your events.
              </p>
            </div>

            <Link
              to="/Dashboard/Registrations"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white dark:bg-indigo-950/50 dark:text-indigo-300"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {stats.myRegistrations.length > 0 ? (
            <div className="space-y-3">
              {stats.myRegistrations.slice(0, 6).map((registration, i) => {
                const event = eventMap.get(registration.eventId);

                return (
                  <div
                    key={registration.id || `${registration.eventId}-${i}`}
                    className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-900/60 dark:hover:bg-slate-950 dark:hover:shadow-black/20"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {registration.fullName?.charAt(0)?.toUpperCase() ||
                          "G"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-black text-slate-900 dark:text-white">
                          {registration.fullName || "Guest"}
                        </p>

                        <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {event?.EventName || "Untitled Event"}
                        </p>
                      </div>
                    </div>

                    <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300 sm:inline-flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                      Success
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-800 dark:bg-slate-950/40">
              <Inbox
                className="mx-auto mb-4 text-slate-300 dark:text-slate-700"
                size={46}
              />
              <p className="text-sm font-black text-slate-500 dark:text-slate-400">
                No recent registrations yet.
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                New attendee activity will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Latest Events */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Latest Events
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Recently created or updated event workspaces.
              </p>
            </div>

            <Link
              to="/Dashboard/Events"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500 transition-all hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:text-indigo-300"
            >
              Manage
              <ArrowRight size={14} />
            </Link>
          </div>

          {latestEvents.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {latestEvents.map((event) => {
                const isUpcoming =
                  event.eventDate && new Date(event.eventDate) >= new Date();

                return (
                  <div
                    key={event.id}
                    className="rounded-[1.35rem] border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-900/60 dark:hover:bg-slate-950"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
                        <TicketCheck size={20} />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${
                          isUpcoming
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {isUpcoming ? "Upcoming" : "Completed"}
                      </span>
                    </div>

                    <h3 className="line-clamp-1 font-black text-slate-950 dark:text-white">
                      {event.EventName || "Untitled Event"}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {event.location || "Location TBA"}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-800 dark:bg-slate-950/40">
              <CalendarCheck
                className="mx-auto mb-4 text-slate-300 dark:text-slate-700"
                size={44}
              />
              <p className="text-sm font-black text-slate-500 dark:text-slate-400">
                No events created yet.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_55px_rgba(15,23,42,0.12)] dark:border-slate-800 md:p-7">
          <div className="mb-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              <Clock3 size={14} />
              Quick Actions
            </div>

            <h2 className="text-2xl font-black tracking-tight">
              Keep your event pipeline moving.
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-400">
              Create new events, review registrations and keep your workspace
              updated.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/Dashboard/CreateEvent"
              className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition-all hover:-translate-y-0.5"
            >
              Create new event
              <Plus size={17} />
            </Link>

            <Link
              to="/Dashboard/Registrations"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
            >
              View registrations
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/Dashboard/Events"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
            >
              Manage events
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;