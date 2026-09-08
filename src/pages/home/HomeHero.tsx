import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { EventType } from "../../Types/eventType";

interface HomeHeroProps {
  heroEvent?: EventType;
}

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

const benefits = [
  { icon: CalendarCheck, label: "Create event pages" },
  { icon: Users, label: "Manage registrations" },
  { icon: BarChart3, label: "Track event activity" },
  { icon: ShieldCheck, label: "Role-based access" },
];

const HomeHero = ({ heroEvent }: HomeHeroProps) => (
  <section className="relative overflow-hidden bg-[#fffaf6] px-4 pb-16 pt-10 text-[#1e1c1b] sm:px-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
    <div className="pointer-events-none absolute left-[-12rem] top-20 h-72 w-72 rounded-full bg-[#fad2be]/45 blur-3xl" />
    <div className="pointer-events-none absolute right-[-10rem] top-0 h-80 w-80 rounded-full bg-[#ffe4d3]/70 blur-3xl" />

    <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">
          <span className="h-px w-10 bg-[#ef6f30]" />
          Event management, simplified
        </div>

        <h1 className="mt-6 max-w-3xl font-['Manrope',sans-serif] text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#1e1c1b] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
          Create events people remember.
          <span className="mt-2 block text-[#ef6f30]">Manage them with ease.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-8 text-[#77736f] sm:text-lg">
          EventHive brings event creation, public microsites, attendee
          registrations and organizer workflows into one focused platform.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/Events"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ef6f30] px-7 py-4 text-sm font-extrabold text-white shadow-[0_16px_36px_rgba(239,111,48,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#dc5f23]"
          >
            Explore Events
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/OrganizerRegistration"
            className="inline-flex items-center justify-center rounded-full bg-[#1e1c1b] px-7 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#33302e]"
          >
            Create an Event
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
          {benefits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-[92px] flex-col justify-between rounded-2xl border border-[#eee3db] bg-white/75 p-4"
            >
              <Icon size={18} className="text-[#ef6f30]" />
              <span className="mt-5 text-xs font-bold leading-5 text-[#625d59]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="relative mx-auto w-full max-w-[680px] lg:mx-0"
      >
        <div className="relative min-h-[560px] sm:min-h-[620px]">
          <div className="absolute left-1/2 top-6 w-[94%] -translate-x-1/2 rotate-[-2deg] rounded-[2rem] bg-[#1e1c1b] p-3 shadow-[0_32px_80px_rgba(30,28,27,0.18)] sm:w-[88%] sm:p-4">
            <div className="overflow-hidden rounded-[1.4rem] bg-[#fffaf6]">
              <div className="flex items-center justify-between border-b border-[#eadfd7] px-4 py-3 sm:px-5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef6f30]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f6bd8d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9d5d1]" />
                </div>
                <span className="font-['Manrope',sans-serif] text-xs font-extrabold text-[#1e1c1b]">
                  EventHive
                </span>
                <span className="rounded-full border border-[#eadfd7] bg-white px-3 py-1 text-[10px] font-bold text-[#77736f]">
                  Live preview
                </span>
              </div>

              <div className="grid gap-5 p-4 sm:grid-cols-[1fr_0.9fr] sm:p-6">
                <div className="flex flex-col justify-between rounded-[1.5rem] bg-white p-5 sm:min-h-[340px]">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e6] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#ef6f30]">
                      <Sparkles size={12} /> Featured event
                    </span>
                    <h2 className="mt-5 font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.02] tracking-[-0.045em] text-[#1e1c1b] sm:text-4xl">
                      {heroEvent?.EventName || "Design & Product Summit"}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#77736f]">
                      {heroEvent?.BannerTagLine ||
                        heroEvent?.ShortDesc ||
                        "A polished event experience built for discovery, registration and meaningful participation."}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <p className="flex items-center gap-2 text-xs font-bold text-[#625d59]">
                      <CalendarDays size={15} className="text-[#ef6f30]" />
                      {formatDate(heroEvent?.eventDate)}
                    </p>
                    <p className="flex items-center gap-2 text-xs font-bold text-[#625d59]">
                      <MapPin size={15} className="text-[#ef6f30]" />
                      {heroEvent?.location || "New Delhi, India"}
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] bg-[#f7e5da] sm:min-h-[340px]">
                  <img
                    src={heroEvent?.banner || "/hero.png"}
                    alt={heroEvent?.EventName || "Event preview"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/90 p-4 backdrop-blur-md">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#ef6f30]">
                      Public microsite
                    </p>
                    <p className="mt-1 font-['Manrope',sans-serif] text-sm font-extrabold text-[#1e1c1b]">
                      Discover. Register. Attend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-2 z-20 w-[210px] rounded-[1.4rem] border border-[#eadfd7] bg-white p-4 shadow-[0_20px_50px_rgba(30,28,27,0.12)] sm:left-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fff0e6] text-[#ef6f30]">
                <Users size={18} />
              </span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#9a938d]">
                  Registrations
                </p>
                <p className="font-['Manrope',sans-serif] text-xl font-extrabold text-[#1e1c1b]">
                  Live tracking
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-2 z-30 w-[175px] rounded-[2rem] border-[7px] border-[#1e1c1b] bg-[#fffaf6] p-3 shadow-[0_24px_60px_rgba(30,28,27,0.18)] sm:right-3 sm:w-[195px]"
          >
            <div className="h-2 w-14 rounded-full bg-[#1e1c1b]" />
            <div className="mt-4 rounded-[1.3rem] bg-[#ef6f30] p-4 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/75">
                Event app
              </p>
              <p className="mt-2 font-['Manrope',sans-serif] text-xl font-extrabold leading-tight">
                Discover nearby events
              </p>
              <div className="mt-5 rounded-xl bg-white/15 p-3 text-xs font-bold">
                Browse • Register • Join
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomeHero;
