import {
  LayoutDashboard,
  MousePointerClick,
  QrCode,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Wand2,
  Zap,
} from "lucide-react";

// TODO: Replace these illustrative figures with verified platform metrics before publishing.
export const stats = [
  { value: "120+", label: "Events created (example)" },
  { value: "45k+", label: "Registrations handled (example)" },
  { value: "80+", label: "Organizers onboarded (example)" },
  { value: "24+", label: "Event communities (example)" },
];

export const trustedBrands = [
  "CONFERENCES", "WORKSHOPS", "MEETUPS", "SUMMITS", "COMMUNITIES", "FESTIVALS",
];

export const ratingCards = [
  {
    icon: <Star size={20} />,
    title: "Designed to delight",
    desc: "Thoughtful layouts help attendees discover events and explore the details easily.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Focused registration journey",
    desc: "Clear event pages give guests a simple path from curiosity to registration.",
  },
  {
    icon: <Zap size={20} />,
    title: "Fast Event Launch",
    desc: "Organizers can publish beautiful event pages without messy setup.",
  },
];

export const features = [
  {
    icon: <Wand2 size={23} />,
    title: "Premium event pages",
    desc: "Publish branded event pages with polished hero sections, CTAs and event details.",
  },
  {
    icon: <Search size={23} />,
    title: "Clean discovery flow",
    desc: "Attendees can browse, search and open events without clutter.",
  },
  {
    icon: <LayoutDashboard size={23} />,
    title: "Organizer dashboard",
    desc: "A focused workspace to manage events, registrations and content.",
  },
  {
    icon: <QrCode size={23} />,
    title: "Registration ready",
    desc: "Support attendee capture, event microsites and QR-friendly workflows.",
  },
  {
    icon: <ShieldCheck size={23} />,
    title: "Role-based access",
    desc: "Secure flows for Super Admin, organizers and attendees.",
  },
  {
    icon: <MousePointerClick size={23} />,
    title: "Soft interactions",
    desc: "Modern hover effects, motion and glass cards without overdoing it.",
  },
];

export const workflow = [
  {
    title: "Create event",
    desc: "Add event details, date, location, branding, speakers and important content.",
  },
  {
    title: "Launch microsite",
    desc: "Every event gets a clean event landing page built for trust and registration.",
  },
  {
    title: "Collect registrations",
    desc: "Attendees register through a focused flow while organizers track the data.",
  },
  {
    title: "Manage and grow",
    desc: "Review registrations, showcase events and improve future campaigns.",
  },
];

export const audiences = [
  {
    title: "For Organizers",
    desc: "Launch polished event pages, manage registrations and keep everything organized.",
    icon: <LayoutDashboard size={24} />,
  },
  {
    title: "For Attendees",
    desc: "Discover events quickly, understand details clearly and register with confidence.",
    icon: <Users size={24} />,
  },
  {
    title: "For Admin Teams",
    desc: "Manage platform data, roles and event operations from one clean experience.",
    icon: <ShieldCheck size={24} />,
  },
];

export const testimonials = [
  {
    name: "Sample Organizer",
    role: "Event Organizer",
    text: "EventHive made our event page look professional instantly. The discovery flow feels clean and premium.",
    rating: 5,
  },
  {
    name: "Sample Marketer",
    role: "Marketing Lead",
    text: "The UI feels like a real SaaS product. Search, event cards and registration flow are simple for users.",
    rating: 5,
  },
  {
    name: "Sample Community Lead",
    role: "Community Manager",
    text: "We wanted something modern but not overdesigned. EventHive gives that polished product feel.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Can organizers create their own event pages?",
    a: "Yes, organizers can create event pages with event details, branding, dates, location and content.",
  },
  {
    q: "Is EventHive responsive?",
    a: "Yes, the experience is designed for desktop, tablet and mobile users.",
  },
  {
    q: "Can attendees browse upcoming events?",
    a: "Yes, attendees can discover upcoming events and open event details from the event listing page.",
  },
  {
    q: "Does it support role-based flows?",
    a: "Yes, the platform structure supports role-based access for admin and organizer experiences.",
  },
];
