import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import axios from "axios";
import { apiPath } from "../../../Utils/Utils";

// ---------------- Types ----------------
const validationSchema = z.object({
  Email: z.string().email("Invalid email address").nonempty("Email cannot be blank"),
  Password: z.string().nonempty("Password cannot be blank"),
});

type FormData = z.infer<typeof validationSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      // 1. Ask Google: "Is this password correct?"
      const userCredential = await signInWithEmailAndPassword(auth, data.Email, data.Password);
      const user = userCredential.user;
      // 2. Ask Database: "Is this user APPROVED?"
      // We perform this quick check before letting them in.
      const dbResponse = await axios.get(`${apiPath}/Organizer/${user.uid}.json`);
      const userData = dbResponse.data;

      if (!userData) {
         // Edge case: User is in Auth but not in DB (Data mismatch)
         throw new Error("User profile not found.");
      }

      // BLOCK PENDING ORGANIZERS
      if (userData.role === "Organizer" && userData.isApproved === false) {
         toast.warning("⏳ Your account is pending approval from the Super Admin.");
         await auth.signOut(); // Kick them out immediately
         setLoading(false);
         return;
      }

      // 3. Success! Redirect to Dashboard
    
      toast.success(`Welcome back, ${userData.fullName || "User"}!`);
      navigate("/Dashboard"); 

    } catch (error: any) {
      // Handle Specific Firebase Errors
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        toast.error("❌ Invalid Email or Password.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("⚠️ Too many failed attempts. Try again later.");
      } else {
        toast.error("❌ Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 pt-20">
      
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/40 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-8 relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4 shadow-sm">
             <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-500 text-sm">Enter your credentials to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                      <Mail size={18} />
                  </div>
                  <input 
                      type="email"
                      {...register("Email")}
                      placeholder="name@company.com"
                      className={`w-full bg-gray-50 border ${errors.Email ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all duration-300 font-medium`}
                  />
              </div>
              {errors.Email && <p className="text-red-500 text-xs ml-1 font-medium">{errors.Email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline">Forgot password?</a>
              </div>
              <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                      <Lock size={18} />
                  </div>
                  <input 
                      type="password"
                      {...register("Password")}
                      placeholder="••••••••"
                      className={`w-full bg-gray-50 border ${errors.Password ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all duration-300 font-medium`}
                  />
              </div>
              {errors.Password && <p className="text-red-500 text-xs ml-1 font-medium">{errors.Password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full group relative overflow-hidden rounded-xl py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 transform active:scale-[0.98]
              ${loading 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-primary hover:bg-indigo-700 hover:shadow-indigo-600/30"
              }
            `}
          >
            <div className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging In...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/OrgniserRegistration" className="text-primary font-bold hover:text-indigo-700 transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;