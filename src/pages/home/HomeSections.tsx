import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";
import EventCard from "../../components/EventCard";
import { ErrorState } from "../../common/StateViews";
import type { EventType } from "../../Types/eventType";
import { audiences, faqs, features, workflow } from "./homeData";

interface HomeSectionsProps {
  featuredEvents: EventType[];
  isLoading: boolean;
  error?: string | null;
}

const overviewCards = [
  {
    icon: LayoutDashboard,
    title: "Organizer workspace",
    text: "Create events, manage content and keep registrations organized from one focused dashboard.",
  },
  {
    icon: Ticket,
    title: "Public event journeys",
    text: "Give every event a clean microsite where attendees can discover details and register easily.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based control",
    text: "Keep organizer and Super Admin experiences clearly separated with protected routes and approvals.",
  },
];

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => (
  <>
    {/* ABOUT */}
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          <div className="rounded-[1.4rem] border border-[var(--eh-border)] bg-white p-6 sm:p-8 lg:p-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)]">
              About EventHive
            </p>
            <h2 className="mt-4 max-w-xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-[var(--eh-text)] sm:text-4xl lg:text-[2.85rem]">
              A multi-role platform built to make event creation and registration feel simple.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-base sm:leading-8">
              EventHive connects organizers, attendees and Super Admins through one
              clear workflow. Organizers create events, attendees register through
              public microsites, and admins manage access and platform activity.
            </p>
            <Link
              to="/Events"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--eh-text)] px-6 py-3.5 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:bg-[var(--eh-primary)]"
            >
              Explore EventHive
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-3">
            {overviewCards.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid gap-4 rounded-[1.35rem] bg-[var(--eh-text)] p-5 text-white sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--eh-primary)] text-white">
                  <Icon size={19} />
                </div>
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-lg font-extrabold tracking-[0.003em] sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm font-medium leading-6 tracking-[0.006em] text-white/55">
                    {text}
                  </p>
                </div>
                <span className="hidden h-9 w-9 place-items-center rounded-full border border-white/15 text-[var(--eh-accent)] sm:grid">
                  <ArrowRight size={15} />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" className="bg-[var(--eh-bg)] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)]">
              Everything needed
            </p>
            <h2 className="mt-4 max-w-2xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-[var(--eh-text)] sm:text-4xl lg:text-5xl">
              Everything needed to move an event from idea to registration.
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-base sm:leading-8 lg:justify-self-end">
            The public experience stays simple while the dashboard handles the
            operational work behind each event.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.04 }}
              className="min-h-[190px] rounded-[1.25rem] border border-[var(--eh-border)] bg-white p-5 shadow-[var(--eh-soft-shadow)] sm:p-6"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--eh-primary-100)] text-[var(--eh-primary)]">
                {feature.icon}
              </div>
              <h3 className="mt-5 font-['Manrope',sans-serif] text-lg font-extrabold tracking-[0.003em] text-[var(--eh-text)] sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-6 tracking-[0.006em] text-[var(--eh-muted)]">
                {feature.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* ROLE EXPERIENCES */}
    <section className="bg-[var(--eh-text)] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-accent)]">
              <Globe2 size={14} /> Role experiences
            </div>
            <h2 className="mt-4 max-w-lg font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] sm:text-4xl lg:text-5xl">
              One product, three focused experiences.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] font-medium leading-7 tracking-[0.006em] text-white/50 sm:text-base">
              Each role gets only what it needs, so the product stays focused and easy to understand.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {audiences.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.25rem] border border-white/8 bg-white/[0.055] p-5 sm:p-6"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--eh-primary)] text-white">
                  {item.icon}
                </div>
                <h3 className="mt-5 font-['Manrope',sans-serif] text-lg font-extrabold tracking-[0.004em] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 tracking-[0.006em] text-white/50">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* WORKFLOW */}
    <section id="how-it-works" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)]">
            Workflow
          </p>
          <h2 className="mt-4 max-w-xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-[var(--eh-text)] sm:text-4xl lg:text-5xl">
            A clear event workflow from setup to attendee management.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-base">
            Create the event, publish the microsite, collect registrations and manage everything from the dashboard.
          </p>
          <Link
            to="/OrganizerRegistration"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--eh-text)] px-6 py-3.5 text-sm font-extrabold tracking-[0.01em] text-white hover:bg-[var(--eh-primary)]"
          >
            Create your event
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="divide-y divide-[var(--eh-border)] border-y border-[var(--eh-border)]">
          {workflow.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="grid gap-4 py-7 sm:grid-cols-[72px_1fr] sm:py-8"
            >
              <div className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-normal text-[var(--eh-primary)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-['Manrope',sans-serif] text-xl font-extrabold tracking-[0.003em] text-[var(--eh-text)] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-base">
                  {step.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* EVENTS */}
    <section id="events" className="bg-[var(--eh-bg)] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)]">
              Upcoming events
            </p>
            <h2 className="mt-4 max-w-2xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-[var(--eh-text)] sm:text-4xl lg:text-5xl">
              Discover what is happening next.
            </h2>
          </div>
          <Link
            to="/Events"
            className="group inline-flex w-fit items-center gap-2 text-sm font-extrabold tracking-[0.01em] text-[var(--eh-text)] hover:text-[var(--eh-primary)]"
          >
            View all events
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-9">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[420px] animate-pulse rounded-[1.3rem] border border-[var(--eh-border)] bg-white" />
              ))}
            </div>
          ) : error ? (
            <ErrorState title="Could not load featured events" description={error} />
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.4rem] border border-dashed border-[var(--eh-border-strong)] bg-white p-8 text-center sm:p-12">
              <Ticket className="mx-auto text-[var(--eh-primary)]" size={40} />
              <h3 className="mt-4 font-['Manrope',sans-serif] text-2xl font-extrabold tracking-[0.003em] text-[var(--eh-text)]">
                No upcoming events yet
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-sm font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)]">
                Published upcoming events will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section id="faq" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-primary)]">FAQ</p>
          <h2 className="mt-4 max-w-lg font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-[var(--eh-text)] sm:text-4xl lg:text-5xl">
            Common questions about EventHive.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-base">
            Clear answers for organizers and attendees before they get started.
          </p>
        </div>

        <div className="divide-y divide-[var(--eh-border)] border-y border-[var(--eh-border)]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5 sm:py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-['Manrope',sans-serif] text-base font-extrabold tracking-[0.003em] text-[var(--eh-text)] sm:text-lg">
                {faq.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[var(--eh-primary)] transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 max-w-2xl pr-8 text-sm font-medium leading-7 tracking-[0.006em] text-[var(--eh-muted)] sm:text-base">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-[var(--eh-bg)] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.5rem] bg-[var(--eh-primary)] lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="p-7 text-white sm:p-10 lg:p-12">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/70">
            <Users size={14} /> Ready to launch
          </div>
          <h2 className="mt-4 max-w-3xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] sm:text-4xl lg:text-5xl">
            Ready to create and manage your next event?
          </h2>
        </div>
        <div className="border-t border-white/20 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
          <Link
            to="/OrganizerRegistration"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--eh-text)] px-7 py-4 text-sm font-extrabold tracking-[0.01em] text-white transition-all hover:bg-white hover:text-[var(--eh-text)] sm:w-auto"
          >
            Create an Event
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default HomeSections;