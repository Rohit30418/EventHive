import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Calendar, MapPin, Users, Type, Palette, UploadCloud, X, ChevronRight, Loader2 
} from "lucide-react";

import useAddEvent from "../AdminCustomHooks/useAddEvent";
import AddSpeakersModal from "./AddSpeakersModal";
import { apiPath } from "../../Utils/Utils";

// ------------------ HELPERS -------------------------
// Gets today's date in YYYY-MM-DD format for the input 'min' attribute
const todayDate = new Date().toISOString().split("T")[0];

// ------------------ ZOD SCHEMA ----------------------
const speakerSchema = z.object({
  speakerName: z.string().min(2, "Name required"),
  speakerDesignation: z.string().min(2, "Designation required"),
  speakerImage: z.string().optional(),
});

const eventSchema = z.object({
  EventName: z.string().min(3, "Event Name must be at least 3 chars"),
  eventDate: z.string()
    .min(1, "Date is required")
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, { message: "Event must be scheduled for today or a future date" }),
  location: z.string().min(2, "Location is required"),
  eventType: z.enum(["Technology", "Webinar", "Music", "Art", "Sports"], {
    errorMap: () => ({ message: "Select a valid event type" }),
  }),
  banner: z.string().min(1, "Banner image is required"),
  BannerTagLine: z.string().min(3, "Tagline required"),
  AboutArea: z.string().min(10, "Description must be longer"),
  PrimaryColor: z.string().optional(),
  SecondaryColor: z.string().optional(),
  speakers: z.array(speakerSchema).optional(),
});

type EventFormData = z.infer<typeof eventSchema>;
type SpeakerType = z.infer<typeof speakerSchema>;

interface UserData {
  uid: string;
  name: string;
  userId: string;
}

// ------------------ COMPONENTS -------------------

const InputGroup = ({ label, error, children, icon: Icon }: any) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-gray-400 dark:text-gray-500" />} {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs animate-pulse">{error.message}</p>}
  </div>
);

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500";

// ------------------ MAIN COMPONENT -------------------
const CreateEvent: React.FC = () => {
  const { addEvent, isLoading } = useAddEvent();
  const { EventID } = useParams();
  const navigate = useNavigate();

  const raw = localStorage.getItem("userData");
  const userData: UserData | null = raw ? JSON.parse(raw) : null;
  const userId = userData?.userId;

  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [loadingEvent, setLoadingEvent] = useState<boolean>(false);
  const [speakers, setSpeakers] = useState<SpeakerType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      PrimaryColor: "#4F46E5",
      SecondaryColor: "#EC4899",
    }
  });

  const watchedValues = watch();

  const fetchEvent = useCallback(async () => {
    if (!EventID) return;
    setLoadingEvent(true);
    try {
      const { data: eventData } = await axios.get(`${apiPath}/Events/${EventID}.json`);
      if (!eventData) {
        toast.error("Event not found!");
        return;
      }
      reset(eventData);
      setSpeakers(eventData.speakers || []);
      setBannerPreview(eventData.banner);
    } catch {
      toast.error("Error loading event");
    } finally {
      setLoadingEvent(false);
    }
  }, [EventID, reset]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("banner", base64, { shouldValidate: true });
      setBannerPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      const payload = { ...data, speakers, userId };
      if (EventID) {
        await axios.patch(`${apiPath}/Events/${EventID}.json`, payload);
        toast.success("Event updated!");
      } else {
        await addEvent(payload);
        toast.success("Event created!");
      }
      reset();
      navigate("/dashboard");
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleAddOrEditSpeaker = (speaker: SpeakerType) => {
    setSpeakers((prev) =>
      editIndex !== null ? prev.map((s, i) => (i === editIndex ? speaker : s)) : [...prev, speaker]
    );
    setEditIndex(null);
    setIsModalOpen(false);
  };

  if (loadingEvent) return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 text-primary">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {EventID ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Design your event page and manage details below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-8">
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="text-primary" size={20} /> Event Details
              </h2>
              
              <div className="grid gap-6">
                <InputGroup label="Event Name" error={errors.EventName}>
                  <input
                    {...register("EventName")}
                    className={inputClass}
                    placeholder="e.g. Tech Conference 2026"
                  />
                </InputGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Date" icon={Calendar} error={errors.eventDate}>
                    <input
                      type="date"
                      min={todayDate} // <-- PREVENTS PAST DATE SELECTION IN UI
                      {...register("eventDate")}
                      className={`${inputClass} text-gray-600 dark:text-gray-300`}
                    />
                  </InputGroup>

                  <InputGroup label="Category" icon={Type} error={errors.eventType}>
                    <select
                      {...register("eventType")}
                      className={inputClass}
                    >
                      <option value="">Select Category</option>
                      {["Technology", "Webinar", "Music", "Art", "Sports"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </InputGroup>
                </div>

                <InputGroup label="Location" icon={MapPin} error={errors.location}>
                  <input
                    {...register("location")}
                    className={inputClass}
                    placeholder="e.g. New York City or Online URL"
                  />
                </InputGroup>

                <InputGroup label="About Event" icon={Type} error={errors.AboutArea}>
                  <textarea
                    {...register("AboutArea")}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe what attendees can expect..."
                  />
                </InputGroup>
              </div>
            </div>

            {/* BRANDING CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Palette className="text-primary" size={20} /> Branding
              </h2>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Banner Image</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      id="banner-upload" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleBannerChange} 
                    />
                    <label 
                      htmlFor="banner-upload" 
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all 
                      ${errors.banner ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 bg-gray-50 dark:bg-gray-900'}`}
                    >
                      {bannerPreview ? (
                        <div className="relative w-full h-full overflow-hidden rounded-xl">
                          <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                            Change Image
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-3 text-primary">
                            <UploadCloud size={24} />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (Max 2MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.banner && <p className="text-red-500 text-xs">{errors.banner.message}</p>}
                </div>

                <InputGroup label="Tagline" icon={Type} error={errors.BannerTagLine}>
                   <input
                    {...register("BannerTagLine")}
                    className={inputClass}
                    placeholder="A catchy subtitle for the banner"
                  />
                </InputGroup>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Primary Color</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          {...register("PrimaryColor")} 
                          className="h-10 w-10 p-0 border-0 rounded-lg cursor-pointer shadow-sm"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono uppercase">{watchedValues.PrimaryColor}</span>
                      </div>
                   </div>
                   <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Secondary Color</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          {...register("SecondaryColor")} 
                          className="h-10 w-10 p-0 border-0 rounded-lg cursor-pointer shadow-sm"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono uppercase">{watchedValues.SecondaryColor}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* SPEAKERS CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <Users className="text-primary" size={20} /> Speakers
                </h2>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  + Add Speaker
                </button>
              </div>

              {speakers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {speakers.map((spk, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        {spk.speakerImage ? (
                           <img src={spk.speakerImage} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {spk.speakerName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{spk.speakerName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{spk.speakerDesignation}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 text-gray-400">
                        <button type="button" onClick={() => { setEditIndex(i); setIsModalOpen(true); }} className="hover:text-primary transition-colors">
                           <ChevronRight size={18} />
                        </button>
                        <button type="button" onClick={() => setSpeakers(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-red-500 transition-colors">
                           <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <p className="text-gray-400 dark:text-gray-500 text-sm">No speakers added yet.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
               <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                 Cancel
               </button>
               <button 
                 type="submit" 
                 disabled={isLoading}
                 className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
               >
                 {isLoading && <Loader2 className="animate-spin" size={18} />}
                 {EventID ? "Save Changes" : "Publish Event"}
               </button>
            </div>
          </form>

          {/* PREVIEW COLUMN */}
          <div className="hidden lg:block lg:col-span-1">
             <div className="sticky top-8 space-y-4">
               <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Live Preview</h3>
               
               <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-[1.02] duration-300">
                 <div 
                   className="h-48 w-full relative"
                   style={{
                     background: bannerPreview ? `url(${bannerPreview}) center/cover` : '#333'
                   }}
                 >
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-medium border border-white/10">
                         {watchedValues.eventType || "Event Type"}
                      </span>
                      <h2 className="text-2xl font-bold mt-2 leading-tight">
                        {watchedValues.EventName || "Event Title"}
                      </h2>
                   </div>
                 </div>

                 <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                       <div className="flex-1">
                         <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">When</p>
                         <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                           {watchedValues.eventDate || "Date TBD"}
                         </p>
                       </div>
                       <div className="flex-1">
                         <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Where</p>
                         <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm truncate">
                           {watchedValues.location || "Location TBD"}
                         </p>
                       </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6">
                      {watchedValues.AboutArea || "Event description will appear here..."}
                    </p>

                    <div 
                      className="rounded-xl p-4 text-white text-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${watchedValues.PrimaryColor || '#4f46e5'}, ${watchedValues.SecondaryColor || '#3b82f6'})`
                      }}
                    >
                      <p className="text-xs font-medium opacity-90 uppercase tracking-widest">Register Now</p>
                      <p className="text-lg font-bold mt-1">Free Entry</p>
                    </div>
                 </div>
               </div>

               <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                  This is how your event card will appear to users.
               </p>
             </div>
          </div>

        </div>

        {isModalOpen && (
          <AddSpeakersModal
            onClose={() => {
              setIsModalOpen(false);
              setEditIndex(null);
            }}
            onSave={handleAddOrEditSpeaker}
            defaultData={editIndex !== null ? speakers[editIndex] : null}
          />
        )}

      </div>
    </div>
  );
};

export default CreateEvent;