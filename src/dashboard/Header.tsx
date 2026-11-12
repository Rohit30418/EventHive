import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CalendarPlus,
  CircleHelp,
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
import "./dashboard-ui.css";
import "./dashboard-reference-ui.css";

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
    <div className="eh-dashboard flex h-dvh min-h-0 overflow-hidden bg-[#F8F7F5] text-[#111330] dark:bg-slate-950 dark:text-slate-200">
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-[60] bg-slate-950/55 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] flex h-full flex-col border-r border-slate-200 bg-white shadow-sm transition-[width,transform] duration-200 ease-out dark:border-slate-800 dark:bg-slate-900 lg:relative lg:translate-x-0 lg:shadow-none ${
          mobileSidebarOpen ? "w-[min(20rem,calc(100vw-1.5rem))] translate-x-0" : "w-[min(20rem,calc(100vw-1.5rem))] -translate-x-full"
        } ${sidebarOpen ? "lg:w-72" : "lg:w-24"}`}
      >
        <div className="flex h-20 items-center justify-between gap-3 border-b border-slate-100 px-5 dark:border-slate-800">
          <Link to="/Dashboard" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4430B9] text-white">
              <Sparkles size={22} />
            </div>

            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="min-w-0">
                <p className="truncate text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                  EventHive
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Control Center
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {menuConfig.map((group) => (
            <div key={group.group}>
              {(sidebarOpen || mobileSidebarOpen) && (
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
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
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                        active
                          ? "bg-[#FFEBDD] text-[#8C360E] dark:bg-[#5B2B1B] dark:text-[#FFD1B8]"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                      } ${!sidebarOpen && !mobileSidebarOpen ? "justify-center" : ""}`}
                      title={!sidebarOpen && !mobileSidebarOpen ? item.label : undefined}
                    >
                      <Icon size={19} className="shrink-0" />

                      {(sidebarOpen || mobileSidebarOpen) && (
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-bold">
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

        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          {[
            { name: "Features", path: "/#features", icon: Sparkles },
            { name: "How it works", path: "/#how-it-works", icon: CalendarDays },
            { name: "Help & FAQ", path: "/#faq", icon: CircleHelp },
          ].map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              aria-label={name}
              title={name}
              onClick={() => setMobileSidebarOpen(false)}
              className="mb-2 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 hover:border-[#4430B9] hover:text-[#4430B9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4430B9] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Icon size={18} aria-hidden="true" />
              {(sidebarOpen || mobileSidebarOpen) && <span>{name}</span>}
            </Link>
          ))}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                {initials || "U"}
              </div>

              {(sidebarOpen || mobileSidebarOpen) && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                    {displayName}
                  </p>
                  <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    {role || "Role loading"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((value) => !value)}
              className="hidden rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 shadow-sm hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900 lg:inline-flex"
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
              className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 shadow-sm hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Dashboard
              </p>
              <h1 className="truncate text-lg font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                {activeItem?.label || "Workspace"}
              </h1>
            </div>
          </div>

          <div className="hidden min-w-[280px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900/80 xl:flex">
            <Search size={17} className="mr-3" />
            <span className="flex-1 font-semibold">
              Search pages, events, registrations...
            </span>
            <kbd className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-950">
              Ctrl K
            </kbd>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </header>

        <main className="custom-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#F8F7F5] p-4 dark:bg-slate-950 sm:p-5 lg:p-6">
          <div className="mx-auto w-full min-w-0 max-w-[1440px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;