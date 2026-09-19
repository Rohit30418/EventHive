import type { Speaker } from "../../../Types/eventType";

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
      className="scroll-mt-24 bg-[#fbfaf8] px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
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
            Explore the speakers added by the event organizer.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, index) => {
            const initials = speaker.speakerName
              .split(" ")
              .map((part) => part.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <article
                key={`${speaker.speakerName}-${index}`}
                className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white"
              >
                <div className="aspect-[4/4.4] overflow-hidden bg-slate-100">
                  {speaker.speakerImage ? (
                    <img
                      src={speaker.speakerImage}
                      alt={speaker.speakerName}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center text-3xl font-extrabold text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {initials || "SP"}
                    </div>
                  )}
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
