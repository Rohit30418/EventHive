import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Home, SearchX } from "lucide-react";

const ErrorPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-16 text-white">
      <div className="eh-premium-grid absolute inset-0 opacity-20" />
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px]" />

      <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12">
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 text-cyan-200 shadow-2xl">
          <SearchX size={44} />
        </div>
        <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-cyan-200">404 · Page not found</p>
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">This route has no event yet.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300">
          The page may have moved, the link may be incorrect, or the dashboard route is no longer available.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="eh-btn-primary px-6 py-3 text-sm">
            <Home size={18} /> Go Home
          </Link>
          <Link to="/Events" className="eh-btn-secondary px-6 py-3 text-sm !border-white/10 !bg-white/10 !text-white hover:!bg-white/15">
            <Compass size={18} /> Browse Events
          </Link>
        </div>
        <button type="button" onClick={() => window.history.back()} className="mx-auto mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white">
          <ArrowLeft size={16} /> Back to previous page
        </button>
      </section>
    </main>
  );
};

export default ErrorPage;
