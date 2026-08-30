import { describe, expect, it } from "vitest";
import { registrationSchema } from "./registrationSchema";

const createFileList = (file: File): FileList => {
  const transfer = new DataTransfer();
  transfer.items.add(file);
  return transfer.files;
};

const validData = {
  fullName: "Rohit Pant",
  email: "rohit@example.com",
  designation: "Frontend Developer",
  dob: "1999-09-14",
  gender: "male",
  mobile: "9876543210",
  photo: createFileList(new File(["photo"], "photo.png", { type: "image/png" })),
  interests: ["Technology"],
  consent: true,
};

describe("registrationSchema", () => {
  it("accepts a valid attendee registration", () => {
    expect(registrationSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects an invalid mobile number", () => {
    const result = registrationSchema.safeParse({ ...validData, mobile: "12345" });
    expect(result.success).toBe(false);
  });

  it("rejects unsupported photo formats", () => {
    const photo = createFileList(
      new File(["document"], "resume.pdf", { type: "application/pdf" })
    );
    const result = registrationSchema.safeParse({ ...validData, photo });

    expect(result.success).toBe(false);
  });
});
