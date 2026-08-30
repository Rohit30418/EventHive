import { useAppSelector } from "../../store/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Menu,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";

interface EventData {
  PrimaryColor?: string;
  SecondaryColor?: string;
  color?: string;
  EventName?: string;
}

const hexToRgba = (hex: string, opacity: number) => {
  const clean = hex?.replace("#", "");

  if (!clean || clean.length !== 6) {
    return `rgba(79, 70, 229, ${opacity})`;
  }

  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const data = useAppSelector(
    (state) => state.microsite.eventData
  ) as EventData | null;

  const primaryColor = data?.PrimaryColor || data?.color || "#4F46E5";
  const secondaryColor = data?.SecondaryColor || "#06B6D4";

  const eventName = data?.EventName || "EventHive";

  const logoLetter = eventName?.charAt(0)?.toUpperCase() || "E";

  const navItems = useMemo(
    () => [
      { name: "About", href: "experience" },
      { name: "Sponsors", href: "sponsors" },
      { name: "Speakers", href: "speakers" },
      { name: "Pricing", href: "pricing" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

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

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToRegistration = () => {
    scrollToSection("registration");
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled
            ? "py-3"
            : "py-4"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4  lg:px-0">
          <div
            className={`flex items-center justify-between gap-4 rounded-[1.6rem] border px-3 py-2.5 transition-all duration-300 sm:px-4 ${
              isScrolled
                ? "border-slate-200/80 bg-white/92 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
                : "border-white/50 bg-white/78 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            }`}
          >
            {/* Brand */}
            <button
              type="button"
              onClick={() => scrollToSection("top")}
              className="group flex min-w-0 items-center gap-3 text-left"
              aria-label="Go to event home"
            >
              <span
                className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl text-base font-black text-white shadow-lg transition-transform group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 14px 30px ${hexToRgba(primaryColor, 0.25)}`,
                }}
              >
                {logoLetter}
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
              </span>

              <span className="min-w-0">
                <span className="block max-w-[150px] truncate text-base font-black tracking-tight text-slate-950 sm:max-w-[240px] sm:text-lg">
                  {eventName}
                </span>

                <span className="hidden text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 sm:block">
                  Event Microsite
                </span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden items-center rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur-xl lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-full px-4 py-2 text-sm font-black text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollToSection("experience")}
                className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 xl:inline-flex"
              >
                <Sparkles size={16} />
                Details
              </button>

              <button
                type="button"
                onClick={goToRegistration}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 16px 34px ${hexToRgba(primaryColor, 0.22)}`,
                }}
              >
                Register
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              className="relative z-[120] rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-950 shadow-sm transition-all hover:bg-slate-50 md:hidden"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <aside
        className={`fixed left-3 right-3 top-24 z-[110] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.22)] transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="p-4">
          <div
            className="mb-4 rounded-[1.5rem] p-5 text-white"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl">
              <Ticket size={23} />
            </div>

            <h3 className="line-clamp-2 text-xl font-black leading-tight">
              {eventName}
            </h3>

            <p className="mt-2 text-sm font-medium leading-6 text-white/75">
              Explore event details and register from this mobile-friendly
              microsite.
            </p>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-base font-black text-slate-800 transition-all hover:bg-white"
              >
                {item.name}
                <ArrowRight size={18} style={{ color: primaryColor }} />
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div
              className="mb-2 flex items-center gap-2 text-sm font-black"
              style={{ color: primaryColor }}
            >
              <CalendarCheck size={16} />
              Ready to attend?
            </div>

            <p className="text-sm leading-6 text-slate-500">
              Complete your registration and keep your event pass ready.
            </p>
          </div>

          <button
            type="button"
            onClick={goToRegistration}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-center font-black text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            Register Now
            <ArrowRight size={18} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Header;