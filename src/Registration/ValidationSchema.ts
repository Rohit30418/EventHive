import { z } from "zod";


//Orgniser Registration Schema
export const validationSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .nonempty("Name is required"),

    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),

    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .regex(/^\d+$/, "Phone must contain only numbers")
      .optional(),

    companyName: z
      .string()
      .min(1, "Company name is required")
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("Password is required"),

    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required"),

    consent: z.literal(true, {
    message: "You must agree  terms and conditions",
    }),
  })

  // ✅ Cross-field validation for matching passwords
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });


