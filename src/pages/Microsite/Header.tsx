import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useAppSelector } from "../../store/hooks";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const event = useAppSelector((state) => state.microsite.eventData);

  const primaryColor =
    event?.PrimaryColor || event?.primaryColor || event?.color || "#EF6F30";
  const secondaryColor =
    event?.SecondaryColor || event?.secondaryColor || "#F18651";
  const eventName = event?.EventName || "EventHive";
  const eventLogo = event?.logo || event?.logoUrl;
  const hasAbout = Boolean(event?.AboutArea || event?.description);
  const hasSpeakers = Boolean(event?.speakers?.length);
  const hasMedia = Boolean(event?.banner || event?.videoPoster || event?.videoUrl);
  const hasLocation = Boolean(event?.location);
  const isEventPassed = event?.eventDate
    ? new Date(event.eventDate).getTime() < Date.now()
    : false;

  const navItems = useMemo(
    () => [
      { name: "About", href: "experience", visible: hasAbout },
      { name: "Speakers", href: "speakers", visible: hasSpeakers },
      { name: "Highlights", href: "highlights", visible: hasMedia },
      { name: "Location", href: "location", visible: hasLocation },
      { name: "Registration", href: "registration", visible: true },
    ],
    [hasAbout, hasSpeakers, hasMedia, hasLocation]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
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

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[80] w-full border-b transition-colors duration-200 ${
          isScrolled
            ? "border-slate-200 bg-white"
            : "border-transparent bg-[#fbfaf8]/95"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label="Go to event home"
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl text-sm font-extrabold text-white"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              {eventLogo ? (
                <img src={eventLogo} alt="" className="h-full w-full object-cover" />
              ) : (
                eventName.charAt(0).toUpperCase()
              )}
            </span>
            <span className="min-w-0">
              <span className="block max-w-[190px] truncate font-['Manrope',sans-serif] text-base font-extrabold text-slate-950 sm:max-w-[280px]">
                {eventName}
              </span>
              {(event?.eventType || event?.category) && (
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:block">
                  {event.eventType || event.category}
                </span>
              )}
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems
              .filter((item) => item.visible)
              .map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.name}
                </button>
              ))}
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => !isEventPassed && scrollToSection("registration")}
              disabled={isEventPassed}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
              style={!isEventPassed ? { backgroundColor: primaryColor } : undefined}
            >
              {isEventPassed ? "Closed" : "Register"}
              {!isEventPassed && <ArrowRight size={16} />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-[70] bg-slate-950/35 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="fixed left-3 right-3 top-[82px] z-[90] rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.16)] md:hidden">
            <div className="space-y-1">
              {navItems
                .filter((item) => item.visible)
                .map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-extrabold text-slate-800 hover:bg-slate-50"
                  >
                    {item.name}
                    <ArrowRight size={16} style={{ color: primaryColor }} />
                  </button>
                ))}
            </div>

            <button
              type="button"
              onClick={() => !isEventPassed && scrollToSection("registration")}
              disabled={isEventPassed}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
              style={
                !isEventPassed
                  ? { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }
                  : undefined
              }
            >
              {isEventPassed ? "Registration closed" : "Register now"}
              {!isEventPassed && <ArrowRight size={16} />}
            </button>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
