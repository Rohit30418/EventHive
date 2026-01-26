import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import Features from "./Features";
import FeatureList from "./FeatureList";

const Home = () => {
  const rotatingWords = ["Exciting Events", "Amazing Meetups", "Trending Conferences"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { isLoading, data } = useGetEvent();

  const testimonials = [
    {
      id: 1,
      name: "Aarav Mehta",
      role: "Startup Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "The Tech Summit was life-changing! I connected with amazing mentors and investors.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Loved the Startup Expo! Great speakers, great vibes, great people.",
    },
    {
      id: 3,
      name: "Rohit Verma",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "DesignCon gave me so much practical experience. Amazing workshops!",
    },
  ];

  return (
    // Main container stays white for the rest of the content
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden text-slate-900">
      
      {/* ================= PREMIUM DARK HERO SECTION ================= */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-[#020617] text-white">
        
        {/* Dark Mode Background Effects */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          {/* Glowing Orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content (Updated for Dark Mode) */}
          <div className="max-w-2xl pt-10 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-bold text-indigo-300 tracking-wide uppercase">The #1 Event Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white"
            >
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Events.</span> <br />
              <div className="h-[1.1em] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="block text-white"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg"
            >
              The simplest platform to create, manage, and promote your events in minutes. 
              Join 10,000+ organizers growing their community today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {/* Premium Glow Button */}
              <button className="relative px-8 py-4 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-500 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]">
                Create Event Now
              </button>

              <Link
                to="/demo"
                className="px-8 py-4 rounded-full text-lg font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
              >
                View Demo
              </Link>
            </motion.div>
          </div>

          {/* ================= RIGHT: PREMIUM DARK 3D UI ================= */}
          <div className="relative hidden lg:flex items-center justify-center h-[700px] w-full perspective-[2000px]">
            
            {/* Main Glass Dashboard Card (Dark Mode Version) */}
            <motion.div
              initial={{ rotateY: -15, rotateX: 5, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: -12, rotateX: 2, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-20 w-[420px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-[2.5rem] p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Event</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white leading-tight">Tech Summit<br/>Global 2024</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner text-yellow-400">
                    ⚡️
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-xs text-slate-400 font-medium mb-1">Registrations</p>
                      <p className="text-2xl font-bold text-white">2,840</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-xs text-slate-400 font-medium mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-white">$124k</p>
                  </div>
              </div>

              {/* Attendee Stack */}
              <div className="mb-8">
                  <p className="text-xs text-slate-400 font-medium mb-3">Recent Attendees</p>
                  <div className="flex items-center -space-x-3">
                      {[1,2,3,4].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-[3px] border-slate-900 overflow-hidden shadow-sm">
                              <img src={`https://randomuser.me/api/portraits/men/${20+i}.jpg`} className="w-full h-full object-cover" alt="User" />
                          </div>
                      ))}
                       <div className="w-10 h-10 rounded-full border-[3px] border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shadow-sm">
                          +2k
                       </div>
                  </div>
              </div>

              {/* Chart */}
              <div>
                  <div className="flex items-end justify-between h-24 gap-2 mb-2">
                    {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                        className={`w-full rounded-t-lg ${i === 6 ? 'bg-gradient-to-t from-indigo-500 to-purple-500' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <p className="text-center text-xs font-medium text-slate-500">Last 7 Days Activity</p>
              </div>

              {/* Glossy Overlay for Realism */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Floating Element 1: "Sold Out" Ticket (Behind) */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-32 z-10 w-48 bg-[#1e293b] p-4 rounded-2xl shadow-2xl border border-white/5"
            >
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
                        <i className="fa-solid fa-ticket"></i>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">VIP Pass</p>
                        <p className="text-sm font-bold text-white">Sold Out</p>
                    </div>
                 </div>
            </motion.div>

            {/* Floating Element 2: "New Joiner" Notification (Front) */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-40 z-30 bg-[#1e293b]/90 backdrop-blur-md p-3 pr-6 rounded-full shadow-xl border border-white/10 flex items-center gap-3"
            >
                 <div className="relative">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" className="w-10 h-10 rounded-full object-cover" alt="New User" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-white">Sarah Joined</p>
                    <p className="text-[10px] text-slate-400">Just now</p>
                 </div>
            </motion.div>

          </div>
        </div>
        
 
      </section>

      {/* ================= ORGANIZER CTA (ORIGINAL) ================= */}
      <section className="py-24 px-4 bg-white relative z-20">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

          <span className="inline-block py-1 px-4 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium mb-6">
              👋 Hey Organizer!
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Become an <span className="text-primary">Organizer</span>. It's Free.
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Start creating amazing events today. From ticketing to check-in, we provide all the tools you need without the hassle.
          </p>

          <div className="mb-10 text-left bg-white/5 rounded-2xl p-6 border border-white/5">
              <FeatureList />
          </div>

          <button className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300">
            Start Creating Events →
          </button>
        </div>
      </section>

      {/* ================= FEATURES SECTION (ORIGINAL) ================= */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Powerful features built for modern event organizers.
            </p>
          </div>
          <Features />
        </div>
      </section>

      {/* ================= EVENTS GRID (ORIGINAL) ================= */}
      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Popular <span className="text-primary">Events</span>
            </h3>
            <Link to="/events" className="hidden md:inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
               View all events <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.slice(0, 4).map((event, index) => (
                <EventCard key={index} event={event} index={index} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/Events"
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (ORIGINAL) ================= */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="text-3xl lg:text-4xl font-extrabold text-center text-slate-900 mb-16">
            What People <span className="text-primary">Are Saying</span>
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4 text-orange-400 text-sm">
                  {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8 relative">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;