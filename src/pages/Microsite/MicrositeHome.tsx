import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ErrorState } from "../../common/StateViews";
import { useAppSelector } from "../../store/hooks";
import EventRegistration from "../EventRegistration";
import PricingSection from "./PricingSection";
import VideoSection from "./VideoSection";
import SpeakersSection from "./components/SpeakersSection";
import useMicrositePresentation from "./hooks/useMicrositePresentation";

const hexToRgba = (hex: string, opacity: number) => {
  if (!hex) return `rgba(16, 185, 129, ${opacity})`; // Default to Emerald

  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return `rgba(16, 185, 129, ${opacity})`;

  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const formatDate = (value?: string) => {
  if (!value) return "05 May 2026";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const MicrositeHome = () => {
  const { eventData: data } = useAppSelector((state) => state.microsite);
  const event = data ?? { EventName: "", eventDate: "" };

  const primaryColor = event.PrimaryColor || event.primaryColor || "#F26B2A";
  const secondaryColor =
    event.SecondaryColor || event.secondaryColor || "#E88A54";

  const eventDateStr = event.eventDate;
  const isEventPassed = eventDateStr
    ? new Date(eventDateStr).getTime() < new Date().getTime()
    : false;

  const {
    currentImageIndex,
    setCurrentImageIndex,
    heroImages,
    fallbackPortraits,
    speakers,
  } = useMicrositePresentation(event);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const staggerWrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const valueProps = [
    {
      title: "Curated Sessions",
      desc: "Focused sessions designed around real audience value.",
      icon: <Award size={22} />,
    },
    {
      title: "Networking Ready",
      desc: "Connect with attendees, speakers and event communities.",
      icon: <UsersRound size={22} />,
    },
    {
      title: "Smooth Registration",
      desc: "Simple digital registration experience for every attendee.",
      icon: <ShieldCheck size={22} />,
    },
  ];

  const agendaItems = [
    { time: "09:30 AM", title: "Registration and welcome" },
    { time: "10:30 AM", title: "Opening keynote session" },
    { time: "12:00 PM", title: "Networking and experience zone" },
  ];

  if (!data) {
    return (
      <ErrorState
        title="No event data found"
        description="This event page does not have enough content to render yet."
        className="mx-auto my-28 max-w-2xl"
      />
    );
  }

  return (
    <div
      id="top"
      className="eh-ms-page w-full min-w-0 bg-[#FFF8F3] font-sans text-slate-900 antialiased"
    >
      <style>
        {`
          ::selection {
            background-color: ${primaryColor};
            color: white;
          }
        `}
      </style>

      {/* HERO SECTION */}
      <section className="eh-ms-section bg-[#FFF8F3]">
        <div className="eh-ms-container">
          <div className="eh-ms-hero-grid">
            
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerWrap}
              className="flex min-w-0 flex-col text-left"
            >
              {/* Tags */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
                <div
                  className="flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{ color: primaryColor }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  {event.eventType || "Webinar & In-Person"}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                  <Sparkles size={14} className="text-amber-500" />
                  Limited Early Bird Seats
                </div>
              </motion.div>

              {/* Headings */}
              <motion.h1
                variants={fadeInUp}
                className="eh-ms-hero-title mt-6 max-w-3xl font-bold tracking-tight text-[#0f172a]"
              >
                {event.EventName
                  ? event.EventName.split(" ").slice(0, 2).join(" ")
                  : "Startup Founders"}
                <br />
                {event.EventName
                  ? event.EventName.split(" ").slice(2).join(" ")
                  : "Bootcamp"}
              </motion.h1>
              <motion.h2
                variants={fadeInUp}
                className="mt-2 break-words text-[clamp(1.6rem,3.7vw,2.7rem)] font-bold leading-tight [overflow-wrap:anywhere]"
                style={{ color: primaryColor }}
              >
                {event.BannerTagLine || "Scale Up."}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-500"
              >
                {event.ShortDesc ||
                  "A comprehensive workshop on scaling your startup from idea to Series A. Covers funding strategies, team building, unit economics, and hyper-scalable product-market fit."}
              </motion.p>

              {/* Event Info Row */}
              <motion.div variants={fadeInUp} className="eh-ms-date-location mt-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </p>
                    <p className="mt-0.5 font-bold text-slate-900">
                      {formatDate(event.eventDate)}
                    </p>
                  </div>
                </div>
                
                <div aria-hidden="true" className="hidden h-10 w-px bg-slate-200 md:block" />

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </p>
                    <p className="mt-0.5 font-bold text-slate-900">
                      {event.location || "Delhi, India"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={fadeInUp}
                className="eh-ms-actions mt-8"
              >
                <button
                  onClick={() =>
                    !isEventPassed &&
                    document
                      .getElementById("registration")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  disabled={isEventPassed}
                  className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-colors ${isEventPassed ? "eh-ms-closed" : ""}`}
                  style={isEventPassed ? undefined : { backgroundColor: primaryColor }}
                >
                  {isEventPassed ? "Closed" : "Register Now"}
                  {!isEventPassed && (
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                >
                  Explore Details
                  <ArrowDown size={16} className="text-slate-400" />
                </button>

                <button type="button" onClick={() => document.getElementById("preview-video")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-3 text-sm font-bold text-slate-700 hover:opacity-80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Play size={16} className="ml-1" fill="currentColor" />
                  </div>
                  Watch Trailer
                </button>
              </motion.div>
            </motion.div>

            {/* Same event images and metadata, now inside a contained 16:9 preview. */}
            <div className="eh-ms-hero-visual">
              <div className="eh-ms-hero-image eh-ms-card">
                {heroImages.map((src, idx) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-500 ${idx === currentImageIndex ? "z-10 opacity-100" : "z-0 opacity-0"}`}
                    aria-hidden={idx !== currentImageIndex}
                  >
                    <img src={src} alt="Event showcase" className="h-full w-full object-cover" loading={idx === 0 ? "eager" : "lazy"} />
                  </div>
                ))}
              </div>
              <div className="eh-ms-card mt-3 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
                      {event.EventName || "STARTUP FOUNDERS BOOTCAMP"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {event.BannerTagLine || "Launch Your Vision. Scale Your Impact."}
                    </p>
                  </div>
                  <div className="eh-ms-hero-controls">
                    <button type="button" aria-label="Previous image" onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)} className="eh-ms-circle-button"><ChevronLeft size={19} /></button>
                    <button type="button" aria-label="Next image" onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)} className="eh-ms-circle-button"><ChevronRight size={19} /></button>
                  </div>
                </div>
                <div className="eh-ms-hero-meta">
                  <span className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700">{formatDate(event.eventDate)}</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700">{event.location || "Delhi, India"}</span>
                  <div className="eh-ms-dots" aria-label="Select event image">
                    {heroImages.map((_, idx) => (
                      <button
                        type="button"
                        key={idx}
                        aria-label={`Image ${idx + 1}`}
                        aria-current={idx === currentImageIndex ? "true" : "false"}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION: image, matching cards and a vertical agenda. */}
      <section id="experience" className="eh-ms-section bg-white">
        <div className="eh-ms-container">
          <div className="eh-ms-section-heading">
            <p className="eh-ms-eyebrow mb-4" style={{ color: primaryColor }}>
              The experience
            </p>
            <h2 className="eh-ms-heading text-slate-950">
              Why you should not miss this{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
              >
                event
              </span>
              .
            </h2>
            <p className="eh-ms-copy whitespace-pre-line">
              {event.AboutArea ||
                "We bring together the right audience, useful content and a memorable experience designed for professionals."}
            </p>
          </div>

          <div className="eh-ms-card overflow-hidden">
            <img
              src={event.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=80"}
              alt="Event experience"
              className="eh-ms-experience-image"
              loading="lazy"
            />
            <div className="eh-ms-experience-card">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.75) }}
              >
                <Play className="ml-1 fill-white" size={24} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">Event highlights</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A premium event experience designed for attendees, speakers and organizers.
                </p>
              </div>
            </div>
          </div>

          <div className="eh-ms-features">
            {valueProps.map((item) => (
              <article key={item.title} className="eh-ms-card">
                <div
                  className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="eh-ms-timeline eh-ms-card">
            <ol className="eh-ms-timeline-list">
              {agendaItems.map((item) => (
                <li key={item.title} className="eh-ms-timeline-item">
                  <p className="eh-ms-eyebrow" style={{ color: primaryColor }}>{item.time}</p>
                  <p className="text-base font-medium leading-snug text-slate-900">{item.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <SpeakersSection
        speakers={speakers}
        fallbackPortraits={fallbackPortraits}
        primaryColor={primaryColor}
      />

      <VideoSection primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <PricingSection primaryColor={primaryColor} secondaryColor={secondaryColor} />

      {/* REGISTRATION */}
      <section id="registration" className="eh-ms-section bg-white">
        <div className="eh-ms-container">
          {isEventPassed ? (
            <div className="eh-ms-registration-closed eh-ms-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-200 text-slate-600">
                <Clock size={25} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Registration Closed</h2>
                <p className="mt-1 text-base leading-relaxed text-slate-600">
                  The registration for this event has ended because the event date has passed.
                </p>
              </div>
            </div>
          ) : (
            <EventRegistration primaryColor={primaryColor} />
          )}
        </div>
      </section>

      {/* MAP — existing location and action, arranged below the map. */}
      <section className="eh-ms-section bg-[#FFF8F3]">
        <div className="eh-ms-container">
          <div className="eh-ms-card overflow-hidden">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                event.location || "New Delhi"
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="340"
              loading="lazy"
              title="Event Location"
              className="eh-ms-location-map"
              style={{ border: 0 }}
            />
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <Navigation size={22} />
                </span>
                <div className="min-w-0">
                  <p className="eh-ms-eyebrow text-slate-500">Event Location</p>
                  <p className="mt-1 break-words text-base font-bold text-slate-900">
                    {event.location || "Venue TBA"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })}
                disabled={isEventPassed}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ${isEventPassed ? "eh-ms-closed" : ""}`}
                style={isEventPassed ? undefined : { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Register Now
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MicrositeHome;