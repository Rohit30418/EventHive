import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 1. GET CURRENT PATH
  const location = useLocation();
  
  // 2. DEFINE DARK PAGES (Pages with dark backgrounds)
  // Currently only Home ("/") is dark. Add more here if needed.
  const isDarkPage = location.pathname === "/"; 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DYNAMIC STYLES ---

  // Text Color Logic:
  // If Scrolled OR on a Dark Page -> White Text
  // Otherwise (Light Page not scrolled) -> Dark Text
  const textColor = scrolled || isDarkPage 
    ? "text-slate-300 hover:text-white" 
    : "text-slate-600 hover:text-black";

  // Logo Color
  const logoText = scrolled || isDarkPage ? "text-white" : "text-slate-900";

  // Header Background
  const headerBg = scrolled 
    ? "bg-[#030303]/80 backdrop-blur-xl border-white/5 shadow-lg py-3" // Scrolled (Glass)
    : "bg-transparent border-transparent py-5"; // Top (Transparent)

  // Button Styles
  const buttonStyle = scrolled || isDarkPage 
    ? "bg-white text-black hover:bg-slate-200" 
    : "bg-primary text-white hover:bg-indigo-700 shadow-indigo-200";

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Events", href: "/events" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${headerBg}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/20">
             <div className="w-3 h-3 bg-white rounded-full relative z-10" />
          </div>
          <h1 className={`text-xl font-bold tracking-tight transition-colors ${logoText}`}>
            Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hive</span>
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${textColor}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* BUTTONS */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className={`text-sm font-medium transition-colors ${textColor}`}>
            Log In
          </Link>
          <Link to="/signup" className={`group relative px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 ${buttonStyle}`}>
            <span className="relative z-10 flex items-center gap-1">
              Get Started <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {/* Kept dark for premium feel on all pages, but you can toggle this too if you want */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 p-6 shadow-2xl">
           <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                  <a key={link.name} href={link.href} className="text-slate-300 hover:text-white font-medium text-lg">{link.name}</a>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 text-slate-300 border border-white/10 rounded-xl">Log In</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 bg-primary text-white font-bold rounded-xl">Get Started</Link>
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;