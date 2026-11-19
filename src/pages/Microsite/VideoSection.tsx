import React, { useState } from "react";
import { Play, Sparkles, Video } from "lucide-react";

interface VideoSectionProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  primaryColor = "#3848BE",
  secondaryColor = "#13B785",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="preview-video" className="eh-ms-section bg-slate-950 text-white">
      <div className="eh-ms-container">
        <div className="eh-ms-section-heading">
          <span className="eh-ms-eyebrow inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-cyan-400">
            <Video size={14} />
            Event Preview
          </span>
          <h2 className="eh-ms-heading mt-5 text-white">
            Experience the event before you’re even there.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Get a glimpse of the atmosphere, the crowd, the excitement, and the unforgettable
            moments waiting for you. Experience the people, energy, and connections that make
            this event more than just another gathering.
          </p>
        </div>

        <div className="eh-ms-video-wrap">
          <div className="eh-ms-video-frame">
            {!isPlaying ? (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="group relative block h-full w-full cursor-pointer"
                aria-label="Play event highlights video"
              >
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=80"
                  alt="Event highlights"
                  className="h-full w-full object-cover opacity-75"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white sm:h-20 sm:w-20"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <Play size={30} className="ml-1 fill-white" />
                </span>
              </button>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
                title="Event Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            )}
          </div>
          <div className="eh-ms-video-caption">
            <span className="eh-ms-eyebrow inline-flex items-center gap-2 text-white">
              <Sparkles size={13} />
              Highlights
            </span>
            <h3 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">
              Watch what makes this event special.
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-300">
              A quick look at the venue, community, sessions and the overall experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
