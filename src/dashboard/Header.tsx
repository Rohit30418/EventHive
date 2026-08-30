import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { useAuth } from "./AuthContext";

type MenuItem = {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  description: string;
};

const DashboardShell = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const menuConfig = useMemo(() => {
    const isAdmin = role === "SuperAdmin";

    const items: MenuItem[] = isAdmin
      ? [
          {
            label: "Dashboard",
            path: "/Dashboard/SuperAdmin",
            icon: LayoutDashboard,
            description: "System overview",
          },
          {
            label: "Manage Requests",
            path: "/Dashboard/ManageRequest",
            icon: ClipboardCheck,
            description: "Organizer approvals",
          },
          {
            label: "User Database",
            path: "/Dashboard/Registrations",
            icon: ShieldCheck,
            description: "Attendee records",
          },
          {
            label: "All Events",
            path: "/Dashboard/Events",
            icon: CalendarDays,
            description: "Published events",
          },
        ]
      : [
          {
            label: "Dashboard",
            path: "/Dashboard/OrganizerAdmin",
            icon: LayoutDashboard,
            description: "Workspace overview",
          },
          {
            label: "Create Event",
            path: "/Dashboard/CreateEvent",
            icon: CalendarPlus,
            description: "Launch new event",
          },
          {
            label: "My Events",
            path: "/Dashboard/Events",
            icon: CalendarDays,
            description: "Manage events",
          },
          {
            label: "Registrations",
            path: "/Dashboard/Registrations",
            icon: UsersRound,
            description: "Attendee list",
          },
        ];

    return [
      {
        group: isAdmin ? "Super Admin" : "Organizer",
        items,
      },
    ];
  }, [role]);

  const flatItems = menuConfig.flatMap((group) => group.items);

  const activeItem = flatItems.find((item) =>
    location.pathname.toLowerCase().startsWith(item.path.toLowerCase())
  );

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Workspace User";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate("/Login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] flex h-full flex-col border-r border-slate-200 bg-white/95 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition-all duration-300 ease-out dark:border-slate-800 dark:bg-slate-900/95 md:relative md:translate-x-0 md:shadow-none ${
          mobileSidebarOpen ? "w-80 translate-x-0" : "w-80 -translate-x-full"
        } ${sidebarOpen ? "md:w-72" : "md:w-24"}`}
      >
        <div className="flex h-20 items-center justify-between gap-3 border-b border-slate-100 px-5 dark:border-slate-800">
          <Link to="/Dashboard" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25">
              <Sparkles size={22} />
            </div>

            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="min-w-0">
                <p className="truncate text-lg font-black tracking-tight text-slate-950 dark:text-white">
                  EventHive
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                  Control Center
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-7 overflow-y-auto px-3 py-6">
          {menuConfig.map((group) => (
            <div key={group.group}>
              {(sidebarOpen || mobileSidebarOpen) && (
                <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                  {group.group}
                </p>
              )}

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const active = location.pathname
                    .toLowerCase()
                    .startsWith(item.path.toLowerCase());

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                        active
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                      } ${!sidebarOpen && !mobileSidebarOpen ? "justify-center" : ""}`}
                      title={!sidebarOpen && !mobileSidebarOpen ? item.label : undefined}
                    >
                      <Icon size={20} className="shrink-0" />

                      {(sidebarOpen || mobileSidebarOpen) && (
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-black">
                            {item.label}
                          </span>
                          <span
                            className={`block truncate text-[11px] font-semibold ${
                              active ? "text-indigo-100" : "text-slate-400"
                            }`}
                          >
                            {item.description}
                          </span>
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                {initials || "U"}
              </div>

              {(sidebarOpen || mobileSidebarOpen) && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-950 dark:text-white">
                    {displayName}
                  </p>
                  <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    {role || "Role loading"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/85 px-4 shadow-sm shadow-slate-950/[0.03] backdrop-blur-2xl transition-all dark:border-slate-800 dark:bg-slate-950/85 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((value) => !value)}
              className="hidden rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 shadow-sm hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900 md:inline-flex"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 shadow-sm hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                Dashboard
              </p>
              <h1 className="truncate text-lg font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                {activeItem?.label || "Workspace"}
              </h1>
            </div>
          </div>

          <div className="hidden min-w-[320px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
            <Search size={17} className="mr-3" />
            <span className="flex-1 font-semibold">
              Search pages, events, registrations...
            </span>
            <kbd className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-black text-slate-400 dark:border-slate-700 dark:bg-slate-950">
              Ctrl K
            </kbd>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </header>

        <main className="custom-scrollbar flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_28rem),radial-gradient(circle_at_top_right,rgba(6,182,212,0.06),transparent_26rem)] p-4 scroll-smooth sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px] animate-[eh-fade-up_0.45s_ease_both]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;