import { useState, type ElementType } from "react";
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
  type FieldError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./ValidationSchema";
import type z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Building2,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle,
  Cake,
  CreditCard,
  Smartphone,
  Landmark,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";
import { getErrorCode, getErrorMessage } from "../utils/error";
import AuthVisual from "../components/AuthVisual";
import "../styles/auth-2026.css";

type FormData = z.infer<typeof validationSchema>;
type PaymentMethod = "card" | "upi" | "bank";

type FieldProps = {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  icon: ElementType;
  register: UseFormRegister<FormData>;
  error?: FieldError;
};

// Extracted field component to keep the form clean and optimized
const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
}: FieldProps) => (
  <div className="space-y-2">
    <label htmlFor={name} className="ml-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
      {label}
    </label>
    <div className="group relative">
      <Icon
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600"
      />
      <input
        id={name}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""
        }`}
      />
    </div>
    {error && (
      <p className="ml-1 text-xs font-bold text-red-500">
        {error.message}
      </p>
    )}
  </div>
);

// OPTIMIZATION 1: Moved static array outside the component to prevent memory reallocation on keystrokes
const paymentOptions = [
  { id: "card" as PaymentMethod, label: "Card", icon: CreditCard, hint: "Simulation only" },
  { id: "upi" as PaymentMethod, label: "UPI", icon: Smartphone, hint: "No payment" },
  { id: "bank" as PaymentMethod, label: "NetBanking", icon: Landmark, hint: "Simulation only" },
];

const OrganizerRegistration = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    setServerError(null);
    setFormData(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentAndRegistration = async () => {
    if (!formData) return;

    setIsProcessing(true);
    setServerError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      toast.info("Simulated checkout complete. No payment was charged. Creating organiser account...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.fullName,
      });

      const profileData = {
        id: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        companyName: formData.companyName,
        role: "Organizer",
        isApproved: false,
        subscriptionStatus: "demo",
        paymentMethod,
        paymentAmount: 0,
        createdAt: new Date().toISOString(),
      };

      const token = await user.getIdToken();
      await axios.put(`${apiPath}/Organizer/${user.uid}.json?auth=${token}`, profileData);

      // createUserWithEmailAndPassword signs the new organizer in automatically.
      // Keep pending organizers out of the authenticated dashboard session until
      // the Super Admin explicitly approves the account.
      await auth.signOut();

      toast.success("Account created successfully. Approval is pending.");
      reset();
      navigate("/Login");
    } catch (err: unknown) {
      const code = getErrorCode(err);
      const message =
        code === "auth/email-already-in-use"
          ? "This email is already registered. Please login or use another email."
          : getErrorMessage(err, "Registration failed. Please try again.");

      setServerError(message);
      toast.error(message);

      if (code === "auth/email-already-in-use") {
        setStep(1);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="eh-auth-page eh-auth-page--register" aria-label="EventHive organiser registration">
      <div className="eh-auth-container"><div className="eh-auth-panel">
        <AuthVisual mode="register" />

        <div className="eh-auth-form-side">
          <div className="eh-auth-form-inner">
            <div className="eh-auth-form-heading">
              <div className="eh-auth-progress mb-5 flex max-w-[220px] items-center gap-2">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      step >= item ? "bg-[#3848BE]" : "bg-[#E9EAF2]"
                    }`}
                  />
                ))}
              </div>

              <p className="eh-auth-kicker">Step {step} of 2 · Organiser onboarding</p>
              <h1>
                {step === 1 ? "Register as an organiser." : "Complete your account setup."}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#73778E]">
                {step === 1 ? (
                  <>
                    Already have an account?{" "}
                    <Link to="/Login" className="font-extrabold text-[#3848BE] hover:text-[#2B3899]">
                      Log in
                    </Link>
                  </>
                ) : (
                  "Choose a sample payment option to continue. This is a simulation; no money will be charged."
                )}
              </p>
            </div>

            {serverError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                <div className="flex gap-3">
                  <AlertCircle size={18} className="shrink-0" />
                  {serverError}
                </div>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleSubmit(onFormSubmit)} className="eh-auth-form space-y-5">
                <Field
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  icon={User}
                  register={register}
                  error={errors.fullName}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    icon={Mail}
                    register={register}
                    error={errors.email}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    placeholder="9876543210"
                    icon={Phone}
                    register={register}
                    error={errors.phone}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    icon={Cake}
                    register={register}
                    error={errors.dob}
                  />
                  <Field
                    label="Company"
                    name="companyName"
                    placeholder="Organization Name"
                    icon={Building2}
                    register={register}
                    error={errors.companyName}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    register={register}
                    error={errors.password}
                  />
                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    register={register}
                    error={errors.confirmPassword}
                  />
                </div>

                <div className="pt-1">
                  <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E9EAF2] bg-[#FFFFFF] p-4 transition-colors hover:border-[#3848BE]/35">
                    <span className="relative mt-0.5 flex items-center">
                      <input
                        {...register("consent")}
                        type="checkbox"
                        className="peer h-5 w-5 appearance-none rounded-md border border-[#cfc6bf] bg-white transition-all checked:border-[#3848BE] checked:bg-[#3848BE]"
                      />
                      <CheckCircle
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        size={12}
                      />
                    </span>
                    <span className="text-sm font-semibold leading-6 text-[#697087]">
                      I agree to the Terms and Privacy Policy and confirm the organizer details are accurate.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-2 text-xs font-bold text-red-500">{errors.consent.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="eh-auth-submit"
                >
                  Continue to simulated checkout <ArrowRight size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="eh-auth-checkout-summary">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#73778E]">Account setup · Simulated checkout</p>
                      <h3 className="eh-auth-zero">₹0 <span>(No money charged)</span></h3>
                    </div>
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#3848BE]">
                      <span className="h-2 w-2 rounded-full bg-[#3848BE]" /> Simulation only
                    </div>
                  </div>
                </div>

                <div className="eh-auth-payment-grid grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {paymentOptions.map((method) => {
                    const Icon = method.icon;
                    const selected = paymentMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        aria-pressed={selected}
                        className={`eh-auth-payment-option rounded-2xl border p-4 text-left transition-all ${
                          selected
                            ? "border-[#3848BE] bg-[#F8F7FF] text-[#2B3899]"
                            : "border-[#E9EAF2] bg-white text-[#73778E] hover:border-[#3848BE]/40"
                        }`}
                      >
                        <Icon size={22} className="mb-3" />
                        <span className="block text-sm font-extrabold">{method.label}</span>
                        <span className="mt-1 block text-xs font-semibold opacity-75">{method.hint}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="eh-auth-checkout-inputs">
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <input type="text" readOnly className="w-full rounded-xl border border-[#E9EAF2] bg-white px-4 py-3 font-semibold text-[#73778E] outline-none" value="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" readOnly className="w-full rounded-xl border border-[#E9EAF2] bg-white px-4 py-3 font-semibold text-[#73778E] outline-none" value="12/30" />
                        <input type="text" readOnly className="w-full rounded-xl border border-[#E9EAF2] bg-white px-4 py-3 font-semibold text-[#73778E] outline-none" value="123" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#73778E]">UPI ID</label>
                      <input type="text" placeholder="username@oksbi" className="w-full rounded-xl border border-[#E9EAF2] bg-white px-4 py-3 font-semibold text-[#111831] outline-none focus:border-[#3848BE] focus:ring-4 focus:ring-[#3848BE]/10" />
                      <p className="eh-auth-simulation-note">Sample UPI field only. No payment request will be sent.</p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#73778E]">Select bank</label>
                      <select className="w-full rounded-xl border border-[#E9EAF2] bg-white px-4 py-3 font-semibold text-[#111831] outline-none focus:border-[#3848BE] focus:ring-4 focus:ring-[#3848BE]/10">
                        <option>HDFC Bank</option>
                        <option>SBI</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isProcessing}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#E9EAF2] bg-white px-6 py-4 text-sm font-bold text-[#73778E] transition-all hover:border-[#3848BE]/40 hover:text-[#3848BE] sm:flex-1"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handlePaymentAndRegistration}
                    disabled={isProcessing}
                    className="eh-auth-submit sm:flex-[2]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Processing...
                      </>
                    ) : (
                      <>
                        Create organiser account <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default OrganizerRegistration;