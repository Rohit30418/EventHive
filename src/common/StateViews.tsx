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
  default: "bg-indigo-50 text-indigo-600 ring-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-900/60",
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
  <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 text-center shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
    <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-900/60">
      <Loader2 className="animate-spin" size={30} />
      <span className="absolute inset-0 rounded-3xl animate-ping bg-indigo-500/10" />
    </div>
    <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
  </div>
);

export const SkeletonGrid = ({ count = 6, className = "" }: { count?: number; className?: string }) => (
  <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="eh-skeleton-card" />
    ))}
  </div>
);
