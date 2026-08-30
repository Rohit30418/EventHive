import { Link } from "react-router-dom";
import { LockKeyhole, ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <main className="eh-page flex min-h-screen items-center justify-center px-4 py-16">
      <section className="eh-panel w-full max-w-2xl p-8 text-center sm:p-12">
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-amber-50 text-amber-600 ring-1 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/50">
          <ShieldAlert size={46} />
        </div>
        <p className="eh-kicker mb-4">Access restricted</p>
        <h1 className="eh-page-title text-4xl sm:text-5xl">You don’t have permission.</h1>
        <p className="eh-page-copy mx-auto mt-5 max-w-lg">
          Your account role cannot access this section. Please contact the administrator if this seems incorrect.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/Dashboard" className="eh-btn-primary px-6 py-3 text-sm">
            <LockKeyhole size={18} /> Back to Dashboard
          </Link>
          <Link to="/Login" className="eh-btn-secondary px-6 py-3 text-sm">
            Sign in again
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Unauthorized;
