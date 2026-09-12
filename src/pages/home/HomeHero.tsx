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
  <section className="relative overflow-hidden bg-[var(--eh-bg)] px-4 pb-16 pt-14 text-[var(--eh-text)] sm:px-6 sm:pb-20 sm:pt-18 lg:pb-28 lg:pt-24">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(239,111,48,0.12),transparent_58%)]" />
    <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(30,28,27,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,28,27,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

    <div className="relative mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <div className="inline-flex items-center rounded-full border border-[var(--eh-border)] bg-white/85 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)] shadow-[0_8px_24px_rgba(30,28,27,0.04)] backdrop-blur-sm sm:text-xs">
          Event management, simplified
        </div>

        <h1 className="mt-7 font-['Manrope',sans-serif] text-[2.8rem] font-extrabold leading-[1.03] tracking-[-0.012em] sm:text-[4.5rem] lg:text-[5.8rem]">
          Plan better events.
          <span className="block text-[var(--eh-primary)]">Run them effortlessly.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-lg sm:leading-8">
          Create event microsites, collect registrations and manage organizer workflows from one clean platform built around the way events actually run.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/OrganizerRegistration"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--eh-text)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--eh-primary)] sm:w-auto"
          >
            Create an Event
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/Events"
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--eh-border-strong)] bg-white px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-[var(--eh-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--eh-primary)] hover:text-[var(--eh-primary)] sm:w-auto"
          >
            Explore Events
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="mx-auto mt-12 w-full max-w-6xl sm:mt-16 lg:mt-20"
      >
        <div className="rounded-[2rem] border border-[var(--eh-border)] bg-white/75 p-2 shadow-[0_30px_90px_rgba(30,28,27,0.10)] backdrop-blur-sm sm:p-3 lg:rounded-[2.5rem] lg:p-4">
          <div className="overflow-hidden rounded-[1.55rem] border border-[var(--eh-border)] bg-white lg:rounded-[2rem]">
            <div className="flex items-center justify-between border-b border-[var(--eh-border)] bg-[var(--eh-bg)] px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--eh-primary)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--eh-accent)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d7d2ce]" />
              </div>

              <span className="font-['Manrope',sans-serif] text-[11px] font-extrabold tracking-[0.02em] sm:text-xs">
                EventHive
              </span>

              <span className="hidden rounded-full border border-[var(--eh-border)] bg-white px-3 py-1 text-[10px] font-bold tracking-[0.03em] text-[var(--eh-muted)] sm:inline-flex">
                Live event preview
              </span>
            </div>

            <div className="grid min-h-[520px] lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-[var(--eh-primary-100)] sm:min-h-[440px] lg:min-h-[520px]">
                <img
                  src={heroEvent?.banner || "/hero.png"}
                  alt={heroEvent?.EventName || "Event preview"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/55 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-[var(--eh-text)] shadow-sm backdrop-blur-sm sm:bottom-7 sm:left-7">
                  Public event microsite
                </div>
              </div>

              <div className="flex flex-col justify-between bg-[#fffdfb] p-6 sm:p-8 lg:p-10">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)]">
                    Featured event
                  </span>

                  <h2 className="mt-4 font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.008em] text-[var(--eh-text)] sm:text-4xl">
                    {heroEvent?.EventName || "Design & Product Summit"}
                  </h2>

                  <p className="mt-4 text-sm font-medium leading-7 tracking-[0.005em] text-[var(--eh-muted)] sm:text-base">
                    {heroEvent?.BannerTagLine ||
                      heroEvent?.ShortDesc ||
                      "A polished event experience designed for discovery, registration and meaningful participation."}
                  </p>
                </div>

                <div className="mt-8 space-y-4 border-t border-[var(--eh-border)] pt-6">
                  <div className="flex items-center gap-3 text-sm font-bold text-[var(--eh-muted-strong)]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--eh-primary-100)] text-[var(--eh-primary)]">
                      <CalendarDays size={17} />
                    </span>
                    {formatDate(heroEvent?.eventDate)}
                  </div>

                  <div className="flex items-center gap-3 text-sm font-bold text-[var(--eh-muted-strong)]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--eh-primary-100)] text-[var(--eh-primary)]">
                      <MapPin size={17} />
                    </span>
                    {heroEvent?.location || "New Delhi, India"}
                  </div>

                  <Link
                    to="/Events"
                    className="group mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--eh-text)] hover:text-[var(--eh-primary)]"
                  >
                    View event experience
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
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
