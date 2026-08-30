import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  designation: z.string().min(2, "Designation is required"),
  dob: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), "Invalid date format")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 18 && age <= 60;
    }, "Age must be between 18 and 60 years old"),
  gender: z.string().refine((value) => ["male", "female", "others"].includes(value), {
    message: "Please select your gender",
  }),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  photo: z
    .custom<FileList | undefined>()
    .refine((files) => Boolean(files?.length), "Profile photo is required")
    .refine(
      (files) => !files?.[0] || files[0].size <= 2 * 1024 * 1024,
      "Max file size is 2MB"
    )
    .refine(
      (files) =>
        !files?.[0] ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(files[0].type),
      "Only .jpg, .png, and .webp formats are supported"
    ),
  interests: z.array(z.string()).min(1, "Please select at least one area of interest"),
  consent: z.boolean().refine((value) => value, {
    message: "You must agree to the terms and conditions",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
