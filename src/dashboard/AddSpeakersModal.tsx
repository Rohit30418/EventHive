import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Camera, UploadCloud, Loader2 } from "lucide-react";

// ------------------ SCHEMA ----------------------
const AddSpeakerSchema = z.object({
  speakerName: z.string().min(3, "Name must be at least 3 characters"),
  speakerDesignation: z.string().min(3, "Designation must be at least 3 characters"),
  speakerImage: z.string().optional(), 
});

type SpeakerFormData = z.infer<typeof AddSpeakerSchema>;

interface Props {
  onClose: () => void;
  onSave: (data: SpeakerFormData) => void;
  defaultData?: SpeakerFormData | null;
}

const AddSpeakersModal = ({ onClose, onSave, defaultData }: Props) => {
  const [preview, setPreview] = useState<string>(defaultData?.speakerImage || "");
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SpeakerFormData>({
    resolver: zodResolver(AddSpeakerSchema),
    defaultValues: defaultData || {
        speakerName: "",
        speakerDesignation: "",
        speakerImage: ""
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be below 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString() || "";
      setValue("speakerImage", base64, { shouldValidate: true });
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const onFormSubmit = async (data: SpeakerFormData) => {
    onSave(data);
    reset();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[999] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div 
          className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm transition-all" 
          onClick={onClose} 
        />

        {/* MODAL CARD - Removed overflow-hidden here */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 mt-20"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          
          {/* DECORATIVE HEADER BACKGROUND */}
          <div className="h-32 bg-indigo-600 absolute -top-16 w-full rounded-t-[2rem]" />

          {/* CLOSE BUTTON - Increased z-index */}
          <button 
            type="button" 
            onClick={onClose} 
            className="absolute -top-12 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all backdrop-blur-md z-30"
          >
            <X size={20} />
          </button>

          <div className="px-8 pb-8 pt-6 relative z-20">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              
              {/* IMAGE UPLOAD SECTION */}
              <div className="flex flex-col items-center -mt-24 mb-6">
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                >
                  <input
                    type="file"
                    id="speaker-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <label 
                    htmlFor="speaker-upload"
                    className={`block w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden relative bg-gray-100 dark:bg-gray-700 transition-all duration-300 
                    ${errors.speakerImage ? 'ring-4 ring-red-100 dark:ring-red-900/50' : 'group-hover:ring-4 group-hover:ring-indigo-500/20'}`}
                  >
                    {preview ? (
                      <img src={preview} alt="Speaker" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                        <UploadCloud size={32} />
                        <span className="text-[10px] mt-1 font-medium uppercase tracking-wide">Upload</span>
                      </div>
                    )}

                    {/* HOVER OVERLAY */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white transition-opacity duration-200 ${isHoveringImage ? 'opacity-100' : 'opacity-0'}`}>
                      <Camera size={24} />
                    </div>
                  </label>

                  {/* ERROR MESSAGE FOR IMAGE */}
                  {errors.speakerImage && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max">
                      <p className="text-red-500 text-xs font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md border border-red-100 dark:border-red-900">
                        {errors.speakerImage.message}
                      </p>
                    </div>
                  )}
                </div>
                
                <h2 className="mt-3 text-xl font-bold text-gray-800 dark:text-white">
                  {defaultData ? "Edit Speaker" : "New Speaker"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Fill in the details below</p>
              </div>

              {/* INPUT FIELDS */}
              <div className="space-y-5">
                
                {/* NAME INPUT */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <User size={18} />
                  </div>
                  <input
                    {...register("speakerName")}
                    placeholder="Speaker Full Name"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none ${
                      errors.speakerName 
                      ? "border-red-300 dark:border-red-800 focus:border-red-500" 
                      : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.speakerName && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.speakerName.message}</p>
                  )}
                </div>

                {/* DESIGNATION INPUT */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <Briefcase size={18} />
                  </div>
                  <input
                    {...register("speakerDesignation")}
                    placeholder="Job Title / Designation"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none ${
                      errors.speakerDesignation 
                      ? "border-red-300 dark:border-red-800 focus:border-red-500" 
                      : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.speakerDesignation && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.speakerDesignation.message}</p>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (defaultData ? "Update Changes" : "Add Speaker")}
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddSpeakersModal;