import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2, LogIn, LogOut, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { auth } from "../Firebase";

const Logout = () => {
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const signOutUser = async () => {
      try {
        await auth.signOut();
        if (!active) return;
        setDone(true);
        toast.success("You have been logged out securely.");
        timer = setTimeout(() => navigate("/Login", { replace: true }), 1200);
      } catch {
        if (!active) return;
        toast.error("Logout failed. Please try again.");
        timer = setTimeout(() => navigate("/Dashboard", { replace: true }), 1200);
      }
    };

    signOutUser();

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_34rem),radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30rem),linear-gradient(180deg,#ffffff_0%,#fbfbff_52%,#ffffff_100%)] px-4 pb-16 pt-32 text-slate-950 sm:px-6 lg:pb-24 lg:pt-36">
      <div className="absolute left-[-10rem] top-24 h-[30rem] w-[30rem] rounded-full bg-violet-300/20 blur-[110px]" />
      <div className="absolute bottom-0 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cyan-300/20 blur-[110px]" />

      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2.2rem] border border-white/80 bg-white/82 p-8 text-center shadow-[0_28px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl sm:p-12">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
            {done ? <CheckCircle2 size={32} /> : <Loader2 className="animate-spin" size={32} />}
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
            <Sparkles size={14} /> Secure session
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
            {done ? "You’re signed out." : "Signing you out..."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-600">
            {done
              ? "Your EventHive session has ended safely. You can sign in again whenever you need access to your workspace."
              : "Please wait while we securely close your EventHive session."}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/Login" className="eh-btn-primary px-6 py-3 text-sm">
              <LogIn size={17} /> Login Again
            </Link>
            <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700">
              Go Home <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            <LogOut size={14} /> EventHive logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;