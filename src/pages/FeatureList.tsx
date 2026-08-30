import { BarChart3, CalendarPlus, Mail, QrCode, ShieldCheck, UsersRound } from "lucide-react";

const features = [
  { label: "Create unlimited events", icon: CalendarPlus },
  { label: "Manage attendees", icon: UsersRound },
  { label: "Live stats dashboard", icon: BarChart3 },
  { label: "QR code check-ins", icon: QrCode },
  { label: "Automated emails", icon: Mail },
  { label: "Secure & reliable", icon: ShieldCheck },
];

const FeatureList = () => (
  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {features.map(({ label, icon: Icon }) => (
      <div key={label} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-cyan-400 group-hover:text-slate-950">
          <Icon size={19} />
        </div>
        <span className="text-sm font-bold text-slate-100 transition-colors group-hover:text-white">{label}</span>
      </div>
    ))}
  </div>
);

export default FeatureList;
