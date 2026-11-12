import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LayoutDashboard, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../dashboard/AuthContext";

const links = [
  { label: "Features", to: "/#features" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "Events", to: "/Events" },
  { label: "Pricing", to: "/#pricing" },
  { label: "FAQ", to: "/#faq" },
];

export default function Header() {
  const { user, role } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const ctaTo = role === "Organizer" ? "/Dashboard/CreateEvent" : user ? "/Dashboard" : "/OrganizerRegistration";
  const ctaText = user && role !== "Organizer" ? "Open dashboard" : "Create event";
  const isActive = (to: string) => to === "/Events"
    ? location.pathname.toLowerCase() === "/events"
    : location.pathname === "/" && location.hash === to.slice(1);

  return (
    <header className={`eh26-site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="eh26-site-navbar" aria-label="Primary navigation">
        <Link to="/" className="eh26-site-logo" aria-label="EventHive homepage">
          <span className="eh26-site-mark" aria-hidden="true">e.</span>
          <span>Event<span>Hive</span></span>
        </Link>

        <div className="eh26-site-links">
          {links.map(link => (
            <Link key={link.to} to={link.to}
              aria-current={isActive(link.to) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="eh26-site-actions">
          <Link className="eh26-site-login" to={user ? "/Dashboard" : "/Login"}>
            {user ? <LayoutDashboard size={17} aria-hidden="true" /> : null}
            {user ? "Dashboard" : "Log in"}
          </Link>
          <Link className="eh26-site-cta" to={ctaTo}>
            {ctaText} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <button ref={menuButton} type="button" className="eh26-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="eh26-mobile-menu" aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}>
          {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="eh26-mobile-menu" id="eh26-mobile-menu">
          <div>{links.map(link => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</div>
          <div className="eh26-mobile-actions">
            <Link to={user ? "/Dashboard" : "/Login"} onClick={() => setMenuOpen(false)}>{user ? "Dashboard" : "Log in"}</Link>
            <Link to={ctaTo} className="eh26-site-cta" onClick={() => setMenuOpen(false)}>{ctaText} <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}
