import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
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

const HomeHero = ({ heroEvent }: HomeHeroProps) => (
  <section className="overflow-hidden bg-[var(--eh-bg)] px-4 py-14 text-[var(--eh-text)] sm:px-6 sm:py-18 lg:py-24">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
      >
        <div className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.17em] text-[var(--eh-primary)] sm:text-xs">
          <span className="h-px w-8 bg-[var(--eh-primary)]" />
          Event management, simplified
        </div>

        <h1 className="mt-6 font-['Manrope',sans-serif] text-[2.75rem] font-extrabold leading-[1.03] tracking-[-0.01em] sm:text-[4rem] lg:text-[4.85rem] xl:text-[5.25rem]">
          Create memorable events.
          <span className="mt-2 block text-[var(--eh-primary)]">
            Manage everything with ease.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[15px] font-medium leading-7 tracking-[0.004em] text-[var(--eh-muted)] sm:text-lg sm:leading-8 lg:mx-0">
          Create event pages, collect registrations and manage organizer workflows
          from one focused platform.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <Link
            to="/Events"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--eh-primary)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--eh-primary-hover)] sm:w-auto"
          >
            Discover Events
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/OrganizerRegistration"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--eh-text)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
          >
            Create an Event
          </Link>
        </div>

        <p className="mt-6 text-xs font-semibold tracking-[0.025em] text-[var(--eh-muted)] sm:text-sm">
          Event microsites · Registrations · Organizer dashboard
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="mx-auto w-full max-w-[720px]"
      >
        <div className="rounded-[1.55rem] bg-[var(--eh-text)] p-2.5 shadow-[0_30px_70px_rgba(30,28,27,0.14)] sm:rounded-[1.9rem] sm:p-3.5">
          <div className="overflow-hidden rounded-[1.15rem] bg-white sm:rounded-[1.45rem]">
            <div className="flex items-center justify-between border-b border-[var(--eh-border)] bg-[var(--eh-bg)] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--eh-primary)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--eh-accent)]" />
                <span className="h-2 w-2 rounded-full bg-[#d9d5d1]" />
              </div>

              <span className="font-['Manrope',sans-serif] text-[10px] font-extrabold tracking-[0.02em] text-[var(--eh-text)] sm:text-xs">
                EventHive
              </span>

              <span className="hidden text-[10px] font-bold tracking-[0.02em] text-[var(--eh-muted)] sm:block">
                Live event page
              </span>
            </div>

            <div className="relative aspect-[4/3] min-h-[320px] bg-[var(--eh-primary-100)] sm:min-h-[420px]">
              <img
                src={heroEvent?.banner || "/hero.png"}
                alt={heroEvent?.EventName || "Event preview"}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/65 via-[#1e1c1b]/5 to-transparent" />

              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[var(--eh-primary)] shadow-sm sm:left-6 sm:top-6">
                Featured event
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-[1.15rem] bg-white p-5 shadow-[0_18px_40px_rgba(30,28,27,0.14)] sm:inset-x-6 sm:bottom-6 sm:p-6">
                <h2 className="font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.08] tracking-[-0.006em] text-[var(--eh-text)] sm:text-3xl">
                  {heroEvent?.EventName || "Design & Product Summit"}
                </h2>

                <div className="mt-4 flex flex-col gap-2 text-xs font-bold text-[var(--eh-muted-strong)] sm:flex-row sm:items-center sm:gap-5">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} className="text-[var(--eh-primary)]" />
                    {formatDate(heroEvent?.eventDate)}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin size={15} className="text-[var(--eh-primary)]" />
                    {heroEvent?.location || "New Delhi, India"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomeHero;
