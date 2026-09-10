import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, Inbox, Loader2, RefreshCw, SearchX } from "lucide-react";

interface StateViewProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  tone?: "default" | "danger" | "success" | "warning";
  className?: string;
}

const toneStyles = {
  default: "bg-[#fff0e6] text-[#ef6f30] ring-[#f4d8c7] dark:bg-[#3a2419] dark:text-[#f6a06f] dark:ring-[#5b3421]",
  danger: "bg-red-50 text-red-600 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900/60",
  success: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900/60",
  warning: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900/60",
};

export const EmptyState = ({ title, description, icon, actionLabel, onAction, tone = "default", className = "" }: StateViewProps) => (
  <div className={`eh-state-card ${className}`}>
    <div className={`eh-state-icon ${toneStyles[tone]}`}>
      {icon || <Inbox size={34} />}
    </div>
    <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h3>
    {description && <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
    {actionLabel && onAction && (
      <button type="button" onClick={onAction} className="eh-btn-primary mt-6 px-5 py-3 text-sm">
        {actionLabel} <ArrowRight size={16} />
      </button>
    )}
  </div>
);

export const ErrorState = ({ title = "Something went wrong", description, actionLabel = "Try again", onAction, className = "" }: Partial<StateViewProps>) => (
  <div className={`eh-state-card ${className}`}>
    <div className="eh-state-icon bg-red-50 text-red-600 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900/60">
      <AlertTriangle size={34} />
    </div>
    <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
      {description || "We could not load this section right now. Please check your connection and try again."}
    </p>
    <button type="button" onClick={onAction || (() => window.location.reload())} className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-black text-red-600 shadow-sm hover:bg-red-50 dark:border-red-900 dark:bg-slate-900 dark:hover:bg-red-950/40">
      <RefreshCw size={16} /> {actionLabel}
    </button>
  </div>
);

export const SearchEmptyState = ({ title = "No matching results", description, className = "" }: Partial<StateViewProps>) => (
  <EmptyState
    title={title}
    description={description || "Try a different keyword, remove filters, or check the spelling."}
    icon={<SearchX size={34} />}
    className={className}
  />
);

export const PageLoader = ({ label = "Loading workspace..." }: { label?: string }) => (
  <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-[#eee3db] bg-[#fffaf6] p-8 text-center shadow-[0_12px_30px_rgba(30,28,27,0.05)] dark:border-slate-800 dark:bg-slate-900">
    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#f0ded2] bg-white text-[#ef6f30] shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-[#f6a06f]">
      <Loader2 className="animate-spin" size={30} />
      <span className="absolute -inset-2 -z-10 rounded-full bg-[#fad2be]/35 dark:bg-[#ef6f30]/10" />
    </div>
    <p className="font-['Manrope',sans-serif] text-sm font-extrabold tracking-[-0.01em] text-[#625d59] dark:text-slate-300">
      {label}
    </p>
  </div>
);

export const SkeletonGrid = ({ count = 6, className = "" }: { count?: number; className?: string }) => (
  <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="eh-skeleton-card" />
    ))}
  </div>
);