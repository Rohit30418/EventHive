import type { ReactNode } from "react";

interface StatTileProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: "indigo" | "cyan" | "emerald" | "amber" | "rose";
}

const toneMap = {
  indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  rose: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
};

const StatTile = ({ label, value, hint, icon, tone = "indigo" }: StatTileProps) => (
  <div className="group eh-card eh-surface-hover overflow-hidden rounded-[1.75rem] p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
        {hint && <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{hint}</p>}
      </div>
      {icon && <div className={`rounded-2xl p-3 shadow-sm ${toneMap[tone]}`}>{icon}</div>}
    </div>
  </div>
);

export default StatTile;
