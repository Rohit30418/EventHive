import { motion } from "framer-motion";
import { CalendarDays, Download, MapPin, Ticket } from "lucide-react";
import type { EventType } from "../../Types/eventType";

interface AppDownloadSectionProps {
  featuredEvent?: EventType;
}

const formatDate = (value?: string) => {
  if (!value) return "Date TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AppDownloadSection = ({ featuredEvent }: AppDownloadSectionProps) => (
  <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-[2rem] bg-[var(--eh-text)] px-5 py-10 text-white sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-14 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-xl"
      >
        <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--eh-accent)] sm:text-xs">
          <Download size={15} /> EventHive mobile
        </div>

        <h2 className="mt-5 font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.08] tracking-[-0.008em] sm:text-4xl lg:text-5xl">
          Take your events with you.
        </h2>

        <p className="mt-5 max-w-lg text-[15px] font-medium leading-7 tracking-[0.005em] text-white/55 sm:text-base sm:leading-8">
          Discover events, view event details and keep your registrations close from a clean mobile-first EventHive experience.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-left text-[var(--eh-text)] transition-transform hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none">●</span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--eh-muted)]">Coming soon on</span>
              <span className="block font-['Manrope',sans-serif] text-sm font-extrabold">App Store</span>
            </span>
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3.5 text-left text-white transition-transform hover:-translate-y-0.5 hover:bg-white/[0.1]"
          >
            <span className="text-lg leading-none">▶</span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-white/45">Coming soon on</span>
              <span className="block font-['Manrope',sans-serif] text-sm font-extrabold">Google Play</span>
            </span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.08 }}
        className="relative mx-auto flex min-h-[500px] w-full max-w-[520px] items-end justify-center sm:min-h-[560px]"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--eh-primary)]/25 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative z-10 w-[250px] rounded-[2.8rem] border-[8px] border-[#11100f] bg-[#11100f] p-2 shadow-[0_35px_80px_rgba(0,0,0,0.38)] sm:w-[285px]">
          <div className="overflow-hidden rounded-[2.25rem] bg-[var(--eh-bg)]">
            <div className="flex items-center justify-between px-5 pb-3 pt-4">
              <span className="font-['Manrope',sans-serif] text-sm font-extrabold text-[var(--eh-text)]">
                Event<span className="text-[var(--eh-primary)]">Hive</span>
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--eh-primary)]" />
            </div>

            <div className="px-4 pb-5">
              <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_40px_rgba(30,28,27,0.08)]">
                <div className="relative h-44 bg-[var(--eh-primary-100)] sm:h-48">
                  <img
                    src={featuredEvent?.banner || "/hero.png"}
                    alt={featuredEvent?.EventName || "EventHive mobile event preview"}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[var(--eh-primary)]">
                    Featured
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-['Manrope',sans-serif] text-lg font-extrabold leading-[1.1] tracking-[0.002em] text-[var(--eh-text)]">
                    {featuredEvent?.EventName || "Design & Product Summit"}
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    <p className="flex items-center gap-2 text-[11px] font-bold text-[var(--eh-muted)]">
                      <CalendarDays size={14} className="text-[var(--eh-primary)]" />
                      {formatDate(featuredEvent?.eventDate)}
                    </p>
                    <p className="flex items-center gap-2 text-[11px] font-bold text-[var(--eh-muted)]">
                      <MapPin size={14} className="text-[var(--eh-primary)]" />
                      <span className="truncate">{featuredEvent?.location || "New Delhi, India"}</span>
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[var(--eh-primary)] px-4 py-3 text-xs font-extrabold text-white">
                    <Ticket size={14} /> View event
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[var(--eh-primary-100)] p-3">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[var(--eh-primary)]">Discover</p>
                  <p className="mt-1 text-[11px] font-bold leading-4 text-[var(--eh-text)]">Browse upcoming events</p>
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[var(--eh-primary)]">Register</p>
                  <p className="mt-1 text-[11px] font-bold leading-4 text-[var(--eh-text)]">Keep event access handy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-14 left-0 hidden rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur-sm sm:block">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--eh-accent)]">Mobile ready</p>
          <p className="mt-1 text-sm font-bold text-white">Discover on the go</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AppDownloadSection;
