import { z } from "zod";

export const validationSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  companyName: z.string().min(2, "Company name is required"),
  // Date of Birth Validation
  dob: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date of birth")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18 && age <= 60;
    }, "Age must be between 18 and 60 years old"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  consent: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});