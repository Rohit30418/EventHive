import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  dark?: boolean;
}

const SectionHeader = ({ eyebrow, title, description, align = "left", action, dark = false }: SectionHeaderProps) => {
  const centered = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-5 ${centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"}`}>
      <div className={centered ? "max-w-3xl" : "max-w-3xl"}>
        {eyebrow && (
          <p className={`mb-3 text-xs font-black uppercase  ${dark ? "text-cyan-200" : "text-indigo-600 dark:text-indigo-400"}`}>
            {eyebrow}
          </p>
        )}
        <h2 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-slate-950 dark:text-white"}`}>
          {title}
        </h2>
        {description && (
          <p className={`mt-4 text-base leading-8 sm:text-lg ${dark ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
