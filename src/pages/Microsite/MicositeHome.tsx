import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Calendar, MapPin, Play, Clock, ArrowRight } from "lucide-react"; 
import { useAppSelector } from "../../store/hooks"; 
// Components
import EventRegistration from "../EventRegistration";
import PricingSection from "./PricingSection";
import VideoSection from "./VideoSection";

/* ============================ UTILS ============================ */
const hexToRgba = (hex: string, opacity: number) => {
  if (!hex) return `rgba(0, 0, 0, ${opacity})`;
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/* ============================ COUNTDOWN COMPONENT ============================ */
const CountdownTimer = ({ targetDate, themeColor }: { targetDate: string, themeColor: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6">
      {Object.entries(timeLeft).map(([key, val]) => (
        <div key={key} className="flex flex-col items-center">
          <div 
            className="w-full aspect-square rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-md border transition-colors duration-500 shadow-lg"
            style={{ 
                backgroundColor: hexToRgba(themeColor, 0.15), 
                borderColor: hexToRgba(themeColor, 0.3) 
            }}
          >
            <span className="text-lg sm:text-2xl font-bold text-white">
              {val < 10 ? `0${val}` : val}
            </span>
          </div>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">{key}</span>
        </div>
      ))}
    </div>
  );
};

/* ============================ MAIN PAGE ============================ */
const MicrositeHome = () => {
  const { eventData: data } = useAppSelector((state) => state.microsite);
  
  if (!data) return null; 

  // --- Dynamic Colors ---
  const primaryColor = (data as any).PrimaryColor || (data as any).primaryColor || "#4F46E5";   
  const secondaryColor = (data as any).SecondaryColor || (data as any).secondaryColor || "#9333ea"; 

  // --- Check if Event has Passed ---
  const eventDateStr = (data as any)?.eventDate;
  const isEventPassed = eventDateStr ? new Date(eventDateStr).getTime() < new Date().getTime() : false;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 overflow-x-hidden w-full">
      <style>{`
        ::selection { background-color: ${primaryColor}; color: white; }
      `}</style>

      {/* ============================ 1. HERO SECTION ============================ */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/41823-431406517_medium.mp4" 
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
          {/* Smart Gradient Overlay */}
          <div 
            className="absolute inset-0 z-10"
            style={{
                background: `linear-gradient(to bottom right, 
                    ${hexToRgba("#020617", 0.9)} 0%, 
                    ${hexToRgba("#020617", 0.7)} 50%, 
                    ${hexToRgba(primaryColor, 0.6)} 100%)`
            }}
           />
           {/* Mobile Vignette */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10 pointer-events-none md:hidden" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-20 pt-24 pb-12">
          <div className="flex flex-col lg:flex-row items-center  justify-between gap-12 lg:gap-20">
            
            {/* LEFT: Text Content */}
            <div className="w-full lg:w-9/12 max-w-4xl text-center lg:text-left pt-6 lg:pt-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md mb-6 border border-white/10 mx-auto lg:mx-0"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">
                  {(data as any)?.EventType || "Global Summit"} 2026
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white"
              >
                {((data as any)?.EventName || "Upcoming Event").split(' ').map((word: string, i: number) => (
                  <span key={i} className="inline-block mr-2 sm:mr-3">
                    {i === 1 ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white"
                           style={{
                               backgroundImage: `linear-gradient(to right, #ffffff, ${primaryColor})`
                           }}
                      >
                        {word}
                      </span>
                    ) : word}
                  </span>
                ))}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                {(data as any)?.ShortDesc || "Join us for an unforgettable experience where innovation meets community. Secure your spot today."}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                {/* --- UPDATED BUTTON BASED ON isEventPassed --- */}
                <button 
                  onClick={() => !isEventPassed && document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth'})}
                  disabled={isEventPassed}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 
                    ${isEventPassed ? 'opacity-60 cursor-not-allowed bg-slate-600' : 'shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1'}`}
                  style={{ backgroundColor: !isEventPassed ? primaryColor : undefined }}
                >
                  {isEventPassed ? "Registration Closed" : (
                    <>Get Tickets <ArrowRight size={18} /></>
                  )}
                </button>
                <button 
                   className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white border hover:bg-white/5 transition-all"
                   style={{ borderColor: hexToRgba(primaryColor, 0.4) }}
                >
                  Full Schedule
                </button>
              </motion.div>
            </div>

            {/* RIGHT: Glass Card */}
            <div className="w-full lg:w-[420px]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full backdrop-blur-xl bg-black/40 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-white/10"
              >
                {/* Glow Effect */}
                <div 
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-40 pointer-events-none" 
                    style={{ backgroundColor: primaryColor }}
                />

                <div className="space-y-6 relative z-10">
                   <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl text-white shrink-0" style={{ backgroundColor: hexToRgba(primaryColor, 0.25) }}>
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                        <p className="text-lg sm:text-xl font-semibold text-white leading-tight">{(data as any)?.eventDate || "TBA"}</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl text-white shrink-0" style={{ backgroundColor: hexToRgba(primaryColor, 0.25) }}>
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                        <p className="text-lg sm:text-xl font-semibold text-white leading-tight">{(data as any)?.location || "TBA"}</p>
                      </div>
                   </div>
                   
                   <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-3 text-slate-300">
                        <Clock size={16} className="text-white" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {isEventPassed ? "Event Has Ended" : "Event Starts In"}
                        </span>
                      </div>
                      {!isEventPassed && <CountdownTimer targetDate={(data as any)?.eventDate} themeColor={primaryColor} />}
                   </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================ 2. ABOUT SECTION ============================ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
            >
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryColor }}>
                    The Experience
                </h2>
                <h2 className="text-3xl  sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                    Why you can't <br/> miss this <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>Event</span>.
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed whitespace-pre-line mb-8">
                    {(data as any).AboutArea || "We bring together the brightest minds in the industry for a day of inspiration, learning, and networking."}
                </p>

                <div className="grid grid-cols-3 gap-6 border-t pt-8">
                    <div>
                        <h4 className="text-3xl font-bold text-slate-900 mb-1">20+</h4>
                        <p className="text-sm text-slate-500 font-medium">Speakers</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-slate-900 mb-1">500+</h4>
                        <p className="text-sm text-slate-500 font-medium">Attendees</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-slate-900 mb-1">10+</h4>
                        <p className="text-sm text-slate-500 font-medium">Sponsors</p>
                    </div>
                </div>
            </motion.div>

            <div className="relative group order-1 lg:order-2">
                <div className="absolute -inset-2 bg-gradient-to-r opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-opacity duration-500" 
                      style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }} />
                
                <div className="relative bg-slate-100 rounded-2xl h-[300px] sm:h-[450px] w-full overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Event Crowd"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                          <div className="text-white flex items-center gap-4">
                             <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-lg"
                                  style={{ backgroundColor: hexToRgba(primaryColor, 0.6) }}>
                                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-1" />
                             </div>
                             <span className="font-bold text-lg sm:text-xl tracking-tight">Watch Highlights</span>
                          </div>
                      </div>
                </div>
            </div>
        </div>
      </section>

      {/* ============================ 3. SPEAKERS SECTION ============================ */}
      {(data as any).speakers && (data as any).speakers.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-20 bg-slate-50 relative overflow-hidden">
             {/* Dynamic Background Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-5 pointer-events-none" 
                 style={{ backgroundColor: primaryColor }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        World Class <span style={{ color: primaryColor }}>Speakers</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                        Learn from the industry leaders and visionaries shaping the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {(data as any).speakers.map((sp: any, i: number) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
                        >
                            <div className="h-72 sm:h-64 overflow-hidden relative">
                                <img 
                                    src={sp.photo} 
                                    alt={sp.speakerName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                     style={{ background: `linear-gradient(to top, ${hexToRgba(primaryColor, 0.8)}, transparent)` }} />
                            </div>
                            <div className="p-5 text-center">
                                <h4 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                    {sp.speakerName}
                                </h4>
                                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: secondaryColor }}>{sp.speakerDesignation}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* ============================ 4. OTHER SECTIONS ============================ */}
      <VideoSection primaryColor={primaryColor} />
      
      <PricingSection primaryColor={primaryColor} secondaryColor={secondaryColor} />
      
      {/* --- UPDATED REGISTRATION SECTION --- */}
      <div id="registration" className="py-12 bg-white scroll-mt-20">
        {isEventPassed ? (
            <div className="max-w-3xl mx-auto text-center py-20 px-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={32} className="text-slate-500" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Registration Closed</h2>
                <p className="text-lg text-slate-600">
                    The registration for this event has ended as the date has already passed. Thank you for your interest, and we hope to see you at our next event!
                </p>
            </div>
        ) : (
            <EventRegistration primaryColor={primaryColor} />
        )}
      </div>

      <section className="relative h-[300px] sm:h-[400px] w-full bg-slate-100">
         <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent((data as any).location || "New York")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
            title="Event Location"
            className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            style={{ border: 0 }}
        />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20" style={{ backgroundColor: primaryColor }}></div>
      </section>

    </div>
  );
};

export default MicrositeHome;