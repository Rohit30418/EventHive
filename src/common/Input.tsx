import { AlertCircle } from "lucide-react";
import {
  type FieldError,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

interface InputProps<TFormValues extends FieldValues> {
  Inputname: Path<TFormValues>;
  type: string;
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  label?: string;
}

const Input = <TFormValues extends FieldValues>({
  Inputname,
  type,
  placeholder,
  register,
  error,
  label,
}: InputProps<TFormValues>) => {
  const isTextarea = type === "textarea";
  const inputClass = `eh-input px-4 py-3.5 font-semibold placeholder:text-slate-400 ${
    error ? "eh-input-error" : ""
  }`;

  return (
    <div className="space-y-2">
      {(label || placeholder) && (
        <label htmlFor={Inputname} className="eh-field-label">
          {label || placeholder}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={Inputname}
          {...register(Inputname)}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          id={Inputname}
          {...register(Inputname)}
          type={type}
          className={inputClass}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
        />
      )}

      {error && (
        <p className="eh-help-error">
          <AlertCircle size={14} /> {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
