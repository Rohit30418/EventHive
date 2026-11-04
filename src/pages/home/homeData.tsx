import { LayoutDashboard, MousePointerClick, QrCode, Search, ShieldCheck, Users, Wand2 } from "lucide-react";

export const features = [
  {
    icon: <Wand2 size={23} />,
    title: "Premium event pages",
    desc: "Create branded event pages with the important details in one easy-to-read place.",
  },
  {
    icon: <Search size={23} />,
    title: "Clean discovery flow",
    desc: "Browse available events, explore details and find something worth attending.",
  },
  {
    icon: <LayoutDashboard size={23} />,
    title: "Organizer dashboard",
    desc: "A focused space to manage your events, registrations and event content.",
  },
  {
    icon: <QrCode size={23} />,
    title: "Registration ready",
    desc: "Give guests a clear registration form and make attendee details easier to manage.",
  },
  {
    icon: <ShieldCheck size={23} />,
    title: "Role-based access",
    desc: "Separate organizer and administration experiences with role-specific interfaces.",
  },
  {
    icon: <MousePointerClick size={23} />,
    title: "Thoughtful interactions",
    desc: "Simple navigation and helpful feedback keep each step easy to understand.",
  },
];

export const workflow = [
  { title: "Create event", desc: "Add event details, a date, a location and your branding." },
  { title: "Launch microsite", desc: "Share an event page with your community." },
  { title: "Collect registrations", desc: "Welcome attendees through an easy registration process." },
  { title: "Manage and grow", desc: "Review registration details and prepare for the event." },
];

export const audiences = [
  {
    title: "For Organizers",
    desc: "Create events, manage registrations and keep all event details organized.",
    icon: <LayoutDashboard size={24} />,
  },
  {
    title: "For Attendees",
    desc: "Browse events, learn what to expect and register with confidence.",
    icon: <Users size={24} />,
  },
  {
    title: "For Admin Teams",
    desc: "Review organizer access and support platform operations in one place.",
    icon: <ShieldCheck size={24} />,
  },
];

export const faqs = [
  {
    q: "Can organizers create their own event pages?",
    a: "Yes. Organizers can add event details, branding, dates, location and content.",
  },
  {
    q: "Is EventHive responsive?",
    a: "The interface is designed for desktop, tablet and mobile screens.",
  },
  {
    q: "Can attendees browse upcoming events?",
    a: "Yes. Attendees can discover upcoming events and open their event pages for details.",
  },
  {
    q: "Does it support role-based flows?",
    a: "Yes. EventHive has separate organizer and administration experiences.",
  },
];
