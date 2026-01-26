import {type UseFormRegister, type FieldError } from "react-hook-form";

interface InputTypes {
  Inputname: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const Input: React.FC<InputTypes> = ({ Inputname, type, placeholder, register, error }) => {
  return (
    <div className="mb-5">
      <input
        {...register(Inputname)}
        type={type}
        className={`p-2 ring-2 ${
          error ? "ring-red-400" : "ring-gray-300"
        } rounded-md border-none w-full outline-none`}
        placeholder={placeholder}
        name={Inputname}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
