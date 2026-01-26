const Preloader = () => {
  return (
    // Full screen overlay with high Z-index to cover everything
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]">
      
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring (Spinning) */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
        
        {/* Inner Ring (Spinning Reverse) */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>

        {/* Center Brand Logo (Pulse) */}
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
           <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hive</span>
        </h2>
        <div className="flex justify-center gap-1 mt-2">
           <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
           <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
           <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default Preloader;