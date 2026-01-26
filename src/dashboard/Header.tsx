import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../dashboard/AuthContext"; // ⚠️ Check path

const DashboardLayout = () => {
  // 1. USE THE SECURE HOOK
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // --- Layout State ---
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // --- Settings State ---
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("adminSettings");
    return saved
      ? JSON.parse(saved)
      : {
          theme: "light",
          direction: "ltr",
          headerPosition: "sticky",
          containerWidth: "fluid",
        };
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.setAttribute("dir", settings.direction);
  }, [settings]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSetting = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleLogout = async () => {
      await logout();
      navigate("/Login");
  };

  // --- 2. DYNAMIC MENU GENERATION ---
  let menuItems = [];

  if (role === "SuperAdmin") {
      menuItems = [
        { label: "Overview", path: "/Dashboard/SuperAdmin", icon: "fa-gauge" },
        { label: "Manage Requests", path: "/Dashboard/ManageRequest", icon: "fa-list-check" },
        // Add more SuperAdmin specific routes here
      ];
  } else {
      // Default to Organizer
      menuItems = [
        { label: "Overview", path: "/Dashboard/OrganizerAdmin", icon: "fa-gauge" },
        { label: "Create Event", path: "/Dashboard/CreateEvent", icon: "fa-calendar-plus" },
        { label: "My Events", path: "/Dashboard/Events", icon: "fa-calendar-days" },
        { label: "Registrations", path: "/Dashboard/Users", icon: "fa-users" },
      ];
  }

  return (
    <div className={`flex h-screen transition-colors duration-300 ${settings.theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* ==================== MOBILE OVERLAY ==================== */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ==================== SIDEBAR ==================== */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-700 shadow-xl 
          transition-all duration-300 flex flex-col
          ${mobileSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"} 
          ${sidebarOpen ? "md:w-72" : "md:w-20"}
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700 h-[73px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            {(sidebarOpen || mobileSidebarOpen) && (
              <span className="text-xl font-bold tracking-wide text-slate-800 dark:text-white whitespace-nowrap">
                Event<span className="text-indigo-600">Hive</span>
              </span>
            )}
          </div>
          
          {/* Desktop Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:block text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition"
          >
             <i className={`fa-solid ${sidebarOpen ? "fa-angle-left" : "fa-angle-right"}`}></i>
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-slate-500 hover:text-red-500 transition"
          >
             <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, idx) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 
                  ${active ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400"}
                `}
              >
                <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                {(sidebarOpen || mobileSidebarOpen) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {(sidebarOpen || mobileSidebarOpen) && (
          <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} EventHive Admin</p>
          </div>
        )}
      </aside>


      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* HEADER */}
        <header
          className={`
            bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 
            px-4 sm:px-6 py-3 sm:py-4 shadow-sm z-30 transition-all
            ${settings.headerPosition === 'sticky' ? 'sticky top-0' : ''}
          `}
        >
          {/* Mobile Search Overlay */}
          <div className={`absolute inset-0 bg-white dark:bg-slate-800 z-50 px-4 flex items-center gap-3 transition-transform duration-300 ${mobileSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}>
             <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
             <input type="text" placeholder="Search anything..." autoFocus={mobileSearchOpen} className="flex-1 bg-transparent outline-none text-slate-700 dark:text-slate-200 h-full" />
             <button onClick={() => setMobileSearchOpen(false)} className="text-slate-500 p-2"><i className="fa-solid fa-xmark text-lg"></i></button>
          </div>

          <div className="flex items-center justify-between h-full">
            
            {/* LEFT: Greeting */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>

              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                  <span className="hidden sm:inline">👋 Welcome, </span>
                  <span className="text-indigo-600 dark:text-indigo-400 truncate max-w-[120px] sm:max-w-xs inline-block align-bottom">
                    {user?.displayName || "User"}
                  </span>
                </h1>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${role === 'SuperAdmin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    {role} Access
                </span>
              </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Settings Toggle */}
               <button 
                onClick={() => setSettingsOpen(true)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition animate-spin-slow hover:animate-spin"
              >
                <i className="fa-solid fa-gear text-xl"></i>
              </button>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>

            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/50 scroll-smooth">
          <div className={`mx-auto transition-all duration-300 ${settings.containerWidth === 'boxed' ? 'max-w-6xl' : 'max-w-full'}`}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- SETTINGS DRAWER --- */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-[60]" onClick={() => setSettingsOpen(false)}></div>
      )}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-700 flex flex-col ${settingsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Theme Customizer</h2>
            <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-red-500 transition"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* 1. Theme Mode */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Color Mode</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => toggleSetting('theme', 'light')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${settings.theme === 'light' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}><i className="fa-regular fa-sun"></i> Light</button>
                    <button onClick={() => toggleSetting('theme', 'dark')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${settings.theme === 'dark' ? 'border-indigo-600 bg-indigo-900/20 text-indigo-500' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}><i className="fa-regular fa-moon"></i> Dark</button>
                </div>
            </div>
             {/* 2. Header Behavior */}
             <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Header</h3>
                <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sticky</span>
                        <input type="radio" name="header" checked={settings.headerPosition === 'sticky'} onChange={() => toggleSetting('headerPosition', 'sticky')} className="accent-indigo-600 h-4 w-4"/>
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Static</span>
                        <input type="radio" name="header" checked={settings.headerPosition === 'static'} onChange={() => toggleSetting('headerPosition', 'static')} className="accent-indigo-600 h-4 w-4"/>
                    </label>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;