import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
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
    <div className="relative flex min-h-screen pt-4 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_34rem),radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30rem),linear-gradient(180deg,#ffffff_0%,#fbfbff_52%,#ffffff_100%)] px-4  text-slate-950 sm:px-6">
      
      {/* Zero-cost radial gradients for background styling */}
      <div className="pointer-events-none absolute left-[-10rem] top-24 h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgba(196,181,253,0.3),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-[-8rem] h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgba(103,232,249,0.3),transparent)]" />

      {/* Centered Form Container */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/72 shadow-[0_28px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl will-change-transform">
        
        <div className="bg-white/92 p-6 sm:p-10">
          
      

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Welcome Back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to your organizer dashboard.</p>
          </div>

          {serverError && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
              <div className="flex gap-3"><AlertCircle size={18} className="shrink-0" /> {serverError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Email Address</label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18} />
                <input
                  type="email"
                  {...register("Email")}
                  placeholder="name@company.com"
                  className={`eh-input w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 ${errors.Email ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                />
              </div>
              {errors.Email && <p className="ml-1 text-xs font-bold text-red-500">{errors.Email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="ml-1 flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Password</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</button>
              </div>
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18} />
                <input
                  type="password"
                  {...register("Password")}
                  placeholder="••••••••"
                  className={`eh-input w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 ${errors.Password ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                />
              </div>
              {errors.Password && <p className="ml-1 text-xs font-bold text-red-500">{errors.Password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-70"
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

          <div className="mt-7 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 shrink-0 text-indigo-500" size={18} />
              <p className="text-xs font-semibold leading-5 text-slate-600">
                Pending organizers stay protected until Super Admin approval.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/OrganizerRegistration" className="font-black text-indigo-600 hover:text-indigo-700">
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;