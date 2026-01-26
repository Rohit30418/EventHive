import React, { useState } from "react";
import { Play } from "lucide-react";

interface VideoSectionProps {
  primaryColor?: string;
  secondaryColor?: string; // Optional, for gradients
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  primaryColor = "#4F46E5",
  secondaryColor = "#9333ea"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to create transparent versions of the primary color
  const hexToRgba = (hex: string, opacity: number): string => {
    if (!hex) return `rgba(79, 70, 229, ${opacity})`;
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className="font-bold text-sm uppercase tracking-widest mb-3 block"
            style={{ color: primaryColor }}
          >
            Experience The Energy
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            See What's <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>Waiting For You</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Get a glimpse of the atmosphere, the people, and the moments that make this event unforgettable.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Dynamic Background Glow */}
          <div 
            className="absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-40 transition-all duration-500"
            style={{ 
                background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                transform: isPlaying ? 'scale(1.02)' : 'scale(1)' 
            }}
          />
          
          {/* Video Wrapper */}
          <div className="relative bg-black rounded-3xl aspect-video shadow-2xl overflow-hidden border border-white/10 group">
            
            {!isPlaying ? (
              /* ================= THUMBNAIL STATE ================= */
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                {/* Background Image */}
                <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                    alt="Event Highlights" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Decorative Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Play Button Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing Rings */}
                    <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-75" 
                        style={{ backgroundColor: hexToRgba(primaryColor, 0.6), animationDuration: '2s' }} 
                    />
                    <div 
                        className="absolute -inset-4 rounded-full animate-pulse opacity-30" 
                        style={{ backgroundColor: primaryColor }} 
                    />
                    
                    {/* Actual Button */}
                    <button 
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xl backdrop-blur-sm border border-white/20"
                        style={{ 
                            background: `linear-gradient(135deg, ${hexToRgba(primaryColor, 0.9)}, ${hexToRgba(secondaryColor, 0.9)})` 
                        }}
                    >
                      <Play size={36} className="text-white ml-1 fill-white" />
                    </button>
                  </div>
                </div>

                {/* Text Overlay Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/10">
                        2024 Highlights
                     </span>
                     <span className="text-sm font-medium opacity-80">2 min 45 sec</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">Experience the Magic</h3>
                  <p className="text-slate-300 mt-2 max-w-lg text-sm sm:text-base">Watch the highlights from our previous sold-out event and see what awaits you.</p>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 rounded-tl-2xl opacity-50" style={{ borderColor: primaryColor }} />
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 rounded-br-2xl opacity-50" style={{ borderColor: primaryColor }} />
              </div>
            ) : (
              /* ================= PLAYING STATE (YouTube Embed) ================= */
              <div className="absolute inset-0 bg-black">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" 
                    title="Event Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;