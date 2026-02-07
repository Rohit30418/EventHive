import React, { useState } from "react";
import { useForm, type SubmitHandler, type UseFormRegister, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { apiPath } from "../../Utils/Utils";
import { Loader2, UploadCloud, X, Check, Calendar, User, Smartphone, Briefcase, Mail } from "lucide-react";
import { toast } from "react-toastify"; // Assume you have this setup
import { useParams } from "react-router-dom";

// 1. Props Interface
interface EventRegistrationProps {
//   eventId: string;
  primaryColor?: string;
}

// 2. Zod Schema
const registrationSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  designation: z.string().min(2, "Designation is required"),
 dob: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Adjust age if the birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= 18 && age <= 60;
    }, "Age must be between 18 and 60 years old"),
  gender: z.string().refine((val) => ["male", "female", "others"].includes(val), {
    message: "Please select your gender",
  }),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  // File validation is tricky in React Hook Form. We validate the FileList here.
  photo: z
    .any()
    .refine((files) => files?.length > 0, "Profile photo is required")
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine(
      (files) => ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(files?.[0]?.type),
      "Only .jpg, .png, and .webp formats are supported"
    ),
  interests: z.array(z.string()).min(1, "Please select at least one area of interest"),
 consent: z.boolean().refine((val) => val === true, {
  message: "You must agree to the terms and conditions",
}),
});

type FormData = z.infer<typeof registrationSchema>;

// --- Helper: Styled Input Component ---
const StyledInput = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon: Icon,
  primaryColor,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  icon: React.ElementType;
  primaryColor: string;
}) => (
  <div className="flex flex-col space-y-1.5 group">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" style={{ '--primary': primaryColor } as React.CSSProperties}>
            <Icon size={18} />
        </div>
        <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300 font-medium ${
            error ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-[var(--primary)] focus:bg-white"
        }`}
        style={{ '--primary': primaryColor, '--ring': `${primaryColor}33` } as React.CSSProperties} 
        // Using CSS variables for dynamic focus color in Tailwind class mostly, inline style for specifics
        onFocus={(e) => e.target.style.boxShadow = `0 0 0 4px ${primaryColor}20`}
        onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
    </div>
    {error && <p className="text-red-500 text-xs ml-1 font-medium animate-pulse">{error.message}</p>}
  </div>
);

const EventRegistration: React.FC<EventRegistrationProps> = ({
  primaryColor = "#4F46E5",
}) => {
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const {id}=useParams();

  // Watch interests for dynamic styling
  const selectedInterests = watch("interests") || [];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Remove file object, replace with Base64 string
      const { photo, ...rest } = data;
      
      const payload = {
        ...rest,
        photo: photoBase64,
        timestamp: new Date().toISOString(),
        eventId: id,
      };

      await axios.post(`${apiPath}/Registrations/${id}.json`, payload);

      toast.success("🎉 Registration successful! See you there.");
      reset();
      setPhotoBase64("");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestsList = ["Music", "Technology", "Design", "Networking", "Business", "Health", "Art"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      
      {/* Card Container */}
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden relative">
        
        {/* Top Decorative Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />

        <div className="p-8 md:p-12">
            
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Secure Your Spot</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                    Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600" style={{ color: primaryColor }}>Registration</span>
                </h2>
                <p className="text-slate-500 text-lg max-w-lg mx-auto">
                    Fill in your details below to confirm your attendance. We can't wait to see you!
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Personal Info Section */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-6 uppercase tracking-wider">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StyledInput label="Full Name" name="fullName" placeholder="Jane Doe" register={register} error={errors.fullName} icon={User} primaryColor={primaryColor} />
                        <StyledInput label="Email Address" name="email" type="email" placeholder="jane@company.com" register={register} error={errors.email} icon={Mail} primaryColor={primaryColor} />
                        <StyledInput label="Mobile Number" name="mobile" placeholder="9876543210" register={register} error={errors.mobile} icon={Smartphone} primaryColor={primaryColor} />
                        <StyledInput label="Date of Birth" name="dob" type="date" register={register} error={errors.dob} icon={Calendar} primaryColor={primaryColor} />
                    </div>
                </div>

                {/* Professional Info Section */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-6 uppercase tracking-wider">Professional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <StyledInput label="Designation / Role" name="designation" placeholder="Product Designer" register={register} error={errors.designation} icon={Briefcase} primaryColor={primaryColor} />
                         
                         {/* Gender Selection */}
                         <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Gender</label>
                            <div className="flex gap-4">
                                {["male", "female", "others"].map((g) => (
                                    <label key={g} className="flex-1 cursor-pointer group">
                                        <input type="radio" value={g} {...register("gender")} className="peer sr-only" />
                                        <div className="flex items-center justify-center py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-medium capitalize transition-all duration-200 peer-checked:bg-white peer-checked:shadow-md peer-checked:text-slate-900"
                                             style={{ borderColor: 'var(--border-color)' }}
                                             // Inline style hack for dynamic border color on check
                                        >
                                           {g}
                                        </div>
                                        {/* Dynamic Border for checked state handled via inline styles in a real scenario, here relying on standard classes or custom CSS variable injection */}
                                        <style>{`input[value="${g}"]:checked + div { border-color: ${primaryColor}; color: ${primaryColor}; background-color: ${primaryColor}10; }`}</style>
                                    </label>
                                ))}
                            </div>
                            {errors.gender && <p className="text-red-500 text-xs ml-1 font-medium">{errors.gender.message}</p>}
                         </div>
                    </div>
                </div>

                {/* Upload & Interests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Photo Upload (Left - 4 Cols) */}
                    <div className="md:col-span-5 flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Profile Photo</label>
                        <div className={`relative w-full aspect-square md:aspect-auto md:h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group overflow-hidden
                            ${errors.photo ? "border-red-300 bg-red-50" : "border-slate-300 hover:border-[var(--primary)] bg-slate-50 hover:bg-[var(--primary-light)]"}`}
                            style={{ '--primary': primaryColor, '--primary-light': `${primaryColor}10` } as React.CSSProperties}
                        >
                            {photoBase64 ? (
                                <>
                                    <img src={photoBase64} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            type="button" 
                                            onClick={() => { setPhotoBase64(""); reset({ photo: undefined }); }}
                                            className="bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-full p-2 hover:bg-red-500 hover:border-red-500 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <UploadCloud size={32} style={{ color: primaryColor }} />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700">Click to upload photo</p>
                                    <p className="text-xs text-slate-400 mt-1">Max 2MB (JPG/PNG)</p>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        {...register("photo")}
                                        onChange={(e) => {
                                            register("photo").onChange(e);
                                            handlePhotoChange(e);
                                        }}
                                    />
                                </>
                            )}
                        </div>
                        {errors.photo && <p className="text-red-500 text-xs ml-1 font-medium">{String(errors.photo.message)}</p>}
                    </div>

                    {/* Interests (Right - 8 Cols) */}
                    <div className="md:col-span-7 flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Areas of Interest</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full">
                            <div className="flex flex-wrap gap-3">
                                {interestsList.map((interest) => (
                                    <label key={interest} className="cursor-pointer relative">
                                        <input 
                                            type="checkbox" 
                                            value={interest} 
                                            {...register("interests")} 
                                            className="peer sr-only" 
                                        />
                                        <div className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 transition-all shadow-sm hover:shadow-md peer-checked:shadow-none peer-checked:text-white transform peer-checked:scale-95"
                                             style={{ '--primary': primaryColor } as React.CSSProperties}
                                        >
                                            {interest}
                                        </div>
                                        {/* CSS Injection for dynamic background color */}
                                        <style>{`input[value="${interest}"]:checked + div { background-color: ${primaryColor}; border-color: ${primaryColor}; }`}</style>
                                    </label>
                                ))}
                            </div>
                            {errors.interests && <p className="text-red-500 text-xs mt-4 font-medium">{errors.interests.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Consent & Submit */}
                <div className="pt-6 border-t border-slate-100">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center mt-0.5">
                            <input 
                                type="checkbox" 
                                {...register("consent")} 
                                className="peer h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer appearance-none bg-slate-100 checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all"
                                style={{ '--primary': primaryColor } as React.CSSProperties}
                            />
                            <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                            I agree to the <span className="font-bold underline decoration-2 underline-offset-2" style={{ color: primaryColor }}>Terms & Conditions</span> and Privacy Policy.
                        </span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-xs mt-1 ml-8 font-medium">{errors.consent.message}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        style={{ backgroundColor: primaryColor }}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;