import React, { useCallback, useEffect, useMemo, useState, type ElementType, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ImagePlus,
  Loader2,
  MapPin,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  Type,
  UploadCloud,
  Users,
  Wand2,
  X,
} from "lucide-react";
import useAddEvent from "../AdminCustomHooks/useAddEvent";
import AddSpeakersModal from "./AddSpeakersModal";
import { apiPath } from "../../Utils/Utils";
import { PageLoader } from "../common/StateViews";
import { auth } from "../Firebase";
const todayDate = new Date().toISOString().split("T")[0];

const speakerSchema = z.object({
  speakerName: z.string().min(2, "Name required"),
  speakerDesignation: z.string().min(2, "Designation required"),
  speakerImage: z.string().optional(),
});

const eventSchema = z.object({
  EventName: z.string().min(3, "Event name must be at least 3 characters"),
  eventDate: z.string().min(1, "Date is required").refine((date) => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, { message: "Event must be scheduled for today or a future date" }),
  location: z.string().min(2, "Location is required"),
  eventType: z.string().refine((val) => ["Technology", "Webinar", "Music", "Art", "Sports"].includes(val), { message: "Select a valid event type" }),
  banner: z.string().min(1, "Banner image is required"),
  BannerTagLine: z.string().min(3, "Tagline required"),
  AboutArea: z.string().min(10, "Description must be longer"),
  PrimaryColor: z.string().optional(),
  SecondaryColor: z.string().optional(),
  speakers: z.array(speakerSchema).optional(),
});

type EventFormData = z.infer<typeof eventSchema>;
type SpeakerType = z.infer<typeof speakerSchema>;

type UserId = string | undefined;

const fieldBase = "eh-input px-4 py-3.5 font-semibold placeholder:text-slate-400";

type FieldProps = {
  label: string;
  error?: FieldError;
  icon?: ElementType;
  children: ReactNode;
};

const Field = ({ label, error, icon: Icon, children }: FieldProps) => (
  <div className="space-y-2">
    <label className="eh-field-label">{Icon && <Icon size={14} />} {label}</label>
    {children}
    {error && <p className="eh-help-error">{error.message}</p>}
  </div>
);

const categories = ["Technology", "Webinar", "Music", "Art", "Sports"];

const CreateEvent: React.FC = () => {
  const { addEvent, isLoading } = useAddEvent();
  const { EventID } = useParams();
  const navigate = useNavigate();
  const {user}=useAuth();
  const userId:UserId = user?.uid 

  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [loadingEvent, setLoadingEvent] = useState(false);
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
    defaultValues: { PrimaryColor: "#4F46E5", SecondaryColor: "#06B6D4" },
  });

  const watchedValues = watch();
  const primaryColor = watchedValues.PrimaryColor || "#4F46E5";
  const secondaryColor = watchedValues.SecondaryColor || "#06B6D4";

  const fetchEvent = useCallback(async () => {
    if (!EventID) return;
    setLoadingEvent(true);
    try {
      const { data: eventData } = await axios.get(`${apiPath}/Events/${EventID}.json`);
      if (!eventData) {
        toast.error("Event not found.");
        return;
      }
      reset({ PrimaryColor: "#4F46E5", SecondaryColor: "#06B6D4", ...eventData });
      setSpeakers(eventData.speakers || []);
      setBannerPreview(eventData.banner || "");
    } catch {
      toast.error("Error loading event");
    } finally {
      setLoadingEvent(false);
    }
  }, [EventID, reset]);

  useEffect(() => { fetchEvent(); }, [fetchEvent]);

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

        const user = auth.currentUser;
if (!user) throw new Error("You must be logged in.");
const token = await user.getIdToken();
        await axios.patch(`${apiPath}/Events/${EventID}.json?auth=${token}`, payload);
        toast.success("Event updated successfully.");
      } else {
        await addEvent(payload);
      }
      reset({ PrimaryColor: "#4F46E5", SecondaryColor: "#06B6D4" });
      setBannerPreview("");
      setSpeakers([]);
      navigate("/Dashboard/Events");
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleAddOrEditSpeaker = (speaker: SpeakerType) => {
    setSpeakers((prev) => editIndex !== null ? prev.map((s, i) => (i === editIndex ? speaker : s)) : [...prev, speaker]);
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const completion = useMemo(() => {
    const keys: Array<keyof EventFormData> = ["EventName", "eventDate", "location", "eventType", "banner", "BannerTagLine", "AboutArea"];
    const done = keys.filter((key) => Boolean(watchedValues[key])).length + (speakers.length > 0 ? 1 : 0);
    return Math.round((done / (keys.length + 1)) * 100);
  }, [watchedValues, speakers.length]);

  if (loadingEvent) return <PageLoader label="Loading event editor..." />;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#020617] p-6 text-white shadow-2xl md:p-8">
        <div className="eh-premium-grid absolute inset-0 opacity-20" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/25 blur-[100px]" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link to="/Dashboard/Events" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 hover:bg-white/15">
              <ArrowLeft size={15} /> Back to events
            </Link>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Event Builder</p>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              {EventID ? "Refine your event" : "Create a premium event"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Build the public microsite, registration experience and speaker lineup from a single guided workspace.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between gap-6 text-xs font-black uppercase tracking-[0.16em] text-slate-300">
              <span>Page readiness</span><span>{completion}%</span>
            </div>
            <div className="h-3 w-64 max-w-full rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("banner")} />

          <section className="eh-dashboard-card p-6 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="eh-kicker mb-3">01 · Core details</p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Event information</h2>
              </div>
              <Calendar className="text-indigo-500" size={28} />
            </div>

            <div className="grid gap-6">
              <Field label="Event name" icon={Sparkles} error={errors.EventName}>
                <input {...register("EventName")} className={`${fieldBase} ${errors.EventName ? "eh-input-error" : ""}`} placeholder="e.g. Tech Conference 2026" />
              </Field>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Date" icon={Calendar} error={errors.eventDate}>
                  <input type="date" min={todayDate} {...register("eventDate")} className={`${fieldBase} ${errors.eventDate ? "eh-input-error" : ""}`} />
                </Field>
                <Field label="Category" icon={Type} error={errors.eventType}>
                  <select {...register("eventType")} className={`${fieldBase} ${errors.eventType ? "eh-input-error" : ""}`}>
                    <option value="">Select category</option>
                    {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Location" icon={MapPin} error={errors.location}>
                <input {...register("location")} className={`${fieldBase} ${errors.location ? "eh-input-error" : ""}`} placeholder="Venue, city or online" />
              </Field>
            </div>
          </section>

          <section className="eh-dashboard-card p-6 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="eh-kicker mb-3">02 · Public microsite</p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Content and branding</h2>
              </div>
              <Wand2 className="text-cyan-500" size={28} />
            </div>

            <div className="grid gap-6">
              <Field label="Hero tagline" icon={Type} error={errors.BannerTagLine}>
                <input {...register("BannerTagLine")} className={`${fieldBase} ${errors.BannerTagLine ? "eh-input-error" : ""}`} placeholder="One powerful line that sells the event" />
              </Field>

              <Field label="About event" icon={ChevronRight} error={errors.AboutArea}>
                <textarea {...register("AboutArea")} rows={6} className={`${fieldBase} resize-none ${errors.AboutArea ? "eh-input-error" : ""}`} placeholder="Explain who should attend, what they will learn and why the event matters." />
              </Field>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Primary color" icon={Palette} error={errors.PrimaryColor}>
                  <div className="flex gap-3">
                    <input type="color" {...register("PrimaryColor")} className="h-[50px] w-16 rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900" />
                    <input {...register("PrimaryColor")} className={fieldBase} />
                  </div>
                </Field>
                <Field label="Secondary color" icon={Palette} error={errors.SecondaryColor}>
                  <div className="flex gap-3">
                    <input type="color" {...register("SecondaryColor")} className="h-[50px] w-16 rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900" />
                    <input {...register("SecondaryColor")} className={fieldBase} />
                  </div>
                </Field>
              </div>

              <Field label="Banner image" icon={ImagePlus} error={errors.banner}>
                <div className={`relative min-h-[260px] overflow-hidden rounded-[1.75rem] border-2 border-dashed transition-all ${errors.banner ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40 dark:border-slate-700 dark:bg-slate-950/40"}`}>
                  {bannerPreview ? (
                    <>
                      <img src={bannerPreview} alt="Event banner preview" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                      <button type="button" onClick={() => { setBannerPreview(""); setValue("banner", "", { shouldValidate: true }); }} className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-red-600 shadow-lg hover:bg-red-600 hover:text-white">
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900">
                        <UploadCloud size={30} />
                      </div>
                      <p className="font-black text-slate-900 dark:text-white">Upload event banner</p>
                      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">Use a wide image under 2MB. This becomes the main hero of your microsite.</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleBannerChange} className="absolute inset-0 cursor-pointer opacity-0" />
                </div>
              </Field>
            </div>
          </section>

          <section className="eh-dashboard-card p-6 md:p-8">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eh-kicker mb-3">03 · Speaker lineup</p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Featured people</h2>
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="eh-btn-secondary px-5 py-3 text-sm">
                <Plus size={17} /> Add Speaker
              </button>
            </div>

            {speakers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {speakers.map((speaker, i) => (
                  <div key={`${speaker.speakerName}-${i}`} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <button type="button" onClick={() => { setEditIndex(i); setIsModalOpen(true); }} className="flex min-w-0 items-center gap-3 text-left">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {speaker.speakerImage ? <img src={speaker.speakerImage} alt={speaker.speakerName} className="h-full w-full object-cover" /> : <Users size={20} />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-black text-slate-950 dark:text-white">{speaker.speakerName}</p>
                        <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400">{speaker.speakerDesignation}</p>
                      </div>
                    </button>
                    <button type="button" onClick={() => setSpeakers((prev) => prev.filter((_, index) => index !== i))} className="rounded-2xl bg-red-50 p-3 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-950/40 dark:text-red-300">
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40">
                <Users className="mx-auto mb-4 text-slate-300" size={44} />
                <p className="font-black text-slate-900 dark:text-white">No speakers added yet</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add speakers to make the microsite feel more credible.</p>
              </div>
            )}
          </section>

          <div className="sticky bottom-4 z-20 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
            <button type="submit" disabled={isLoading} className="eh-btn-primary w-full px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : <>{EventID ? "Update Event" : "Create Event"} <CheckCircle2 size={18} /></>}
            </button>
          </div>
        </form>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="relative h-56 overflow-hidden bg-slate-200">
              {bannerPreview ? <img src={bannerPreview} alt="Preview" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-cyan-500 text-white"><ImagePlus size={44} /></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-indigo-700">
                {watchedValues.eventType || "Category"}
              </span>
              <h3 className="absolute bottom-4 left-4 right-4 line-clamp-2 text-2xl font-black text-white">
                {watchedValues.EventName || "Event title preview"}
              </h3>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Tagline</p>
                <p className="mt-2 font-bold text-slate-800 dark:text-slate-200">{watchedValues.BannerTagLine || "Your hero tagline will appear here."}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40"><Calendar className="mb-2 text-indigo-600" size={18} />{watchedValues.eventDate || "Date"}</div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40"><MapPin className="mb-2 text-cyan-600" size={18} />{watchedValues.location || "Location"}</div>
              </div>
              <div className="h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }} />
            </div>
          </div>

          <div className="eh-dashboard-card p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Publishing checklist</p>
            {[
              ["Core details", Boolean(watchedValues.EventName && watchedValues.eventDate && watchedValues.location)],
              ["Banner uploaded", Boolean(bannerPreview)],
              ["About copy", Boolean(watchedValues.AboutArea)],
              ["Speaker lineup", speakers.length > 0],
            ].map(([label, done]) => (
              <div key={String(label)} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0 dark:border-slate-800">
                <span className="font-bold text-slate-600 dark:text-slate-300">{label}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${done ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{done ? "Done" : "Pending"}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {isModalOpen && (
        <AddSpeakersModal
          onClose={() => { setIsModalOpen(false); setEditIndex(null); }}
          onSave={handleAddOrEditSpeaker}
          defaultData={editIndex !== null ? speakers[editIndex] : null}
        />
      )}
    </div>
  );
};

export default CreateEvent;
