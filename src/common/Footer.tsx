import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  {
    heading: "Product",
    items: [
      { label: "Create event", to: "/OrganizerRegistration" },
      { label: "Features", to: "/#features" },
      { label: "Pricing", to: "/#pricing" },
      { label: "Discover events", to: "/Events" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "How EventHive works", to: "/#how-it-works" },
      { label: "For organisers", to: "/#roles" },
      { label: "Contact sales", to: "/#contact" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Frequently asked questions", to: "/#faq" },
      { label: "Organizer login", to: "/Login" },
      { label: "Support", to: "mailto:support@eventhive.com" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Request privacy information", to: "mailto:support@eventhive.com?subject=EventHive%20privacy%20information" },
      { label: "Request terms", to: "mailto:support@eventhive.com?subject=EventHive%20terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="eh26-site-footer">
      <div className="eh26-footer-inner">
        <div className="eh26-footer-main">
          <div className="eh26-footer-brand">
            <Link to="/" className="eh26-footer-logo"><span aria-hidden="true">e.</span> EventHive</Link>
            <p>Make the event page. Share the link. Bring people together.</p>
            <a href="mailto:support@eventhive.com" className="eh26-footer-contact">Contact support <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="eh26-footer-links">
            {columns.map(group=><div key={group.heading}>
              <h2>{group.heading}</h2>
              <ul>{group.items.map(item=><li key={item.label}>{item.to.startsWith("mailto:")?
                <a href={item.to}>{item.label}</a> : <Link to={item.to}>{item.label}</Link>}
              </li>)}</ul>
            </div>)}
          </div>
        </div>
        <div className="eh26-footer-bottom">
          <p>© {new Date().getFullYear()} EventHive. All rights reserved.</p>
          <p>Made by <a href="https://rohitpant.in/" target="_blank" rel="noopener noreferrer">Rohit Pant</a></p>
          <p>Payment and invoicing features shown on the homepage are planned, not live.</p>
        </div>
      </div>
    </footer>
  );
}
