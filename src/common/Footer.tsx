import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

const links = [
  { title: "Product", entries: [
    { label: "Register as organiser", to: "/OrganizerRegistration" },
    { label: "Product", to: "/#product" },
    { label: "Browse events", to: "/Events" },
  ] },
  { title: "Resources", entries: [
    { label: "How it works", to: "/#how-it-works" },
    { label: "Pricing", to: "/#pricing" },
    { label: "Questions", to: "/#faq" },
  ] },
  { title: "Company & legal", entries: [
    { label: "Founding organisers", to: "/#founding" },
    { label: "Contact", to: "/#contact" },
    { label: "Request terms", to: "mailto:support@eventhive.com?subject=Request%20EventHive%20terms" },
    { label: "Request privacy policy", to: "mailto:support@eventhive.com?subject=Request%20EventHive%20privacy%20policy" },
  ] },
];

export default function Footer() {
  return <footer className="ea-site-footer">
    <div className="ea-site-footer-wrap">
      <div className="ea-site-footer-top">
        <div className="ea-site-footer-identity">
          <Link to="/" className="ea-site-footer-brand"><span className="ea-site-footer-brand-icon"><BrandMark className="ea-site-hex" /></span><span>EventHive</span></Link>
          <p>One event page. A clear guest list. More room to focus on the people turning up.</p>
          <a href="mailto:support@eventhive.com" className="ea-site-footer-mail">Contact EventHive <ArrowUpRight size={16}/></a>
        </div>
        <div className="ea-site-footer-columns">
          {links.map(group => <div key={group.title}>
            <h2>{group.title}</h2>
            <ul>{group.entries.map(link => <li key={link.label}>
              {link.to.startsWith("mailto:") ? <a href={link.to}>{link.label}</a> : <Link to={link.to}>{link.label}</Link>}
            </li>)}</ul>
          </div>)}
        </div>
      </div>
      <div className="ea-site-footer-bottom"><span>© {new Date().getFullYear()} EventHive</span><span>Built for organisers in India.</span><span>Free registration pages available. Paid checkout not yet supported.</span></div>
    </div>
  </footer>;
}
