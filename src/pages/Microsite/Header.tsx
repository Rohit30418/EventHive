import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react"; 

interface EventData {
  PrimaryColor?: string;
  color?: string; // Handling inconsistency in data naming
  logo?: string;
  EventName?: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Get Data from Redux
  const data = useAppSelector((state) => state.microsite.eventData) as EventData | null;
  
  // 2. Resolve Dynamic Color
  const primaryColor = data?.PrimaryColor || data?.color || "#4F46E5"; // Default Indigo

  // 3. Handle Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      // Change state if scrolled more than 20px
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to determine text color based on scroll state
  const textColorClass = isScrolled || isMobileMenuOpen ? "text-slate-900" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-white/20 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* ================= LOGO ================= */}
        <a href="#" className="flex items-center gap-3 group">
          {data?.logo ? (
            <img 
              src={data.logo} 
              alt="Logo" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          ) : (
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shadow-lg transition-transform duration-300 group-hover:rotate-6"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="text-white font-extrabold text-lg">
                {data?.EventName ? data.EventName.charAt(0).toUpperCase() : "E"}
              </span>
            </div>
          )}
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${textColorClass}`}>
            {data?.EventName || "EventName"}
          </span>
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
              {/* Animated Underline */}
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
                // Create a colored glow using the primary color
                boxShadow: `0 4px 15px ${primaryColor}66` // 66 is hex for 40% opacity
            }}
          >
            <span>Register Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            
            {/* Shine Effect Overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
          </button>
        </nav>

        {/* ================= MOBILE HAMBURGER ================= */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${textColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ================= MOBILE MENU (Slide Down) ================= */}
      <div
        className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl transition-all duration-500 ease-in-out overflow-hidden md:hidden`}
        style={{ 
            maxHeight: isMobileMenuOpen ? "400px" : "0px",
            opacity: isMobileMenuOpen ? 1 : 0
        }}
      >
        <div className="flex flex-col p-6 space-y-2">
          {["About", "Schedule", "Speakers", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-slate-600 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
                <ArrowRight size={18} />
              </span>
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth'});
                }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-center shadow-md active:scale-[0.98] transition-transform"
                style={{ backgroundColor: primaryColor }}
            >
                Register Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;