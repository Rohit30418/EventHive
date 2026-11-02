import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeUp, Magnetic } from "./HomeMotion";
import { FeatureMiniVisual, RoleMockup, WorkflowMockup } from "./HomeVisuals";
import { useState } from "react";
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

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => {
 const [activeRole, setActiveRole] = useState(0);
 const [openFaq, setOpenFaq] = useState<number | null>(0);
 const [activeStep, setActiveStep] = useState(0);
 const reducedMotion = useReducedMotion();
 return (
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
              <strong className="block text-4xl font-black tracking-[-0.06em] text-[#1F1C1A]">
                {stat.value}
              </strong>
              <span className="mt-3 block text-sm font-bold leading-6 text-slate-500">
                {stat.label}
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ABOUT - keep the editorial copy on the left and preview the benefit cards on the right. */}
      <section id="about" className="px-4 py-14 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.92fr_1.08fr]">
          <FadeUp className="flex flex-col justify-between rounded-[2.2rem] bg-[#FFEBDD] p-8 sm:p-12">
            <div>
              <span className="text-xs font-black uppercase tracking-[.2em] text-[#A53C11]">WHY EVENTHIVE</span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-[#1F1C1A] sm:text-6xl">Your idea deserves an <em className="font-accent font-normal text-[#C34B13]">audience.</em></h2>
              <p className="mt-6 max-w-md text-base leading-8 text-[#51453D]">From the very first invite to the final registration, create events that feel considered, memorable and easy to join.</p>
            </div>
            <Link to="/OrganizerRegistration" className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-[#C34B13] pb-1 text-sm font-black text-[#1F1C1A]">Explore the platform <ArrowRight size={16}/></Link>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2">
            {ratingCards.map((item, index) => (
              <FadeUp key={item.title} delay={index * .09} className={index === 2 ? "sm:col-span-2" : ""}>
                <motion.article data-hover-card whileHover={reducedMotion ? undefined : {y:-7}} className="group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-[#1F1C1A] p-7 text-white">
                  <div className="mb-10 flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#FFC09B]">{item.icon}</span><ArrowRight size={24} className="text-[#F26B2A] transition-transform group-hover:-rotate-45" /></div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#DDD1C8]">{item.desc}</p>
                  <p className="mt-4 text-xs font-bold text-[#FFBD97] opacity-60 transition-opacity group-hover:opacity-100">Made for better event moments →</p>
                </motion.article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-700 shadow-sm">
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`group rounded-[1.75rem] border border-orange-100 bg-white p-7 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_28px_75px_rgba(99,102,241,0.14)] ${index === 0 ? "lg:col-span-2 lg:row-span-2" : index === 3 ? "lg:col-span-2" : ""}`}
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 text-orange-700 transition-transform group-hover:scale-105">
                  {feature.icon}
                </div>
                <FeatureMiniVisual index={index} />

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
      <section className="bg-[#1F1C1A] px-4 py-20 text-white sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-100">
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

          <div role="tablist" aria-label="Audience roles" className="mb-7 flex flex-wrap gap-3">{audiences.map((role, index) => <button key={role.title} type="button" role="tab" aria-selected={activeRole === index} onClick={() => setActiveRole(index)} className={`relative rounded-full px-5 py-3 font-bold transition-colors ${activeRole === index ? "text-[#1F1C1A]" : "text-white/80 hover:text-white"}`}>{activeRole === index && <motion.span layoutId="role-active" className="absolute inset-0 rounded-full bg-[#F26B2A]" />}<span className="relative z-10">{role.title.replace("For ", "")}</span></button>)}</div>
          <div className="grid gap-5 lg:grid-cols-1">
            {audiences.map((item, index) => activeRole === index && (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-amber-200">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-black">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">{item.desc}</p>
                <AnimatePresence mode="wait"><motion.div key={activeRole} initial={reducedMotion ? false : {opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:reducedMotion?0:0.26}}><RoleMockup index={activeRole} /></motion.div></AnimatePresence>
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
          <div className="h-fit rounded-[2rem] border border-orange-100 bg-white/85 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
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
            <div className="hidden lg:block"><AnimatePresence mode="wait"><motion.div key={activeStep} initial={reducedMotion ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:reducedMotion?0:.25}}><WorkflowMockup index={activeStep} /></motion.div></AnimatePresence></div>
          </div>

          <div className="relative grid gap-4 border-l-2 border-orange-100 pl-5 sm:pl-8">
            <motion.div aria-hidden="true" className="absolute bottom-0 left-[-2px] top-0 w-[2px] origin-top bg-[#F26B2A]" initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true, amount:.25}} transition={{duration:1.2}} />
            {workflow.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onViewportEnter={() => setActiveStep(index)}
                animate={{opacity:activeStep===index?1:0.7}}
                transition={{ delay: index * 0.04 }}
                className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(99,102,241,0.12)] sm:grid-cols-[64px_1fr]"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F26B2A] font-display text-xl font-black text-[#1F1C1A]">
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
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-orange-200 bg-white p-10 text-center shadow-sm">
              <motion.div aria-hidden="true" animate={reducedMotion ? {} : {y:[0,-8,0],rotate:[-7,7,-7]}} transition={{duration:4,repeat:Infinity}} className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-3xl bg-[#FFEBDD] text-[#C34B13]"><Ticket size={54}/></motion.div>

              <h3 className="text-2xl font-black text-slate-950">
                Be the first to host an event
              </h3>

              <p className="mt-2 leading-7 text-slate-500">
                Turn your next idea into an unforgettable experience. Your event could be the first one featured here.
              </p>
              <Link to="/OrganizerRegistration" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F26B2A] px-6 py-3 font-bold text-[#1F1C1A]">Create an Event <ArrowRight size={17} /></Link>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-700 shadow-sm">
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
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-orange-600 to-amber-500 text-sm font-black text-white">
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
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
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
            {faqs.map((faq, index) => (
              <details
                key={faq.q}
                open={openFaq === index}
                onClick={(event) => { if ((event.target as HTMLElement).closest("summary")) { event.preventDefault(); setOpenFaq(openFaq === index ? null : index); } }}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-950">
                  {faq.q}
                  <ChevronDown
                    className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    size={20}
                  />
                </summary>

                <motion.p initial={false} animate={{opacity:openFaq===index?1:0}} transition={{duration:reducedMotion?0:0.2}} className="mt-4 leading-7 text-slate-500">{faq.a}</motion.p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#F26B2A] via-[#E55B20] to-[#C34B13] p-8 text-white shadow-[0_28px_90px_rgba(79,70,229,0.24)] sm:p-12">
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

            <Magnetic><Link
              to="/OrganizerRegistration"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#1F1C1A] shadow-xl transition-all hover:-translate-y-0.5"
            >
              Create Event <ArrowRight size={18} />
            </Link></Magnetic>
          </div>
        </div>
      </section>
</>
 );
};

export default HomeSections;
