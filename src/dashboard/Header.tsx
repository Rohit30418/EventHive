import React, { useState, useEffect, useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../dashboard/AuthContext";

const DashboardLayout = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // --- UI States ---
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);


  // --- Settings State ---
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("hive_config");
    return saved ? JSON.parse(saved) : {
      theme: "light",
      headerSticky: true,
      glassMode: true
    };
  });


  

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("hive_config", JSON.stringify(settings));
    const root = window.document.documentElement;
    settings.theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
  }, [settings]);

  // Command Palette Shortcut (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuConfig = useMemo(() => {
    const isAdmin = role === "SuperAdmin";
    return [
      {
        group: "General",
        items: [
          { label: "Dashboard", path: isAdmin ? "/Dashboard/SuperAdmin" : "/Dashboard/OrganizerAdmin", icon: "fa-chart-line" },
        ]
      },
      {
        group: isAdmin ? "Administration" : "Event Management",
        items: isAdmin ? [
          { label: "Manage Requests", path: "/Dashboard/ManageRequest", icon: "fa-clipboard-check" },
          { label: "User Database", path: "/Dashboard/Registrations", icon: "fa-user-shield" },
           { label: "My Events", path: "/Dashboard/Events", icon: "fa-calendar-days" },
        ] : [
          { label: "Create Event", path: "/Dashboard/CreateEvent", icon: "fa-calendar-plus" },
          { label: "My Events", path: "/Dashboard/Events", icon: "fa-calendar-days" },
          { label: "Registrations", path: "/Dashboard/Registrations", icon: "fa-users-line" },
        ]
      }
    ];
  }, [role]);

  return (
    <div className={`flex h-screen overflow-hidden ${settings.theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. MOBILE OVERLAY */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm md:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* 2. SIDEBAR */}
      <aside className={`
        fixed md:relative z-[70] h-full transition-all duration-300 ease-in-out border-r
        ${mobileSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"}
        ${sidebarOpen ? "md:w-72" : "md:w-20"}
        bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col
      `}>
        {/* Brand */}
        <div className="h-20 flex items-center px-6 gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="h-10 w-10 flex-shrink-0 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fa-solid fa-bolt-lightning text-xl"></i>
          </div>
          {(sidebarOpen || mobileSidebarOpen) && (
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Hive<span className="text-indigo-600">Pro</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
          {menuConfig.map((group, gIdx) => (
            <div key={gIdx}>
              {(sidebarOpen || mobileSidebarOpen) && (
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">{group.group}</p>
              )}
              <div className="space-y-1">
                {group.items.map((item, iIdx) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={iIdx}
                      to={item.path}
                      className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                        ${active 
                          ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400" 
                          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"}
                      `}
                    >
                      <i className={`fa-solid ${item.icon} text-lg w-6 text-center ${active ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"}`}></i>
                      {(sidebarOpen || mobileSidebarOpen) && <span className="font-semibold text-sm whitespace-nowrap">{item.label}</span>}
                      {active && <div className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile Card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
              {user?.displayName?.charAt(0) || "U"}
            </div>
            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate dark:text-white">{user?.displayName || "Rohit Pant"}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* HEADER */}
        <header className={`h-20 flex items-center justify-between px-6 z-40 transition-all
          ${settings.headerSticky ? 'sticky top-0' : ''}
          ${settings.glassMode ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md' : 'bg-white dark:bg-slate-900'}
          border-b border-slate-200 dark:border-slate-800
        `}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:flex p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
              <i className={`fa-solid ${sidebarOpen ? 'fa-indent' : 'fa-outdent'} text-lg`}></i>
            </button>
            <button onClick={() => setMobileSidebarOpen(true)} className="md:hidden p-2 text-slate-500"><i className="fa-solid fa-bars-staggered text-xl"></i></button>
            
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer group" 
            
            // onClick={() => setSearchOpen(true)}
            
            >
              <i className="fa-solid fa-magnifying-glass text-slate-400 mr-3 group-hover:text-indigo-500"></i>
              <span className="text-sm text-slate-400 mr-8">Search anything...</span>
              <kbd className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400">Ctrl K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setSettingsOpen(true)} className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition">
              <i className="fa-solid fa-sliders text-lg"></i>
            </button>
            
            <button 
              onClick={async () => { await logout(); navigate("/Login"); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition"
            >
              <i className="fa-solid fa-power-off"></i>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>
      </div>

      {/* 4. SETTINGS DRAWER */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} />
          <div className="relative w-80 h-full bg-white dark:bg-slate-900 shadow-2xl p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Customizer</h3>
              <button onClick={() => setSettingsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><i className="fa-solid fa-xmark"></i></button>
            </div>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Appearance</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSettings({...settings, theme: 'light'})}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${settings.theme === 'light' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <i className="fa-solid fa-sun text-xl text-orange-400"></i>
                    <span className="text-xs font-bold">Light</span>
                  </button>
                  <button 
                    onClick={() => setSettings({...settings, theme: 'dark'})}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${settings.theme === 'dark' ? 'border-indigo-600 bg-indigo-900/10' : 'border-slate-100 dark:border-slate-800'}`}
                  >
                    <i className="fa-solid fa-moon text-xl text-indigo-400"></i>
                    <span className="text-xs font-bold">Dark</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sticky Header</span>
                  <input 
                    type="checkbox" 
                    checked={settings.headerSticky} 
                    onChange={(e) => setSettings({...settings, headerSticky: e.target.checked})}
                    className="w-5 h-5 accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;