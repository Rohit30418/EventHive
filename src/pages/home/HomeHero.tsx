import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Magnetic } from "./HomeMotion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CalendarCheck, CheckCircle2, QrCode, Star, Ticket } from "lucide-react";
import type { EventType } from "../../Types/eventType";

const formatDate = (value?: string) => {
  if (!value) return "Date TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

interface HomeHeroProps {
  heroEvent?: EventType;
}

const HomeHero = ({ heroEvent }: HomeHeroProps) => {
  const reducedMotion = useReducedMotion();
  const [phrase, setPhrase] = useState(0);
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const smoothX = useSpring(parallaxX, { stiffness: 110, damping: 25 });
  const smoothY = useSpring(parallaxY, { stiffness: 110, damping: 25 });
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setPhrase((i) => (i + 1) % 3), 3500);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  return (
<>
<section className="eh-mesh relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:pb-24 text-[#1F1C1A]">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(145deg,#FFF8F3_0%,#FFEBDD_54%,#FFF8F3_100%)]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />

      {/* OPTIMIZATION: Replaced x/y movement with cheap opacity pulsing */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 top-28 -z-10 h-80 w-80 rounded-full bg-orange-300 blur-[110px]"
      />

      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-amber-300 blur-[120px]"
      />

      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-300 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.94fr]">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 text-center lg:text-left"
        >
          {/* Note: It's okay to keep backdrop-blur here because this element doesn't move infinitely */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/85 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-orange-700 shadow-[0_12px_36px_rgba(79,70,229,0.09)] backdrop-blur-xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Premium event management SaaS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="font-display mx-auto mt-6 max-w-5xl text-4xl font-black leading-[1.05] text-[#1F1C1A] sm:text-6xl lg:mx-0 lg:text-7xl xl:text-7xl lg:leading-[0.94]"
          >
            Build events people want to be{" "}
            <span className="relative inline-block mt-2 min-h-[1em] sm:mt-0">
              <span className="bg-gradient-to-r from-[#F26B2A] via-[#E85D1E] to-[#B84614] bg-clip-text text-transparent">
                <AnimatePresence mode="wait"><motion.span key={phrase} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="inline-block">{["part of.", "talking about.", "remembering."][phrase]}</motion.span></AnimatePresence>
              </span>

              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="absolute -bottom-1 sm:-bottom-2 left-1 right-1 h-2 sm:h-3 origin-left rounded-full bg-amber-300/25"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg font-medium leading-7 sm:leading-8 text-slate-600 sm:text-xl lg:mx-0"
          >
            EventHive helps organizers launch beautiful event microsites, manage
            registrations and give attendees a smooth discovery experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="mt-8 sm:mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Magnetic><Link
              to="/Events"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F26B2A] px-7 py-4 text-sm font-black text-[#1F1C1A] shadow-[0_20px_48px_rgba(242,107,42,0.2)] transition-transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Browse Events
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link></Magnetic>

            <Link
              to="/OrganizerRegistration"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-800 shadow-[0_14px_38px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:border-orange-200 hover:text-orange-700 hover:shadow-[0_22px_55px_rgba(99,102,241,0.15)] w-full sm:w-auto"
            >
              Create Event
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.48 }}
            className="mt-8 sm:mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {[
              { value: "01", label: "Design an event" },
              { value: "02", label: "Share your page" },
              { value: "03", label: "Welcome guests" },
            ].map((item, idx) => (
              <div
                key={item.label}
                className={`rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm lg:text-left ${
                  idx === 2 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                  {item.value}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.58 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-500 lg:justify-start"
          >
            <div className="flex -space-x-3">
              {["RP", "AK", "MS", "+"].map((item) => (
                <span
                  key={item}
                  className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full border-[3px] border-white bg-gradient-to-br from-[#F26B2A] to-[#B84614] text-[10px] sm:text-xs font-black text-white shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-[#D45018]"><Star size={17} fill="currentColor" /> Event experiences, thoughtfully designed.</div>

            <span className="w-full text-center lg:w-auto lg:text-left">Craft unforgettable gatherings.</span>
          </motion.div>
        </motion.div>

        {/* Right Product Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          onMouseMove={(event) => { if (reducedMotion) return; const b = event.currentTarget.getBoundingClientRect(); parallaxX.set((event.clientX - b.left - b.width/2)*.025); parallaxY.set((event.clientY - b.top - b.height/2)*.025); }}
          onMouseLeave={() => { parallaxX.set(0); parallaxY.set(0); }}
          style={reducedMotion ? undefined : { x: smoothX, y: smoothY }}
          className="relative mx-auto mt-8 min-h-[580px] sm:min-h-[620px] w-full max-w-[600px] lg:mt-0 lg:mx-0"
        >
          {/* Floating registrations card */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 sm:-left-6 lg:left-2 top-0 sm:top-10 z-30 hidden rounded-3xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:block will-change-transform"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CalendarCheck size={20} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Registrations
                </p>
                <p className="text-xl font-black text-slate-950">12.8k</p>
              </div>
            </div>
          </motion.div>

          {/* Floating conversion card */}
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 sm:-right-6 lg:right-0 top-20 sm:top-28 z-30 hidden rounded-3xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:block will-change-transform"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-50 text-orange-600">
                <BarChart3 size={20} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Conversion
                </p>
                <p className="text-xl font-black text-slate-950">+38%</p>
              </div>
            </div>
          </motion.div>

          <motion.div animate={reducedMotion ? {} : {y:[0,-8,0]}} transition={{duration:5.3,repeat:Infinity}} className="absolute -left-1 bottom-4 z-30 flex w-[46%] -rotate-[8deg] items-center justify-between rounded-2xl border border-[#F26B2A]/20 bg-[#FFEBDD] p-3 shadow-xl sm:left-1 sm:bottom-10 sm:p-4"><div><Ticket className="text-[#C34B13]" size={20}/><p className="mt-2 text-xs font-black text-[#1F1C1A]">ADMIT ONE</p><p className="text-[9px] font-bold text-[#A53C11]">EVENT PASS</p></div><QrCode size={39} className="text-[#1F1C1A]"/></motion.div>
          <motion.div animate={reducedMotion ? {} : {y:[0,6,0]}} transition={{duration:4.6,repeat:Infinity}} className="absolute -right-1 bottom-2 z-30 flex items-center gap-2 rounded-xl bg-white p-3 text-[10px] font-bold text-[#1F1C1A] shadow-xl sm:bottom-12"><CheckCircle2 size={17} className="text-[#177750]"/> Registration confirmed</motion.div>
          {/* Main event preview card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-4 sm:top-8 z-10 w-[calc(100%-1rem)] sm:w-full sm:max-w-[480px] -translate-x-1/2 overflow-hidden rounded-[2rem] sm:rounded-[2.4rem] border border-slate-200/60 bg-white p-2 sm:p-4 shadow-[0_20px_80px_rgba(15,23,42,0.12)] sm:shadow-[0_35px_110px_rgba(15,23,42,0.16)] will-change-transform"
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-300" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-300" />
                </div>

                <span className="rounded-full bg-orange-50 px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.14em] text-orange-700">
                  Event Preview
                </span>
              </div>

              {/* Event visual */}
              <div className="relative m-2 sm:m-4 h-48 sm:h-72 overflow-hidden rounded-xl sm:rounded-[1.7rem] bg-gradient-to-br from-orange-600 via-orange-600 to-amber-500">
                {heroEvent?.banner && (
                  <img
                    src={heroEvent.banner}
                    alt={heroEvent.EventName}
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                <motion.div
                  animate={{ x: ["-35%", "135%"] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 w-24 sm:w-32 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent will-change-transform"
                />

                <div className="absolute left-3 sm:left-5 top-3 sm:top-5 rounded-full bg-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  Featured Event
                </div>

                <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5">
                  <h3 className="line-clamp-2 text-xl sm:text-3xl font-black leading-tight text-white">
                    {heroEvent?.EventName || "Your next unforgettable event"}
                  </h3>

                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-white/80">
                    {heroEvent
                      ? `${heroEvent.location || "Venue TBA"} • ${
                          typeof formatDate === "function" 
                            ? formatDate(heroEvent.eventDate) 
                            : "Date TBA"
                        }`
                      : "Built for meaningful moments"}
                  </p>
                </div>
              </div>

              {/* User POV info */}
              <div className="grid gap-2 sm:gap-3 px-3 sm:px-4 pb-3 sm:pb-4 grid-cols-1 sm:grid-cols-2">
                <div className="rounded-xl sm:rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    For Attendees
                  </p>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-black leading-tight sm:leading-5 text-slate-950">
                    Discover event details and register with confidence.
                  </p>
                </div>

                <div className="rounded-xl sm:rounded-2xl bg-orange-50 p-3 sm:p-4">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-orange-400">
                    For Organizers
                  </p>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-black leading-tight sm:leading-5 text-orange-950">
                    Launch branded pages and collect registrations.
                  </p>
                </div>
              </div>

              {/* CTA preview */}
              <div className="border-t border-slate-100 px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex flex-col gap-3 rounded-xl sm:rounded-[1.5rem] bg-slate-950 p-3 sm:p-4 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-amber-200">
                      Ready to attend?
                    </p>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-white/80">
                      Open event, view details and register.
                    </p>
                  </div>

                  <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-4 py-2 sm:py-2.5 text-xs font-black text-slate-950 transition-transform active:scale-95 cursor-pointer">
                    Register Now
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    <div className="overflow-hidden border-y border-[#1F1C1A]/10 bg-[#FFEBDD] py-5" aria-label="Create, register, manage, repeat"><div className="eh-home-marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl font-bold tracking-tight text-transparent sm:text-5xl" style={{ WebkitTextStroke: "1px #A53C11" }}>{Array.from({ length: 4 }).map((_, i) => <span key={i}>CREATE ✦ REGISTER ✦ MANAGE ✦ REPEAT ✦</span>)}</div></div>
</>
  );
};

export default HomeHero;
