import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Mail, Phone, ArrowRight, Twitter, Facebook, Instagram, Linkedin, Send } from "lucide-react";

interface EventData {
  PrimaryColor?: string;
  SecondaryColor?: string;
  color?: string;
  logo?: string;
  ShortDesc?: string;
  organizerPhone?: string;
  organizerEmail?: string;
  EventName?: string;
}

const Footer: React.FC = () => {
  const data = useAppSelector((state) => state.microsite.eventData) as EventData | null;
  
  const primaryColor = data?.PrimaryColor || data?.color || "#4F46E5"; 
  const secondaryColor = data?.SecondaryColor || "#9333ea"; 

  return (
    <footer className="relative bg-white pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden border-t border-slate-100 font-sans">
      
      {/* Dynamic Background Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[300px] md:h-[400px] rounded-[100%] blur-[80px] md:blur-[120px] opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 mb-12 md:mb-16">
          
          {/* COLUMN 1: BRANDING */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                {/* DYNAMIC LOGO ICON */}
                <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                    style={{ backgroundColor: primaryColor, boxShadow: `0 4px 12px ${primaryColor}40` }}
                >
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                </div>

                <span className="text-2xl font-bold tracking-tight text-slate-900">
                    Event<span style={{ color: primaryColor }}>Hive</span>
                </span>
            </Link>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-sm">
              {data?.ShortDesc || "Experience the extraordinary. We bring people together to inspire, connect, and grow through world-class events."}
            </p>
            
            <div className="space-y-3 md:space-y-4">
               {data?.organizerEmail && (
                   <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                           <Mail size={16} />
                       </div>
                       <span className="text-sm font-medium break-all">{data.organizerEmail}</span>
                   </div>
               )}
               {data?.organizerPhone && (
                   <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                           <Phone size={16} />
                       </div>
                       <span className="text-sm font-medium">{data.organizerPhone}</span>
                   </div>
               )}
            </div>
          </div>

          {/* COLUMN 2: LINKS */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-4">
              {["About Event", "Schedule", "Speakers", "Sponsors", "FAQ"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "")}`} className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium flex items-center gap-2 group py-1 md:py-0">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" style={{ color: primaryColor }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: LEGAL */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Legal</h4>
            <ul className="space-y-2 md:space-y-4">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Code of Conduct"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium block py-1 md:py-0">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4">
                Subscribe to receive latest news and exclusive offers.
            </p>
            <div className="relative group max-w-sm lg:max-w-none">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                />
                <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
                >
                    <Send size={16} />
                </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} {data?.EventName || "EventHive"}. All rights reserved.
            </p>

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