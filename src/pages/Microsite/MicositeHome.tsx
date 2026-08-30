import { useEffect, useMemo, useState } from "react";
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
  const event = (data ?? {}) as any;

  const primaryColor = event.PrimaryColor || event.primaryColor || "#00A676";
  const secondaryColor =
    event.SecondaryColor || event.secondaryColor || "#FACC15";

  const eventDateStr = event.eventDate;
  const isEventPassed = eventDateStr
    ? new Date(eventDateStr).getTime() < new Date().getTime()
    : false;

  // 1. Hook for the cinematic image showcase slideshow index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. High-quality professional event imagery
  const heroImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-59a31e16e581?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    ],
    []
  );

  // Professional real user fallback portraits
  const fallbackPortraits = useMemo(
    () => [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=512&q=80", // Professional man
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=512&q=80", // Professional woman
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=512&q=80", // Corporate man
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=512&q=80", // Creative woman
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=512&q=80", // Tech man
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=512&q=80", // Tech woman
    ],
    []
  );

  // --- NEW: Dummy Speaker Data Fallback ---
  const dummySpeakers = useMemo(
    () => [
      {
        speakerName: "Alex Johnson",
        speakerDesignation: "Founder & CEO",
        speakerImage: fallbackPortraits[0],
      },
      {
        speakerName: "Sarah Chen",
        speakerDesignation: "Chief Product Officer",
        speakerImage: fallbackPortraits[1],
      },
      {
        speakerName: "Michael Brown",
        speakerDesignation: "Head of Growth",
        speakerImage: fallbackPortraits[2],
      },
      {
        speakerName: "Elena Rodriguez",
        speakerDesignation: "VP of Engineering",
        speakerImage: fallbackPortraits[3],
      },
    ],
    [fallbackPortraits]
  );

  // Determine which speakers to show
  const rawSpeakers = Array.isArray(event.speakers) ? event.speakers : [];
  const speakers = rawSpeakers.length > 0 ? rawSpeakers : dummySpeakers;

  // 3. Slideshow Interval (Runs hooks before early returns)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
      className="w-full overflow-x-hidden bg-[#FAFAFA] font-sans text-slate-900 antialiased"
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
      <section className="relative px-4 pb-16 pt-32 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerWrap}
              className="flex flex-col text-left"
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
                className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0f172a] sm:text-6xl lg:text-7xl"
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
                className="mt-2 text-4xl font-extrabold sm:text-5xl lg:text-5xl"
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
              <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Date
                    </p>
                    <p className="mt-0.5 font-bold text-slate-900">
                      {formatDate(event.eventDate)}
                    </p>
                  </div>
                </div>
                
                <div className="h-10 w-px bg-slate-200" />

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
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
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() =>
                    !isEventPassed &&
                    document
                      .getElementById("registration")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  disabled={isEventPassed}
                  className="group flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:opacity-70"
                  style={{ backgroundColor: primaryColor }}
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

                <button className="ml-2 flex items-center gap-3 text-sm font-bold text-slate-700 transition-opacity hover:opacity-80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Play size={16} className="ml-1" fill="currentColor" />
                  </div>
                  Watch Trailer
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Cinematic Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:w-full lg:max-w-none group"
            >
              {/* Aspect Ratio Container */}
              <div className="relative aspect-[4/3] lg:aspect-[12/10] overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl ring-1 ring-slate-900/5">
                
                {/* Images Layer */}
                {heroImages.map((src, idx) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={src}
                      alt="Event showcase"
                      className="h-full w-full object-cover"
                      style={{
                        transform: idx === currentImageIndex ? "scale(1.04)" : "scale(1)",
                        transitionProperty: "transform",
                        transitionTimingFunction: "linear",
                        transitionDuration: idx === currentImageIndex ? "5000ms" : "0ms", 
                      }}
                    />
                  </div>
                ))}

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent pointer-events-none" />

                {/* Top Right Info Chips */}
                <div className="absolute right-6 top-6 z-30 flex flex-col items-end gap-2 text-right">
                  <div className="rounded-full bg-slate-950/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md ring-1 ring-white/20">
                    {formatDate(event.eventDate)}
                  </div>
                  <div className="rounded-full bg-slate-950/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md ring-1 ring-white/20">
                    {event.location || "Delhi, India"}
                  </div>
                </div>

                {/* Bottom Left Minimal Text */}
                <div className="absolute bottom-10 left-8 right-8 z-30">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md sm:text-2xl">
                    {event.EventName || "STARTUP FOUNDERS BOOTCAMP"}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-xs font-semibold text-white/80 drop-shadow-md sm:text-sm">
                    {event.BannerTagLine || "Launch Your Vision. Scale Your Impact."}
                  </p>
                </div>

                {/* Hover Arrows (Desktop only usually) */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                  className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/30 text-white opacity-0 backdrop-blur-md transition-all hover:bg-slate-950/50 group-hover:opacity-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
                  className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/30 text-white opacity-0 backdrop-blur-md transition-all hover:bg-slate-950/50 group-hover:opacity-100"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Slideshow Indicators */}
                <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="bg-white px-4 py-16 sm:px-6 lg:py-24 border-t border-slate-100">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p
              className="mb-4 text-xs font-bold uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              The experience
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
              Why you should not miss this{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                event
              </span>
              .
            </h2>
            <p className="mt-6 whitespace-pre-line text-lg font-normal leading-relaxed text-slate-600">
              {event.AboutArea ||
                "We bring together the right audience, useful content and a memorable experience designed for professionals."}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div
                    className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <div
              className="absolute -inset-3 rounded-[2rem] opacity-20 blur-2xl"
              style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
            />
            <div className="relative overflow-hidden rounded-[2.2rem] bg-slate-950 p-5 text-white shadow-2xl">
              <div className="relative h-[320px] overflow-hidden rounded-[1.7rem] sm:h-[440px]">
                <img
                  src={event.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=80"}
                  alt="Event experience"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md"
                    style={{ backgroundColor: hexToRgba(primaryColor, 0.75) }}
                  >
                    <Play className="ml-1 fill-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Event highlights</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                    A premium event experience designed for attendees, speakers and organizers.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {agendaItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                      {item.time}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug text-white">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPEAKERS */}
      {speakers.length > 0 && (
        <section
          id="speakers"
          className="relative overflow-hidden bg-slate-50 px-4 py-16 sm:px-6 lg:py-24"
        >
          <div
            className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full opacity-10 blur-[120px]"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p
                className="mb-3 text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                Speaker lineup
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
                Meet the people on stage
              </h2>
              <p className="mt-4 text-lg font-normal leading-relaxed text-slate-600">
                Speaker cards use the actual event speaker data added by the organizer.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {speakers.map((sp: any, i: number) => {
                // Pick a realistic human portrait based on the index
                const fallbackImg = fallbackPortraits[i % fallbackPortraits.length];

                return (
                  <motion.div
                    key={`${sp.speakerName}-${i}`}
                    whileHover={{ y: -8 }}
                    className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-all hover:shadow-2xl"
                  >
                    <div className="relative h-72 overflow-hidden bg-slate-100">
                      <img
                        src={sp.speakerImage || fallbackImg}
                        alt={sp.speakerName}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null; // Prevent infinite fallback loops
                          e.currentTarget.src = fallbackImg; // Set to real user portrait on load failure
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="text-lg font-bold text-slate-900">
                        {sp.speakerName}
                      </h4>
                      <p
                        className="mt-1 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: primaryColor }}
                      >
                        {sp.speakerDesignation}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <VideoSection primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <PricingSection primaryColor={primaryColor} secondaryColor={secondaryColor} />

      {/* REGISTRATION */}
      <div id="registration" className="scroll-mt-24 bg-white px-4 py-14 sm:px-6">
        {isEventPassed ? (
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-200 text-slate-500">
              <Clock size={32} />
            </div>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Registration Closed
            </h2>
            <p className="text-lg font-normal leading-relaxed text-slate-600">
              The registration for this event has ended because the event date has passed.
            </p>
          </div>
        ) : (
          <EventRegistration primaryColor={primaryColor} />
        )}
      </div>

      {/* MAP */}
      <section className="relative h-[340px] w-full bg-slate-100 sm:h-[430px]">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            event.location || "New Delhi"
          )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          loading="lazy"
          title="Event Location"
          className="absolute inset-0 grayscale transition-all duration-500 hover:grayscale-0"
          style={{ border: 0 }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
          style={{ backgroundColor: primaryColor }}
        />
        <div className="absolute bottom-6 left-1/2 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 rounded-[1.7rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                <Navigation size={22} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Event Location
                </p>
                <p className="text-base font-bold text-slate-900">
                  {event.location || "Venue TBA"}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("registration")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              Register Now
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MicrositeHome;