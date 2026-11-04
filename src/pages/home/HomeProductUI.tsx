import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, CalendarDays, Check, CheckCircle2, CircleCheck, ClipboardList,
  Compass, LayoutDashboard, Mail, MousePointer2, Plus, QrCode,
  Search, ShieldCheck, Sparkles, Ticket, Users, WandSparkles,
} from "lucide-react";

/** Product-shaped illustrations: no invented metrics, customers or live-data claims. */
export function FeatureArtwork({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="eh-art-surface eh-art-event">
          <div className="eh-art-browser"><i /><i /><i /><span>eventhive / your event</span></div>
          <div className="eh-art-event-cover">
            <div className="eh-art-event-lines"><small>YOUR EVENT. YOUR STORY.</small><strong>Make it<br />memorable.</strong><em>CREATE · CONNECT · CELEBRATE</em></div>
            <svg viewBox="0 0 260 180" aria-hidden="true"><circle cx="150" cy="90" r="71" stroke="#FFAF7D" strokeWidth="2" fill="none" opacity=".8"/><circle cx="150" cy="90" r="54" stroke="#FFAF7D" strokeWidth="1" fill="none" opacity=".5"/><path d="M107 152V99a43 43 0 0 1 86 0v53" fill="#F26B2A"/><circle cx="150" cy="112" r="23" fill="#FFE6D5"/><path d="m141 111 7 8 15-17" stroke="#A63E18" strokeWidth="4" strokeLinecap="round" fill="none"/></svg>
          </div>
          <div className="eh-art-event-footer"><span><CalendarDays size={13}/> Event schedule</span><span className="eh-art-orange-pill">Register <ArrowRight size={12}/></span></div>
        </div>
      );
    case 1:
      return (
        <div className="eh-art-surface eh-art-discover">
          <div className="eh-art-search"><Search size={16}/><span>Find your next experience</span><span className="eh-art-search-icon"><ArrowRight size={14}/></span></div>
          <div className="eh-art-discover-grid">
            {["Explore", "Discover", "Join"].map((name, i) => <div key={name} className={"eh-art-discover-card eh-art-discover-" + i}><span>{["01", "02", "03"][i]}</span><strong>{name}</strong><i /></div>)}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="eh-art-surface eh-art-chart">
          <div className="eh-art-panel-head"><span><LayoutDashboard size={15}/> Organizer overview</span><span className="eh-art-dots">•••</span></div>
          <div className="eh-art-chart-body">
            <div className="eh-art-side-labels"><span>Invitations</span><strong>Event activity</strong><small>At a glance</small></div>
            <svg viewBox="0 0 300 140" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 34H300M0 70H300M0 106H300" stroke="#EADFD6" strokeWidth="1" strokeDasharray="5 6"/>
              <path d="M3 118C40 125 50 52 91 73S135 110 166 70 211 97 240 47 276 58 297 24" stroke="#F26B2A" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="240" cy="47" r="7" stroke="#FFF8F3" strokeWidth="4" fill="#F26B2A"/>
            </svg>
          </div>
          <div className="eh-art-chart-foot"><span><i/> Pages</span><span><i/> Registrations</span><span><i/> Guests</span></div>
        </div>
      );
    case 3:
      return (
        <div className="eh-art-surface eh-art-register">
          <div className="eh-art-register-head"><div className="eh-art-icon-sm"><Ticket size={17}/></div><span>Event registration</span><CheckCircle2 size={17}/></div>
          <div className="eh-art-register-fields"><span>Full name</span><div/><span>Email address</span><div/></div>
          <div className="eh-art-register-action"><Check size={13}/> Details ready</div>
        </div>
      );
    case 4:
      return (
        <div className="eh-art-surface eh-art-access">
          <div className="eh-art-panel-head"><span><ShieldCheck size={15}/> Access by role</span><span className="eh-art-dots">•••</span></div>
          {[
            { name: "Organizers", icon: LayoutDashboard },
            { name: "Attendees", icon: Users },
            { name: "Admin teams", icon: ShieldCheck },
          ].map((item,i) => {
            const Icon = item.icon;
            return <div className="eh-art-access-row" key={item.name}><span className={"eh-art-access-symbol eh-art-access-" + i}><Icon size={15}/></span><span>{item.name}</span><span className="eh-art-access-check"><Check size={13}/></span></div>;
          })}
        </div>
      );
    default:
      return (
        <div className="eh-art-surface eh-art-interaction">
          <div className="eh-art-interaction-flow">
            <div><span><MousePointer2 size={20}/></span><strong>Explore</strong></div>
            <svg viewBox="0 0 90 28" preserveAspectRatio="none" aria-hidden="true"><path d="M0 14H90" stroke="#F26B2A" strokeWidth="2" strokeDasharray="5 7"/><path d="m81 8 8 6-8 6" stroke="#F26B2A" strokeWidth="2" fill="none"/></svg>
            <div><span><CircleCheck size={20}/></span><strong>Ready</strong></div>
          </div>
          <div className="eh-art-interaction-bottom"><span><Sparkles size={14}/> Every detail, considered</span><span className="eh-art-orange-pill"><Check size={13}/> Done</span></div>
        </div>
      );
  }
}

const workspaceTabs = ["Organizer", "Attendee", "Admin"];

export function RoleWorkspace({ role }: { role: number }) {
  const reduceMotion = useReducedMotion();
  const roleViews = [
    { subtitle: "Event management", title: "Your next event, organized.", rows: ["Microsite", "Registrations", "Event details"], action: "Event details ready", icon: ClipboardList },
    { subtitle: "Discover events", title: "Find your next experience.", rows: ["Browse events", "View event details", "Register"], action: "Browse with confidence", icon: Compass },
    { subtitle: "Platform overview", title: "Keep everything on track.", rows: ["Organizer access", "Event activity", "Platform tools"], action: "Workspace at a glance", icon: ShieldCheck },
  ];
  const view = roleViews[role] ?? roleViews[0];
  const Icon = view.icon;
  return (
    <div className="eh-workspace-window">
      <div className="eh-workspace-toolbar"><div className="eh-workspace-dots"><i/><i/><i/></div><span>eventhive.app / workspace</span><div className="eh-workspace-toolbar-badge"><Sparkles size={12}/> EventHive</div></div>
      <div className="eh-workspace-main">
        <div className="eh-workspace-sidebar" aria-hidden="true"><div className="eh-workspace-mark">E</div>{[LayoutDashboard, CalendarDays, Users, ShieldCheck].map((Item,i)=><span key={i} className={i===role?"is-selected":""}><Item size={18}/></span>)}</div>
        <AnimatePresence mode="wait">
          <motion.div key={role} className="eh-workspace-content" initial={reduceMotion?false:{opacity:.8,y:8}} animate={{opacity:1,y:0}} exit={reduceMotion?undefined:{opacity:.8,y:-8}} transition={{duration:reduceMotion?0:.28}}>
            <div className="eh-workspace-heading"><div><small>{view.subtitle}</small><h4>{view.title}</h4></div><span className="eh-workspace-top-icon"><Icon size={20}/></span></div>
            <div className="eh-workspace-tiles"><div><span>01 / PLAN</span><strong>{workspaceTabs[role]}</strong><i/></div><div><span>02 / SHARE</span><strong>Connect</strong><i/></div></div>
            <div className="eh-workspace-list"><div className="eh-workspace-list-title"><span>YOUR WORKSPACE</span><span>•••</span></div>{view.rows.map((label,i)=><div key={label} className="eh-workspace-list-row"><span className="eh-workspace-list-icon">{i===0?<Ticket size={15}/>:i===1?<Mail size={15}/>:<Users size={15}/>}</span><span>{label}</span><CheckCircle2 size={16}/></div>)}</div>
            <div className="eh-workspace-confirm"><CheckCircle2 size={16}/>{view.action}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function JourneyPreview({ step }: { step: number }) {
  const reduceMotion = useReducedMotion();
  const scenes = [
    { kicker: "01 · CREATE", title: "From idea to event.", icon: WandSparkles, label: "Event setup", rows: ["Name & details", "Date & location", "Your branding"] },
    { kicker: "02 · PUBLISH", title: "A page worth sharing.", icon: Ticket, label: "Public microsite", rows: ["Your story", "Speaker lineup", "Event information"] },
    { kicker: "03 · REGISTER", title: "A simple way to join.", icon: QrCode, label: "Attendee flow", rows: ["Registration form", "Guest details", "Confirmation"] },
    { kicker: "04 · MANAGE", title: "Everything in one place.", icon: LayoutDashboard, label: "Organizer workspace", rows: ["Event overview", "Attendee list", "Manage details"] },
  ];
  const scene = scenes[step] ?? scenes[0];
  const Icon = scene.icon;
  return (
    <div className="eh-journey-preview">
      <div className="eh-journey-top"><span><i/> EventHive / product flow</span><span>0{step+1} / 04</span></div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={reduceMotion?false:{opacity:.65,x:15}} animate={{opacity:1,x:0}} exit={reduceMotion?undefined:{opacity:.65,x:-15}} transition={{duration:reduceMotion?0:.25}} className="eh-journey-scene">
          <div className="eh-journey-scene-head"><span className="eh-journey-scene-icon"><Icon size={26}/></span><div><small>{scene.kicker}</small><h4>{scene.title}</h4></div></div>
          <div className="eh-journey-paper"><div className="eh-journey-paper-top"><span className="eh-journey-dots"><i/><i/><i/></span><span>{scene.label}</span><span><Plus size={14}/></span></div>{scene.rows.map((label,i)=><div key={label} className="eh-journey-paper-row"><span className="eh-journey-row-number">0{i+1}</span><span>{label}</span><CheckCircle2 size={17}/></div>)}</div>
          <div className="eh-journey-complete"><CheckCircle2 size={16}/> You’re moving forward <ArrowRight size={16}/></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ProcessIllustration() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="eh-process-art" aria-hidden="true">
      <svg viewBox="0 0 470 168" preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="eh-process-grad" x1="0" x2="1"><stop stopColor="#FFBC94"/><stop offset="1" stopColor="#F26B2A"/></linearGradient></defs>
        <path d="M52 86C108 86 117 22 177 86S258 152 306 86 382 86 418 86" stroke="#E7C5B2" strokeWidth="3" strokeDasharray="6 8" fill="none"/>
        <motion.path d="M52 86C108 86 117 22 177 86S258 152 306 86 382 86 418 86" stroke="url(#eh-process-grad)" strokeWidth="4" fill="none" strokeLinecap="round" initial={reduceMotion?{pathLength:1}:{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true,amount:.4}} transition={{duration:reduceMotion?0:1.6,ease:"easeInOut"}}/>
        {[52,177,306,418].map((cx,i)=><g key={cx}><circle cx={cx} cy="86" r="23" fill="#FFF8F3" stroke="#F26B2A" strokeWidth="2"/><text x={cx} y="92" textAnchor="middle" fill="#9C3911" fontFamily="Space Grotesk,Arial" fontWeight="700" fontSize="15">{"0"+(i+1)}</text></g>)}
      </svg>
    </div>
  );
}
