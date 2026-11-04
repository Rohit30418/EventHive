import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, ClipboardCheck,
  LayoutDashboard, Search, ShieldCheck, Ticket, Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import { ErrorState } from "../../common/StateViews";
import type { EventType } from "../../Types/eventType";
import { ScrollReveal, WorkflowRail } from "./HomeScrollArt";
import { FeatureArtwork, JourneyPreview, ProcessIllustration, RoleWorkspace } from "./HomeProductUI";
import { audiences, faqs, features, workflow } from "./homeData";

interface HomeSectionsProps {
  featuredEvents: EventType[];
  isLoading: boolean;
  error?: string | null;
}

const featureIcons = [LayoutDashboard, Search, Users, Ticket, ShieldCheck, CheckCircle2];

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => {
  const [activeRole, setActiveRole] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const workflowRef = useRef<HTMLElement>(null);

  return (
    <>
      <section className="eh-home-section eh-about-section" id="about" aria-labelledby="eh-about-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-about-grid">
            <div className="eh-about-intro eh-home-card">
              <p className="eh-home-eyebrow">WHY EVENTHIVE</p>
              <h2 id="eh-about-title" className="eh-home-heading">Good events start with a <em>great experience.</em></h2>
              <p className="eh-home-copy">From the first announcement to the final attendee registration, give your community a clear, welcoming place to connect.</p>
              <Link to="/OrganizerRegistration" className="eh-home-text-link">Get started <ArrowRight size={18} aria-hidden="true" /></Link>
              <ProcessIllustration />
            </div>
            <div className="eh-about-list">
              <article className="eh-home-card eh-about-benefit">
                <span className="eh-home-icon"><LayoutDashboard size={24} aria-hidden="true" /></span>
                <div><h3>Made for organizers</h3><p>Bring event details, registration and management into one focused workflow.</p></div>
                <span className="eh-about-index">01</span>
              </article>
              <article className="eh-home-card eh-about-benefit">
                <span className="eh-home-icon"><Users size={24} aria-hidden="true" /></span>
                <div><h3>Built for attendees</h3><p>Help people find the right event and know what to expect before they join.</p></div>
                <span className="eh-about-index">02</span>
              </article>
              <article className="eh-home-card eh-about-benefit">
                <span className="eh-home-icon"><ClipboardCheck size={24} aria-hidden="true" /></span>
                <div><h3>Every detail in place</h3><p>Keep your event information easy to read, update and share.</p></div>
                <span className="eh-about-index">03</span>
              </article>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="eh-home-section eh-features-section" id="features" aria-labelledby="eh-features-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-home-section-intro">
            <p className="eh-home-eyebrow">THE PLATFORM / YOUR WORKSPACE</p>
            <h2 id="eh-features-title" className="eh-home-heading">Everything you need, <em>nothing you don't.</em></h2>
            <p className="eh-home-copy">A simple, connected experience for creating, finding and managing events.</p>
          </ScrollReveal>
          <div className="eh-features-grid">
            {features.map((feature, index) => {
              const Icon = featureIcons[index] || CheckCircle2;
              return (
                <ScrollReveal key={feature.title} delay={Math.min(index % 2 * 0.07, 0.1)} className="eh-feature-reveal">
                  <article className="eh-home-card eh-feature-card">
                    <div className="eh-feature-topline"><span className="eh-home-icon"><Icon size={23} aria-hidden="true" /></span><span className="eh-feature-count">0{index + 1} / 06</span></div>
                    <div className="eh-feature-info"><h3>{feature.title}</h3><p>{feature.desc}</p></div>
                    <FeatureArtwork index={index} />
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="eh-home-section eh-home-dark eh-role-section" id="roles" aria-labelledby="eh-roles-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-home-section-intro">
            <p className="eh-home-eyebrow">ONE PLATFORM. EVERY ROLE.</p>
            <h2 id="eh-roles-title" className="eh-home-heading">A better way to bring people <em>together.</em></h2>
            <p className="eh-home-copy">See how EventHive fits the way you work.</p>
          </ScrollReveal>
          <div className="eh-role-tabs" role="tablist" aria-label="Explore event roles">
            {audiences.map((audience, index) => (
              <button key={audience.title} type="button" role="tab"
                id={"eh-role-tab-" + index} aria-controls="eh-role-panel"
                aria-selected={activeRole === index}
                tabIndex={activeRole === index ? 0 : -1}
                className={activeRole === index ? "eh-role-tab is-active" : "eh-role-tab"}
                onClick={() => setActiveRole(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    const direction = event.key === "ArrowRight" ? 1 : -1;
                    const next = (activeRole + direction + audiences.length) % audiences.length;
                    setActiveRole(next);
                    document.getElementById("eh-role-tab-" + next)?.focus();
                  }
                }}>
                {audience.title.replace("For ", "")}
              </button>
            ))}
          </div>
          <ScrollReveal className="eh-role-content eh-home-card" id="eh-role-panel" role="tabpanel" aria-labelledby={"eh-role-tab-" + activeRole}>
            <div className="eh-role-description">
              <span className="eh-home-icon">
                {activeRole === 0 ? <LayoutDashboard size={26} /> : activeRole === 1 ? <Users size={26} /> : <ShieldCheck size={26} />}
              </span>
              <p className="eh-home-eyebrow">WORK YOUR WAY</p>
              <h3>{audiences[activeRole].title}</h3>
              <p>{audiences[activeRole].desc}</p>
              <Link to={activeRole === 1 ? "/Events" : activeRole === 0 ? "/OrganizerRegistration" : "/Login"} className="eh-home-text-link">
                {activeRole === 1 ? "Browse events" : activeRole === 0 ? "Get started" : "Log in"} <ArrowUpRight size={18} aria-hidden="true"/>
              </Link>
            </div>
            <RoleWorkspace role={activeRole}/>
          </ScrollReveal>
        </div>
      </section>

      <section ref={workflowRef} className="eh-home-section eh-journey-section" id="how-it-works" aria-labelledby="eh-workflow-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-home-section-intro">
            <p className="eh-home-eyebrow">THE WORKFLOW / FOUR SIMPLE STEPS</p>
            <h2 id="eh-workflow-title" className="eh-home-heading">Four simple steps. <em>One great event.</em></h2>
            <p className="eh-home-copy">A clear path from your first idea to welcoming your guests.</p>
          </ScrollReveal>
          <WorkflowRail sectionRef={workflowRef} />
          <div className="eh-journey-layout">
            <div className="eh-journey-steps">
              {workflow.map((step, index) => (
                <motion.article key={step.title}
                  className={"eh-home-card eh-journey-step" + (activeStep === index ? " is-current" : "")}
                  onViewportEnter={() => setActiveStep(index)}
                  viewport={{amount: 0.65, margin: "-15% 0px -30% 0px"}}
                  initial={reduceMotion ? false : {opacity:0.92,y:12}}
                  whileInView={{opacity:1,y:0}}
                  transition={{duration:reduceMotion?0:.45}}
                >
                  <span className="eh-workflow-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.desc}</p></div>
                  <span className="eh-journey-step-arrow" aria-hidden="true"><ArrowUpRight size={19}/></span>
                </motion.article>
              ))}
            </div>
            <div className="eh-journey-sticky"><JourneyPreview step={activeStep}/></div>
          </div>
        </div>
      </section>

      <section className="eh-home-section eh-events-section" id="events" aria-labelledby="eh-events-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-events-heading">
            <div><p className="eh-home-eyebrow">UPCOMING EVENTS</p><h2 id="eh-events-title" className="eh-home-heading">Find your next <em>experience.</em></h2><p className="eh-home-copy">Discover upcoming events from the EventHive community.</p></div>
            <Link to="/Events" className="eh-home-btn eh-home-btn-outline">View all events <ArrowRight size={18} aria-hidden="true" /></Link>
          </ScrollReveal>
          {isLoading ? (
            <div className="eh-events-grid" aria-label="Loading upcoming events" aria-busy="true">
              {Array.from({length:4},(_,i)=><div key={i} className="eh-home-card eh-event-skeleton"><div className="eh-skeleton-cover"/><div className="eh-skeleton-line"/><div className="eh-skeleton-line short"/></div>)}
            </div>
          ) : error ? (
            <ErrorState title="Could not load featured events" description={error} />
          ) : featuredEvents.length ? (
            <div className="eh-events-grid">{featuredEvents.map((event,index)=><EventCard key={event.id} event={event} index={index} homeFeatured />)}</div>
          ) : (
            <div className="eh-home-card eh-event-empty">
              <span className="eh-event-empty-icon"><Ticket size={42} aria-hidden="true"/></span>
              <div><h3>Be the first to host an event</h3><p>Have something worth bringing people together for? Start with your own event page.</p></div>
              <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-primary">Create an Event <ArrowRight size={18} aria-hidden="true"/></Link>
            </div>
          )}
        </div>
      </section>

      <section className="eh-home-section eh-faq-section" id="faq" aria-labelledby="eh-faq-title">
        <div className="eh-home-container eh-faq-layout">
          <ScrollReveal>
            <p className="eh-home-eyebrow">QUESTIONS / ANSWERED</p>
            <h2 id="eh-faq-title" className="eh-home-heading">Good questions. <em>Clear answers.</em></h2>
            <p className="eh-home-copy">Everything you need to know before getting started.</p>
            <Link to="/OrganizerRegistration" className="eh-home-text-link">Start creating <ArrowRight size={18} aria-hidden="true"/></Link>
          </ScrollReveal>
          <div className="eh-faq-list">
            {faqs.map((faq,index)=>(
              <div key={faq.q} className="eh-home-card eh-faq-item">
                <h3><button type="button" id={"eh-faq-trigger-"+index} aria-controls={"eh-faq-answer-"+index} aria-expanded={openFaq===index} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{faq.q}</span><ChevronDown size={21} className={openFaq===index?"eh-faq-chevron is-open":"eh-faq-chevron"} aria-hidden="true"/></button></h3>
                {openFaq === index && <div role="region" id={"eh-faq-answer-"+index} aria-labelledby={"eh-faq-trigger-"+index} className="eh-faq-answer"><p>{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eh-home-section eh-final-cta-section" aria-labelledby="eh-cta-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-final-cta">
            <div className="eh-cta-copy"><p className="eh-home-eyebrow">READY WHEN YOU ARE</p><h2 id="eh-cta-title" className="eh-home-heading">Make your next event <em>unforgettable.</em></h2><p>Bring your ideas, people and plans together in one simple place.</p>
              <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-dark">Create Event <ArrowRight size={19} aria-hidden="true"/></Link>
            </div>
            <div className="eh-cta-art" aria-hidden="true">
              <svg viewBox="0 0 440 320" fill="none" focusable="false">
                <circle cx="240" cy="150" r="126" stroke="#7F2D0C" strokeOpacity=".26" strokeWidth="2" strokeDasharray="5 9"/>
                <circle cx="240" cy="150" r="95" stroke="#FFF8F3" strokeOpacity=".45" strokeWidth="2"/>
                <g transform="rotate(-16 230 160)">
                  <rect x="85" y="87" width="286" height="155" rx="20" fill="#FFF8F3" stroke="#1F1C1A" strokeWidth="2"/>
                  <path d="M173 88V242" stroke="#E4CDBD" strokeWidth="2" strokeDasharray="5 7"/>
                  <rect x="105" y="112" width="48" height="48" rx="12" fill="#FFEBDD"/>
                  <path d="m120 135 8 8 14-17" stroke="#F26B2A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <text x="198" y="134" fill="#1F1C1A" fontFamily="Space Grotesk,Arial" fontWeight="700" fontSize="18">EVENTHIVE</text>
                  <text x="198" y="163" fill="#9A421D" fontFamily="Space Grotesk,Arial" fontSize="13">YOUR NEXT BIG THING</text>
                  <path d="M199 193H340" stroke="#E2C7B5" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M199 213H307" stroke="#E2C7B5" strokeWidth="8" strokeLinecap="round"/>
                </g>
                <circle cx="355" cy="48" r="20" fill="#1F1C1A"/>
                <path d="m346 48 7 7 13-14" stroke="#FFF8F3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M69 57V76M59 66H79" stroke="#FFF8F3" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="393" cy="261" r="6" fill="#1F1C1A"/>
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default HomeSections;
