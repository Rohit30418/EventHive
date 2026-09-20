import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { ErrorState } from "../../common/StateViews";
import { useAppSelector } from "../../store/hooks";
import EventRegistration from "../EventRegistration";
import VideoSection from "./VideoSection";
import SpeakersSection from "./components/SpeakersSection";

const formatDate = (value?: string) => {
  if (!value) return "Date to be announced";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const hexToRgba = (hex: string, opacity: number) => {
  const clean = hex?.replace("#", "");
  if (!clean || clean.length !== 6) return `rgba(239, 111, 48, ${opacity})`;

  const value = parseInt(clean, 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${opacity})`;
};

type LazyRegistrationProps = {
  primaryColor: string;
  secondaryColor: string;
};

const LazyRegistration = ({
  primaryColor,
  secondaryColor,
}: LazyRegistrationProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "650px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      {shouldRender ? (
        <EventRegistration
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : (
        <div
          className="mx-auto max-w-6xl px-4 sm:px-6"
          aria-label="Loading registration form"
        >
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-100" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[52px] animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MicrositeHome = () => {
  const { eventData: event } = useAppSelector((state) => state.microsite);

  if (!event) {
    return (
      <ErrorState
        title="No event data found"
        description="This event page does not have enough content to render yet."
        className="mx-auto my-28 max-w-2xl"
      />
    );
  }

  const primaryColor =
    event.PrimaryColor || event.primaryColor || event.color || "#EF6F30";
  const secondaryColor =
    event.SecondaryColor || event.secondaryColor || "#F18651";
  const isEventPassed = event.eventDate
    ? new Date(event.eventDate).getTime() < Date.now()
    : false;

  const themeStyle = {
    "--event-primary": primaryColor,
    "--event-secondary": secondaryColor,
    "--event-primary-soft": hexToRgba(primaryColor, 0.08),
    "--event-primary-border": hexToRgba(primaryColor, 0.2),
  } as CSSProperties;

  const scrollToRegistration = () => {
    if (isEventPassed) return;

    document
      .getElementById("registration")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const eventSummary = event.ShortDesc || event.description || "";
  const aboutCopy = event.AboutArea || event.description || "";
  const hasAbout = Boolean(aboutCopy);

  const mapQuery = encodeURIComponent(event.location || "");
  const mapsUrl = event.location
    ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
    : "#";

  return (
    <main
      id="top"
      style={themeStyle}
      className="w-full overflow-x-hidden bg-[#fbfaf8] text-slate-950 antialiased"
    >
      <section className="pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-32">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em]"
              style={{
                color: primaryColor,
                borderColor: hexToRgba(primaryColor, 0.2),
                backgroundColor: hexToRgba(primaryColor, 0.06),
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
              {event.eventType || event.category || "Event"}
            </div>

            <h1 className="mt-6 max-w-3xl font-['Manrope',sans-serif] text-[2.55rem] font-extrabold leading-[1.08] tracking-[-0.006em] sm:text-[3.15rem] lg:text-[3.8rem]">
              {event.EventName || "Event"}
            </h1>

            {event.BannerTagLine && (
              <p
                className="mt-4 max-w-2xl font-['Manrope',sans-serif] text-lg font-bold leading-7 sm:text-xl"
                style={{ color: primaryColor }}
              >
                {event.BannerTagLine}
              </p>
            )}

            {eventSummary && (
              <p className="mt-5 max-w-xl text-[15px] font-medium leading-7 text-slate-600 sm:text-base">
                {eventSummary}
              </p>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{
                    color: primaryColor,
                    backgroundColor: hexToRgba(primaryColor, 0.08),
                  }}
                >
                  <Calendar size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Date
                  </p>
                  <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{
                    color: secondaryColor,
                    backgroundColor: hexToRgba(secondaryColor, 0.08),
                  }}
                >
                  <MapPin size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Location
                  </p>
                  <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
                    {event.location || "Venue to be announced"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToRegistration}
                disabled={isEventPassed}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:translate-y-0"
                style={!isEventPassed ? { backgroundColor: primaryColor } : undefined}
              >
                {isEventPassed ? "Registration Closed" : "Register Now"}
                {!isEventPassed && <ArrowRight size={17} />}
              </button>

              {hasAbout && (
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 hover:border-slate-400"
                >
                  About the event
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] opacity-20"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-900 shadow-[0_18px_48px_rgba(15,23,42,0.10)]">
              <div className="aspect-[4/3] sm:aspect-[16/10]">
                {event.banner ? (
                  <img
                    src={event.banner}
                    alt={event.EventName || "Event banner"}
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center px-8 text-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <p className="max-w-md font-['Manrope',sans-serif] text-3xl font-extrabold leading-tight">
                      {event.EventName || "Your event"}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/45">
                    {event.eventType || event.category || "Event"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white/90">
                    {event.location || "Venue to be announced"}
                  </p>
                </div>
                <span className="text-xs font-semibold text-white/55">
                  {formatDate(event.eventDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasAbout && (
        <section
          id="experience"
          className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
              <div>
                <p
                  className="text-[11px] font-extrabold uppercase tracking-[0.16em]"
                  style={{ color: primaryColor }}
                >
                  About
                </p>
                <h2 className="mt-4 max-w-md font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.15] sm:text-3xl lg:text-4xl">
                  About {event.EventName || "the event"}
                </h2>
              </div>

              <p className="whitespace-pre-line text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                {aboutCopy}
              </p>
            </div>
          </div>
        </section>
      )}

      <SpeakersSection
        speakers={event.speakers || []}
        primaryColor={primaryColor}
      />

      <VideoSection
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        eventName={event.EventName || "Event"}
        videoUrl={event.videoUrl}
      />

      {event.location && (
        <section
          id="location"
          className="scroll-mt-24 bg-[#fbfaf8] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="mb-7 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p
                  className="text-[11px] font-extrabold uppercase tracking-[0.16em]"
                  style={{ color: primaryColor }}
                >
                  Location
                </p>
                <h2 className="mt-3 font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.15] text-slate-950 sm:text-3xl lg:text-4xl">
                  Find your way to the event.
                </h2>
                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-600">
                  {event.location}
                </p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 hover:border-slate-400"
              >
                Open in Maps
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <iframe
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                title={`${event.EventName || "Event"} location`}
                loading="lazy"
                className="h-[340px] w-full sm:h-[420px]"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {!isEventPassed && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={scrollToRegistration}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Register for this event
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <section
        id="registration"
        className="scroll-mt-24 border-t border-slate-200 bg-white py-8 sm:py-10"
      >
        {isEventPassed ? (
          <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-[1.5rem] border border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-200 text-slate-500">
                <Clock size={26} />
              </span>
              <h2 className="mt-5 font-['Manrope',sans-serif] text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Registration closed
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                Registration is no longer available because the event date has passed.
              </p>
            </div>
          </div>
        ) : (
          <LazyRegistration
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        )}
      </section>
    </main>
  );
};

export default MicrositeHome;
