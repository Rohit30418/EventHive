import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomeHero = () => (
  <section className="relative isolate overflow-hidden bg-[var(--eh-bg)] px-4 py-20 text-[var(--eh-text)] sm:px-6 sm:py-24 lg:py-32">
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(239,111,48,0.16),transparent_62%)]" />
    <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--eh-primary-100)] blur-3xl sm:h-96 sm:w-96" />

    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mx-auto max-w-5xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--eh-border)] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--eh-primary)] shadow-[0_8px_24px_rgba(30,28,27,0.04)] sm:text-xs">
        Event management, simplified
      </div>

      <h1 className="mx-auto mt-7 max-w-5xl font-['Manrope',sans-serif] text-[3rem] font-extrabold leading-[1.02] tracking-[-0.008em] sm:text-[4.8rem] lg:text-[6.6rem]">
        Build events people
        <span className="block text-[var(--eh-primary)]">want to be part of.</span>
      </h1>

      <p className="mx-auto mt-7 max-w-2xl text-[15px] font-medium leading-7 tracking-[0.004em] text-[var(--eh-muted)] sm:text-lg sm:leading-8">
        Create event microsites, collect registrations and manage organizer workflows from one focused EventHive experience.
      </p>

      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/OrganizerRegistration"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--eh-primary)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--eh-primary-hover)] sm:w-auto"
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

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold tracking-[0.02em] text-[var(--eh-muted)] sm:text-sm">
        <span>Event microsites</span>
        <span className="h-1 w-1 rounded-full bg-[var(--eh-primary)]" />
        <span>Attendee registrations</span>
        <span className="h-1 w-1 rounded-full bg-[var(--eh-primary)]" />
        <span>Organizer dashboard</span>
      </div>
    </motion.div>
  </section>
);

export default HomeHero;
