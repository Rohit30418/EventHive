import React, { useState } from "react";
import { Play, Sparkles, Video } from "lucide-react";

interface VideoSectionProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  primaryColor = "#4F46E5",
  secondaryColor = "#06B6D4",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative bg-slate-950 px-4 py-20 text-white sm:px-6 lg:py-28">
      {/* 
        REMOVED: Heavy background orbs.
        KEPT: A very lightweight, simple CSS grid pattern for texture. 
      */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {/* REMOVED: backdrop-blur. REPLACED WITH: Solid slate-800 background */}
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            <Video size={14} />
            Event Preview
          </span>

         <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
Experience the event before you’re even there.
</h2>

<p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
  Get a glimpse of the atmosphere, the crowd, the excitement, and the unforgettable
  moments waiting for you. Experience the people, energy, and connections that make
  this event more than just another gathering.
</p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* REMOVED: The blurred gradient glow that sat behind the video container */}
          
          {/* REMOVED: backdrop-blur-2xl. REPLACED WITH: Solid slate-900 background and standard shadow */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900 p-3 shadow-2xl">
            <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-black">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group absolute inset-0 text-left w-full h-full cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=80"
                    alt="Event highlights"
                    className="h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-60"
                    loading="lazy"
                  />

                  {/* Standard CSS gradient for text readability (very performant) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      {/* Simplified Play Button: Solid colors, no glassmorphism */}
                      <span
                        className="relative grid h-24 w-24 place-items-center rounded-full border border-white/20 text-white shadow-xl transition-transform group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        }}
                      >
                        <Play size={38} className="ml-1 fill-white" />
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 pointer-events-none">
                    {/* REMOVED: backdrop-blur. REPLACED WITH: solid black/50 background */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                      <Sparkles size={13} />
                      Highlights
                    </div>

                    <h3 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl text-white">
                      Watch what makes this event special.
                    </h3>

                    <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-200 sm:text-base">
                      A quick look at the venue, community, sessions and the overall experience.
                    </p>
                  </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;