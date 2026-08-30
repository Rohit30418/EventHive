import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BriefcaseBusiness,
  CloudUpload,
  ImagePlus,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

type Speaker = {
  speakerName: string;
  speakerDesignation: string;
  speakerImage?: string;
};

type AddSpeakersModalProps = {
  onClose: () => void;
  onSave: (speaker: Speaker) => void;
  defaultData?: Speaker | null;
};

const AddSpeakersModal = ({
  onClose,
  onSave,
  defaultData,
}: AddSpeakersModalProps) => {
  const [speakerName, setSpeakerName] = useState(defaultData?.speakerName || "");
  const [speakerDesignation, setSpeakerDesignation] = useState(
    defaultData?.speakerDesignation || ""
  );
  const [speakerImage, setSpeakerImage] = useState(
    defaultData?.speakerImage || ""
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleImageChange = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setSpeakerImage(String(reader.result));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!speakerName.trim() || !speakerDesignation.trim()) return;

    onSave({
      speakerName: speakerName.trim(),
      speakerDesignation: speakerDesignation.trim(),
      speakerImage,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-md">
      <button
        type="button"
        aria-label="Close speaker modal overlay"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2.2rem] border border-white/20 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="relative overflow-hidden bg-slate-950 px-7 pb-24 pt-7 text-white dark:bg-slate-950">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-indigo-500/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative z-10 flex items-start justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                <Sparkles size={13} />
                Speaker Profile
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                {defaultData ? "Edit Speaker" : "Add Speaker"}
              </h2>

              <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-300">
                Speaker data appears on the event microsite and helps make the
                page credible.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-white/10 p-3 text-white transition-all hover:bg-white/20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="relative px-7">
          <label className="absolute left-1/2 top-0 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-4 border-white bg-slate-100 text-slate-400 shadow-2xl transition-all hover:scale-105 dark:border-slate-900 dark:bg-slate-800">
            {speakerImage ? (
              <img
                src={speakerImage}
                alt="Speaker"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <CloudUpload size={30} />
                <span className="mt-1 text-[10px] font-black uppercase tracking-[0.14em]">
                  Upload
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(event.target.files?.[0])}
            />
          </label>
        </div>

        {/* Body */}
        <div className="space-y-5 px-7 pb-7 pt-20">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Speaker Name
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition-all focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:focus-within:ring-indigo-950/40">
              <UserRound size={19} className="text-slate-400" />

              <input
                value={speakerName}
                onChange={(event) => setSpeakerName(event.target.value)}
                placeholder="Full name"
                className="h-full flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Designation
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition-all focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:focus-within:ring-indigo-950/40">
              <BriefcaseBusiness size={19} className="text-slate-400" />

              <input
                value={speakerDesignation}
                onChange={(event) => setSpeakerDesignation(event.target.value)}
                placeholder="Job title / designation"
                className="h-full flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-black text-slate-500 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-300">
            <ImagePlus size={18} />
            {speakerImage ? "Change Speaker Photo" : "Upload Speaker Photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(event.target.files?.[0])}
            />
          </label>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!speakerName.trim() || !speakerDesignation.trim()}
              className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {defaultData ? "Update Speaker" : "Add Speaker"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddSpeakersModal;