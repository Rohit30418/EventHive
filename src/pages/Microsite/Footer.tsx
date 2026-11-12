import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  ArrowRight,
  CalendarCheck,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Twitter,
} from "lucide-react";

interface EventData {
  PrimaryColor?: string;
  SecondaryColor?: string;
  color?: string;
  logo?: string;
  ShortDesc?: string;
  organizerPhone?: string;
  organizerEmail?: string;
  EventName?: string;
  location?: string;
}

const Footer: React.FC = () => {
  const data = useAppSelector((state) => state.microsite.eventData) as EventData | null;
  const primaryColor = data?.PrimaryColor || data?.color || "#3848BE";
  const secondaryColor = data?.SecondaryColor || "#14B884";
  const eventName = data?.EventName || "EventHive";

  const quickLinks = [
    { label: "About Event", href: "#experience" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Speakers", href: "#speakers" },
    { label: "Pricing", href: "#pricing" },
    { label: "Registration", href: "#registration" },
  ];

  const legalLinks = [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Code of Conduct",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Existing final CTA, now its own section rather than nested inside the footer. */}
      <section className="eh-ms-section bg-white">
        <div className="eh-ms-container">
          <div className="eh-ms-final-cta eh-ms-card">
            <div>
              <div className="eh-ms-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2" style={{ color: primaryColor }}>
                <CalendarCheck size={14} />
                Ready to attend?
              </div>
              <h2 className="eh-ms-heading text-[#111831]">
                Register now and keep your event pass ready.
              </h2>
              <p className="eh-ms-copy">
                Get access to event details, registration confirmation and a
                smooth attendee experience.
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToRegistration}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-[#111831]"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              Register Now
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#111831] py-14 text-white">
        <div className="eh-ms-container">
          {/* Three columns; original Explore and Legal links share the middle column. */}
          <div className="eh-ms-footer-grid border-b border-white/10 pb-10">
            <div className="eh-ms-footer-column">
              <Link to="/" className="inline-flex min-w-0 items-center gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl text-lg font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  {data?.logo ? (
                    <img src={data.logo} alt={eventName} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    eventName.charAt(0).toUpperCase()
                  )}
                </span>
                <span className="min-w-0">
                  <h3 className="break-words text-xl font-bold tracking-tight">{eventName}</h3>
                  <span className="eh-ms-eyebrow text-slate-400">Event Microsite</span>
                </span>
              </Link>

              <p className="mt-5 text-base leading-7 text-slate-300">
                {data?.ShortDesc ||
                  "Experience the extraordinary. We bring people together to inspire, connect and grow through world-class events."}
              </p>

              <div className="mt-5 grid gap-3">
                {data?.organizerEmail && (
                  <a href={`mailto:${data.organizerEmail}`} className="flex min-w-0 items-center gap-3 text-sm font-semibold text-slate-300 hover:text-white">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-700 bg-slate-900"><Mail size={16} /></span>
                    <span className="min-w-0 break-all">{data.organizerEmail}</span>
                  </a>
                )}
                {data?.organizerPhone && (
                  <a href={`tel:${data.organizerPhone}`} className="flex min-w-0 items-center gap-3 text-sm font-semibold text-slate-300 hover:text-white">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-700 bg-slate-900"><Phone size={16} /></span>
                    <span>{data.organizerPhone}</span>
                  </a>
                )}
                {data?.location && (
                  <div className="flex min-w-0 items-center gap-3 text-sm font-semibold text-slate-300">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-700 bg-slate-900"><MapPin size={16} /></span>
                    <span>{data.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="eh-ms-footer-column eh-ms-footer-links">
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Explore</h4>
                <ul className="grid gap-3">
                  {quickLinks.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">
                        <ArrowRight size={14} style={{ color: secondaryColor }} aria-hidden="true" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Legal</h4>
                <ul className="grid gap-3">
                  {legalLinks.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm font-semibold text-slate-300 hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="eh-ms-footer-column">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Stay Updated</h4>
              <p className="mb-5 text-base leading-7 text-slate-300">
                Subscribe for event updates, speaker announcements and important
                reminders.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="rounded-xl border border-slate-700 bg-slate-900 p-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-base text-white placeholder:text-slate-400 focus:border-slate-500"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-white"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Send size={17} />
                  </button>
                </div>
              </form>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                      onMouseEnter={(event) => {
                        event.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
                        event.currentTarget.style.borderColor = "transparent";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.background = "";
                        event.currentTarget.style.borderColor = "";
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-center sm:text-left">
            <p className="text-sm font-semibold text-slate-300">
              © {new Date().getFullYear()} {eventName}. All rights reserved.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-300">
              <Sparkles size={14} style={{ color: secondaryColor }} />
              Powered by EventHive
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
