import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtoninterfaceProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  padding?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const Button: FC<ButtoninterfaceProps> = ({ text, padding, icon, variant = "primary", className = "", children, ...props }) => {
  const variantClass = variant === "secondary" ? "eh-btn-secondary" : variant === "danger" ? "eh-btn-danger" : "eh-btn-primary";

  return (
    <button
      type="button"
      className={`${variantClass} ${padding ? padding : "px-6 py-3"} ${className}`}
      {...props}
    >
      {icon}
      {children || text}
    </button>
  );
};

export default Button;
