import type { ElementType, ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: ReactNode;
  icon?: ElementType;
  hint?: string;
  tone?: "indigo" | "emerald" | "amber" | "rose" | "cyan";
}

const toneClasses = {
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300",
};

const MetricCard = ({ label, value, icon: Icon, hint, tone = "indigo" }: MetricCardProps) => {
  return (
    <article className="eh-card eh-surface-hover relative overflow-hidden rounded-[2rem] p-6">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <h3 className="text-4xl font-black text-slate-950 dark:text-white">{value}</h3>
          {hint && <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{hint}</p>}
        </div>
        {Icon && (
          <div className={`rounded-2xl p-4 ${toneClasses[tone]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </article>
  );
};

export default MetricCard;
