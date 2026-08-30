import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import z from "zod";
import AddSpeakersModal from "./AddSpeakersModal";
import { useState } from "react";
import {
  Edit3,
  FileText,
  Megaphone,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";

const AddWebsiteContentFormSchema = z.object({
  BannerTagLine: z
    .string()
    .min(3, "Banner tagline must be at least 3 characters"),
  AboutArea: z.string().min(3, "About content must be at least 3 characters"),
});

type FormData = z.infer<typeof AddWebsiteContentFormSchema>;

type Speaker = {
  speakerName: string;
  speakerDesignation: string;
  speakerImage?: string;
};

const AddWebsiteContentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AddWebsiteContentFormSchema),
  });

  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const onSubmit = (data: FormData) => {
    console.log({ ...data, speakers });
    reset();
    setSpeakers([]);
  };

  const handleAddOrEditSpeaker = (speakerData: Speaker) => {
    if (editIndex !== null) {
      const updated = [...speakers];
      updated[editIndex] = speakerData;
      setSpeakers(updated);
      setEditIndex(null);
    } else {
      setSpeakers((prev) => [...prev, speakerData]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteSpeaker = (index: number) => {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditSpeaker = (index: number) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const openAddSpeaker = () => {
    setEditIndex(null);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900/90 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles size={14} />
              Microsite Content
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
              Content and Branding
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">
              Add landing page copy, event story and speaker lineup for the
              public event microsite.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Speakers
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                {speakers.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Status
              </p>
              <p className="mt-2 text-sm font-black text-indigo-600 dark:text-indigo-300">
                Draft Mode
              </p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-7 lg:grid-cols-[1fr_380px]"
      >
        {/* Left Content */}
        <div className="space-y-7">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
                <Megaphone size={22} />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  Hero Tagline
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  This appears as the main event headline on the microsite.
                </p>
              </div>
            </div>

            <Input
              type="text"
              Inputname="BannerTagLine"
              placeholder="Example: India’s most premium tech leadership summit"
              register={register}
              error={errors.BannerTagLine}
            />
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 md:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300">
                <FileText size={22} />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  About Event
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Write a short, clear and credible description for attendees.
                </p>
              </div>
            </div>

            <Input
              type="textarea"
              Inputname="AboutArea"
              placeholder="Describe what this event is about, who should attend and what value they will get..."
              register={register}
              error={errors.AboutArea}
            />
          </div>
        </div>

        {/* Right Speakers Panel */}
        <div className="space-y-5">
          <div className="sticky top-24 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
                  <UsersRound size={22} />
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  Speakers
                </h3>

                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
                  Add speakers who will appear on the event microsite.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {speakers.length}
              </span>
            </div>

            <button
              type="button"
              onClick={openAddSpeaker}
              className="mb-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
            >
              <Plus size={17} />
              Add Speaker
            </button>

            {speakers.length > 0 ? (
              <ul className="max-h-[430px] space-y-3 overflow-y-auto pr-1">
                {speakers.map((speaker, index) => (
                  <li
                    key={index}
                    className="group rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-900/60 dark:hover:bg-slate-950"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {speaker.speakerImage ? (
                          <img
                            src={speaker.speakerImage}
                            alt={speaker.speakerName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserRound size={20} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-black text-slate-900 dark:text-white">
                          {speaker.speakerName || "Speaker"}
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
                          {speaker.speakerDesignation || "Designation"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditSpeaker(index)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white dark:bg-indigo-950/50 dark:text-indigo-300"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSpeaker(index)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 transition-all hover:bg-red-600 hover:text-white dark:bg-red-950/40 dark:text-red-300"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/50">
                <UserRound className="mx-auto mb-3 text-slate-400" size={34} />
                <p className="text-sm font-black text-slate-600 dark:text-slate-300">
                  No speakers added yet
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  Add your first speaker to build trust.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400"
            >
              Submit Content
            </button>
          </div>
        </div>
      </form>

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
  );
};

export default AddWebsiteContentForm;