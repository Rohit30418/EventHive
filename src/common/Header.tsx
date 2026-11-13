import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LayoutDashboard, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../dashboard/AuthContext";

const pages = [
  { title: "Showcase", to: "/#product" },
  { title: "Capabilities", to: "/#features" },
  { title: "Explore events", to: "/Events" },
  { title: "Pricing", to: "/#pricing" },
  { title: "FAQ", to: "/#faq" },
];

export default function Header() {
  const { user, role } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = oldOverflow;
    };
  }, [mobileOpen]);

  const createPath = user && role === "Organizer" ? "/Dashboard/CreateEvent" :
    user && role === "SuperAdmin" ? "/Dashboard" : "/OrganizerRegistration";
  const createLabel = user && role === "SuperAdmin" ? "Open dashboard" :
    user && role === "Organizer" ? "Create event" : "Register as organiser";

  return <header className={`ea-site-header ${scrolled ? "ea-site-header--scrolled" : ""}`}>
    <nav className="ea-site-nav" aria-label="Main navigation">
      <Link to="/" className="ea-site-brand" aria-label="EventHive home"><svg className="ea-site-hex" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 2L28.6 9.1V23L16 30L3.4 23V9.1L16 2Z" fill="#14133A"/>
        <path d="M16 8.4L22.8 12.2V19.8L16 23.6L9.2 19.8V12.2L16 8.4Z" fill="#FFC233"/>
        <circle cx="16" cy="16" r="2.6" fill="#5B4BFF"/>
      </svg><span>EventHive</span></Link>
      <div className="ea-site-links">
        {pages.map(item => <Link key={item.to} to={item.to}
          aria-current={location.pathname.toLowerCase()==="/events" && item.to==="/Events" ? "page" : undefined}>{item.title}</Link>)}
      </div>
      <div className="ea-site-actions">
        <Link to={user ? "/Dashboard" : "/Login"}>{user ? <LayoutDashboard size={17} aria-hidden="true"/> : null}{user ? "Dashboard" : "Log in"}</Link>
        <Link className="ea-site-create" to={createPath}>{createLabel} <ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
      <button ref={menuRef} className="ea-site-menu-toggle" type="button"
        aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-controls="ea-site-mobile-menu" onClick={() => setMobileOpen(v => !v)}>
        {mobileOpen ? <X size={23} aria-hidden="true"/> : <Menu size={23} aria-hidden="true"/>}
      </button>
    </nav>
    {mobileOpen && <div className="ea-site-mobile" id="ea-site-mobile-menu">
      {pages.map(item=><Link key={item.to} to={item.to} onClick={()=>setMobileOpen(false)}>{item.title}</Link>)}
      <Link to={user ? "/Dashboard" : "/Login"} onClick={()=>setMobileOpen(false)}>{user?"Dashboard":"Log in"}</Link>
      <Link className="ea-site-create" to={createPath} onClick={()=>setMobileOpen(false)}>{createLabel} <ArrowUpRight size={17}/></Link>
    </div>}
  </header>;
}
