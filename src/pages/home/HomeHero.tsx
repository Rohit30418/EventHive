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
  <section className="overflow-hidden bg-[var(--eh-bg)] px-4 pb-14 pt-8 text-[var(--eh-text)] sm:px-6 sm:pb-18 sm:pt-11 lg:pb-24 lg:pt-14">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)] sm:text-xs">
          <span className="h-px w-8 bg-[var(--eh-primary)] sm:w-10" />
          Event management, simplified
        </div>

        <h1 className="mx-auto mt-5 max-w-3xl font-['Manrope',sans-serif] text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.012em] text-[var(--eh-text)] sm:text-[3.8rem] sm:leading-[1.01] lg:mx-0 lg:text-[4.7rem] xl:text-[5.2rem]">
          <span className="block">Create Events</span>
          <span className="block">People Remember.</span>
          <span className="mt-1 block text-[var(--eh-primary)]">Manage Them with Ease.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[15px] font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-lg sm:leading-8 lg:mx-0">
          From event creation and public microsites to attendee registrations and
          organizer workflows, EventHive keeps the entire journey in one place.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <Link
            to="/Events"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--eh-primary)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white shadow-[0_14px_30px_rgba(239,111,48,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[var(--eh-primary-hover)] sm:w-auto"
          >
            Discover Events
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/OrganizerRegistration"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--eh-text)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
          >
            Create an Event
          </Link>
        </div>

        <div className="mx-auto mt-9 grid max-w-2xl grid-cols-2 border-y border-[var(--eh-border)] sm:grid-cols-4 lg:mx-0">
          {benefits.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className={`flex min-h-[88px] items-center gap-3 px-2.5 py-4 text-left sm:min-h-[92px] sm:flex-col sm:items-start sm:justify-center sm:px-4 ${
                index < benefits.length - 1 ? "sm:border-r sm:border-[var(--eh-border)]" : ""
              }`}
            >
              <Icon size={17} className="shrink-0 text-[var(--eh-primary)]" />
              <span className="text-xs font-bold leading-5 tracking-[0.006em] text-[var(--eh-muted-strong)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="mx-auto w-full max-w-[735px]"
      >
        <div className="rounded-[1.55rem] bg-[var(--eh-text)] p-2.5 shadow-[0_30px_75px_rgba(30,28,27,0.17)] sm:rounded-[1.9rem] sm:p-3.5">
          <div className="overflow-hidden rounded-[1.15rem] bg-white sm:rounded-[1.45rem]">
            <div className="flex items-center justify-between border-b border-[var(--eh-border)] bg-[var(--eh-bg)] px-3 py-3 sm:px-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--eh-primary)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--eh-accent)]" />
                <span className="h-2 w-2 rounded-full bg-[#d9d5d1]" />
              </div>
              <span className="font-['Manrope',sans-serif] text-[10px] font-extrabold tracking-[0.015em] text-[var(--eh-text)] sm:text-xs">
                EventHive
              </span>
              <span className="hidden rounded-full border border-[var(--eh-border)] bg-white px-3 py-1 text-[10px] font-bold tracking-[0.02em] text-[var(--eh-muted)] sm:block">
                Live event page
              </span>
            </div>

            <div className="grid gap-3 bg-[#fffdfb] p-3 sm:grid-cols-[1.02fr_0.98fr] sm:gap-4 sm:p-5 lg:p-6">
              <div className="flex min-h-[300px] flex-col justify-between rounded-[1.15rem] border border-[var(--eh-border)] bg-[var(--eh-bg)] p-5 sm:min-h-[360px] sm:p-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--eh-primary-100)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[var(--eh-primary-700)]">
                    <Sparkles size={12} /> Featured event
                  </span>
                  <h2 className="mt-5 font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.05] tracking-[-0.008em] text-[var(--eh-text)] sm:text-4xl">
                    {heroEvent?.EventName || "Design & Product Summit"}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm font-medium leading-6 tracking-[0.006em] text-[var(--eh-muted)]">
                    {heroEvent?.BannerTagLine ||
                      heroEvent?.ShortDesc ||
                      "A focused event experience built for discovery, registration and meaningful participation."}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.005em] text-[var(--eh-muted-strong)]">
                    <CalendarDays size={15} className="text-[var(--eh-primary)]" />
                    {formatDate(heroEvent?.eventDate)}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.005em] text-[var(--eh-muted-strong)]">
                    <MapPin size={15} className="text-[var(--eh-primary)]" />
                    <span className="truncate">{heroEvent?.location || "New Delhi, India"}</span>
                  </p>
                </div>
              </div>

              <div className="relative min-h-[290px] overflow-hidden rounded-[1.15rem] bg-[var(--eh-primary-100)] sm:min-h-[360px]">
                <img
                  src={heroEvent?.banner || "/hero.png"}
                  alt={heroEvent?.EventName || "Event preview"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/80 via-[#1e1c1b]/10 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(30,28,27,0.12)] sm:inset-x-4 sm:bottom-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--eh-primary)]">
                    Event microsite
                  </p>
                  <p className="mt-1 font-['Manrope',sans-serif] text-sm font-extrabold tracking-[0.005em] text-[var(--eh-text)] sm:text-base">
                    Discover. Register. Attend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--eh-border)] bg-white p-4 shadow-[var(--eh-soft-shadow)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--eh-primary-100)] text-[var(--eh-primary)]">
              <Users size={18} />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9a938d]">
                Attendee registrations
              </p>
              <p className="font-['Manrope',sans-serif] text-base font-extrabold tracking-[0.005em] text-[var(--eh-text)] sm:text-lg">
                Manage event registrations
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--eh-primary)] px-5 py-4 text-white sm:min-w-[200px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/70">
              Organizer dashboard
            </p>
            <p className="mt-1 font-['Manrope',sans-serif] text-base font-extrabold tracking-[0.005em]">
              Create. Publish. Manage.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomeHero;