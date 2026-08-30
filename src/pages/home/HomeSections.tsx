import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Sparkles,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import EventCard from "../../components/EventCard";
import SectionHeader from "../../components/ui/SectionHeader";
import { ErrorState } from "../../common/StateViews";
import type { EventType } from "../../Types/eventType";
import { audiences, faqs, features, ratingCards, stats, testimonials, trustedBrands, workflow } from "./homeData";

interface HomeSectionsProps {
  featuredEvents: EventType[];
  isLoading: boolean;
  error?: string | null;
}

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => (
<>
      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-slate-400">
            Trusted by modern event teams and communities
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {trustedBrands.map((brand) => (
              <div
                key={brand}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-center text-sm font-black text-slate-500"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(99,102,241,0.12)]"
            >
              <strong className="block text-4xl font-black tracking-[-0.06em] text-slate-950">
                {stat.value}
              </strong>
              <span className="mt-3 block text-sm font-bold leading-6 text-slate-500">
                {stat.label}
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* RATINGS */}
      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {ratingCards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.8rem] border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/70 p-7 shadow-[0_18px_55px_rgba(99,102,241,0.08)]"
              >
                <div className="mb-5 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={17} fill="currentColor" />
                  ))}
                </div>

                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 shadow-sm">
              <Sparkles size={14} /> Platform advantages
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight  text-slate-950 sm:text-5xl lg:text-6xl">
              Everything feels clean, fast and premium.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Soft hierarchy, elegant whitespace and reusable cards make the
              product feel polished without becoming noisy.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-2 hover:border-indigo-200 hover:shadow-[0_28px_75px_rgba(99,102,241,0.14)]"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-700 transition-transform group-hover:scale-105">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-black tracking-tight text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              <Globe2 size={14} /> Built for every event journey
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight  sm:text-5xl">
              One platform experience for organizers, attendees and admins.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              The landing page now feels like a real SaaS website with clear
              value for every user type.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {audiences.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-cyan-200">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-black">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f7ff_100%)] px-4 py-20 sm:px-6 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="h-fit rounded-[2rem] border border-indigo-100 bg-white/85 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
              <BadgeCheck size={14} /> Simple flow
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight  text-slate-950 sm:text-4xl">
              From event idea to attendee registration in a few clean steps.
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              The structure keeps your homepage readable while still giving
              enough content depth for a professional product feel.
            </p>

            <Link
              to="/OrganizerRegistration"
              className="eh-btn-primary mt-7 px-6 py-3 text-sm"
            >
              Start as Organizer <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4">
            {workflow.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(99,102,241,0.12)] sm:grid-cols-[64px_1fr]"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-indigo-500/20">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-500">{step.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Upcoming events"
            title="Fresh events from the platform"
            description="Real published events appear here automatically with professional cards, responsive grids and empty/loading states."
            action={
              <Link to="/Events" className="eh-btn-primary px-5 py-3 text-sm">
                View all <ArrowRight size={16} />
              </Link>
            }
          />

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="eh-skeleton-card" />
              ))}
            </div>
          ) : error ? (
            <ErrorState
              title="Could not load featured events"
              description={error}
            />
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-indigo-200 bg-white p-10 text-center shadow-sm">
              <Ticket className="mx-auto mb-4 text-indigo-600" size={46} />

              <h3 className="text-2xl font-black text-slate-950">
                No upcoming events yet
              </h3>

              <p className="mt-2 leading-7 text-slate-500">
                Events will appear here automatically once they are created and
                published.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 shadow-sm">
              <Star size={14} /> Testimonials
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight  text-slate-950 sm:text-5xl">
              Loved by teams who want events to feel premium.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Social proof makes the landing page feel more authentic and like
              a real SaaS product.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.9rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(99,102,241,0.12)]"
              >
                <div className="mb-5 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={17} fill="currentColor" />
                  ))}
                </div>

                <p className="text-base font-semibold leading-8 text-slate-700">
                  “{item.text}”
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-black text-white">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">{item.name}</h3>
                    <p className="text-sm font-semibold text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
              FAQ
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight  text-slate-950 sm:text-5xl">
              Questions users may have before starting.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              This section improves trust and makes the homepage feel complete
              like a real SaaS landing page.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-950">
                  {faq.q}
                  <ChevronDown
                    className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    size={20}
                  />
                </summary>

                <p className="mt-4 leading-7 text-slate-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-8 text-white shadow-[0_28px_90px_rgba(79,70,229,0.24)] sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                {[CalendarCheck, Users, BarChart3, CheckCircle2].map(
                  (Icon, i) => (
                    <span
                      key={i}
                      className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md"
                    >
                      <Icon size={20} />
                    </span>
                  )
                )}
              </div>

              <h2 className="max-w-3xl text-4xl font-black leading-tight  sm:text-5xl">
                Ready to make your event platform look premium?
              </h2>

              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white/80">
                Create modern event pages, showcase upcoming events and give
                attendees a clean discovery experience.
              </p>
            </div>

            <Link
              to="/OrganizerRegistration"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-indigo-700 shadow-xl transition-all hover:-translate-y-0.5"
            >
              Create Event <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
</>
);

export default HomeSections;
