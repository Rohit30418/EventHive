import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Award,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { ErrorState } from "../../common/StateViews";
import { useAppSelector } from "../../store/hooks";
import EventRegistration from "../EventRegistration";
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
      { rootMargin: "700px 0px" }
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
        <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center sm:p-12">
          <p className="text-sm font-semibold text-slate-500">
            Registration form loads when you reach this section.
          </p>
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

  const benefits = [
    {
      icon: Award,
      title: "Focused event experience",
      text: "Everything attendees need is presented in one clear event page.",
    },
    {
      icon: UsersRound,
      title: "Meet the speakers",
      text: "Discover the people and expertise behind the event.",
    },
    {
      icon: ShieldCheck,
      title: "Simple registration",
      text: "A straightforward attendee flow with clear event information.",
    },
  ];

  const eventSummary =
    event.ShortDesc ||
    event.description ||
    "Discover the event, understand what to expect and register from one focused experience.";

  const aboutCopy =
    event.AboutArea ||
    event.description ||
    event.ShortDesc ||
    "Event details will be updated by the organizer.";

  return (
    <main
      id="top"
      style={themeStyle}
      className="w-full overflow-x-hidden bg-[#fbfaf8] text-slate-950 antialiased"
    >
      <section className="px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
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

            <h1 className="mt-6 max-w-3xl font-['Manrope',sans-serif] text-[2.55rem] font-extrabold leading-[1.08] tracking-[-0.006em] sm:text-[3.4rem] lg:text-[4.15rem]">
              {event.EventName || "Event"}
            </h1>

            {event.BannerTagLine && (
              <p
                className="mt-4 max-w-2xl font-['Manrope',sans-serif] text-xl font-bold leading-8 sm:text-2xl"
                style={{ color: primaryColor }}
              >
                {event.BannerTagLine}
              </p>
            )}

            <p className="mt-5 max-w-xl text-[15px] font-medium leading-7 text-slate-600 sm:text-base">
              {eventSummary}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
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
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] opacity-20"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-slate-900 shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
              <div className="aspect-[4/3] sm:aspect-[16/11]">
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
                    Event microsite
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

      <section
        id="experience"
        className="scroll-mt-24 border-y border-slate-200 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
            <div>
              <p
                className="text-[11px] font-extrabold uppercase tracking-[0.16em]"
                style={{ color: primaryColor }}
              >
                About the event
              </p>
              <h2 className="mt-4 max-w-md font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.15] sm:text-3xl lg:text-4xl">
                Everything attendees need to know before they arrive.
              </h2>
            </div>

            <div>
              <p className="whitespace-pre-line text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                {aboutCopy}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <article
                    key={title}
                    className="rounded-[1.25rem] border border-slate-200 bg-[#fbfaf8] p-5"
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{
                        color: primaryColor,
                        backgroundColor: hexToRgba(primaryColor, 0.08),
                      }}
                    >
                      <Icon size={18} />
                    </span>
                    <h3 className="mt-4 font-['Manrope',sans-serif] text-base font-extrabold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpeakersSection
        speakers={event.speakers || []}
        primaryColor={primaryColor}
      />

      {event.location && (
        <section className="bg-[#fbfaf8] px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                <MapPin size={21} />
              </span>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  Event location
                </p>
                <h2 className="mt-1 font-['Manrope',sans-serif] text-xl font-extrabold text-slate-950 sm:text-2xl">
                  {event.location}
                </h2>
              </div>

              {!isEventPassed && (
                <button
                  type="button"
                  onClick={scrollToRegistration}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Register
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      <section
        id="registration"
        className="scroll-mt-24 border-t border-slate-200 bg-white px-0 py-8 sm:py-10"
      >
        {isEventPassed ? (
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-6 py-14 text-center">
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
