import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Menu,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import { useAppSelector } from "../../store/hooks";

interface EventData {
  PrimaryColor?: string;
  SecondaryColor?: string;
  color?: string;
  EventName?: string;
}

const mainLinks = [
  { name: "About", href: "experience" },
  { name: "Sponsors", href: "sponsors" },
  { name: "Speakers", href: "speakers" },
  { name: "Pricing", href: "pricing" },
];

const extraLinks = [
  { name: "Features", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "FAQ", href: "/#faq" },
  { name: "Details", href: "experience" },
];

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const data = useAppSelector((state) => state.microsite.eventData) as EventData | null;
  const primaryColor = data?.PrimaryColor || data?.color || "#3848BE";
  const secondaryColor = data?.SecondaryColor || "#14B884";
  const eventName = data?.EventName || "EventHive";
  const logoLetter = eventName.charAt(0).toUpperCase() || "E";

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setMoreOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setMoreOpen(false);
    if (id.startsWith("/")) {
      navigate(id);
      return;
    }
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto" : "smooth";
    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  const goToRegistration = () => scrollToSection("registration");

  return (
    <>
      <header className="eh-ms-navbar-shell">
        <div className="eh-ms-container">
          <div className="eh-ms-nav">
            <button
              type="button"
              onClick={() => scrollToSection("top")}
              aria-label="Go to event home"
              className="flex min-w-0 max-w-[50%] items-center gap-3 text-left xl:max-w-[28%]"
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                {logoLetter}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-bold text-slate-950 sm:text-lg" title={eventName}>
                  {eventName}
                </span>
                <span className="hidden text-xs font-semibold uppercase tracking-wider text-slate-500 sm:block">
                  Event Microsite
                </span>
              </span>
            </button>

            <nav aria-label="Event navigation" className="eh-ms-nav-links hidden items-center xl:flex">
              {mainLinks.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white hover:text-slate-950"
                >
                  {item.name}
                </button>
              ))}
              <div ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((value) => !value)}
                  aria-haspopup="true"
                  aria-expanded={moreOpen}
                  aria-controls="eh-ms-more-menu"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                >
                  More <ChevronDown size={15} aria-hidden="true" />
                </button>
                {moreOpen && (
                  <div id="eh-ms-more-menu" className="absolute right-0 top-full z-[90] mt-2 w-52 rounded-2xl border border-[#E7ECF5] bg-white p-2 shadow-sm">
                    {extraLinks.map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-[#FFFFFF]"
                      >
                        {item.name}
                        {item.name === "Details" && <Sparkles size={15} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={goToRegistration}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2.5 text-xs font-bold text-[#111831] sm:px-5 sm:text-sm"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Register <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-xl border border-[#E7ECF5] bg-white text-[#111831] xl:hidden"
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="eh-ms-mobile-nav"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[81] bg-slate-950/60 xl:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            id="eh-ms-mobile-nav"
            className="fixed inset-x-4 top-[86px] z-[82] max-h-[calc(100dvh-108px)] overflow-y-auto rounded-[20px] border border-[#E7ECF5] bg-white p-4 shadow-sm xl:hidden"
            aria-label="Event mobile navigation"
          >
            <div
              className="mb-4 rounded-xl p-4 text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              <Ticket size={23} aria-hidden="true" />
              <h3 className="mt-3 break-words text-xl font-bold">{eventName}</h3>
              <p className="mt-2 text-sm leading-6">
                Explore event details and register from this mobile-friendly
                microsite.
              </p>
            </div>

            <div className="grid gap-2">
              {[...mainLinks, ...extraLinks].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="flex min-h-11 items-center justify-between rounded-xl border border-slate-200 bg-[#FFFFFF] px-4 py-2.5 text-left text-sm font-bold text-slate-800"
                >
                  {item.name}
                  <ArrowRight size={17} style={{ color: primaryColor }} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-[#FFFFFF] p-4">
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: primaryColor }}>
                <CalendarCheck size={16} aria-hidden="true" />
                Ready to attend?
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Complete your registration and keep your event pass ready.
              </p>
            </div>

            <button
              type="button"
              onClick={goToRegistration}
              className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              Register Now <ArrowRight size={18} aria-hidden="true" />
            </button>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
