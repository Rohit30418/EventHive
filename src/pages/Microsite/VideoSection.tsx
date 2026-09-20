import { Video } from "lucide-react";

interface VideoSectionProps {
  primaryColor: string;
  secondaryColor: string;
  eventName: string;
  videoUrl?: string;
}

const DEMO_VIDEO_URL = "https://www.youtube.com/embed/ScMzIvxBSi4";

const getEmbedUrl = (value?: string) => {
  if (!value) return DEMO_VIDEO_URL;

  if (value.includes("youtube.com/embed/")) return value;

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : DEMO_VIDEO_URL;
    }

    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : DEMO_VIDEO_URL;
    }
  } catch {
    return DEMO_VIDEO_URL;
  }

  return DEMO_VIDEO_URL;
};

const VideoSection = ({
  primaryColor,
  secondaryColor,
  eventName,
  videoUrl,
}: VideoSectionProps) => {
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section
      id="highlights"
      className="scroll-mt-24 border-y border-slate-200 bg-slate-950 py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-12">
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

            <div
              className="mt-5 h-1 w-16 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
              }}
            />
          </div>

          <div
            className="overflow-hidden rounded-[1.5rem] border bg-black shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
            style={{ borderColor: `${primaryColor}55` }}
          >
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title={`${eventName} highlights video`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
