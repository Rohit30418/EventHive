import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/#features" },
      { label: "Events", to: "/Events" },
      { label: "How It Works", to: "/#how-it-works" },
      { label: "Organizer Login", to: "/Login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/#how-it-works" },
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

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#1e1c1b] px-4 py-14 text-white sm:px-6 md:py-18">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#ef6f30] font-['Manrope',sans-serif] font-extrabold text-[#ef6f30]">
              E
            </span>
            <span className="font-['Manrope',sans-serif] text-2xl font-extrabold tracking-[-0.04em]">
              Event<span className="text-[#ef6f30]">Hive</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/50">
            Create event microsites, manage registrations and run organizer
            workflows from one focused platform.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f6a06f]">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white"
                      >
                        {link.label}
                        <ArrowRight size={12} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white"
                      >
                        {link.label}
                        <ArrowRight size={12} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-white/35">
            © {new Date().getFullYear()} EventHive. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-white/35">
            Designed and developed by{" "}
            <a
              href="https://rohitpant.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-[#f6a06f] hover:text-white"
            >
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/45 hover:border-[#ef6f30] hover:bg-[#ef6f30] hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
