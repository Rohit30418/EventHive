import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  CalendarCheck,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { getErrorCode, getErrorMessage } from "../../utils/error";
import axios from "axios";
import { apiPath } from "../../../Utils/Utils";

const validationSchema = z.object({
  Email: z.string().email("Invalid email address").nonempty("Email cannot be blank"),
  Password: z.string().nonempty("Password cannot be blank"),
});

type FormData = z.infer<typeof validationSchema>;

const highlights = [
  { icon: CalendarCheck, text: "Create and manage events from one workspace" },
  { icon: LayoutDashboard, text: "Keep registrations and event data organized" },
  { icon: ShieldCheck, text: "Role-based access for approved organizers" },
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(validationSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setServerError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.Email, data.Password);
      const user = userCredential.user;
      const dbResponse = await axios.get(`${apiPath}/Organizer/${user.uid}.json`);
      const userData = dbResponse.data;

      if (!userData) {
        throw new Error("User profile not found.");
      }

      if (userData.role === "Organizer" && userData.isApproved === false) {
        toast.warning("⏳ Your account is pending approval from the Super Admin.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      toast.success(`Welcome back, ${userData.fullName || "User"}!`);
      navigate("/Dashboard");
    } catch (error: unknown) {
      const code = getErrorCode(error);
      const message =
        code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password"
          ? "Invalid email or password."
          : code === "auth/too-many-requests"
            ? "Too many failed attempts. Try again later."
            : getErrorMessage(error, "Login failed. Please try again.");
      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <section className="bg-[#fffaf6] px-4 py-10 text-[#1e1c1b] sm:px-6 sm:py-14 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#eee3db] bg-white shadow-[0_24px_70px_rgba(30,28,27,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative overflow-hidden bg-[#1e1c1b] p-7 text-white sm:p-10 lg:p-12">
          <div className="relative z-10 flex h-full flex-col">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f6a06f]">
                <span className="h-px w-9 bg-[#ef6f30]" /> Organizer workspace
              </div>
              <h1 className="mt-6 max-w-md font-['Manrope',sans-serif] text-3xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Welcome back to your event control center.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/60 sm:text-base">
                Sign in to manage events, review registrations and keep your public event experience up to date.
              </p>
            </div>

            <div className="mt-8 space-y-3 lg:mt-auto lg:pt-12">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ef6f30] text-white">
                    <Icon size={16} />
                  </span>
                  <p className="pt-1 text-sm font-semibold leading-6 text-white/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="p-6 sm:p-9 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ef6f30]">Secure sign in</p>
              <h2 className="mt-3 font-['Manrope',sans-serif] text-3xl font-extrabold tracking-[-0.04em] text-[#1e1c1b] sm:text-4xl">
                Log in to EventHive
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#77736f]">
                Use your approved organizer or Super Admin account.
              </p>
            </div>

            {serverError && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                <div className="flex gap-3">
                  <AlertCircle size={18} className="shrink-0" /> {serverError}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7f7872]">Email Address</label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39b95] transition-colors group-focus-within:text-[#ef6f30]" size={18} />
                  <input
                    type="email"
                    {...register("Email")}
                    placeholder="name@company.com"
                    className={`w-full rounded-2xl border bg-[#fffaf6] py-4 pl-12 pr-4 font-semibold text-[#1e1c1b] outline-none transition-all placeholder:text-[#b5ada6] focus:border-[#ef6f30] focus:bg-white focus:ring-4 focus:ring-[#ef6f30]/10 ${
                      errors.Email ? "border-red-300" : "border-[#eadfd7]"
                    }`}
                  />
                </div>
                {errors.Email && <p className="text-xs font-bold text-red-500">{errors.Email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7f7872]">Password</label>
                  <button type="button" className="text-xs font-bold text-[#ef6f30] hover:text-[#cf5924]">Forgot password?</button>
                </div>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39b95] transition-colors group-focus-within:text-[#ef6f30]" size={18} />
                  <input
                    type="password"
                    {...register("Password")}
                    placeholder="••••••••"
                    className={`w-full rounded-2xl border bg-[#fffaf6] py-4 pl-12 pr-4 font-semibold text-[#1e1c1b] outline-none transition-all placeholder:text-[#b5ada6] focus:border-[#ef6f30] focus:bg-white focus:ring-4 focus:ring-[#ef6f30]/10 ${
                      errors.Password ? "border-red-300" : "border-[#eadfd7]"
                    }`}
                  />
                </div>
                {errors.Password && <p className="text-xs font-bold text-red-500">{errors.Password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#ef6f30] px-6 py-4 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(239,111,48,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#dc5f23] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Logging in...
                  </>
                ) : (
                  <>
                    Log In <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-[#f0ded2] bg-[#fff3eb] p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#ef6f30]" size={18} />
                <p className="text-xs font-semibold leading-5 text-[#6e6762]">
                  Pending organizer accounts remain locked until Super Admin approval.
                </p>
              </div>
            </div>

            <p className="mt-7 text-center text-sm text-[#77736f]">
              Don&apos;t have an account?{" "}
              <Link to="/OrganizerRegistration" className="font-extrabold text-[#ef6f30] hover:text-[#cf5924]">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;