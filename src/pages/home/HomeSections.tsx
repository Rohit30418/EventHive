import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Sparkles,
  Ticket,
} from "lucide-react";
import EventCard from "../../components/EventCard";
import { ErrorState } from "../../common/StateViews";
import type { EventType } from "../../Types/eventType";
import { audiences, faqs, features, testimonials, workflow } from "./homeData";

interface HomeSectionsProps {
  featuredEvents: EventType[];
  isLoading: boolean;
  error?: string | null;
}

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => (
  <>
    {/* ABOUT / EDITORIAL INTRO */}
    <section className="bg-white px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#77736f]">
            <span>What is</span>
            <span className="font-['Manrope',sans-serif] text-xl font-extrabold tracking-[-0.04em] text-[#1e1c1b]">
              Event<span className="text-[#ef6f30]">Hive</span>?
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-0 w-0 border-b-[5px] border-r-[8px] border-t-[5px] border-b-transparent border-r-[#ef6f30] border-t-transparent" />
            <span className="h-px w-56 bg-[#ef6f30]" />
            <span className="h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-[#ef6f30] border-t-transparent" />
          </div>
        </div>

        <h2 className="mt-9 max-w-6xl font-['Manrope',sans-serif] text-3xl font-semibold leading-[1.3] tracking-[-0.035em] text-[#77736f] sm:text-4xl lg:text-[3.25rem] lg:leading-[1.25]">
          <span className="font-extrabold text-[#ef6f30]">EventHive</span>{" "}
          is a multi-role event management platform that brings planning,
          publishing and attendee registration into a single focused
          experience — helping organizers create meaningful events without a
          complicated workflow.
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="relative border-l border-[#ef6f30]/45 pl-6">
            {[
              ["Platform", "Event management"],
              ["Experience", "Organizer · Admin · Attendee"],
              ["Focus", "Discovery · Registration"],
            ].map(([label, value]) => (
              <div key={label} className="relative pb-7 last:pb-0">
                <span className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full bg-[#ef6f30]" />
                <p className="text-sm font-medium text-[#aaa19a]">{label}</p>
                <p className="mt-1 font-['Manrope',sans-serif] text-lg font-bold text-[#302c29]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="max-w-3xl text-lg leading-8 text-[#77736f]">
              From public event discovery to organizer dashboards and
              registration management, EventHive keeps each part of the event
              journey connected while giving every role a clear workspace.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {["Event microsites", "Organizer dashboard", "Registration flow", "RBAC"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#f0d8ca] bg-[#fff8f3] px-5 py-2.5 text-sm font-bold text-[#4d4844]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" className="bg-[#fffaf6] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">
              <Sparkles size={14} /> Platform capabilities
            </div>
            <h2 className="mt-5 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
              Everything your event workflow needs, without the clutter.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#77736f] lg:justify-self-end">
            A calmer visual hierarchy, reusable workflows and focused role-based
            experiences help organizers move from event setup to attendee data
            without jumping between disconnected tools.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-[#1e1c1b] p-7 text-white lg:col-span-7 lg:p-9"
          >
            <div className="relative z-10 max-w-lg">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-[#ffd7c2]">
                One connected workspace
              </span>
              <h3 className="mt-5 font-['Manrope',sans-serif] text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
                Manage events, registrations and content from one dashboard.
              </h3>
              <p className="mt-4 max-w-md leading-7 text-white/60">
                Role-aware tools keep organizers focused on their own events
                while Super Admin retains platform-wide visibility.
              </p>
            </div>

            <div className="relative z-10 mt-10 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Organizer dashboard
                  </p>
                  <p className="mt-1 font-['Manrope',sans-serif] font-bold">
                    Event operations
                  </p>
                </div>
                <span className="rounded-full bg-[#ef6f30] px-3 py-1 text-[10px] font-extrabold">
                  Live
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["Events", "Registrations", "Microsites"].map((item, index) => (
                  <div key={item} className="rounded-2xl bg-white/[0.07] p-4">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0
                          ? "w-12 bg-[#ef6f30]"
                          : index === 1
                          ? "w-16 bg-[#f6bd8d]"
                          : "w-10 bg-white/40"
                      }`}
                    />
                    <p className="mt-6 text-xs font-bold text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-20 -right-14 h-60 w-60 rounded-full border-[36px] border-[#ef6f30]/20" />
          </motion.article>

          {features.slice(0, 2).map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[2rem] border border-[#eee3db] bg-white p-7 lg:col-span-5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff0e6] text-[#ef6f30]">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-['Manrope',sans-serif] text-2xl font-extrabold tracking-[-0.035em] text-[#1e1c1b]">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-[#77736f]">{feature.desc}</p>
            </motion.article>
          ))}

          {features.slice(2).map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-[1.7rem] border border-[#eee3db] bg-white p-6 sm:col-span-1 lg:col-span-3"
            >
              <div className="flex items-center gap-3 text-[#ef6f30]">
                {feature.icon}
                <span className="h-px flex-1 bg-[#f2ded2]" />
              </div>
              <h3 className="mt-6 font-['Manrope',sans-serif] text-lg font-extrabold text-[#1e1c1b]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#77736f]">{feature.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* AUDIENCE */}
    <section className="bg-[#1e1c1b] px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#f6a06f]">
              <Globe2 size={14} /> Built for every role
            </span>
            <h2 className="mt-5 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl">
              One platform. Different experiences. Same event data.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {audiences.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-white/15 pt-6"
              >
                <div className="text-[#ef6f30]">{item.icon}</div>
                <h3 className="mt-7 font-['Manrope',sans-serif] text-xl font-extrabold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="bg-white px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">
            How it works
          </p>
          <h2 className="mt-5 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
            From event idea to attendee registration in four clear steps.
          </h2>
        </div>

        <div className="mt-14 border-t border-[#e9ddd4]">
          {workflow.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-5 border-b border-[#e9ddd4] py-7 sm:grid-cols-[100px_0.7fr_1fr] sm:items-center"
            >
              <span className="font-['Manrope',sans-serif] text-4xl font-extrabold text-[#f2c9b3]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-['Manrope',sans-serif] text-xl font-extrabold text-[#1e1c1b] sm:text-2xl">
                {step.title}
              </h3>
              <p className="leading-7 text-[#77736f]">{step.desc}</p>
            </motion.article>
          ))}
        </div>

        <Link
          to="/OrganizerRegistration"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#1e1c1b] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#ef6f30]"
        >
          Start as Organizer
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>

    {/* EVENTS */}
    <section id="events" className="bg-[#fffaf6] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">
              Explore the platform
            </p>
            <h2 className="mt-4 font-['Manrope',sans-serif] text-4xl font-extrabold tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
              Upcoming events
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#77736f]">
              Discover published events and open their dedicated microsites for
              details, speakers and registration.
            </p>
          </div>

          <Link
            to="/Events"
            className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#1e1c1b] hover:text-[#ef6f30]"
          >
            View all events
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[430px] animate-pulse rounded-[1.8rem] border border-[#eee3db] bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <ErrorState title="Could not load featured events" description={error} />
        ) : featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#ef6f30]/35 bg-white p-10 text-center">
            <Ticket className="mx-auto mb-4 text-[#ef6f30]" size={42} />
            <h3 className="font-['Manrope',sans-serif] text-2xl font-extrabold text-[#1e1c1b]">
              No upcoming events yet
            </h3>
            <p className="mt-2 leading-7 text-[#77736f]">
              Events will appear here automatically once they are created and published.
            </p>
          </div>
        )}
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="bg-white px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.66fr_1.34fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef6f30]">
              Experience
            </p>
            <h2 className="mt-5 font-['Manrope',sans-serif] text-4xl font-extrabold tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
              Designed to feel clear from the first click.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-[1.8rem] bg-[#fff3eb] p-6"
              >
                <p className="text-[2.5rem] font-black leading-none text-[#ef6f30]/35">“</p>
                <p className="mt-2 text-sm font-medium leading-7 text-[#554f4b]">
                  {item.text}
                </p>
                <div className="mt-7 border-t border-[#ef6f30]/15 pt-4">
                  <p className="font-['Manrope',sans-serif] font-extrabold text-[#1e1c1b]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#9a938d]">{item.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section id="faq" className="bg-[#fffaf6] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <span className="inline-flex rounded-full border border-[#f0d8ca] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ef6f30]">
            FAQ
          </span>
          <h2 className="mt-5 font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-[#1e1c1b] sm:text-5xl">
            A few things to know before you start.
          </h2>
        </div>

        <div className="border-t border-[#e9ddd4]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-[#e9ddd4] py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-['Manrope',sans-serif] text-lg font-bold text-[#1e1c1b]">
                {faq.q}
                <ChevronDown
                  className="shrink-0 text-[#ef6f30] transition-transform group-open:rotate-180"
                  size={20}
                />
              </summary>
              <p className="max-w-2xl pt-4 leading-7 text-[#77736f]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="bg-white px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#ef6f30] p-8 text-white sm:p-12 lg:p-16">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">
              <CheckCircle2 size={15} /> Ready when you are
            </div>
            <h2 className="mt-5 max-w-4xl font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Create an event experience that feels as good as the event itself.
            </h2>
          </div>

          <Link
            to="/OrganizerRegistration"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1e1c1b] px-7 py-4 text-sm font-extrabold text-white hover:bg-white hover:text-[#1e1c1b]"
          >
            Create Event
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default HomeSections;
