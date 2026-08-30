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
  const data = useAppSelector(
    (state) => state.microsite.eventData
  ) as EventData | null;

  const primaryColor = data?.PrimaryColor || data?.color || "#4F46E5";
  const secondaryColor = data?.SecondaryColor || "#06B6D4";
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
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="relative bg-slate-950 text-white">
      {/* REMOVED: Heavy blur-[140px] background orbs. KEPT: Lightweight grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        
        {/* Top CTA */}
        {/* REMOVED: backdrop-blur-2xl and heavy rgba shadows. REPLACED WITH: bg-slate-900 & shadow-2xl */}
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8 lg:p-10">
          <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                <CalendarCheck size={14} />
                Ready to attend?
              </div>

              <h2 className="max-w-3xl text-3xl font-black leading-tight  sm:text-4xl">
                Register now and keep your event pass ready.
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-400 sm:text-base">
                Get access to event details, registration confirmation and a
                smooth attendee experience.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToRegistration}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-black text-white shadow-xl transition-transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              Register Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.75fr_1.1fr]">
          
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <div
                className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl text-lg font-black text-white shadow-lg transition-transform group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                {data?.logo ? (
                  <img
                    src={data.logo}
                    alt={eventName}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  eventName.charAt(0).toUpperCase()
                )}
              </div>

              <div>
                <h3 className="max-w-[240px] truncate text-2xl font-black tracking-tight">
                  {eventName}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
                  Event Microsite
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm font-medium leading-7 text-slate-400">
              {data?.ShortDesc ||
                "Experience the extraordinary. We bring people together to inspire, connect and grow through world-class events."}
            </p>

            <div className="mt-7 space-y-3">
              {data?.organizerEmail && (
                <a
                  href={`mailto:${data.organizerEmail}`}
                  className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-800 bg-slate-900">
                    <Mail size={16} />
                  </span>
                  <span className="break-all text-sm font-bold">
                    {data.organizerEmail}
                  </span>
                </a>
              )}

              {data?.organizerPhone && (
                <a
                  href={`tel:${data.organizerPhone}`}
                  className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-800 bg-slate-900">
                    <Phone size={16} />
                  </span>
                  <span className="text-sm font-bold">
                    {data.organizerPhone}
                  </span>
                </a>
              )}

              {data?.location && (
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-800 bg-slate-900">
                    <MapPin size={16} />
                  </span>
                  <span className="text-sm font-bold">{data.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-white">
              Explore
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-white"
                  >
                    <ArrowRight
                      size={14}
                      className="-ml-5 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100"
                      style={{ color: secondaryColor }}
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-white">
              Legal
            </h4>

            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-bold text-slate-400 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-white">
              Stay Updated
            </h4>

            <p className="mb-5 text-sm font-medium leading-7 text-slate-400">
              Subscribe for event updates, speaker announcements and important
              reminders.
            </p>

            {/* REMOVED: backdrop-blur-xl. REPLACED WITH: bg-slate-900 */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-2"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-slate-700"
                />

                <button
                  type="submit"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-lg transition-transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                  aria-label="Subscribe"
                >
                  <Send size={17} />
                </button>
              </div>
            </form>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:-translate-y-1 hover:text-white"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                      e.currentTarget.style.borderColor = "";
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-semibold text-slate-500">
            © {new Date().getFullYear()} {eventName}. All rights reserved.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            <Sparkles size={14} style={{ color: secondaryColor }} />
            Powered by EventHive
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;