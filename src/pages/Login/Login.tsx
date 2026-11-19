import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import AuthVisual from "../../components/AuthVisual";
import "../../styles/auth-2026.css";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
  const [resettingPassword, setResettingPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const logoutNotifiedRef = useRef(false);

  useEffect(() => {
    const logoutSuccess = (location.state as { logoutSuccess?: boolean } | null)?.logoutSuccess === true;
    if (!logoutSuccess || logoutNotifiedRef.current) return;
    logoutNotifiedRef.current = true;
    toast.success("You are logged out.");
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const {
    register,
    handleSubmit,
    getValues,
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


  const handlePasswordReset = async () => {
    const email = getValues("Email")?.trim();
    if (!email || !z.string().email().safeParse(email).success) {
      toast.info("Enter your email address above to reset your password.");
      return;
    }
    setResettingPassword(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset instructions have been sent if the address is registered.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Could not request a password reset. Please try again."));
    } finally {
      setResettingPassword(false);
    }
  };

  return (
    <section className="eh-auth-page eh-auth-page--login" aria-label="EventHive login">
      <div className="eh-auth-container"><div className="eh-auth-panel">
        <AuthVisual mode="login" />

        <div className="eh-auth-form-side">
          <div className="eh-auth-form-inner">
            <div className="eh-auth-form-heading">
              <p className="eh-auth-kicker">Secure organiser access</p>
              <h1>
                Welcome back.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#73778E]">
                Log in to your organiser or Super Admin workspace.
              </p>
            </div>

            {serverError && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                <div className="flex gap-3">
                  <AlertCircle size={18} className="shrink-0" /> {serverError}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="eh-auth-form space-y-5">
              <div className="space-y-2">
                <label htmlFor="eh-login-email">Email address</label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9DB0] transition-colors group-focus-within:text-[#3848BE]" size={18} />
                  <input
                    id="eh-login-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.Email)}
                    {...register("Email")}
                    placeholder="name@company.com"
                    className={`w-full rounded-2xl border bg-[#FFFFFF] py-3.5 pl-12 pr-4 font-semibold text-[#111831] outline-none transition-all placeholder:text-[#9A9DB0] focus:border-[#3848BE] focus:bg-white focus:ring-4 focus:ring-[#3848BE]/10 ${
                      errors.Email ? "border-red-300" : "border-[#E9EAF2]"
                    }`}
                  />
                </div>
                {errors.Email && <p className="text-xs font-bold text-red-500">{errors.Email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="eh-login-password">Password</label>
                  <button type="button" className="eh-auth-reset" onClick={handlePasswordReset} disabled={resettingPassword}>{resettingPassword ? "Sending..." : "Forgot password?"}</button>
                </div>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9DB0] transition-colors group-focus-within:text-[#3848BE]" size={18} />
                  <input
                    id="eh-login-password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.Password)}
                    {...register("Password")}
                    placeholder="••••••••"
                    className={`w-full rounded-2xl border bg-[#FFFFFF] py-4 pl-12 pr-4 font-semibold text-[#111831] outline-none transition-all placeholder:text-[#9A9DB0] focus:border-[#3848BE] focus:bg-white focus:ring-4 focus:ring-[#3848BE]/10 ${
                      errors.Password ? "border-red-300" : "border-[#E9EAF2]"
                    }`}
                  />
                </div>
                {errors.Password && <p className="text-xs font-bold text-red-500">{errors.Password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="eh-auth-submit"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Logging in...
                  </>
                ) : (
                  <>
                    Log in to dashboard <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="eh-auth-note">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#3848BE]" size={18} />
                <p className="text-xs font-semibold leading-5 text-[#697087]">
                  Pending organizer accounts remain locked until Super Admin approval.
                </p>
              </div>
            </div>

            <p className="mt-7 text-center text-sm text-[#73778E]">
              New to EventHive?{" "}
              <Link to="/OrganizerRegistration" className="font-extrabold text-[#3848BE] hover:text-[#2B3899]">
                Register as organiser
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Login;