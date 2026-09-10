import { Loader2 } from "lucide-react";

const Preloader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffaf6] px-4 text-[#1e1c1b]">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="relative grid h-16 w-16 place-items-center rounded-full border border-[#f0ded2] bg-white shadow-[0_14px_35px_rgba(30,28,27,0.07)]">
          <Loader2 className="animate-spin text-[#ef6f30]" size={30} />
          <span className="absolute -inset-2 -z-10 rounded-full bg-[#fad2be]/35" />
        </div>

        <div>
          <h2 className="font-['Manrope',sans-serif] text-lg font-extrabold tracking-[-0.03em] text-[#1e1c1b]">
            Loading EventHive
          </h2>
          <p className="mt-1 text-sm text-[#77736f]">
            Preparing your event experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;