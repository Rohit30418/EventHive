import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const topics = [
  { value:"founding", label:"Founding organiser invitation" },
  { value:"paid", label:"Paid events waitlist" },
  { value:"teams", label:"College and team requirements" },
  { value:"general", label:"Other organiser enquiry" },
] as const;

function selectedTopic(search:string) {
  const raw = new URLSearchParams(search).get("topic");
  return topics.some(topic => topic.value === raw) ? raw! : "general";
}

export default function ContactForm() {
  const { search } = useLocation();
  const [topic,setTopic] = useState(selectedTopic(search));
  const [status,setStatus] = useState<Status>("idle");
  const [message,setMessage] = useState("");
  useEffect(()=>{setTopic(selectedTopic(search));},[search]);

  async function send(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form=event.currentTarget;
    if(!form.reportValidity()) return;

    const values = new FormData(form);
    const request = {
      name: String(values.get("name") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      organisation: String(values.get("organisation") ?? "").trim(),
      topic,
      message: String(values.get("message") ?? "").trim(),
      companyWebsite: String(values.get("companyWebsite") ?? ""), // anti-bot honeypot
    };
    if(request.name.length<2 || request.message.length<12) {
      setStatus("error"); setMessage("Please enter your name and at least 12 characters about the event.");
      return;
    }
    setStatus("sending");setMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(()=>controller.abort(),15000);
    try {
      const response = await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(request),
        signal:controller.signal,
      });
      if(!response.ok) {
        const details=await response.json().catch(()=>({}));
        throw new Error(typeof details.error === "string" ? details.error : "We couldn't send your request. Please try again.");
      }
      setStatus("success");
      setMessage("Your enquiry has been received. The team can review it in the organiser enquiries collection.");
      form.reset();
    } catch(err) {
      setStatus("error");
      setMessage(err instanceof Error && err.name !== "AbortError"
        ? err.message
        : "The request timed out. Please check your connection and try again.");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return <section id="contact" className="ea-section ea-contact" aria-labelledby="ea-contact-heading">
    <div className="ea-wrap ea-contact-layout">
      <div className="ea-contact-copy">
        <span className="ea-small-index">TALK TO THE TEAM</span>
        <h2 id="ea-contact-heading">Tell us about the event you're planning.</h2>
        <p>For founding organisers, college committees and teams asking about future paid-event features.</p>
        <div className="ea-contact-assurance"><ShieldCheck size={21}/><span>We only use these details to respond to your enquiry.</span></div>
      </div>
      <form className="ea-contact-form" onSubmit={send}>
        <div className="ea-form-row">
          <label htmlFor="ea-contact-name">Your name
            <input id="ea-contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name"/>
          </label>
          <label htmlFor="ea-contact-email">Email address
            <input id="ea-contact-email" name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@example.in"/>
          </label>
        </div>
        <label htmlFor="ea-contact-org">College, team or organisation
          <input id="ea-contact-org" name="organisation" autoComplete="organization" maxLength={160} placeholder="Optional"/>
        </label>
        <label htmlFor="ea-contact-topic">What can we help with?
          <select id="ea-contact-topic" value={topic} onChange={e=>setTopic(e.target.value)} name="topic" required>
            {topics.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
        <label htmlFor="ea-contact-message">Tell us a little about it
          <textarea id="ea-contact-message" name="message" required minLength={12} maxLength={2000} rows={4}
            placeholder="What kind of event are you running, and what do you need?"/>
        </label>
        <div className="ea-bot-trap" aria-hidden="true"><label htmlFor="ea-company-website">Leave this empty
          <input id="ea-company-website" type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label></div>
        <button className="ea-btn ea-btn--ink" type="submit" disabled={status==="sending"}>
          {status==="sending" ? "Sending enquiry…" : "Send enquiry"}
          <ArrowRight size={18} aria-hidden="true"/>
        </button>
        <p className="ea-form-disclaimer">This sends to EventHive's backend when it is deployed. No payment details are collected.</p>
        {status === "success" && <p className="ea-form-success" role="status"><CheckCircle2 size={18} aria-hidden="true"/>{message}</p>}
        {status === "error" && <div className="ea-form-error" role="alert">
          <p>{message}</p>
          <a href="mailto:support@eventhive.com?subject=EventHive%20organiser%20enquiry"><Mail size={16}/> Email us instead</a>
        </div>}
      </form>
    </div>
  </section>;
}
