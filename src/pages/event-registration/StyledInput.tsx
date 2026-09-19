import type { CSSProperties, ElementType } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import type { RegistrationFormData } from "./registrationSchema";

interface StyledInputProps {
  label: string;
  name: keyof RegistrationFormData;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<RegistrationFormData>;
  error?: FieldError;
  icon: ElementType;
  primaryColor: string;
}

const StyledInput = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon: Icon,
  primaryColor,
}: StyledInputProps) => (
  <div className="space-y-2">
    <label className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-slate-500">
      {label}
    </label>

    <div className="group relative">
      <Icon
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors"
        style={{ "--focus-color": primaryColor } as CSSProperties}
      />
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`h-[52px] w-full rounded-xl border bg-white pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-400 ${
          error
            ? "border-red-300 bg-red-50/60"
            : "border-slate-200 hover:border-slate-300 focus:border-[var(--focus-color)]"
        }`}
        style={{ "--focus-color": primaryColor } as CSSProperties}

      />
    </div>

    {error && <p className="ml-1 text-xs font-bold text-red-500">{error.message}</p>}
  </div>
);

export default StyledInput;
