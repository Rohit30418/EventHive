import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Accessibility,
  AlignJustify,
  Contrast,
  EyeOff,
  Mail,
  MessageCircle,
  Minus,
  MousePointer2,
  Pause,
  Phone,
  Plus,
  RotateCcw,
  Type,
  Underline,
  Volume2,
  X,
} from "lucide-react";

type AccessibilityState = {
  textSize: 0 | 1 | 2;
  lineHeight: boolean;
  readableFont: boolean;
  hideImages: boolean;
  grayscale: boolean;
  invert: boolean;
  underlineLinks: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;
};

const defaultState: AccessibilityState = {
  textSize: 0,
  lineHeight: false,
  readableFont: false,
  hideImages: false,
  grayscale: false,
  invert: false,
  underlineLinks: false,
  bigCursor: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "eventhive-accessibility";

// Keep contact values centralized here.
// Email is live. Add a phone number once the final support number is confirmed.
const CONTACT_EMAIL = "support@eventhive.com";
const CONTACT_PHONE = "";
const CONTACT_WHATSAPP = "";

const classMap: Array<[keyof Omit<AccessibilityState, "textSize">, string]> = [
  ["lineHeight", "a11y-line-height"],
  ["readableFont", "a11y-readable-font"],
  ["hideImages", "a11y-hide-images"],
  ["grayscale", "a11y-grayscale"],
  ["invert", "a11y-invert"],
  ["underlineLinks", "a11y-underline-links"],
  ["bigCursor", "a11y-big-cursor"],
  ["pauseAnimations", "a11y-pause-animations"],
];

const FloatingTools = () => {
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>(defaultState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSettings({ ...defaultState, ...JSON.parse(saved) });
      }
    } catch {
      // Ignore malformed or unavailable local storage.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("a11y-text-large", "a11y-text-xlarge");
    if (settings.textSize === 1) root.classList.add("a11y-text-large");
    if (settings.textSize === 2) root.classList.add("a11y-text-xlarge");

    classMap.forEach(([key, className]) => {
      root.classList.toggle(className, Boolean(settings[key]));
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const enabledCount = useMemo(
    () =>
      Object.entries(settings).reduce(
        (count, [key, value]) =>
          count + (key === "textSize" ? Number(value) > 0 ? 1 : 0 : value ? 1 : 0),
        0
      ),
    [settings]
  );

  const toggle = (key: keyof Omit<AccessibilityState, "textSize">) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const changeTextSize = (direction: -1 | 1) => {
    setSettings((current) => {
      const next = Math.max(0, Math.min(2, current.textSize + direction)) as 0 | 1 | 2;
      return { ...current, textSize: next };
    });
  };

  const reset = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setSettings(defaultState);
  };

  const readPage = () => {
    if (!("speechSynthesis" in window)) return;

    if (speaking || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const source =
      document.querySelector("main") ||
      document.querySelector('[role="main"]') ||
      document.body;

    const text = (source.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 7000);

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const optionClass = (active: boolean) =>
    `flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-center text-xs font-bold transition-all ${
      active
        ? "border-[var(--eh-primary)] bg-[var(--eh-primary-100)] text-[var(--eh-primary-800)]"
        : "border-[var(--eh-border)] bg-white text-[var(--eh-muted-strong)] hover:border-[var(--eh-primary)]"
    }`;

  return createPortal(
    <>
      <div
        className="eh-floating-actions"
        aria-label="Quick contact and accessibility tools"
      >
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="eh-floating-action"
          aria-label="Email EventHive support"
          title="Email"
        >
          <Mail size={19} />
        </a>

        {CONTACT_PHONE ? (
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="eh-floating-action"
            aria-label="Call EventHive support"
            title="Call"
          >
            <Phone size={19} />
          </a>
        ) : (
          <button
            type="button"
            className="eh-floating-action opacity-55"
            aria-label="Phone support number pending"
            title="Phone number pending"
          >
            <Phone size={19} />
          </button>
        )}

        {CONTACT_WHATSAPP ? (
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="eh-floating-action"
            aria-label="Chat with EventHive on WhatsApp"
            title="WhatsApp"
          >
            <MessageCircle size={19} />
          </a>
        ) : (
          <button
            type="button"
            className="eh-floating-action opacity-55"
            aria-label="WhatsApp number pending"
            title="WhatsApp number pending"
          >
            <MessageCircle size={19} />
          </button>
        )}

        <button
          type="button"
          className="eh-floating-action eh-floating-action-primary relative"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="eventhive-accessibility-panel"
          aria-label="Open accessibility options"
          title="Accessibility"
        >
          <Accessibility size={21} />
          {enabledCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--eh-text)] px-1 text-[10px] font-extrabold text-white">
              {enabledCount}
            </span>
          )}
        </button>
      </div>

      {open && (
        <aside
          id="eventhive-accessibility-panel"
          className="eh-accessibility-panel"
          aria-label="Accessibility settings"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[var(--eh-border)] px-5 py-4">
            <div>
              <p className="font-['Manrope',sans-serif] text-base font-extrabold text-[var(--eh-text)]">
                Accessibility
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--eh-muted)]">
                Adjust the interface to your needs.
              </p>
            </div>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--eh-border)] bg-white text-[var(--eh-muted-strong)] hover:border-[var(--eh-primary)] hover:text-[var(--eh-primary)]"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility settings"
            >
              <X size={17} />
            </button>
          </div>

          <div className="max-h-[min(70vh,620px)] overflow-y-auto p-4">
            <div className="mb-3 grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-2xl border border-[var(--eh-border)] bg-[var(--eh-bg)] p-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--eh-text)]">
                <Type size={16} className="text-[var(--eh-primary)]" />
                Text size
              </div>
              <button
                type="button"
                onClick={() => changeTextSize(-1)}
                disabled={settings.textSize === 0}
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--eh-border)] bg-white disabled:opacity-40"
                aria-label="Decrease text size"
              >
                <Minus size={15} />
              </button>
              <button
                type="button"
                onClick={() => changeTextSize(1)}
                disabled={settings.textSize === 2}
                className="grid h-9 w-9 place-items-center rounded-full bg-[var(--eh-primary)] text-white disabled:opacity-40"
                aria-label="Increase text size"
              >
                <Plus size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button type="button" onClick={() => toggle("lineHeight")} className={optionClass(settings.lineHeight)}>
                <AlignJustify size={19} /> Line spacing
              </button>
              <button type="button" onClick={() => toggle("readableFont")} className={optionClass(settings.readableFont)}>
                <Type size={19} /> Readable font
              </button>
              <button type="button" onClick={() => toggle("hideImages")} className={optionClass(settings.hideImages)}>
                <EyeOff size={19} /> Hide images
              </button>
              <button type="button" onClick={() => toggle("grayscale")} className={optionClass(settings.grayscale)}>
                <Contrast size={19} /> Grayscale
              </button>
              <button type="button" onClick={() => toggle("invert")} className={optionClass(settings.invert)}>
                <Contrast size={19} /> Invert colors
              </button>
              <button type="button" onClick={() => toggle("underlineLinks")} className={optionClass(settings.underlineLinks)}>
                <Underline size={19} /> Underline links
              </button>
              <button type="button" onClick={() => toggle("bigCursor")} className={optionClass(settings.bigCursor)}>
                <MousePointer2 size={19} /> Large cursor
              </button>
              <button type="button" onClick={() => toggle("pauseAnimations")} className={optionClass(settings.pauseAnimations)}>
                <Pause size={19} /> Pause motion
              </button>
              <button type="button" onClick={readPage} className={optionClass(speaking)}>
                <Volume2 size={19} /> {speaking ? "Stop reading" : "Read page"}
              </button>
              <button type="button" onClick={reset} className={optionClass(false)}>
                <RotateCcw size={19} /> Reset
              </button>
            </div>
          </div>
        </aside>
      )}
    </>,
    document.body
  );
};

export default FloatingTools;
