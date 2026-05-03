import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react"; 

interface EventData {
  PrimaryColor?: string;
  color?: string;
  EventName?: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Get Data from Redux
  const data = useAppSelector((state) => state.microsite.eventData) as EventData | null;
  
  // 2. Resolve Dynamic Color (Default to Indigo if missing)
  const primaryColor = data?.PrimaryColor || data?.color || "#4F46E5"; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const textColorClass = isScrolled || isMobileMenuOpen ? "text-slate-900" : "text-white";
  const burgerColor = isScrolled || isMobileMenuOpen ? "text-slate-900" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-slate-200/50 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        
        {/* ================= DYNAMIC LOGO (COMMON SHAPE) ================= */}
        <a href="#" className="flex items-center gap-2 group">
          {/* Dynamic Color Icon */}
          <div 
            className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
            style={{ 
                backgroundColor: primaryColor,
                boxShadow: `0 4px 12px ${primaryColor}66` // Dynamic Glow
            }}
          >
             <div className="w-3 h-3 bg-white rounded-full relative z-10" />
          </div>
          
          {/* Text Name */}
          <h1 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${textColorClass}`}>
            Event<span style={{ color: primaryColor }}>Hive</span>
          </h1>
        </a>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center space-x-8">
          {["About", "Schedule", "Speakers", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 relative group ${textColorClass}`}
            >
              {item}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: primaryColor }}
              ></span>
            </a>
          ))}

          {/* Glowing CTA Button */}
          <button 
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth'})}
            className="group relative px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{ 
                backgroundColor: primaryColor,
                boxShadow: `0 4px 20px -5px ${primaryColor}99`
            }}
          >
            <span className="relative z-10">Register Now</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
          </button>
        </nav>

        {/* ================= MOBILE HAMBURGER ================= */}
        <button
          className={`md:hidden p-2 -mr-2 rounded-full hover:bg-black/5 transition-all ${burgerColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`absolute top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col`}
        style={{ 
            height: isMobileMenuOpen ? "100vh" : "0px",
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen ? "auto" : "none",
            paddingTop: isMobileMenuOpen ? "80px" : "0px"
        }}
      >
        <div className="flex flex-col p-6 space-y-2 h-full overflow-y-auto">
          {["About", "Schedule", "Speakers", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl font-bold text-slate-800 px-4 py-4 border-b border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
                <ArrowRight size={24} />
              </span>
            </a>
          ))}
          
          <div className="mt-8 px-2">
            <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth'});
                }}
                className="w-full py-4 rounded-xl text-white font-bold text-lg text-center shadow-xl active:scale-[0.98] transition-transform flex justify-center items-center gap-2"
                style={{ backgroundColor: primaryColor }}
            >
               Register Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;