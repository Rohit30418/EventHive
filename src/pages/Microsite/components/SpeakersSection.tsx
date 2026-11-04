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
    <section id="speakers" className="eh-ms-section bg-[#FFF8F3]">
      <div className="eh-ms-container">
        <div className="eh-ms-section-heading">
          <p className="eh-ms-eyebrow mb-3" style={{ color: primaryColor }}>
            Speaker lineup
          </p>
          <h2 className="eh-ms-heading text-slate-950">
            Meet the people on stage
          </h2>
          <p className="eh-ms-copy">
            Speaker cards use the actual event speaker data added by the organizer.
          </p>
        </div>

        <div className="eh-ms-speakers">
          {speakers.map((speaker, index) => {
            const fallbackImage = fallbackPortraits[index % fallbackPortraits.length];

            return (
              <article key={`${speaker.speakerName}-${index}`} className="eh-ms-card eh-ms-speaker-card">
                <img
                  src={speaker.speakerImage || fallbackImage}
                  alt={speaker.speakerName}
                  className="eh-ms-speaker-photo"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="eh-ms-speaker-info text-center">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                    {speaker.speakerName}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider sm:text-sm" style={{ color: primaryColor }}>
                    {speaker.speakerDesignation}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
