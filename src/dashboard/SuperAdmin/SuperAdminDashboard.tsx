import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UsersRound,
} from "lucide-react";
import GetOrganizerData from "./GetOrganizerData";
import useGetEvents from "../../AdminCustomHooks/useGetEvents";
import { ErrorState, PageLoader } from "../../common/StateViews";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Organizer {
  id: string;
  fullName: string;
  email: string;
  isApproved: boolean;
}

const SuperAdminDashboard = () => {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [orgLoading, setOrgLoading] = useState(true);
  const [orgError, setOrgError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const {
    data: allEvents,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGetEvents();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setOrgLoading(true);
      setOrgError(null);

      try {
        const data = await GetOrganizerData();
        if (active && data) setOrganizers([...data].reverse());
      } catch (error) {
        if (active) {
          setOrgError(
            error instanceof Error
              ? error.message
              : "Failed to fetch organizers"
          );
        }
      } finally {
        if (active) setOrgLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

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

  const totalEvents = allEvents?.length || 0;
  const totalOrganizers = organizers.length;
  const approvedOrganizers = organizers.filter((o) => o.isApproved).length;
  const pendingRequests = totalOrganizers - approvedOrganizers;

  const approvalRate =
    totalOrganizers > 0
      ? Math.round((approvedOrganizers / totalOrganizers) * 100)
      : 0;

  const pendingRate =
    totalOrganizers > 0
      ? Math.round((pendingRequests / totalOrganizers) * 100)
      : 0;

  const cards = [
    {
      label: "Total Events",
      value: totalEvents,
      hint: "Published across platform",
      icon: CalendarDays,
      tone:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300",
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      hint: "Waiting for approval",
      icon: Clock3,
      tone:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300",
    },
    {
      label: "Active Organizers",
      value: approvedOrganizers,
      hint: "Approved organizers",
      icon: UsersRound,
      tone:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
    },
    {
      label: "Approval Rate",
      value: `${approvalRate}%`,
      hint: "Organizer approval health",
      icon: TrendingUp,
      tone:
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300",
    },
  ];

  const pieData = useMemo(
    () => ({
      labels: ["Approved", "Pending"],
      datasets: [
        {
          data: [approvedOrganizers, pendingRequests],
          backgroundColor: ["#10B981", "#F59E0B"],
          borderColor: isDark ? "#020617" : "#ffffff",
          borderWidth: 4,
          hoverOffset: 8,
        },
      ],
    }),
    [approvedOrganizers, pendingRequests, isDark]
  );

  const pieOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 22,
            color: isDark ? "#cbd5e1" : "#475569",
            font: {
              size: 12,
              weight: 700 as const,
            },
          },
        },
        tooltip: {
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          titleColor: isDark ? "#ffffff" : "#0f172a",
          bodyColor: isDark ? "#cbd5e1" : "#475569",
          borderColor: isDark ? "#1e293b" : "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 14,
        },
      },
    }),
    [isDark]
  );

  const newestOrganizers = organizers.slice(0, 5);

  if (orgLoading || eventsLoading) {
    return <PageLoader label="Loading super admin intelligence..." />;
  }

  if (orgError || eventsError) {
    return (
      <ErrorState
        title="Could not load super admin dashboard"
        description={String(orgError || eventsError)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Panel */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900/90 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-300">
              <ShieldCheck size={14} />
              Platform Command Center
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
              Super Admin Overview
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 dark:text-slate-400 md:text-base">
              Monitor events, organizer approvals, platform activity and growth
              signals from one premium command view.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Platform Health
              </p>
              <div className="mt-2 flex items-center gap-2 text-lg font-black text-emerald-600 dark:text-emerald-300">
                <Activity size={19} />
                Stable
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Approval Rate
              </p>
              <div className="mt-2 text-lg font-black text-slate-950 dark:text-white">
                {approvalRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.09)] dark:border-slate-800 dark:bg-slate-900/90 dark:hover:shadow-black/20"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/5 transition-transform duration-700 group-hover:scale-150 dark:bg-indigo-400/10" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    {card.label}
                  </h2>

                  <p className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                    {card.value}
                  </p>

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

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {/* Chart */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Organizer Status
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Approval distribution across organizer requests.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>

          <div className="relative flex h-80 items-center justify-center rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
            {totalOrganizers === 0 ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <UsersRound size={26} />
                </div>
                <p className="font-bold text-slate-400">
                  No organizers found.
                </p>
              </div>
            ) : (
              <>
                <Pie data={pieData} options={pieOptions} />
                <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-3xl font-black text-slate-950 dark:text-white">
                    {totalOrganizers}
                  </p>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    Total
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Newest Organizers */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Newest Organizers
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Latest organizer accounts and approval state.
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
              <UserCheck size={22} />
            </div>
          </div>

          <ul className="space-y-3">
            {newestOrganizers.map((org) => (
              <li
                key={org.id}
                className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-900/60 dark:hover:bg-slate-950 dark:hover:shadow-black/20"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {org.fullName?.charAt(0)?.toUpperCase() || "O"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-black text-slate-900 dark:text-white">
                      {org.fullName || "Organizer"}
                    </p>

                    <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {org.email || "No email"}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${
                    org.isApproved
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                  }`}
                >
                  {org.isApproved ? "Approved" : "Pending"}
                </span>
              </li>
            ))}

            {organizers.length === 0 && (
              <p className="rounded-[1.5rem] border border-dashed border-slate-200 p-8 text-center text-sm font-semibold text-slate-400 dark:border-slate-800">
                No recent organizer data.
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 className="font-black text-slate-950 dark:text-white">
                Approved Organizers
              </h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Healthy organizer base
              </p>
            </div>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${approvalRate}%` }}
            />
          </div>

          <p className="mt-3 text-sm font-bold text-slate-500 dark:text-slate-400">
            {approvedOrganizers} of {totalOrganizers} organizers approved.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300">
              <Clock3 size={22} />
            </div>
            <div>
              <h3 className="font-black text-slate-950 dark:text-white">
                Pending Queue
              </h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Needs admin review
              </p>
            </div>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${pendingRate}%` }}
            />
          </div>

          <p className="mt-3 text-sm font-bold text-slate-500 dark:text-slate-400">
            {pendingRequests} organizer requests pending.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
              <CalendarDays size={22} />
            </div>
            <div>
              <h3 className="font-black text-slate-950 dark:text-white">
                Event Activity
              </h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Total event inventory
              </p>
            </div>
          </div>

          <p className="text-4xl font-black text-slate-950 dark:text-white">
            {totalEvents}
          </p>

          <p className="mt-3 text-sm font-bold text-slate-500 dark:text-slate-400">
            Events available in the platform database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;