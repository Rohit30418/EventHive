import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./ValidationSchema";
import type z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  User, Mail, Phone, Building2, Lock, ArrowRight, Loader2, CheckCircle, Star 
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
      // ---------------------------------------------------------
      // STEP 1: Create the User in Firebase Auth (The "Key")
      // ---------------------------------------------------------
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      const user = userCredential.user;

      // Update their display name immediately
      await updateProfile(user, { displayName: data.fullName });

      // ---------------------------------------------------------
      // STEP 2: Save the Profile in Database (Using the UID)
      // ---------------------------------------------------------
      const profileData = {
        id: user.uid,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        role: "Organizer", 
        isApproved: false,
        createdAt: new Date().toISOString()

      };

      // We use .put() to save specifically at /Organizer/USER_ID
      await axios.put(`${apiPath}/Organizer/${user.uid}.json`, profileData);

      toast.success("🎉 Registration successful! Redirecting...");
      reset();
      navigate("/login");

    } catch (err: any) {
      // Handle Firebase Errors specifically
      if (err.code === "auth/email-already-in-use") {
        toast.error("⚠️ An account with this email already exists.");
      } else if (err.code === "auth/weak-password") {
        toast.error("⚠️ Password must be at least 6 characters.");
      } else {
        toast.error("❌ Registration failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen pt-20 bg-white">
  
      <div className="hidden lg:flex w-1/2 relative bg-indigo-600 overflow-hidden flex-col justify-between p-16 text-white">
       
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
       
      </div>
      
       {/* ================= RIGHT SIDE FORM ================= */}
       <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create an Account</h2>
            <p className="mt-2 text-sm text-gray-500">
              Join us today! Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
 
              {/* Full Name */}
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
               <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    {...register("fullName")}
                    type="text"
                    placeholder="e.g. Alex Sterling"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium"
                  />
               </div>
               {errors.fullName && <p className="text-red-500 text-xs ml-1 font-medium">{errors.fullName.message}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Email</label>
                  <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input 
                        {...register("email")}
                        type="email"
                        placeholder="john@work.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium"
                      />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs ml-1 font-medium">{errors.email.message}</p>}
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Phone</label>
                  <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Phone size={18} />
                      </div>
                      <input 
                        {...register("phone")}
                        type="number"
                        placeholder="1234567890"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium"
                      />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs ml-1 font-medium">{errors.phone.message}</p>}
               </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Company / Organization</label>
               <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <Building2 size={18} />
                  </div>
                  <input 
                    {...register("companyName")}
                    type="text"
                    placeholder="EventHive Inc."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium"
                  />
               </div>
               {errors.companyName && <p className="text-red-500 text-xs ml-1 font-medium">{errors.companyName.message}</p>}
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        {...register("password")}
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium"
                      />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs ml-1 font-medium">{errors.password.message}</p>}
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Confirm</label>
                  <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium"
                      />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs ml-1 font-medium">{errors.confirmPassword.message}</p>}
               </div>
            </div>

            {/* Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <div className="relative flex items-center mt-0.5">
                  <input 
                    {...register("consent")} 
                    type="checkbox" 
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-gray-50 checked:border-indigo-600 checked:bg-indigo-600 transition-all focus:ring-2 focus:ring-indigo-600/20" 
                  />
                  <CheckCircle className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={12} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  I agree to the <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">Terms of Service</Link> and <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">Privacy Policy</Link>.
                </span>
              </label>
              {errors.consent && <p className="text-red-500 text-xs mt-1 ml-8 font-medium">{errors.consent.message}</p>}
            </div>

             <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full group relative overflow-hidden rounded-xl py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 transform active:scale-[0.98] mt-4
                ${isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-600/40"
                }
              `}
            >
              <div className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgniserRegistration;