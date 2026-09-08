import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../dashboard/AuthContext";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Events", href: "/Events" },
  { name: "FAQ", href: "/#faq" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {scrolled && <div className="h-[74px] md:h-[78px]" aria-hidden="true" />}

      <header
        className={`z-50 w-full border-b px-5 transition-all duration-300 lg:px-0 ${
          scrolled
            ? "fixed left-0 top-0 border-[#eadfd7] bg-[#fffaf6]/95 py-3 shadow-[0_14px_35px_rgba(30,28,27,0.06)] backdrop-blur-xl"
            : "relative border-[#efe5de] bg-[#fffaf6] py-4"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5">
          <Link
            to="/"
            className="relative z-50 flex items-center gap-3"
            aria-label="EventHive home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#ef6f30] bg-[#fff4ec] font-['Manrope',sans-serif] text-base font-extrabold text-[#ef6f30]">
              E
            </span>
            <span className="font-['Manrope',sans-serif] text-xl font-extrabold tracking-[-0.04em] text-[#1e1c1b] md:text-2xl">
              Event<span className="text-[#ef6f30]">Hive</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/Events" &&
                location.pathname.toLowerCase() === "/events";

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "text-[#ef6f30]"
                      : "text-[#6f6a65] hover:text-[#1e1c1b]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#ef6f30]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Link
                  to="/Dashboard"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8ddd5] bg-white px-4 py-2.5 text-sm font-bold text-[#4f4a46] transition-all hover:border-[#ef6f30]/40 hover:text-[#ef6f30]"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <Link
                  to="/Logout"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1e1c1b] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ef6f30]"
                >
                  <LogOut size={16} /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/Login"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-[#625d59] transition-colors hover:text-[#ef6f30]"
                >
                  <LogIn size={16} /> Log In
                </Link>
                <Link
                  to="/OrganizerRegistration"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#1e1c1b] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ef6f30]"
                >
                  Create account
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="relative z-50 rounded-full border border-[#e8ddd5] bg-white p-2.5 text-[#1e1c1b] shadow-sm md:hidden"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full flex h-[calc(100dvh-100%)] w-full flex-col overflow-y-auto border-t border-[#efe5de] bg-[#fffaf6] px-5 pb-6 pt-5 md:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group flex items-center justify-between rounded-2xl border border-[#eee3db] bg-white px-5 py-4 font-['Manrope',sans-serif] text-lg font-bold text-[#2c2927]"
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      size={19}
                      className="text-[#b1a9a3] transition-transform group-hover:translate-x-1 group-hover:text-[#ef6f30]"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-3 pt-8">
                <div className="rounded-3xl border border-[#f1dfd2] bg-[#fff1e8] p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[#ef6f30]">
                    <Sparkles size={16} /> Build your next event
                  </div>
                  <p className="text-sm leading-6 text-[#77736f]">
                    Create event pages, collect registrations and manage your
                    workflow from one place.
                  </p>
                </div>

                {user ? (
                  <>
                    <Link
                      to="/Dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#e8ddd5] bg-white py-4 font-bold text-[#4f4a46]"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link
                      to="/Logout"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1e1c1b] py-4 font-bold text-white"
                    >
                      Logout <LogOut size={18} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/Events"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#e8ddd5] bg-white py-4 font-bold text-[#4f4a46]"
                    >
                      <CalendarDays size={18} /> Browse Events
                    </Link>
                    <Link
                      to="/OrganizerRegistration"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ef6f30] py-4 font-bold text-white"
                    >
                      Create account <ArrowRight size={18} />
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
