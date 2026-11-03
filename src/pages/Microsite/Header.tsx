import { useAppSelector } from "../../store/hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    return `rgba(242, 107, 42, ${opacity})`;
  }

  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const data = useAppSelector(
    (state) => state.microsite.eventData
  ) as EventData | null;

  const primaryColor = data?.PrimaryColor || data?.color || "#F26B2A";
  const secondaryColor = data?.SecondaryColor || "#E88A54";

  const eventName = data?.EventName || "EventHive";

  const logoLetter = eventName?.charAt(0)?.toUpperCase() || "E";

  const navItems = useMemo(
    () => [
      { name: "About", href: "experience" },
      { name: "Sponsors", href: "sponsors" },
      { name: "Speakers", href: "speakers" },
      { name: "Pricing", href: "pricing" },
      { name: "FAQ", href: "/#faq" },
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

    // FAQ belongs to the main EventHive site, not this event microsite.
    if (id.startsWith("/")) {
      navigate(id);
      return;
    }

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const goToRegistration = () => {
    scrollToSection("registration");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[100] w-full border-b border-[#E7D8CC] bg-[#FFF8F3]/95 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "py-2"
            : "py-2"
        }`}
      >
        <div className="mx-auto w-full max-w-[1296px] px-6 lg:px-12">
          <div
            className={`flex items-center justify-between gap-4 rounded-[1.25rem] border px-3 py-2 transition-all duration-300 sm:px-4 ${
              isScrolled
                ? "border-[#E7D8CC] bg-white/90 backdrop-blur-xl"
                : "border-[#E7D8CC] bg-white/80 backdrop-blur-xl"
            }`}
          >
            {/* Brand */}
            <button
              type="button"
              onClick={() => scrollToSection("top")}
              className="group flex min-w-0 items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26B2A]"
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
            <nav className="hidden items-center rounded-full border border-slate-200 bg-white/80 p-1 backdrop-blur-xl lg:flex">
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
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-[#1F1C1A] transition-colors hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,

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
              className="relative z-[120] rounded-2xl border border-[#E7D8CC] bg-white p-2.5 text-[#1F1C1A] transition-colors hover:bg-[#FFEBDD] lg:hidden"
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
        className={`fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <aside
        className={`fixed left-3 right-3 top-24 z-[110] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[1.5rem] border border-[#E7D8CC] bg-white shadow-[0_16px_50px_rgba(31,28,26,0.14)] transition-all duration-300 lg:hidden ${
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