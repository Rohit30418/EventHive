import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion"; // 👈 Added Variants here
import { Calendar, MapPin, ArrowRight } from "lucide-react"; 
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

/* ============================ COUNTDOWN TIMER ============================ */
const CountdownTimer = ({ targetDate, primaryColor, secondaryColor }: any) => {
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
    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {Object.entries(timeLeft).map(([key, val]) => (
        <div key={key} className="flex flex-col items-center">
          <div 
            className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl flex items-center justify-center bg-white/80 backdrop-blur-md border border-white/40 shadow-xl"
            style={{ boxShadow: `0 10px 40px -10px ${hexToRgba(primaryColor, 0.2)}` }}
          >
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br"
                  style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` }}>
              {val < 10 ? `0${val}` : val}
            </span>
          </div>
          <span className="mt-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500">{key}</span>
        </div>
      ))}
    </div>
  );
};

/* ============================ MAIN PAGE ============================ */
const MicrositeHome = () => {
  // 1. GET DATA FROM REDUX
  const { eventData: data } = useAppSelector((state) => state.microsite);

  // 2. SAFETY CHECK
  if (!data) return null; 

  // --- Dynamic Colors ---
  const primaryColor = data.primaryColor || "#2563eb";   
  const secondaryColor = data.secondaryColor || "#9333ea"; 

  // 3. FIXED ANIMATION VARIANTS
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 selection:bg-gray-900 selection:text-white overflow-x-hidden">

      {/* ============================ HERO SECTION ============================ */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
        
        <div className="absolute inset-0 w-full h-full bg-white z-0" />
        
        <div 
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"
          style={{ backgroundColor: primaryColor }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"
          style={{ backgroundColor: secondaryColor }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            
            {/* Tagline Badge */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/50 backdrop-blur-xl shadow-sm mb-8"
            >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: secondaryColor }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: primaryColor }}></span>
                </span>
                <span className="text-sm font-bold tracking-wide uppercase text-slate-600">
                    {(data as any).EventType || "Exclusive Event"}
                </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6 text-slate-900"
            >
                {data.eventName}
            </motion.h1>

            <motion.p 
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed mb-10"
            >
                {(data as any).ShortDesc || "Experience the extraordinary. Join us for a transformative event designed to inspire and connect."}
            </motion.p>

            {/* Glassmorphic Date/Location Bar */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/40 border border-white/60 backdrop-blur-md p-2 rounded-3xl shadow-xl shadow-gray-200/50 mb-12"
            >
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm">
                    <Calendar className="w-5 h-5" style={{ color: primaryColor }} />
                    <span className="font-bold text-slate-700">{(data as any).eventDate || "Date TBA"}</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3">
                    <MapPin className="w-5 h-5" style={{ color: secondaryColor }} />
                    <span className="font-semibold text-slate-600">{(data as any).location || "Location TBA"}</span>
                </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
            >
                <button 
                    onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth'})}
                    className="group relative px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-gradient-to-r transition-all duration-300"
                         style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }} />
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all" />
                    <span className="relative flex items-center gap-2">
                        Get Your Tickets <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
                <button className="px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-slate-300 shadow-sm hover:bg-slate-50 transition-all">
                    View Details
                </button>
            </motion.div>

            <CountdownTimer targetDate={(data as any).eventDate} primaryColor={primaryColor} secondaryColor={secondaryColor} />

        </div>
      </section>

      {/* ============================ ABOUT SECTION ============================ */}
      <section className="py-24 px-6 md:px-20 bg-white relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: secondaryColor }}>
                    About The Experience
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    Why you can't <br/> miss this <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>Event</span>.
                </h3>
                <div className="h-1 w-20 rounded-full mb-8" style={{ backgroundColor: primaryColor }} />
                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                    {(data as any).AboutArea}
                </p>
            </motion.div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr opacity-20 rounded-3xl transform rotate-3 scale-105" 
                     style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }} />
                <div className="relative bg-slate-100 rounded-3xl h-[500px] w-full overflow-hidden shadow-2xl">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <div className="text-white">
                            <p className="font-bold text-xl">Immersive Experience</p>
                            <p className="text-sm opacity-80">Join the movement</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* ============================ SPEAKERS SECTION ============================ */}
      {(data as any).speakers && (data as any).speakers.length > 0 && (
        <section className="py-24 px-6 md:px-20 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] opacity-10" style={{ backgroundColor: primaryColor }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        World Class <span style={{ color: primaryColor }}>Speakers</span>
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {(data as any).speakers.map((sp: any, i: number) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img 
                                    src={sp.photo} 
                                    alt={sp.speakerName}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold text-xl text-slate-900 mb-1">
                                    {sp.speakerName}
                                </h4>
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{sp.speakerDesignation}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* ============================ VIDEO ============================ */}
      <VideoSection primaryColor={primaryColor} />

      {/* ============================ PRICING ============================ */}
      <PricingSection primaryColor={primaryColor} secondaryColor={secondaryColor} />

      {/* ============================ REGISTRATION ============================ */}
      <div id="registration" className="py-10 bg-white">
        <EventRegistration eventId={data.eventId} primaryColor={primaryColor} />
      </div>

      {/* ============================ MAP ============================ */}
      <section className="relative h-[450px] w-full">
         <iframe
            src={`http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent((data as any).location || "New York")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
            className="absolute inset-0 filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            style={{ border: 0 }}
        ></iframe>
      </section>

    </div>
  );
};

export default MicrositeHome;