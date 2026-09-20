import type { Speaker } from "../../../Types/eventType";

const fallbackSpeakerImages = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=82",
];

interface SpeakersSectionProps {
  speakers: Speaker[];
  primaryColor: string;
}

const SpeakersSection = ({
  speakers,
  primaryColor,
}: SpeakersSectionProps) => {
  if (!speakers.length) return null;

  return (
    <section
      id="speakers"
      className="scroll-mt-24 bg-[#fbfaf8] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p
            className="text-[11px] font-extrabold uppercase tracking-[0.16em]"
            style={{ color: primaryColor }}
          >
            Speakers
          </p>
          <h2 className="mt-4 font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.15] text-slate-950 sm:text-3xl lg:text-4xl">
            Meet the people taking the stage.
          </h2>
          <p className="mt-4 text-[15px] font-medium leading-7 text-slate-600 sm:text-base">
            Meet the voices, ideas and experience behind the event.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, index) => {
            const speakerImage =
              speaker.speakerImage ||
              fallbackSpeakerImages[index % fallbackSpeakerImages.length];

            return (
              <article
                key={`${speaker.speakerName}-${index}`}
                className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white"
              >
                <div className="aspect-[4/4.4] overflow-hidden bg-slate-100">
                  <img
                    src={speakerImage}
                    alt={speaker.speakerName}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-['Manrope',sans-serif] text-lg font-extrabold text-slate-950">
                    {speaker.speakerName}
                  </h3>
                  <p
                    className="mt-1.5 text-xs font-bold uppercase tracking-[0.1em]"
                    style={{ color: primaryColor }}
                  >
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
