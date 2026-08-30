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
  { id: "card" as PaymentMethod, label: "Card", icon: CreditCard, hint: "Visa / MasterCard" },
  { id: "upi" as PaymentMethod, label: "UPI", icon: Smartphone, hint: "Instant approval" },
  { id: "bank" as PaymentMethod, label: "NetBanking", icon: Landmark, hint: "Indian banks" },
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

      toast.info("Payment verified. Creating organizer account...");

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
        subscriptionStatus: "active",
        paymentMethod,
        paymentAmount: 50,
        createdAt: new Date().toISOString(),
      };

      const token = await user.getIdToken();
      await axios.put(`${apiPath}/Organizer/${user.uid}.json?auth=${token}`, profileData);

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_34rem),radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30rem),linear-gradient(180deg,#ffffff_0%,#fbfbff_52%,#ffffff_100%)] px-4 py-8 text-slate-950 sm:px-6">
      
      {/* OPTIMIZATION 2: Zero-cost radial gradients instead of heavy CSS blurs */}
      <div className="pointer-events-none absolute left-[-10rem] top-24 h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgba(196,181,253,0.3),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-[-8rem] h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgba(103,232,249,0.3),transparent)]" />

      {/* OPTIMIZATION 3: will-change-transform forces this layer to the GPU, preventing text input repaints */}
      <div className="relative z-10 w-full  max-w-2xl overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/72 shadow-[0_28px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl will-change-transform">
        
        <div className="bg-white/92 p-6 sm:p-10 lg:p-12">
          
      
          <div className="mx-auto max-w-xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex max-w-[200px] items-center gap-2">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      step >= item ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>

              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Step {step} of 2</p>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {step === 1 ? "Create organizer account" : "Complete secure payment"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {step === 1 ? (
                  <>
                    Already have an account?{" "}
                    <Link to="/Login" className="font-black text-indigo-600 hover:text-indigo-700">
                      Log in
                    </Link>
                  </>
                ) : (
                  "Your subscription is mocked for demo flow and account creation continues after payment confirmation."
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
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                <Field
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  icon={User}
                  register={register}
                  error={errors.fullName}
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <div className="pt-2">
                  <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/40">
                    <span className="relative mt-0.5 flex items-center">
                      <input
                        {...register("consent")}
                        type="checkbox"
                        className="peer h-5 w-5 appearance-none rounded-md border border-slate-300 bg-white transition-all checked:border-indigo-600 checked:bg-indigo-600"
                      />
                      <CheckCircle
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        size={12}
                      />
                    </span>
                    <span className="text-sm font-semibold leading-6 text-slate-600 group-hover:text-slate-800">
                      I agree to the Terms and Privacy Policy and confirm the organizer details are accurate.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="ml-1 mt-2 text-xs font-bold text-red-500">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600"
                >
                  Proceed to Payment <ArrowRight size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-500">Organizer Pro Subscription</p>
                      <h3 className="mt-1 text-3xl font-black text-slate-950">$50.00</h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Secure
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {paymentOptions.map((method) => {
                    const Icon = method.icon;
                    const selected = paymentMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`rounded-2xl border-2 p-4 text-left transition-all ${
                          selected
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-600/10"
                            : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200"
                        }`}
                      >
                        <Icon size={24} className="mb-3" />
                        <span className="block text-sm font-black">{method.label}</span>
                        <span className="mt-1 block text-xs font-semibold opacity-75">{method.hint}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <input type="text" readOnly className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-600 outline-none" value="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" readOnly className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-600 outline-none" value="12/30" />
                        <input type="text" readOnly className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-600 outline-none" value="123" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-3">
                      <label className="ml-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">UPI ID</label>
                      <input type="text" placeholder="username@oksbi" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
                      <p className="text-xs font-semibold text-slate-400">Open your UPI app to approve the request.</p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="space-y-3">
                      <label className="ml-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Select bank</label>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100">
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
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 sm:flex-1"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handlePaymentAndRegistration}
                    disabled={isProcessing}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-[2]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Processing...
                      </>
                    ) : (
                      <>
                        Pay $50.00 <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrganizerRegistration;