import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, Quote, Send, ShieldCheck, Sparkles, Ticket } from "lucide-react";
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
    popular: true,
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

/*
 * Testimonial layout examples, NOT user endorsements.
 * There is currently no verified customer feedback in this repository.
 * Replace quote, role and portrait only after receiving permission.
 */
type TestimonialExample = {
  role: string;
  headline: string;
  quote: string;
  portrait: string;
};

const testimonialExamples: TestimonialExample[] = [
  {
    role: "Event organizer",
    headline: "One clear place for the whole event",
    quote: "I want to focus on creating a great experience, not keeping track of details across different tools. Having the event page and registrations together makes the process feel simpler.",
    portrait: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    role: "Event attendee",
    headline: "Finding the right experience",
    quote: "When I explore an event, I want the important information upfront. Seeing the event details and registration in one place makes it easier to decide what to attend.",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    role: "Platform admin",
    headline: "A more organized event workspace",
    quote: "A dedicated dashboard for organizer requests and event activity would help me stay focused on what needs attention, without switching between spreadsheets.",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
];

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
              <article className={"eh-home-card eh-extras-price-card" + ("popular" in option && option.popular ? " is-popular" : "")} key={option.name}>
                {"popular" in option && option.popular && (
                  <span className="eh-extras-popular-badge"><Sparkles size={14} aria-hidden="true" /> Most Popular</span>
                )}
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
  return (
    <section className="eh-home-section eh-extras-testimonials" id="testimonials" aria-labelledby="eh-testimonials-title">
      <div className="eh-home-container">
        <div className="eh-testimonial-heading">
          <div>
            <p className="eh-home-eyebrow">COMMUNITY STORIES</p>
            <h2 id="eh-testimonials-title" className="eh-home-heading">
              Great events start with <em>great experiences.</em>
            </h2>
            <p className="eh-home-copy">
              A preview of the voices we hope to feature: organizers, attendees and
              the people behind the scenes.
            </p>
          </div>
          <span className="eh-testimonial-demo-note">Illustrative testimonials — not verified reviews</span>
        </div>

        <div className="eh-testimonial-grid">
          {testimonialExamples.map((story) => (
            <article className="eh-home-card eh-testimonial-card" key={story.role}>
              <div className="eh-testimonial-card-top">
                <span className="eh-testimonial-quote-icon" aria-hidden="true">
                  <Quote size={20} strokeWidth={2} />
                </span>
                <span className="eh-testimonial-sample">SAMPLE STORY</span>
              </div>
              <h3>{story.headline}</h3>
              <blockquote className="eh-testimonial-quote">“{story.quote}”</blockquote>
              <div className="eh-testimonial-person">
                <img
                  src={story.portrait}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={50}
                  height={50}
                />
                <div>
                  <strong>{story.role}</strong>
                  <span>Illustrative quote · stock portrait</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="eh-testimonial-footer">
          <p>Have a genuine EventHive experience to share? We’d love to feature it with your permission.</p>
          <Link to="/#contact" className="eh-home-text-link">
            Share your experience <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
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
