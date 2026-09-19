import { useMemo, useState } from "react";
import { Play, Video } from "lucide-react";

interface VideoSectionProps {
  primaryColor: string;
  secondaryColor: string;
  eventName: string;
  banner?: string;
  videoPoster?: string;
  videoUrl?: string;
}

const getEmbedUrl = (value?: string) => {
  if (!value) return "";

  if (value.includes("youtube.com/embed/")) return value;

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }

  return "";
};

const VideoSection = ({
  primaryColor,
  secondaryColor,
  eventName,
  banner,
  videoPoster,
  videoUrl,
}: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = useMemo(() => getEmbedUrl(videoUrl), [videoUrl]);
  const poster = videoPoster || banner;

  if (!poster && !embedUrl) return null;

  return (
    <section
      id="highlights"
      className="scroll-mt-24 border-y border-slate-200 bg-slate-950 py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div className="max-w-xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em]"
              style={{ color: secondaryColor }}
            >
              <Video size={14} />
              Highlights
            </div>

            <h2 className="mt-4 font-['Manrope',sans-serif] text-2xl font-extrabold leading-[1.15] sm:text-3xl lg:text-4xl">
              {eventName} highlights
            </h2>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
            <div className="relative aspect-video overflow-hidden bg-black">
              {isPlaying && embedUrl ? (
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  title={`${eventName} video preview`}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : poster ? (
                <>
                  <img
                    src={poster}
                    alt={`${eventName} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/50">
                        Highlights
                      </p>
                      <p className="mt-1 max-w-lg font-['Manrope',sans-serif] text-lg font-extrabold text-white sm:text-xl">
                        {eventName}
                      </p>
                    </div>

                    {embedUrl && (
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        }}
                        aria-label="Play event video"
                      >
                        <Play size={19} className="ml-0.5 fill-current" />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div
                  className="flex h-full items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                >
                  <Video size={40} className="text-white/80" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
