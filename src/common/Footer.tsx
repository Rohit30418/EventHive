import React from "react";
import { Link } from "react-router-dom"; 

// 1. Define Props Interface for the helper component
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-slate-300 py-20 px-6 relative overflow-hidden border-t border-white/10">
      
      {/* Background Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Eventify</h2>
                </div>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                    The simplest platform to create, manage, and promote your events. Built with passion for organizers worldwide.
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-2">Stay in the loop</h3>
                <p className="text-slate-400 text-sm mb-4">Join our newsletter for the latest event trends and updates.</p>
                <form className="flex gap-3">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.3)]">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-16"></div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="font-bold text-white mb-6">Product</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Events', 'Demo'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              {['Community', 'Help Center', 'Partners', 'Status'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-slate-500 text-sm">© 2025 Eventify Inc. All rights reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <SocialLink href="#" icon={<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />} />
            <SocialLink href="#" icon={<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />} />
            <SocialLink href="#" icon={<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

// 2. Fixed Helper Component with Typed Props
const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a 
    href={href} 
    className="text-slate-500 hover:text-white transition-colors hover:scale-110 transform duration-200"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icon}
    </svg>
  </a>
);

export default Footer;