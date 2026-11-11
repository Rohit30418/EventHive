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
  CalendarCheck,
  Globe2,
  Users,
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

const organizerBenefits = [
  { icon: CalendarCheck, text: "Create and publish your own events" },
  { icon: Globe2, text: "Launch branded public event microsites" },
  { icon: Users, text: "Manage attendee registrations from one dashboard" },
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

      toast.info("Demo checkout complete. No payment was charged. Creating organizer account...");

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
    <section className="bg-[#FFF8F3] py-10 text-[#1F1C1A] sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1296px] px-6 lg:px-12"><div className="mx-auto grid min-w-0 w-full max-w-[760px] overflow-hidden rounded-[20px] border border-[#E7D8CC] bg-white shadow-[0_4px_20px_rgba(31,28,26,0.03)] lg:max-w-none lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <aside className="hidden min-w-0 bg-[#F26B2A] p-6 text-white lg:block lg:p-10">
          <div className="flex h-full flex-col">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
                <span className="h-px w-9 bg-white/60" /> Organizer onboarding
              </div>
              <h1 className="mt-6 max-w-md font-['Space Grotesk',sans-serif] text-2xl font-extrabold leading-[1.15] tracking-[-0.004em] sm:text-3xl lg:text-4xl">
                Build your event presence with EventHive.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                Create your organizer account, publish event pages and manage registrations from one focused workspace.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:mt-auto lg:grid-cols-1 lg:pt-10">
              {organizerBenefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#F26B2A]">
                    <Icon size={16} />
                  </span>
                  <p className="pt-1 text-sm font-semibold leading-6 text-white/90">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full min-w-0 max-w-2xl">
            <div className="mb-6">
              <div className="mb-5 flex max-w-[220px] items-center gap-2">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      step >= item ? "bg-[#F26B2A]" : "bg-[#eee3db]"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#F26B2A]">
                Step {step} of 2
              </p>
              <h2 className="mt-3 font-['Space Grotesk',sans-serif] text-2xl font-extrabold tracking-[-0.004em] text-[#1F1C1A] sm:text-3xl">
                {step === 1 ? "Create organizer account" : "Demo checkout — no real payment"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#77736f]">
                {step === 1 ? (
                  <>
                    Already have an account?{" "}
                    <Link to="/Login" className="font-extrabold text-[#F26B2A] hover:text-[#cf5924]">
                      Log in
                    </Link>
                  </>
                ) : (
                  "This is a simulated checkout. No money will be charged or verified."
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
                  <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-[#eadfd7] bg-[#FFF8F3] p-4 transition-colors hover:border-[#F26B2A]/35">
                    <span className="relative mt-0.5 flex items-center">
                      <input
                        {...register("consent")}
                        type="checkbox"
                        className="peer h-5 w-5 appearance-none rounded-md border border-[#cfc6bf] bg-white transition-all checked:border-[#F26B2A] checked:bg-[#F26B2A]"
                      />
                      <CheckCircle
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        size={12}
                      />
                    </span>
                    <span className="text-sm font-semibold leading-6 text-[#6e6762]">
                      I agree to the Terms and Privacy Policy and confirm the organizer details are accurate.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-2 text-xs font-bold text-red-500">{errors.consent.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#1F1C1A] px-6 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#F26B2A]"
                >
                  Proceed to Demo Checkout <ArrowRight size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-[#f0ded2] bg-[#fff3eb] p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#77736f]">Organizer Pro Subscription</p>
                      <h3 className="mt-1 font-['Space Grotesk',sans-serif] text-3xl font-extrabold text-[#1F1C1A]">$50.00 <span className="text-sm font-semibold text-[#77736f]">(demo price)</span></h3>
                    </div>
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#F26B2A]">
                      <span className="h-2 w-2 rounded-full bg-[#F26B2A]" /> Demo checkout
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
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          selected
                            ? "border-[#F26B2A] bg-[#fff3eb] text-[#cf5924]"
                            : "border-[#eadfd7] bg-white text-[#77736f] hover:border-[#F26B2A]/40"
                        }`}
                      >
                        <Icon size={22} className="mb-3" />
                        <span className="block text-sm font-extrabold">{method.label}</span>
                        <span className="mt-1 block text-xs font-semibold opacity-75">{method.hint}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-[1.5rem] border border-[#eadfd7] bg-[#FFF8F3] p-5">
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <input type="text" readOnly className="w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 font-semibold text-[#625d59] outline-none" value="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" readOnly className="w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 font-semibold text-[#625d59] outline-none" value="12/30" />
                        <input type="text" readOnly className="w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 font-semibold text-[#625d59] outline-none" value="123" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7f7872]">UPI ID</label>
                      <input type="text" placeholder="username@oksbi" className="w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 font-semibold text-[#1F1C1A] outline-none focus:border-[#F26B2A] focus:ring-4 focus:ring-[#F26B2A]/10" />
                      <p className="text-xs font-semibold text-[#9a938d]">Open your UPI app to approve the request.</p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7f7872]">Select bank</label>
                      <select className="w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 font-semibold text-[#1F1C1A] outline-none focus:border-[#F26B2A] focus:ring-4 focus:ring-[#F26B2A]/10">
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
                    className="flex items-center justify-center gap-2 rounded-full border border-[#eadfd7] bg-white px-6 py-4 text-sm font-bold text-[#625d59] transition-all hover:border-[#F26B2A]/40 hover:text-[#F26B2A] sm:flex-1"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handlePaymentAndRegistration}
                    disabled={isProcessing}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#F26B2A] px-6 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#dc5f23] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-[2]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Processing...
                      </>
                    ) : (
                      <>
                        Complete Demo Checkout <ArrowRight size={18} />
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