import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../dashboard/AuthContext";

const navigation = [
  { label: "Features", href: "/#features", id: "features" },
  { label: "How it works", href: "/#how-it-works", id: "how-it-works" },
  { label: "Events", href: "/Events", id: "events" },
  { label: "FAQ", href: "/#faq", id: "faq" },
];

// One shared site header for the homepage, events directory, account pages
// and public event microsites. Private dashboard navigation stays separate.
export default function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    setActive(location.pathname.toLowerCase().startsWith("/events") ? "events" : "");
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      }),
      { rootMargin: "-28% 0px -55% 0px" },
    );
    ["features", "how-it-works", "events", "faq"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    toggleRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1C1A]/10 bg-[#FFF8F3]/95 backdrop-blur-xl">
      <nav aria-label="Primary navigation" className="mx-auto flex h-[76px] w-full max-w-[1296px] items-center justify-between gap-4 px-6 sm:h-[84px] lg:px-12">
        <Link to="/" aria-label="EventHive home" className="relative z-[60] inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26B2A]">
          <motion.span animate={{ scale: scrolled ? 0.93 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F26B2A] font-black text-[#1F1C1A]">E</motion.span>
          <span className="font-['Space_Grotesk',Inter,sans-serif] text-[24px] font-bold tracking-[-.055em] text-[#1F1C1A]">
            Event<span className="text-[#C34B13]">Hive</span>
          </span>
        </Link>

        <motion.div
          className="hidden items-center gap-1 rounded-full border border-[#1F1C1A]/10 bg-white/75 px-1.5 py-1.5 lg:flex"
          animate={{ scale: scrolled ? 0.96 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
        >
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              onClick={() => setActive(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className="relative rounded-full px-4 py-2.5 text-[13px] font-semibold text-[#39312B] transition-colors hover:text-[#B64412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F26B2A]"
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="eventhive-shared-nav-indicator"
                  className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#F26B2A]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </motion.div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={user ? "/Dashboard" : "/Login"}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-[#1F1C1A] hover:text-[#B64412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F26B2A]"
          >
            {user ? <LayoutDashboard size={17} /> : <LogIn size={17} />}
            {user ? "Dashboard" : "Log in"}
          </Link>
          <Link
            to={user ? "/Logout" : "/OrganizerRegistration"}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F1C1A] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#B64412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F26B2A]"
          >
            {user ? "Logout" : "Start creating"} {user ? <LogOut size={16} /> : <ArrowUpRight size={16} />}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-controls="eventhive-shared-mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => !value)}
          className="relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#1F1C1A]/15 bg-white text-[#1F1C1A] focus-visible:outline-2 focus-visible:outline-[#F26B2A] lg:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#F26B2A]"
        style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="eventhive-shared-mobile-menu"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="absolute inset-x-0 top-full z-50 flex h-[calc(100dvh-76px)] flex-col justify-between overflow-y-auto bg-[#1F1C1A] px-6 pb-10 pt-8 text-[#FFF8F3] sm:h-[calc(100dvh-84px)] lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/15 py-4 font-['Space_Grotesk',Inter,sans-serif] text-3xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-[#F26B2A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-8">
              <Link to={user ? "/Dashboard" : "/Login"} onClick={() => setMenuOpen(false)} className="rounded-full border border-white/35 px-6 py-4 text-center font-bold">{user ? "Dashboard" : "Log in"}</Link>
              <Link to={user ? "/Logout" : "/OrganizerRegistration"} onClick={() => setMenuOpen(false)} className="rounded-full bg-[#F26B2A] px-6 py-4 text-center font-bold text-[#1F1C1A]">{user ? "Logout" : "Create an event"}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
