import { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { apiPath } from "../../../Utils/Utils";
import { registrationSchema, type RegistrationFormData } from "./registrationSchema";

const useEventRegistrationForm = () => {
  const [photoBase64, setPhotoBase64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { id } = useParams();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPhotoBase64(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoBase64("");
    form.setValue("photo", undefined, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      if (!id) {
        throw new Error(
          "Event id missing. Please open the registration page from a valid event link."
        );
      }

      const payload = {
        ...data,
        photo: photoBase64,
        timestamp: new Date().toISOString(),
        eventId: id,
      };

      // Attendee registration is a public flow. Organizers and Super Admins
      // still use Firebase Authentication for dashboard access, but attendees
      // do not need an EventHive account just to register for an event.
      await axios.post(`${apiPath}/Registrations/${id}.json`, payload);

      toast.success("Registration successful! See you there.");
      form.reset();
      setPhotoBase64("");
    } catch (error: unknown) {
      console.error("Error saving data:", error);
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    photoBase64,
    isSubmitting,
    serverError,
    handlePhotoChange,
    clearPhoto,
    onSubmit,
  };
};

export default useEventRegistrationForm;
