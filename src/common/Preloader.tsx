import { Loader2 } from "lucide-react";

const Preloader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="animate-spin text-indigo-600" size={42} />

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Loading...
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Please wait while we prepare your content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;