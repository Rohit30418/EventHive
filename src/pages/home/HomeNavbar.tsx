import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../dashboard/AuthContext";
import { Magnetic } from "./HomeMotion";

const links = [
  { label: "Features", href: "/#features", id: "features" },
  { label: "How it works", href: "/#how-it-works", id: "how-it-works" },
  { label: "Events", href: "/#events", id: "events" },
  { label: "FAQ", href: "/#faq", id: "faq" },
];

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const menuClose = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { user } = useAuth();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }),
      { rootMargin: "-28% 0px -55% 0px" }
    );
    links.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuClose.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <header className="eh-home-navbar sticky top-0 z-50 h-[76px] w-full border-b border-[#1F1C1A]/10 bg-[#FFF8F3]/85 backdrop-blur-xl sm:h-[84px]">
      <nav aria-label="Primary navigation" className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" aria-label="EventHive home" className="relative z-[60] inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26B2A]">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F26B2A] font-black text-white shadow-[0_4px_15px_rgba(242,107,42,.22)]">E</span>
          <span className="font-display text-[24px] font-bold tracking-[-.055em] text-[#1F1C1A]">Event<span className="text-[#D64F13]">Hive</span></span>
        </Link>
        <motion.div
          className="hidden items-center gap-1 rounded-full border border-[#1F1C1A]/10 bg-white/65 px-1.5 backdrop-blur-md md:flex"
          animate={{ scale: scrolled ? 0.96 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActive(link.id)}
              className="relative rounded-full px-4 py-2.5 text-[13px] font-semibold text-[#39312B] transition-colors hover:text-[#C34B13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F26B2A]"
            >
              {link.label}
              {active === link.id && <motion.span layoutId="eh-nav-underline" className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#F26B2A]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            </a>
          ))}
        </motion.div>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link to="/Dashboard" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-[#1F1C1A] hover:text-[#C34B13]"><LayoutDashboard size={16} /> Dashboard</Link>
          ) : (
            <Link to="/Login" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-[#1F1C1A] hover:text-[#C34B13]"><LogIn size={16} /> Log in</Link>
          )}
          <Magnetic>
            <Link to="/OrganizerRegistration" className="eh-home-button inline-flex items-center gap-2 rounded-full bg-[#1F1C1A] px-5 py-3 text-sm font-bold text-white hover:bg-[#C34B13]">
              Start creating <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
        </div>
        <button
          ref={menuClose}
          type="button"
          aria-controls="eh-home-mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
          className="relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#1F1C1A]/15 bg-white text-[#1F1C1A] md:hidden"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="eh-home-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduceMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
            className="fixed inset-x-0 top-[76px] z-50 flex h-[calc(100dvh-76px)] flex-col justify-between overflow-y-auto bg-[#1F1C1A] px-6 pb-10 pt-10 text-[#FFF8F3] sm:top-[84px] sm:h-[calc(100dvh-84px)] md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => { setActive(link.id); setOpen(false); }}
                  initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
                  className="border-b border-white/15 py-3 font-display text-4xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-[#F26B2A]"
                >{link.label}</motion.a>
              ))}
            </div>
            <div className="space-y-4">
              <Link to={user ? "/Dashboard" : "/Login"} onClick={() => setOpen(false)} className="block rounded-full border border-white/30 px-6 py-4 text-center font-bold">{user ? "Dashboard" : "Log in"}</Link>
              <Link to="/OrganizerRegistration" onClick={() => setOpen(false)} className="block rounded-full bg-[#F26B2A] px-6 py-4 text-center font-bold text-[#1F1C1A]">Create an event</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
