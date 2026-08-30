import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/#features" },
      { label: "Pricing", to: "/#pricing" },
      { label: "Events", to: "/Events" },
      { label: "Organizer Login", to: "/Login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/#how-it-works" },
      { label: "Workflows", to: "/#how-it-works" },
      { label: "Create Account", to: "/OrganizerRegistration" },
      { label: "Support", to: "mailto:support@eventhive.com", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Event Discovery", to: "/Events" },
      { label: "Dashboard", to: "/Dashboard" },
      { label: "Help Center", to: "mailto:help@eventhive.com", external: true },
      { label: "Status", to: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
      { label: "Cookie Policy", to: "/" },
    ],
  },
];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Twitter", href: "#", icon: <Twitter size={18} /> },
  { label: "Instagram", href: "#", icon: <Instagram size={18} /> },
  { label: "LinkedIn", href: "#", icon: <Linkedin size={18} /> },
  { label: "Facebook", href: "#", icon: <Facebook size={18} /> },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617] px-4 py-14 text-slate-300 sm:px-6 md:py-20">
      <div className="eh-premium-grid absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
    
      <div className="pointer-events-none absolute right-[-10rem] top-10 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div>
                <p className="text-2xl font-black tracking-tight text-white">
                  Event<span className="eh-gradient-text">Hive</span>
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Premium Event OS</p>
              </div>
            </Link>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
              Create polished event microsites, manage registrations, and operate organizer workflows from one clean platform.
            </p>
          </div>

          <form
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-black text-white">
              <Sparkles size={17} className="text-cyan-300" /> Stay in the loop
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-4 pl-12 pr-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 hover:-translate-y-0.5 hover:bg-indigo-50" type="submit">
                Subscribe <Send size={16} />
              </button>
            </div>
          </form>
        </div> */}

        <div className="my-12 h-px bg-white/10" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
                        {link.label} <ArrowRight size={13} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link to={link.to} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
                        {link.label} <ArrowRight size={13} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-slate-500">© {new Date().getFullYear()} EventHive. All rights reserved.</p>
            <p className="mt-2 text-sm text-slate-500">
              Designed and developed by{" "}
              <a href="https://rohitpant.in/" target="_blank" rel="noopener noreferrer" className="font-black text-indigo-300 hover:text-white">
                Rohit Pant
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
