import { ArrowUpRight, CheckCircle2, ShieldCheck, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import AssetSlot from "./media/AssetSlot";

type AuthMode = "login" | "register";

const panelContent = {
  login: {
    kicker: "Your organiser workspace",
    heading: "Your next event is waiting.",
    description: "Log in to keep your event pages, attendees and registrations together.",
    asset: "preview" as const,
    hint: "Microsite preview · illustrative screen",
    footer: "Approved organisers and Super Admins can access their dashboard.",
  },
  register: {
    kicker: "For organisers in India",
    heading: "Bring your next event to life.",
    description: "Create a public event page, share the link and review registrations after approval.",
    asset: "eventPage" as const,
    hint: "Published event page · illustrative screen",
    footer: "Account registration includes a no-charge simulated checkout and approval.",
  },
};

export default function AuthVisual({ mode }: { mode: AuthMode }) {
  const item = panelContent[mode];
  return (
    <aside className="eh-auth-story" aria-label="About EventHive organiser access">
      <div className="eh-auth-story__grid" aria-hidden="true" />
      <div className="eh-auth-story__content">
        <span className="eh-auth-story__kicker"><span className="eh-auth-story__dot" />{item.kicker}</span>
        <p className="eh-auth-story__headline">{item.heading}</p>
        <p className="eh-auth-story__intro">{item.description}</p>

        <div className="eh-auth-story__visual">
          <div className="eh-auth-story__browser" aria-hidden="true">
            <span className="eh-auth-story__dots"><i /><i /><i /></span>
            <span>EventHive · Product view</span>
            <span>EXAMPLE</span>
          </div>
          <AssetSlot id={item.asset} />
          <div className="eh-auth-story__caption"><CalendarDays size={14} aria-hidden="true" />{item.hint}</div>
        </div>
        <div className="eh-auth-story__status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>{mode === "register" ? "Registration → Approval → Create events" : "Event pages · Attendees · Microsite preview"}</span>
        </div>
        <div className="eh-auth-story__bottom">
          <div><ShieldCheck size={17} aria-hidden="true" /><p>{item.footer}</p></div>
          <Link to="/Events">Explore published events <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </aside>
  );
}
