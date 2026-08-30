import { motion } from "framer-motion";
import type { Speaker } from "../../../Types/eventType";

interface SpeakersSectionProps {
  speakers: Speaker[];
  fallbackPortraits: string[];
  primaryColor: string;
}

const SpeakersSection = ({
  speakers,
  fallbackPortraits,
  primaryColor,
}: SpeakersSectionProps) => {
  if (!speakers.length) return null;

  return (
    <section
      id="speakers"
      className="relative overflow-hidden bg-slate-50 px-4 py-16 sm:px-6 lg:py-24"
    >
      <div
        className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: primaryColor }}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            Speaker lineup
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
            Meet the people on stage
          </h2>
          <p className="mt-4 text-lg font-normal leading-relaxed text-slate-600">
            Speaker cards use the actual event speaker data added by the organizer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, index) => {
            const fallbackImage = fallbackPortraits[index % fallbackPortraits.length];

            return (
              <motion.div
                key={`${speaker.speakerName}-${index}`}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-all hover:shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img
                    src={speaker.speakerImage || fallbackImage}
                    alt={speaker.speakerName}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-5 text-center">
                  <h4 className="text-lg font-bold text-slate-900">{speaker.speakerName}</h4>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: primaryColor }}
                  >
                    {speaker.speakerDesignation}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
