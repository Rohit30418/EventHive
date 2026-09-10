import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
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

const productPoints = [
  "Role-based organizer and Super Admin experiences",
  "Dynamic event microsites with event-specific content",
  "Public attendee registration without account friction",
  "Event and registration management from one dashboard",
];

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => (
  <>
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#77736f]">
            <span>What is</span>
            <span className="font-['Manrope',sans-serif] text-xl font-extrabold tracking-[-0.04em] text-[#1e1c1b]">
              Event<span className="text-[#ef6f30]">Hive</span>?
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="h-px w-16 bg-[#ef6f30] sm:w-24" />
            <span className="h-2.5 w-2.5 rotate-45 border-r border-t border-[#ef6f30]" />
          </div>

          <h2 className="mt-7 max-w-5xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#1e1c1b] sm:text-5xl lg:text-6xl">
            EventHive is a multi-role event platform built to make event creation,
            discovery and registration feel simple.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="border-l border-[#ef6f30]/35 pl-5 sm:pl-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#a29a94]">Platform focus</p>
            <p className="mt-3 font-['Manrope',sans-serif] text-2xl font-extrabold tracking-[-0.035em] text-[#1e1c1b]">
              One connected workflow for organizers, attendees and admins.
            </p>
          </div>

          <div>
            <p className="max-w-3xl text-base leading-8 text-[#77736f] sm:text-lg">
              Organizers can create events and manage registrations, attendees can
              discover events and register through public microsites, while Super
              Admins manage organizer access and platform activity.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {productPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-[#eee3db] bg-[#fffaf6] p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#ef6f30]" />
                  <span className="text-sm font-semibold leading-6 text-[#625d59]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="bg-[#fffaf6] px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">Platform capabilities</span>
            <h2 className="mt-4 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
              Everything needed to move an event from idea to registration.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#77736f] lg:justify-self-end lg:text-lg">
            The public experience stays simple, while the dashboard handles the
            operational work behind each event.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.04 }}
              className={`group min-h-[230px] rounded-[1.6rem] border p-6 transition-all sm:p-7 ${
                index === 0
                  ? "border-[#ef6f30] bg-[#ef6f30] text-white sm:col-span-2 lg:col-span-1"
                  : "border-[#eadfd7] bg-white text-[#1e1c1b] hover:-translate-y-1 hover:border-[#ef6f30]/35"
              }`}
            >
              <div
                className={`grid h-11 w-11 place-items-center rounded-full ${
                  index === 0 ? "bg-white text-[#ef6f30]" : "bg-[#fff0e6] text-[#ef6f30]"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="mt-7 font-['Manrope',sans-serif] text-xl font-extrabold tracking-[-0.03em]">
                {feature.title}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${index === 0 ? "text-white/75" : "text-[#77736f]"}`}>
                {feature.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#1e1c1b] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f6a06f]">
              <Globe2 size={14} /> Built for every role
            </span>
            <h2 className="mt-5 max-w-xl font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl">
              One product, three focused experiences.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/55">
              EventHive keeps public discovery lightweight while giving organizers
              and admins the controls they need behind the scenes.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {audiences.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#ef6f30] text-white">
                  {item.icon}
                </div>
                <h3 className="mt-6 font-['Manrope',sans-serif] text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">How it works</span>
            <h2 className="mt-4 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
              A clear event workflow from setup to attendee management.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#77736f]">
              The same flow you can explain in an interview is visible in the product experience.
            </p>
            <Link
              to="/OrganizerRegistration"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#1e1c1b] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#ef6f30]"
            >
              Start as Organizer
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="divide-y divide-[#eee3db] border-y border-[#eee3db]">
            {workflow.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="grid gap-4 py-7 sm:grid-cols-[74px_1fr] sm:py-9"
              >
                <div className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-[-0.05em] text-[#ef6f30]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-2xl font-extrabold tracking-[-0.035em] text-[#1e1c1b]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#77736f] sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="events" className="bg-[#fffaf6] px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">Upcoming events</span>
            <h2 className="mt-4 max-w-2xl font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
              Discover what is happening next.
            </h2>
          </div>
          <Link
            to="/Events"
            className="group inline-flex w-fit items-center gap-2 text-sm font-extrabold text-[#1e1c1b] hover:text-[#ef6f30]"
          >
            View all events
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[430px] animate-pulse rounded-[1.6rem] border border-[#eee3db] bg-white" />
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
            <div className="rounded-[1.8rem] border border-dashed border-[#e4c9b8] bg-white p-8 text-center sm:p-12">
              <Ticket className="mx-auto text-[#ef6f30]" size={42} />
              <h3 className="mt-4 font-['Manrope',sans-serif] text-2xl font-extrabold text-[#1e1c1b]">
                No upcoming events yet
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-[#77736f]">
                Published upcoming events will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>

    <section id="faq" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">FAQ</span>
          <h2 className="mt-4 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
            Common questions about EventHive.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-[#77736f]">
            Clear answers for organizers and attendees before they start using the platform.
          </p>
        </div>

        <div className="divide-y divide-[#eee3db] border-y border-[#eee3db]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6 sm:py-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-['Manrope',sans-serif] text-lg font-extrabold tracking-[-0.02em] text-[#1e1c1b] sm:text-xl">
                {faq.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#eadfd7] text-[#ef6f30]">
                  <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl pr-10 text-sm leading-7 text-[#77736f] sm:text-base">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#fffaf6] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#ef6f30] lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="p-7 text-white sm:p-10 lg:p-12">
          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white/70">
            <Users size={15} /> Organizer ready
          </div>
          <h2 className="mt-4 max-w-3xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl">
            Create your event, publish the microsite and start collecting registrations.
          </h2>
        </div>

        <div className="border-t border-white/20 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
          <Link
            to="/OrganizerRegistration"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1e1c1b] px-7 py-4 text-sm font-extrabold text-white transition-all hover:bg-white hover:text-[#1e1c1b] sm:w-auto"
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