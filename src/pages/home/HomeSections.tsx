import { useRef, useState } from "react";
import { ScrollReveal, WorkflowRail } from "./HomeScrollArt";
import { ArrowRight, CheckCircle2, ChevronDown, ClipboardCheck, LayoutDashboard, Search, ShieldCheck, Ticket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import { ErrorState } from "../../common/StateViews";
import type { EventType } from "../../Types/eventType";
import { audiences, faqs, features, workflow } from "./homeData";

interface HomeSectionsProps {
  featuredEvents: EventType[];
  isLoading: boolean;
  error?: string | null;
}

const featureIcons = [LayoutDashboard, Search, Users, Ticket, ShieldCheck, CheckCircle2];

const HomeSections = ({ featuredEvents, isLoading, error }: HomeSectionsProps) => {
  const [activeRole, setActiveRole] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const workflowRef = useRef<HTMLElement>(null);

  return (
    <>
      <section className="eh-home-section eh-about-section" id="about" aria-labelledby="eh-about-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-about-grid">
            <div className="eh-about-intro eh-home-card">
              <p className="eh-home-eyebrow">WHY EVENTHIVE</p>
              <h2 id="eh-about-title" className="eh-home-heading">Good events start with a <em>great experience.</em></h2>
              <p className="eh-home-copy">
                From the first announcement to the final attendee registration,
                give your community a clear, welcoming place to connect.
              </p>
              <Link to="/OrganizerRegistration" className="eh-home-text-link">
                Get started <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="eh-about-list">
              <article className="eh-home-card eh-about-benefit">
                <span className="eh-home-icon"><LayoutDashboard size={24} aria-hidden="true" /></span>
                <div><h3>Made for organizers</h3><p>Bring event details, registration and management into one focused workflow.</p></div>
              </article>
              <article className="eh-home-card eh-about-benefit">
                <span className="eh-home-icon"><Users size={24} aria-hidden="true" /></span>
                <div><h3>Built for attendees</h3><p>Help people find the right event and know what to expect before they join.</p></div>
              </article>
              <article className="eh-home-card eh-about-benefit">
                <span className="eh-home-icon"><ClipboardCheck size={24} aria-hidden="true" /></span>
                <div><h3>Every detail in place</h3><p>Keep your event information easy to read, update and share.</p></div>
              </article>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="eh-home-section" id="features" aria-labelledby="eh-features-title">
        <div className="eh-home-container">
          <div className="eh-home-section-intro">
            <p className="eh-home-eyebrow">PLATFORM FEATURES</p>
            <h2 id="eh-features-title" className="eh-home-heading">Everything you need, <em>nothing you don't.</em></h2>
            <p className="eh-home-copy">A simple, connected experience for creating, finding and managing events.</p>
          </div>
          <ScrollReveal className="eh-features-grid">
            {features.map((feature, index) => {
              const Icon = featureIcons[index] || CheckCircle2;
              return (
                <article key={feature.title} className="eh-home-card eh-feature-card">
                  <span className="eh-home-icon"><Icon size={26} aria-hidden="true" /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <div className="eh-feature-illustration" aria-hidden="true">
                    <span className="eh-feature-illustration-icon"><Icon size={29} /></span>
                    <span className="eh-feature-illustration-text">{["Event page","Discover","Your workspace","Registration","User access","Designed to feel good"][index]}</span>
                    <CheckCircle2 size={18} />
                  </div>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <section className="eh-home-section eh-home-dark" id="roles" aria-labelledby="eh-roles-title">
        <div className="eh-home-container">
          <div className="eh-home-section-intro">
            <p className="eh-home-eyebrow">MADE FOR EVERYONE</p>
            <h2 id="eh-roles-title" className="eh-home-heading">A better way to bring people <em>together.</em></h2>
            <p className="eh-home-copy">See how EventHive fits the way you work.</p>
          </div>
          <div className="eh-role-tabs" role="tablist" aria-label="Explore event roles">
            {audiences.map((audience, index) => (
              <button
                key={audience.title}
                type="button"
                role="tab"
                id={`eh-role-tab-${index}`}
                aria-controls="eh-role-panel"
                aria-selected={activeRole === index}
                className={activeRole === index ? "eh-role-tab is-active" : "eh-role-tab"}
                onClick={() => setActiveRole(index)}
              >
                {audience.title.replace("For ", "")}
              </button>
            ))}
          </div>
          <ScrollReveal className="eh-role-content eh-home-card" id="eh-role-panel" role="tabpanel" aria-labelledby={`eh-role-tab-${activeRole}`}>
            <div className="eh-role-description">
              <span className="eh-home-icon">
                {activeRole === 0 ? <LayoutDashboard size={28} /> : activeRole === 1 ? <Users size={28} /> : <ShieldCheck size={28} />}
              </span>
              <h3>{audiences[activeRole].title}</h3>
              <p>{audiences[activeRole].desc}</p>
            </div>
            <div className="eh-role-preview" aria-hidden="true">
              <div className="eh-role-preview-top"><span>EventHive</span><span>{["Organizer view","Attendee view","Admin view"][activeRole]}</span></div>
              <div className="eh-role-preview-body">
                <span className="eh-role-preview-chip">{["EVENTS","DISCOVER","OVERVIEW"][activeRole]}</span>
                <h4>{["Your next event, organized.","Find your next experience.","Keep everything on track."][activeRole]}</h4>
                <div className="eh-role-preview-lines"><i /><i /><i /></div>
                <span className="eh-role-preview-action"><CheckCircle2 size={17} /> {["Event details ready","Browse with confidence","Workspace at a glance"][activeRole]}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section ref={workflowRef} className="eh-home-section" id="how-it-works" aria-labelledby="eh-workflow-title">
        <div className="eh-home-container">
          <div className="eh-home-section-intro">
            <p className="eh-home-eyebrow">HOW IT WORKS</p>
            <h2 id="eh-workflow-title" className="eh-home-heading">Four simple steps. <em>One great event.</em></h2>
            <p className="eh-home-copy">A clear path from your first idea to welcoming your guests.</p>
          </div>
          <WorkflowRail sectionRef={workflowRef} />
          <ScrollReveal className="eh-workflow-grid">
            {workflow.map((step, index) => (
              <article key={step.title} className="eh-home-card eh-workflow-card">
                <span className="eh-workflow-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="eh-home-section eh-events-section" id="events" aria-labelledby="eh-events-title">
        <div className="eh-home-container">
          <div className="eh-events-heading">
            <div>
              <p className="eh-home-eyebrow">UPCOMING EVENTS</p>
              <h2 id="eh-events-title" className="eh-home-heading">Find your next <em>experience.</em></h2>
              <p className="eh-home-copy">Discover upcoming events from the EventHive community.</p>
            </div>
            <Link to="/Events" className="eh-home-btn eh-home-btn-outline">View all events <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          {isLoading ? (
            <div className="eh-events-grid" aria-label="Loading upcoming events" aria-busy="true">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="eh-home-card eh-event-skeleton">
                  <div className="eh-skeleton-cover" /><div className="eh-skeleton-line" /><div className="eh-skeleton-line short" />
                </div>
              ))}
            </div>
          ) : error ? (
            <ErrorState title="Could not load featured events" description={error} />
          ) : featuredEvents.length ? (
            <div className="eh-events-grid">
              {featuredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} homeFeatured />
              ))}
            </div>
          ) : (
            <div className="eh-home-card eh-event-empty">
              <span className="eh-event-empty-icon"><Ticket size={42} aria-hidden="true" /></span>
              <div>
                <h3>Be the first to host an event</h3>
                <p>Have something worth bringing people together for? Start with your own event page.</p>
              </div>
              <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-primary">
                Create an Event <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="eh-home-section" id="faq" aria-labelledby="eh-faq-title">
        <div className="eh-home-container eh-faq-layout">
          <div>
            <p className="eh-home-eyebrow">FAQ</p>
            <h2 id="eh-faq-title" className="eh-home-heading">Good questions. <em>Clear answers.</em></h2>
            <p className="eh-home-copy">Everything you need to know before getting started.</p>
          </div>
          <ScrollReveal className="eh-faq-list">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="eh-home-card eh-faq-item">
                <h3>
                  <button
                    type="button"
                    id={`eh-faq-trigger-${index}`}
                    aria-controls={`eh-faq-answer-${index}`}
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.q}</span><ChevronDown size={21} className={openFaq === index ? "eh-faq-chevron is-open" : "eh-faq-chevron"} aria-hidden="true" />
                  </button>
                </h3>
                {openFaq === index && (
                  <div role="region" id={`eh-faq-answer-${index}`} aria-labelledby={`eh-faq-trigger-${index}`} className="eh-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="eh-home-section eh-final-cta-section" aria-labelledby="eh-cta-title">
        <div className="eh-home-container">
          <ScrollReveal className="eh-final-cta">
            <div>
              <p className="eh-home-eyebrow">READY WHEN YOU ARE</p>
              <h2 id="eh-cta-title" className="eh-home-heading">Make your next event <em>unforgettable.</em></h2>
              <p>Bring your ideas, people and plans together in one simple place.</p>
            </div>
            <Link to="/OrganizerRegistration" className="eh-home-btn eh-home-btn-dark">
              Create Event <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default HomeSections;
