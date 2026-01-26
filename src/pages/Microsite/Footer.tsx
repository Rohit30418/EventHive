import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Mail, Phone, MapPin, ArrowRight, Twitter, Facebook, Instagram, Linkedin, Send } from "lucide-react";

// 1. Define the shape of your Event Data
interface EventData {
  PrimaryColor?: string;
  SecondaryColor?: string;
  color?: string; // Handling inconsistency
  logo?: string;
  ShortDesc?: string;
  organizerPhone?: string;
  organizerEmail?: string;
  EventName?: string;
  location?: string;
}

const Footer: React.FC = () => {
  // 2. Select data with type inference
  const data = useAppSelector((state) => state.eventdataSlice.eventData) as EventData | null;
  
  // 3. Resolve Dynamic Colors
  const primaryColor = data?.PrimaryColor || data?.color || "#4F46E5"; // Default Indigo
  const secondaryColor = data?.SecondaryColor || "#9333ea"; // Default Purple

  // Helper for RGBA
  const hexToRgba = (hex: string, opacity: number): string => {
    if (!hex) return `rgba(79, 70, 229, ${opacity})`;
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-100">
      
      {/* Dynamic Background Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-[100%] blur-[120px] opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ================= TOP SECTION ================= */}
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* COLUMN 1: BRANDING & ABOUT */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                {data?.logo ? (
                    <img 
                        src={data.logo} 
                        alt="Logo" 
                        className="h-10 w-auto object-contain" 
                    />
                ) : (
                    <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12"
                        style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` }}
                    >
                        <span className="text-white font-bold text-xl">
                            {data?.EventName ? data.EventName.charAt(0).toUpperCase() : "E"}
                        </span>
                    </div>
                )}
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                    {data?.EventName || "EventHive"}
                </span>
            </Link>
            <p className="text-slate-500 leading-relaxed mb-8">
              {data?.ShortDesc || "Experience the extraordinary. We bring people together to inspire, connect, and grow through world-class events."}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
               {data?.organizerEmail && (
                   <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                           <Mail size={16} />
                       </div>
                       <span className="text-sm font-medium">{data.organizerEmail}</span>
                   </div>
               )}
               {data?.organizerPhone && (
                   <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                           <Phone size={16} />
                       </div>
                       <span className="text-sm font-medium">{data.organizerPhone}</span>
                   </div>
               )}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["About Event", "Schedule", "Speakers", "Sponsors", "FAQ"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "")}`} className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" style={{ color: primaryColor }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: LEGAL */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Code of Conduct"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-slate-900 mb-6">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4">
                Subscribe to receive latest news and exclusive offers.
            </p>
            <div className="relative group">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                />
                <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white shadow-md hover:scale-105 transition-transform"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
                >
                    <Send size={16} />
                </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} {data?.EventName || "EventHive"}. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
                {[
                    { icon: Facebook, link: "#" }, 
                    { icon: Twitter, link: "#" }, 
                    { icon: Instagram, link: "#" }, 
                    { icon: Linkedin, link: "#" }
                ].map((social, i) => (
                    <a 
                        key={i} 
                        href={social.link}
                        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 transition-all duration-300 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = primaryColor;
                            e.currentTarget.style.borderColor = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.borderColor = '';
                        }}
                    >
                        <social.icon size={18} />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;