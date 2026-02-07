import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./ValidationSchema";
import type z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  User, Mail, Phone, Building2, Lock, ArrowRight, Loader2, CheckCircle, Cake 
} from "lucide-react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { apiPath } from "../../Utils/Utils"; 

type FormData = z.infer<typeof validationSchema>;

const OrgniserRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onsubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.fullName });

      const profileData = {
        id: user.uid,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        companyName: data.companyName,
        role: "Organizer", 
        isApproved: false,
        createdAt: new Date().toISOString()
      };

      await axios.put(`${apiPath}/Organizer/${user.uid}.json`, profileData);
      toast.success("🎉 Registration successful!");
      reset();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.code === "auth/email-already-in-use" ? "⚠️ Email exists" : "❌ Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-20 bg-gray-50 py-12 px-4 relative overflow-hidden">
      
      {/* Background Star Animation Layers */}
      {/* <div className="bg-animation absolute inset-0 z-0 pointer-events-none">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div> */}

      {/* Background Blur Orbs using Theme Colors */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondory/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Registration Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Organizer Sign Up</h2>
            <p className="mt-2 text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline transition-colors">Log in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input 
                  {...register("fullName")}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                  <input {...register("email")} type="email" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="name@company.com" />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                  <input {...register("phone")} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="1234567890" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>

            {/* DOB & Company Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Date of Birth</label>
                <div className="relative group">
                  <Cake className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                  <input {...register("dob")} type="date" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" />
                </div>
                {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Company</label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                  <input {...register("companyName")} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" placeholder="Organization Name" />
                </div>
                {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
              </div>
            </div>

            {/* Passwords Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                  <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" />
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                  <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all" />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input {...register("consent")} type="checkbox" className="peer h-5 w-5 appearance-none rounded border border-gray-300 bg-gray-50 checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                  <CheckCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={12} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">I agree to the Terms and Privacy Policy</span>
              </label>
              {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                isSubmitting ? "bg-primary/70" : "bg-primary hover:brightness-110 shadow-primary/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgniserRegistration;