import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Pause, Play, Send, ShieldCheck, Sparkles, Ticket, Users } from "lucide-react";
import { Link } from "react-router-dom";

const supportEmail = "support@eventhive.com";

const accessOptions = [
  {
    name: "For Attendees",
    detail: "Explore events",
    description: "Find events, see the details and register with confidence.",
    features: ["Discover upcoming events", "View individual event pages", "Use event-specific registration"],
    cta: "Browse events",
    link: "/Events",
    icon: Ticket,
  },
  {
    name: "For Organizers",
    detail: "Pricing on request",
    description: "Create branded pages and manage event details in one place.",
    features: ["Branded event pages", "Manage registrations", "Organizer dashboard"],
    cta: "Ask about pricing",
    link: "/#contact",
    icon: Sparkles,
  },
  {
    name: "For Admin Teams",
    detail: "Talk to us",
    description: "Learn about role-based administration and platform access.",
    features: ["Organizer access workflows", "Event content oversight", "Role-specific interfaces"],
    cta: "Send a query",
    link: "/#contact",
    icon: ShieldCheck,
  },
];

// Use only genuine, approved customer feedback here. Until real reviews are
// supplied, the moving cards invite participation rather than inventing quotes.
type CommunityStory = { audience: string; message: string; label: string };
const approvedTestimonials: CommunityStory[] = [];
const storyInvitations: CommunityStory[] = [
  { audience: "Event organizers", message: "Have you created an event with EventHive? Share what worked well for your team.", label: "Share your experience" },
  { audience: "Event attendees", message: "Joined an event through EventHive? Tell us what made the experience memorable.", label: "Your voice matters" },
  { audience: "Admin teams", message: "Helped manage an event? We would love to hear which parts made your work easier.", label: "Tell us your story" },
];
const stories = approvedTestimonials.length > 0 ? approvedTestimonials : storyInvitations;

export function HomePricing() {
  return (
    <section className="eh-home-section eh-extras-pricing" id="pricing" aria-labelledby="eh-pricing-title">
      <div className="eh-home-container">
        <div className="eh-home-section-intro">
          <p className="eh-home-eyebrow">PRICING & ACCESS</p>
          <h2 id="eh-pricing-title" className="eh-home-heading">A simple way to <em>get started.</em></h2>
          <p className="eh-home-copy">
            Choose how you want to use EventHive. For organizer pricing or specific access questions, get in touch with us.
          </p>
        </div>
        <div className="eh-extras-pricing-grid">
          {accessOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <article className="eh-home-card eh-extras-price-card" key={option.name}>
                <div className="eh-extras-price-top">
                  <span className="eh-home-icon"><Icon size={24} aria-hidden="true" /></span>
                  <span className="eh-extras-price-index">0{index + 1} / 03</span>
                </div>
                <h3>{option.name}</h3>
                <p className="eh-extras-price-label">{option.detail}</p>
                <p className="eh-extras-price-description">{option.description}</p>
                <ul className="eh-extras-price-features">
                  {option.features.map((feature) => (
                    <li key={feature}><CheckCircle2 size={18} aria-hidden="true" /> {feature}</li>
                  ))}
                </ul>
                <Link className={"eh-home-btn " + (index === 1 ? "eh-home-btn-primary" : "eh-home-btn-outline")} to={option.link}>
                  {option.cta} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        <p className="eh-extras-pricing-note">
          Specific EventHive subscription prices are not published here. Contact us for up-to-date pricing and availability.
        </p>
      </div>
    </section>
  );
}

export function HomeTestimonials() {
  const [paused, setPaused] = useState(false);
  const hasQuotes = approvedTestimonials.length > 0;
  return (
    <section className="eh-home-section eh-extras-testimonials" id="testimonials" aria-labelledby="eh-testimonials-title">
      <div className="eh-home-container">
        <div className="eh-extras-testimonial-heading">
          <div>
            <p className="eh-home-eyebrow">COMMUNITY VOICES</p>
            <h2 id="eh-testimonials-title" className="eh-home-heading">Stories worth <em>sharing.</em></h2>
            <p className="eh-home-copy">
              {hasQuotes
                ? "Read what people are saying about their EventHive experience."
                : "We're collecting genuine community testimonials. Share your experience and help others discover EventHive."}
            </p>
          </div>
          <button type="button" className="eh-extras-motion-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play moving community cards" : "Pause moving community cards"} aria-pressed={paused}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
      <div className={"eh-extras-story-viewport" + (paused ? " is-paused" : "")} aria-label="Moving community feedback cards">
        <div className="eh-extras-story-track">
          {[0, 1].map((copy) => (
            <div className="eh-extras-story-group" key={copy} aria-hidden={copy === 1}>
              {stories.map((story) => (
                <article className="eh-home-card eh-extras-story-card" key={story.audience}>
                  <span className="eh-extras-story-quote" aria-hidden="true"><MessageCircle size={22} /></span>
                  <p>{story.message}</p>
                  <div className="eh-extras-story-meta">
                    <span>{story.audience}</span>
                    <small>{hasQuotes ? story.label : "Invitation to share"}</small>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="eh-home-container">
        <Link to="/#contact" className="eh-home-text-link">Share your experience <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

type InquiryValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const emptyInquiry: InquiryValues = { name: "", email: "", topic: "General question", message: "" };

export function HomeQuery() {
  const [fields, setFields] = useState<InquiryValues>(emptyInquiry);
  const [prepared, setPrepared] = useState(false);

  const update = (key: keyof InquiryValues, value: string) => {
    setPrepared(false);
    setFields((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = "EventHive enquiry: " + fields.topic;
    const body = [
      "Name: " + fields.name.trim(),
      "Email: " + fields.email.trim(),
      "Topic: " + fields.topic,
      "",
      fields.message.trim(),
    ].join("\n");
    const mailto = "mailto:" + supportEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    setPrepared(true);
    window.location.href = mailto;
  };

  return (
    <section className="eh-home-section eh-extras-query" id="contact" aria-labelledby="eh-query-title">
      <div className="eh-home-container eh-extras-query-grid">
        <div className="eh-extras-query-intro">
          <p className="eh-home-eyebrow">LET'S TALK</p>
          <h2 id="eh-query-title" className="eh-home-heading">Have a question? <em>We're here to help.</em></h2>
          <p className="eh-home-copy">Ask about hosting an event, EventHive pricing, registration, or share your feedback.</p>
          <a className="eh-extras-query-email" href={"mailto:" + supportEmail}>
            <span className="eh-home-icon"><Mail size={21} aria-hidden="true" /></span>
            <span><small>EMAIL SUPPORT</small><strong>{supportEmail}</strong></span>
            <ArrowRight size={19} aria-hidden="true" />
          </a>
        </div>
        <form className="eh-home-card eh-extras-query-form" onSubmit={submit}>
          <div className="eh-extras-query-form-title">
            <span><Send size={19} aria-hidden="true" /></span>
            <div><h3>Send an enquiry</h3><p>Tell us what's on your mind.</p></div>
          </div>
          <div className="eh-extras-query-fields">
            <label>Full name
              <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your name" value={fields.name} onChange={(event) => update("name", event.target.value)} />
            </label>
            <label>Email address
              <input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@example.com" value={fields.email} onChange={(event) => update("email", event.target.value)} />
            </label>
          </div>
          <label>What's your question about?
            <select name="topic" value={fields.topic} onChange={(event) => update("topic", event.target.value)}>
              <option>General question</option>
              <option>Pricing</option>
              <option>Hosting an event</option>
              <option>Attending an event</option>
              <option>Feedback or testimonial</option>
            </select>
          </label>
          <label>Your message
            <textarea name="message" rows={5} maxLength={3000} required placeholder="Tell us how we can help..." value={fields.message} onChange={(event) => update("message", event.target.value)} />
          </label>
          <button type="submit" className="eh-home-btn eh-home-btn-primary eh-extras-query-submit">
            Compose email <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p className="eh-extras-query-disclaimer">
            {prepared
              ? "Your email draft is ready. Please send it from your email app; it has not been sent automatically."
              : "This opens your email app with your enquiry filled in. You review and send it there."}
          </p>
        </form>
      </div>
    </section>
  );
}
