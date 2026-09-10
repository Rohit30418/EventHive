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
  <section className="overflow-hidden bg-[#fffaf6] px-4 pb-14 pt-9 text-[#1e1c1b] sm:px-6 sm:pb-18 sm:pt-12 lg:pb-24 lg:pt-16">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ef6f30]">
          <span className="h-px w-8 bg-[#ef6f30] sm:w-10" />
          Event management, simplified
        </div>

        <h1 className="mx-auto mt-5 max-w-3xl font-['Manrope',sans-serif] text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#1e1c1b] sm:text-[3.8rem] lg:mx-0 lg:text-[4.7rem] xl:text-[5.25rem]">
          Create events people remember.
          <span className="mt-2 block text-[#ef6f30]">Manage them with ease.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#77736f] sm:text-lg sm:leading-8 lg:mx-0">
          EventHive brings event creation, public microsites, attendee registrations
          and organizer workflows into one focused platform.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <Link
            to="/Events"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ef6f30] px-7 py-4 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(239,111,48,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#dc5f23] sm:w-auto"
          >
            Explore Events
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/OrganizerRegistration"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#1e1c1b] px-7 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#33302e] sm:w-auto"
          >
            Create an Event
          </Link>
        </div>

        <div className="mx-auto mt-9 grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:mx-0">
          {benefits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-[86px] flex-col justify-between rounded-2xl border border-[#eee3db] bg-white p-3.5 text-left sm:min-h-[94px] sm:p-4"
            >
              <Icon size={18} className="text-[#ef6f30]" />
              <span className="mt-4 text-xs font-bold leading-5 text-[#625d59]">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="mx-auto w-full max-w-[720px]"
      >
        <div className="rounded-[1.7rem] bg-[#1e1c1b] p-2.5 shadow-[0_28px_70px_rgba(30,28,27,0.16)] sm:rounded-[2rem] sm:p-3.5">
          <div className="overflow-hidden rounded-[1.25rem] bg-white sm:rounded-[1.45rem]">
            <div className="flex items-center justify-between border-b border-[#eee3db] bg-[#fffaf6] px-3 py-3 sm:px-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ef6f30]" />
                <span className="h-2 w-2 rounded-full bg-[#f6bd8d]" />
                <span className="h-2 w-2 rounded-full bg-[#d9d5d1]" />
              </div>
              <span className="font-['Manrope',sans-serif] text-[11px] font-extrabold text-[#1e1c1b] sm:text-xs">
                EventHive preview
              </span>
              <span className="hidden rounded-full border border-[#eadfd7] bg-white px-3 py-1 text-[10px] font-bold text-[#77736f] sm:block">
                Public event page
              </span>
            </div>

            <div className="grid gap-4 p-3 sm:grid-cols-[1.03fr_0.97fr] sm:p-5 lg:gap-5 lg:p-6">
              <div className="flex min-h-[300px] flex-col justify-between rounded-[1.25rem] border border-[#f0e7e0] bg-[#fffaf6] p-5 sm:min-h-[360px] sm:p-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e6] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#ef6f30]">
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

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-xs font-bold text-[#625d59]">
                    <CalendarDays size={15} className="text-[#ef6f30]" />
                    {formatDate(heroEvent?.eventDate)}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-[#625d59]">
                    <MapPin size={15} className="text-[#ef6f30]" />
                    <span className="truncate">{heroEvent?.location || "New Delhi, India"}</span>
                  </p>
                </div>
              </div>

              <div className="relative min-h-[290px] overflow-hidden rounded-[1.25rem] bg-[#f7e5da] sm:min-h-[360px]">
                <img
                  src={heroEvent?.banner || "/hero.png"}
                  alt={heroEvent?.EventName || "Event preview"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/80 via-[#1e1c1b]/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(30,28,27,0.12)]">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#ef6f30]">
                    Public microsite
                  </p>
                  <p className="mt-1 font-['Manrope',sans-serif] text-sm font-extrabold text-[#1e1c1b] sm:text-base">
                    Discover. Register. Attend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
          <div className="flex items-center gap-3 rounded-2xl border border-[#eee3db] bg-white p-4 shadow-[0_10px_25px_rgba(30,28,27,0.06)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff0e6] text-[#ef6f30]">
              <Users size={18} />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#9a938d]">Registrations</p>
              <p className="font-['Manrope',sans-serif] text-base font-extrabold text-[#1e1c1b] sm:text-lg">Manage attendee data</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#ef6f30] px-5 py-4 text-white sm:min-w-[190px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/70">Organizer dashboard</p>
            <p className="mt-1 font-['Manrope',sans-serif] text-base font-extrabold">Create. Publish. Manage.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomeHero;