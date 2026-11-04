import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const PageHeader = ({ eyebrow, title, description, action, className = "" }: PageHeaderProps) => {
  return (
    <section className={`eh-panel overflow-hidden p-5 md:p-6 ${className}`}>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-2 text-xs font-black uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{eyebrow}</p>}
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white md:text-3xl">{title}</h1>
          {description && <p className="mt-3 text-base font-medium leading-7 text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </section>
  );
};

export default PageHeader;
