import { BarChart3, Megaphone, QrCode, Rocket } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Launch events faster",
    desc: "Create polished event pages with banners, speakers, pricing and registrations in minutes.",
  },
  {
    icon: BarChart3,
    title: "Track every signup",
    desc: "Organizer dashboards show registrations, attendees and event performance with clean insights.",
  },
  {
    icon: QrCode,
    title: "Digital identity cards",
    desc: "Export badges and attendee sheets without manually formatting participant data.",
  },
  {
    icon: Megaphone,
    title: "Promote beautifully",
    desc: "Share responsive microsites that look premium on mobile, tablet and desktop.",
  },
];

const Features = () => (
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
    {features.map(({ icon: Icon, title, desc }, idx) => (
      <div key={idx} className="group eh-card eh-surface-hover relative overflow-hidden rounded-[1.75rem] p-6">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
        <div className="relative z-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
            <Icon size={24} />
          </div>
          <h3 className="mb-3 text-lg font-black  text-slate-950 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
            {title}
          </h3>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Features;
