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
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { user } = useAuth();

  /* ========================================
     HEADER FIXED ONLY AFTER SCROLL
  ======================================== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ========================================
     LOCK BODY WHEN MOBILE MENU OPEN
  ======================================== */
  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /* ========================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ======================================== */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  /* ========================================
     HEADER UI BASED ON SCROLL
  ======================================== */
  const headerBg = scrolled
    ? `
        border-slate-200/80
        bg-white/95
        py-3
        shadow-[0_12px_35px_rgba(15,23,42,0.08)]
        backdrop-blur-xl
      `
    : `
        border-slate-200/40
        bg-white
        py-4
      `;

  return (
    <>
      {/* ========================================
          PLACEHOLDER

          Prevents content from jumping upward
          when header changes to fixed.
      ======================================== */}
      {scrolled && (
        <div
          className="h-[76px] md:h-[80px]"
          aria-hidden="true"
        />
      )}

      {/* ========================================
          HEADER
      ======================================== */}
      <header
        className={`
          z-50
          w-full
          border-b
          px-5
          transition-all
          duration-300
          lg:px-0

          ${
            scrolled
              ? "fixed left-0 top-0"
              : "relative"
          }

          ${headerBg}
        `}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">

          {/* ========================================
              LOGO
          ======================================== */}
          <Link
            to="/"
            className="group relative z-50 flex items-center gap-3"
            aria-label="EventHive home"
          >
            <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-lg font-black text-white shadow-lg shadow-indigo-500/20">
              E

              <span className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/40 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">
                Event
                <span className="eh-gradient-text">
                  Hive
                </span>
              </h1>

              <p className="hidden text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 sm:block">
                Event OS
              </p>
            </div>
          </Link>

          {/* ========================================
              DESKTOP NAVIGATION
          ======================================== */}
          <nav className="hidden items-center rounded-full border border-slate-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-xl md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/Events" &&
                location.pathname.toLowerCase() ===
                  "/events";

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-bold
                    transition-all
                    duration-200

                    ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                    }
                  `}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* ========================================
              DESKTOP ACTIONS
          ======================================== */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link
                  to="/Dashboard"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200
                    bg-white/80
                    px-4
                    py-2
                    text-sm
                    font-black
                    text-slate-700
                    shadow-sm
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-indigo-200
                    hover:text-indigo-700
                  "
                >
                  <LayoutDashboard size={16} />

                  Dashboard
                </Link>

                <Link
                  to="/Logout"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-slate-950
                    px-5
                    py-3
                    text-sm
                    font-black
                    text-white
                    shadow-lg
                    shadow-slate-950/10
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-indigo-700
                  "
                >
                  <LogOut size={16} />

                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/Login"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-black
                    text-slate-600
                    transition
                    hover:bg-indigo-50
                    hover:text-indigo-700
                  "
                >
                  <LogIn size={16} />

                  Log In
                </Link>

                <Link
                  to="/OrganizerRegistration"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-cyan-500
                    px-5
                    py-3
                    text-sm
                    font-black
                    text-white
                    shadow-lg
                    shadow-indigo-500/25
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-indigo-500/35
                  "
                >
                  Get Started

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </>
            )}
          </div>

          {/* ========================================
              MOBILE MENU BUTTON
          ======================================== */}
          <button
            type="button"
            className="
              relative
              z-50
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              p-2.5
              text-slate-950
              shadow-sm
              transition-colors
              active:bg-indigo-50
              md:hidden
            "
            onClick={() =>
              setIsMobileMenuOpen(
                (value) => !value
              )
            }
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={27} />
            ) : (
              <Menu size={27} />
            )}
          </button>
        </div>

        {/* ========================================
            MOBILE MENU
        ======================================== */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.22,
              }}
              className="
                absolute
                left-0
                top-full
                flex
                h-[calc(100dvh-100%)]
                w-full
                flex-col
                overflow-hidden
                bg-white/96
                px-5
                pb-6
                pt-5
                text-slate-950
                backdrop-blur-2xl
                md:hidden
              "
            >
              {/* Background effects */}
              <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-[100px]" />

              <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-[90px]" />

              {/* ========================================
                  MOBILE NAV LINKS
              ======================================== */}
              <div className="relative z-10 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    initial={{
                      opacity: 0,
                      x: -18,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white/80
                      px-5
                      py-4
                      text-lg
                      font-bold
                      text-slate-800
                      shadow-sm
                      transition
                      hover:bg-indigo-50
                      hover:text-indigo-700
                    "
                  >
                    <span>{link.name}</span>

                    <ChevronRight
                      size={20}
                      className="
                        text-slate-400
                        transition-transform
                        group-hover:translate-x-1
                        group-hover:text-indigo-500
                      "
                    />
                  </motion.a>
                ))}
              </div>

              {/* ========================================
                  MOBILE BOTTOM ACTIONS
              ======================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="relative z-10 mt-auto space-y-3"
              >
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-black text-indigo-700">
                    <Sparkles size={16} />

                    Ready to launch?
                  </div>

                  <p className="text-sm leading-6 text-slate-500">
                    Create, publish and manage
                    events from a clean organizer
                    workspace.
                  </p>
                </div>

                {user ? (
                  <>
                    <Link
                      to="/Dashboard"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        py-4
                        text-center
                        font-black
                        text-slate-700
                        shadow-sm
                        hover:text-indigo-700
                      "
                    >
                      <LayoutDashboard size={18} />

                      Dashboard
                    </Link>

                    <Link
                      to="/Logout"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-slate-950
                        py-4
                        text-center
                        font-black
                        text-white
                        shadow-lg
                        shadow-slate-950/10
                      "
                    >
                      Logout

                      <LogOut size={18} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/Events"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        py-4
                        text-center
                        font-black
                        text-slate-700
                        shadow-sm
                        hover:text-indigo-700
                      "
                    >
                      <CalendarDays size={18} />

                      Browse Events
                    </Link>

                    <Link
                      to="/OrganizerRegistration"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-indigo-600
                        to-cyan-500
                        py-4
                        text-center
                        font-black
                        text-white
                        shadow-lg
                        shadow-indigo-500/25
                      "
                    >
                      Get Started

                      <ArrowRight size={18} />
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;