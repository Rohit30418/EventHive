import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./ValidationSchema";
import type z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  User, Mail, Phone, Building2, Lock, ArrowRight, Loader2, CheckCircle, Cake,
  CreditCard, Smartphone, Landmark, ChevronLeft, ShieldCheck
} from "lucide-react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { apiPath } from "../../Utils/Utils"; 

type FormData = z.infer<typeof validationSchema>;

// Payment Method Types
type PaymentMethod = "card" | "upi" | "bank";

const OrgniserRegistration = () => {
  const [step, setStep] = useState<1 | 2>(1); // 1 = Form, 2 = Payment
  const [formData, setFormData] = useState<FormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  // Step 1: Validate Form and Move to Payment
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data);
    setStep(2);
  };

  // Step 2: Handle Payment & Final Registration
  const handlePaymentAndRegistration = async () => {
    if (!formData) return;

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second mock delay
   
       if (Math.random() > 0.8) throw new Error("Payment declined by bank");

      toast.info("💸 Payment of $50 successful!");

      // 2. Proceed with Actual Registration
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: formData.fullName });

      const profileData = {
        id: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        companyName: formData.companyName,
        role: "Organizer", 
        isApproved: false,
        subscriptionStatus: "active", // Mark as paid
        paymentMethod: paymentMethod,
        paymentAmount: 50,
        createdAt: new Date().toISOString()
      };

      await axios.put(`${apiPath}/Organizer/${user.uid}.json`, profileData);
      
      toast.success("🎉 Account created successfully!");
      reset();
      navigate("/login");

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("⚠️ Email already exists");
        setStep(1); // Go back to fix email
      } else {
        toast.error(err.message || "❌ Registration failed");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-30 bg-gray-50 py-12 px-4 relative overflow-hidden">

      {/* Background Blur Orbs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500">
        <div className="p-8 sm:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {step === 1 ? "Organizer Sign Up" : "Complete Payment"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {step === 1 ? (
                <>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link></>
              ) : (
                "Secure payment gateway powered by MockPay"
              )}
            </p>
          </div>

          {/* STEP 1: REGISTRATION FORM */}
          {step === 1 && (
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              {/* --- Full Name --- */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                  <input {...register("fullName")} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="John Doe" />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>

              {/* --- Email & Phone --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                    <input {...register("email")} type="email" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="name@company.com" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone</label>
                  <div className="relative group">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                    <input {...register("phone")} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="1234567890" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              {/* --- DOB & Company --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Date of Birth</label>
                  <div className="relative group">
                    <Cake size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                    <input {...register("dob")} type="date" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" />
                  </div>
                  {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Company</label>
                  <div className="relative group">
                    <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                    <input {...register("companyName")} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="Organization Name" />
                  </div>
                  {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
                </div>
              </div>

              {/* --- Passwords --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                    <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                    <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              {/* Consent */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input {...register("consent")} type="checkbox" className="peer h-5 w-5 appearance-none rounded border border-gray-300 bg-gray-50 checked:bg-primary checked:border-primary transition-all" />
                    <CheckCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={12} />
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-gray-700">I agree to the Terms and Privacy Policy</span>
                </label>
                {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
                <span>Proceed to Payment</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2: MOCK PAYMENT GATEWAY */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
              
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Amount</p>
                  <h3 className="text-2xl font-bold text-gray-900">$50.00</h3>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <ShieldCheck size={14} /> Secure
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === "card" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 hover:border-gray-200 text-gray-500"}`}
                >
                  <CreditCard size={24} className="mb-2" />
                  <span className="text-xs font-bold">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === "upi" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 hover:border-gray-200 text-gray-500"}`}
                >
                  <Smartphone size={24} className="mb-2" />
                  <span className="text-xs font-bold">UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === "bank" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 hover:border-gray-200 text-gray-500"}`}
                >
                  <Landmark size={24} className="mb-2" />
                  <span className="text-xs font-bold">NetBanking</span>
                </button>
              </div>

              {/* Dynamic Payment Inputs */}
              <div className="bg-white p-1 min-h-[150px]">
                {paymentMethod === "card" && (
                   <div className="space-y-4">
                     <input type="text" placeholder="Card Number (Mock)" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm" value="4242 4242 4242 4242" />
                     <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="MM/YY" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm" value="12/30" />
                       <input type="text" placeholder="CVC" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm" value="123" />
                     </div>
                   </div>
                )}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                     <p className="text-sm text-gray-500 mb-2">Enter your Virtual Payment Address (VPA)</p>
                     <input type="text" placeholder="username@oksbi" className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-primary outline-none" />
                     <p className="text-xs text-gray-400">Open your UPI app to approve the request.</p>
                  </div>
                )}
                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-2">Select your Bank</p>
                    <select className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm outline-none">
                      <option>HDFC Bank</option>
                      <option>SBI</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                 <button 
                   onClick={() => setStep(1)}
                   disabled={isProcessing}
                   className="flex-1 py-4 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                 >
                   <ChevronLeft size={18} /> Back
                 </button>
                 <button
                   onClick={handlePaymentAndRegistration}
                   disabled={isProcessing}
                   className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
                 >
                   {isProcessing ? (
                     <>
                       <Loader2 className="animate-spin" /> Processing...
                     </>
                   ) : (
                     <>Pay $50.00</>
                   )}
                 </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OrgniserRegistration;