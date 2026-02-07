import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();

  // 1. DEFINE DARK PAGES
  // Standardize path checks (e.g., checking for both "/events" and "/Events")
  const isDarkPage = location.pathname === "/" || location.pathname.toLowerCase() === "/events"; 

  // 2. SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // --- DYNAMIC STYLES ---

  // Text Color Logic
  const isTransparentAndLight = !scrolled && !isDarkPage;

  const textColor = isTransparentAndLight 
    ? "text-slate-700 hover:text-indigo-600" // Dark text on light pages (unscrolled)
    : "text-slate-300 hover:text-white";     // White text otherwise

  const logoText = isTransparentAndLight ? "text-slate-900" : "text-white";
  const mobileToggleColor = isTransparentAndLight ? "text-slate-900" : "text-white";

  // Header Background
  const headerBg = scrolled 
    ? "bg-[#030303]/90 backdrop-blur-md border-white/10 py-3 shadow-md" // Scrolled (Dark Glass)
    : "bg-transparent border-transparent py-4 md:py-6"; // Top (Transparent)

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Events", href: "/events" }, // Ensure this matches your route
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${headerBg}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group relative z-50">
          <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/20">
             <div className="w-3 h-3 bg-white rounded-full relative z-10" />
          </div>
          <h1 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${logoText}`}>
            Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hive</span>
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2">
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

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className={`text-sm font-semibold transition-colors flex items-center gap-2 ${textColor}`}>
            <LogIn size={16} /> Log In
          </Link>
          <Link 
            to="/OrgniserRegistration" 
            className="group relative px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-1">
              Get Started <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className={`md:hidden p-2 -mr-2 rounded-full active:bg-white/10 transition-colors relative z-50 ${mobileToggleColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col pt-24 px-6 overflow-hidden"
          >
             {/* Navigation Links */}
             <div className="flex flex-col space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-slate-300 hover:text-white py-3 border-b border-white/5 flex justify-between items-center group"
                  >
                    {link.name}
                    <ChevronRight size={20} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </motion.a>
                ))}
             </div>

             {/* Mobile Actions */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="mt-8 flex flex-col gap-4"
             >
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-full py-4 text-center text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-semibold flex justify-center items-center gap-2"
                >
                  <LogIn size={20} /> Log In
                </Link>
                <Link 
                  to="/OrgniserRegistration" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-full py-4 text-center bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
                >
                  Get Started
                </Link>
             </motion.div>
             
             {/* Decorative Background Blur for Mobile */}
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;