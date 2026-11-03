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
    <footer className="eh-home-footer relative overflow-hidden border-t border-white/10 bg-[#1F1C1A] px-0 py-14 text-slate-300 md:py-16">
    
      <div className="eh-home-footer-container relative z-10 mx-auto w-full max-w-[1296px] px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
              <a href="https://rohitpant.in/" target="_blank" rel="noopener noreferrer" className="font-black text-orange-300 hover:text-white">
                Rohit Pant
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.slice(0, 2).map((link) => (
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
