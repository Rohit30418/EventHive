import { useAppSelector } from "../../store/hooks";
import { CalendarDays, ArrowUpRight } from "lucide-react";

// Event-specific actions remain available below the site-wide EventHive header.
// This is a contextual navigation bar, not a second site header.
export default function EventSectionNav() {
  const event = useAppSelector((state) => state.microsite.eventData);
  const eventName = event?.EventName || "Event details";

  const sections = [
    { label: "About", id: "experience" },
    { label: "Speakers", id: "speakers" },
    { label: "Pricing", id: "pricing" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav aria-label="Event page sections" className="sticky top-[76px] z-40 border-b border-[#E7D8CC] bg-white/95 backdrop-blur-lg sm:top-[84px]">
      <div className="mx-auto flex min-h-[62px] w-full max-w-[1296px] items-center gap-3 px-6 py-2 lg:px-12">
        <div className="hidden min-w-0 items-center gap-2 text-sm font-bold text-[#1F1C1A] lg:flex">
          <CalendarDays size={17} className="shrink-0 text-[#B64412]" aria-hidden="true" />
          <span className="max-w-[225px] truncate" title={eventName}>{eventName}</span>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto sm:gap-2 lg:justify-center">
          {sections.map((section) => (
            <button
              type="button"
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold text-[#51443D] transition-colors hover:bg-[#FFEBDD] hover:text-[#9C3911] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F26B2A] sm:px-4 sm:text-sm"
            >
              {section.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollTo("registration")}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F26B2A] px-4 py-2.5 text-xs font-bold text-[#1F1C1A] transition-colors hover:bg-[#FF985D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26B2A] sm:text-sm"
        >
          Register <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
