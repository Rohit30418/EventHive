import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Accessibility, AlignJustify, ArrowUpRight, Contrast, EyeOff, Mail,
  MessageCircle, Minus, MousePointer2, Pause, Phone, Plus,
  RotateCcw, Type, Underline, Volume2, X,
  type LucideIcon,
} from "lucide-react";

type SwitchKey =
  | "lineSpacing" | "readableFont" | "hideImages" | "grayscale"
  | "invertColors" | "underlineLinks" | "largeCursor" | "pauseMotion";

type AccessibilitySettings = Record<SwitchKey, boolean> & { textSize: number };

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 0,
  lineSpacing: false,
  readableFont: false,
  hideImages: false,
  grayscale: false,
  invertColors: false,
  underlineLinks: false,
  largeCursor: false,
  pauseMotion: false,
};
const STORAGE_KEY = "eventhive-home-accessibility";

function initialSettings(): AccessibilitySettings {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_SETTINGS;
    const parsed: unknown = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object") return DEFAULT_SETTINGS;
    const obj = parsed as Record<string, unknown>;
    const next = { ...DEFAULT_SETTINGS };
    (Object.keys(DEFAULT_SETTINGS) as (keyof AccessibilitySettings)[]).forEach((key) => {
      if (key === "textSize") {
        next.textSize = typeof obj[key] === "number" && Number.isFinite(obj[key])
          ? Math.min(3, Math.max(-1, Math.round(obj[key]))) : 0;
      } else if (typeof obj[key] === "boolean") {
        next[key] = obj[key];
      }
    });
    return next;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  toggle: (key: SwitchKey) => void;
  resize: (difference: number) => void;
  reset: () => void;
};
const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function HomeAccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(initialSettings);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* Storage unavailable. */ }
  }, [settings]);

  const toggle = (key: SwitchKey) => setSettings((current) => ({ ...current, [key]: !current[key] }));
  const resize = (difference: number) => setSettings((current) => ({
    ...current,
    textSize: Math.min(3, Math.max(-1, current.textSize + difference)),
  }));
  const reset = () => setSettings({ ...DEFAULT_SETTINGS });

  return (
    <AccessibilityContext.Provider value={{ settings, toggle, resize, reset }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useHomeAccessibility() {
  const value = useContext(AccessibilityContext);
  if (!value) throw new Error("HomeAccessibilityProvider is required");
  return value;
}

const options: { key: SwitchKey; label: string; icon: LucideIcon }[] = [
  { key: "lineSpacing", label: "Line spacing", icon: AlignJustify },
  { key: "readableFont", label: "Readable font", icon: Type },
  { key: "hideImages", label: "Hide images", icon: EyeOff },
  { key: "grayscale", label: "Grayscale", icon: Contrast },
  { key: "invertColors", label: "Invert colors", icon: Contrast },
  { key: "underlineLinks", label: "Underline links", icon: Underline },
  { key: "largeCursor", label: "Large cursor", icon: MousePointer2 },
  { key: "pauseMotion", label: "Pause motion", icon: Pause },
];

const SUPPORT_EMAIL = "support@eventhive.com"; // Matches the existing footer contact link.
const phoneFromEnv: string = import.meta.env.VITE_SUPPORT_PHONE?.trim() || "";
const SUPPORT_PHONE = /^\+?[0-9() \-]{7,25}$/.test(phoneFromEnv) ? phoneFromEnv : "";
const chatFromEnv: string = import.meta.env.VITE_SUPPORT_CHAT_URL?.trim() || "";
const SUPPORT_CHAT_URL = /^https:\/\//i.test(chatFromEnv) ? chatFromEnv : "";

type OpenPanel = "accessibility" | "phone" | "message" | null;

export function HomeFloatingTools() {
  const { settings, toggle, resize, reset } = useHomeAccessibility();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [message, setMessage] = useState("");
  const [reading, setReading] = useState(false);
  const headingId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const accessButtonRef = useRef<HTMLButtonElement>(null);
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const messageButtonRef = useRef<HTMLButtonElement>(null);

  const closePanel = () => {
    const focusTarget =
      openPanel === "accessibility" ? accessButtonRef :
      openPanel === "phone" ? phoneButtonRef : messageButtonRef;
    setOpenPanel(null);
    requestAnimationFrame(() => focusTarget.current?.focus());
  };
  const togglePanel = (target: Exclude<OpenPanel, null>) => {
    if (openPanel === target) closePanel();
    else setOpenPanel(target);
  };

  useEffect(() => {
    if (!openPanel) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenPanel(null);
        const target = openPanel === "accessibility" ? accessButtonRef : openPanel === "phone" ? phoneButtonRef : messageButtonRef;
        requestAnimationFrame(() => target.current?.focus());
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openPanel]);

  useEffect(() => {
    if (reading && !("speechSynthesis" in window)) setReading(false);
    return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, [reading]);

  const readPage = () => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    if (reading) {
      window.speechSynthesis.cancel();
      setReading(false);
      return;
    }
    window.speechSynthesis.cancel();
    const page = document.querySelector(".eh-home");
    const text = page?.textContent?.replace(/\s+/g, " ").trim().slice(0, 12000) || "";
    if (!text) return;
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    speech.onend = () => setReading(false);
    speech.onerror = () => setReading(false);
    window.speechSynthesis.speak(speech);
    setReading(true);
  };

  const messageLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("EventHive support request")}&body=${encodeURIComponent(message)}`;

  return createPortal(
    <>
      <div className="eh-float-tools" aria-label="Contact and accessibility shortcuts">
        <a href={`mailto:${SUPPORT_EMAIL}`} className="eh-float-tool" aria-label="Email EventHive support" title="Email support"><Mail size={24} /></a>
        <button ref={phoneButtonRef} type="button" className="eh-float-tool" onClick={() => togglePanel("phone")} aria-label="Phone contact options" aria-expanded={openPanel === "phone"} title="Phone contact"><Phone size={23} /></button>
        <button ref={messageButtonRef} type="button" className="eh-float-tool" onClick={() => togglePanel("message")} aria-label="Message EventHive support" aria-expanded={openPanel === "message"} title="Message support"><MessageCircle size={24} /></button>
        <button ref={accessButtonRef} type="button" className="eh-float-tool eh-float-access" onClick={() => togglePanel("accessibility")} aria-label="Accessibility settings" aria-expanded={openPanel === "accessibility"} title="Accessibility settings"><Accessibility size={27} /></button>
      </div>

      {openPanel && (
        <section className="eh-assist-panel" role="dialog" aria-modal="false" aria-labelledby={headingId}>
          <header className="eh-assist-heading">
            <div>
              <h2 id={headingId}>{openPanel === "accessibility" ? "Accessibility" : openPanel === "phone" ? "Phone support" : "Message us"}</h2>
              <p>{openPanel === "accessibility" ? "Adjust the interface to your needs." : openPanel === "phone" ? "Get in touch with the EventHive team." : "Send a message to our support email."}</p>
            </div>
            <button ref={closeButtonRef} type="button" className="eh-assist-close" onClick={closePanel} aria-label="Close panel"><X size={23} /></button>
          </header>

          {openPanel === "accessibility" ? (
            <div className="eh-assist-scroll">
              <div className="eh-assist-text-size">
                <span className="eh-assist-text-label"><Type size={21} aria-hidden="true" /> Text size</span>
                <div className="eh-assist-size-controls">
                  <button type="button" onClick={() => resize(-1)} disabled={settings.textSize <= -1} aria-label="Decrease text size"><Minus size={20} /></button>
                  <span className="sr-only" aria-live="polite">Text size level {settings.textSize}</span>
                  <button type="button" onClick={() => resize(1)} disabled={settings.textSize >= 3} aria-label="Increase text size"><Plus size={21} /></button>
                </div>
              </div>
              <div className="eh-assist-options">
                {options.map(({ key, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={key}
                    className={`eh-assist-option${settings[key] ? " is-active" : ""}`}
                    aria-pressed={settings[key]}
                    onClick={() => toggle(key)}
                  >
                    <Icon size={24} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
                <button type="button" onClick={readPage} className={`eh-assist-option${reading ? " is-active" : ""}`} aria-pressed={reading}>
                  <Volume2 size={24} aria-hidden="true" />
                  <span>{reading ? "Stop reading" : "Read aloud"}</span>
                </button>
                <button type="button" onClick={() => { reset(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setReading(false); }} className="eh-assist-option">
                  <RotateCcw size={24} aria-hidden="true" />
                  <span>Reset settings</span>
                </button>
              </div>
              <p className="eh-assist-footnote">Your preferences are saved in this browser.</p>
            </div>
          ) : openPanel === "phone" ? (
            <div className="eh-assist-contact">
              {SUPPORT_PHONE ? (
                <a className="eh-assist-primary" href={`tel:${SUPPORT_PHONE.replace(/[^0-9+]/g, "")}`}>Call {SUPPORT_PHONE} <ArrowUpRight size={18} /></a>
              ) : (
                <p>A phone number hasn't been configured for this website yet. Please contact the team by email.</p>
              )}
              <a className="eh-assist-primary" href={`mailto:${SUPPORT_EMAIL}`}>Email support <Mail size={18} /></a>
            </div>
          ) : (
            <div className="eh-assist-contact">
              {SUPPORT_CHAT_URL ? (
                <a className="eh-assist-primary" href={SUPPORT_CHAT_URL} target="_blank" rel="noopener noreferrer">Open live chat <ArrowUpRight size={18} /></a>
              ) : (
                <>
                  <label htmlFor="eh-contact-message">Your message</label>
                  <textarea id="eh-contact-message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="How can we help?" />
                  <a className="eh-assist-primary" href={messageLink}>Open email app <Mail size={18} /></a>
                  <p>This opens your email app; live chat is not connected.</p>
                </>
              )}
            </div>
          )}
        </section>
      )}
    </>,
    document.body
  );
}

export function HomeAccessibilityEffects() {
  const { settings } = useHomeAccessibility();
  useEffect(() => {
    const node = document.querySelector<HTMLElement>(".eh-home");
    if (!node) return;
    const classes = [
      "eh-access-spaced", "eh-access-readable", "eh-access-hide-images",
      "eh-access-grayscale", "eh-access-inverted", "eh-access-underline",
      "eh-access-large-cursor", "eh-access-paused",
    ];
    const active = [
      settings.lineSpacing, settings.readableFont, settings.hideImages,
      settings.grayscale, settings.invertColors, settings.underlineLinks,
      settings.largeCursor, settings.pauseMotion,
    ];
    classes.forEach((name, index) => node.classList.toggle(name, active[index]));
    node.dataset.accessTextSize = String(settings.textSize);
    return () => {
      node.classList.remove(...classes);
      delete node.dataset.accessTextSize;
    };
  }, [settings]);
  return null;
}
