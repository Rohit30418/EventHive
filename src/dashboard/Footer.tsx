const Footer = () => {
  return (
    <footer className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white/80 px-5 py-4 text-sm font-semibold text-slate-500 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span>© {new Date().getFullYear()} EventHive Admin Dashboard. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-300">Privacy</a>
          <a href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-300">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
